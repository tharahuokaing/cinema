/* =========================================================
   LEGEND CINEMA & COURSE TICKETING SYSTEM WITH IMAGE SUPPORT
========================================================= */

(() => {
    "use strict";

    const STORAGE_KEY = "legend_cinema_bookings";

    // Daily schedule feed with full imageSrc support
    const dailyMovies = [
        {
            title: "JavaScript Mastery: Zero to Hero (វគ្គសិក្សា JavaScript)",
            genre: "Programming / Web Dev • 12h 30m",
            price: 49.99,
            icon: "💻",
            imageSrc: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            time: "07:00 PM",
            trailerUrl: "https://www.youtube.com/watch?v=hdI2bqOjy3c"
        },
        {
            title: "The Night Curse of Reatrei (បណ្ដាសានាងរាត្រី)",
            genre: "Horror / Mystery • 1h 42m",
            price: 5.00,
            icon: "🕯️",
            imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ZP9xSyA6DyxyvPlgpmp_aDorlcqCFcU1CunYWmnYfA&s",
            time: "06:45 PM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
        },
        {
            title: "Spider-Man: Brand New Day",
            genre: "Action / Sci-Fi • 2h 15m",
            price: 6.50,
            icon: "🕷️",
            imageSrc: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=500&q=80",
            time: "07:30 PM",
            trailerUrl: "https://youtu.be/FU-P3Jcfo2o?si=mwZAvMcjhgnv7DCU"
        },
        {
            title: "The Odyssey",
            genre: "Adventure / Drama • 2h 40m",
            price: 6.00,
            icon: "🏛️",
            imageSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
            time: "04:15 PM",
            trailerUrl: "https://youtu.be/Mzw2ttJD2qQ?si=41cHepS_mdoBOoGR"
        },
        {
            title: "Dune: Part Two",
            genre: "Sci-Fi / Adventure • 2h 46m",
            price: 7.50,
            icon: "🏜️",
            imageSrc: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80",
            time: "01:15 PM",
            trailerUrl: "https://youtu.be/Way9Dexny3w"
        },
        {
            title: "Cyber Heist: Phnom Penh",
            genre: "Thriller / Cyberpunk • 1h 55m",
            price: 7.00,
            icon: "💻",
            imageSrc: "",
            time: "09:00 PM",
            trailerUrl: "https://youtu.be/fHrEootHhlc?si=HQDe5YfuG6ebdX3H"
        }
    ];

    // Consolidated State
    let selectedMovieObj = null;
    let selectedSeats = [];
    let currentActiveTicket = null;

    // Configuration for Seat Layout
    const rows = ["A", "B", "C", "D", "E"];
    const seatsPerRow = 8;
    const occupiedSeats = ["A3", "A4", "C5", "D1", "D2"];

    // DOM Elements
    const currentDateDisplay = document.getElementById("currentDateDisplay");
    const movieGrid = document.getElementById("movieGrid");
    const movieSelectionSec = document.getElementById("movieSelection");
    const seatSelectionSec = document.getElementById("seatSelectionSec");
    const checkoutSection = document.getElementById("checkoutSection");
    const successSection = document.getElementById("successSection");
    const historyContainer = document.getElementById("bookingHistoryList");

    const seatGrid = document.getElementById("seatGrid");
    const seatMovieTitle = document.getElementById("seatMovieTitle");
    const selectedSeatsList = document.getElementById("selectedSeatsList");
    const seatTotalPrice = document.getElementById("seatTotalPrice");
    const proceedToCheckoutBtn = document.getElementById("proceedToCheckoutBtn");

    const summaryMovie = document.getElementById("summaryMovie");
    const summaryTime = document.getElementById("summaryTime");
    const summaryPrice = document.getElementById("summaryPrice");
    const summarySeats = document.getElementById("summarySeats");
    const summaryImage = document.getElementById("summaryImage");

    // Initialize daily schedule header
    function initScheduleDate() {
        const today = new Date();
        const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
        if (currentDateDisplay) {
            currentDateDisplay.textContent = `${today.toLocaleDateString("en-US", options)} (Synced with Legend Daily Feed)`;
        }
    }

    // Render schedule items into grid dynamically
    function renderMovies() {
        if (!movieGrid) return;
        movieGrid.innerHTML = "";

        dailyMovies.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "movie-card";

            const posterMarkup = item.imageSrc 
                ? `<img src="${item.imageSrc}" alt="${item.title}" class="movie-poster-img" loading="lazy">`
                : `<div class="movie-poster-placeholder">${item.icon}</div>`;

            card.innerHTML = `
                <div class="movie-poster-container">
                    ${posterMarkup}
                </div>
                <h3>${item.title}</h3>
                <p class="genre">${item.genre}</p>
                <p class="showtime-tag">Time/Slot: <strong>${item.time}</strong> ($${item.price.toFixed(2)})</p>
                <button 
                    class="btn-primary select-movie-btn" 
                    data-index="${index}">
                    Select & Continue
                </button>
                <button 
                    class="btn-secondary-outline watch-trailer-btn" 
                    data-url="${item.trailerUrl}">
                    Watch Preview 🎬
                </button>
            `;

            movieGrid.appendChild(card);
        });
    }

    // Render Seat Grid Layout
    function renderSeatGrid() {
        if (!seatGrid) return;
        seatGrid.innerHTML = "";
        selectedSeats = [];
        updateSeatSummary();

        rows.forEach(rowLetter => {
            const rowDiv = document.createElement("div");
            rowDiv.className = "seat-row";

            const label = document.createElement("span");
            label.className = "row-label";
            label.textContent = rowLetter;
            rowDiv.appendChild(label);

            for (let i = 1; i <= seatsPerRow; i++) {
                const seatId = `${rowLetter}${i}`;
                const seat = document.createElement("div");
                seat.className = "seat";
                seat.textContent = i;
                seat.dataset.seatId = seatId;

                if (occupiedSeats.includes(seatId)) {
                    seat.classList.add("occupied");
                } else {
                    seat.addEventListener("click", () => toggleSeatSelection(seat, seatId));
                }

                rowDiv.appendChild(seat);
            }

            seatGrid.appendChild(rowDiv);
        });
    }

    // Toggle Seat State
    function toggleSeatSelection(seatElement, seatId) {
        if (seatElement.classList.contains("selected")) {
            seatElement.classList.remove("selected");
            selectedSeats = selectedSeats.filter(s => s !== seatId);
        } else {
            seatElement.classList.add("selected");
            selectedSeats.push(seatId);
        }

        updateSeatSummary();
    }

    // Update Seat Summary Panel
    function updateSeatSummary() {
        const unitPrice = selectedMovieObj ? selectedMovieObj.price : 0;
        const total = selectedSeats.length * unitPrice;

        if (selectedSeatsList) {
            selectedSeatsList.textContent = selectedSeats.length > 0 ? selectedSeats.join(", ") : "None";
        }
        if (seatTotalPrice) {
            seatTotalPrice.textContent = `$${total.toFixed(2)}`;
        }
        if (proceedToCheckoutBtn) {
            proceedToCheckoutBtn.disabled = selectedSeats.length === 0;
        }
    }

    // Event Delegation on Grid
    function bindGridEvents() {
        if (!movieGrid) return;

        movieGrid.addEventListener("click", e => {
            const selectBtn = e.target.closest(".select-movie-btn");
            const trailerBtn = e.target.closest(".watch-trailer-btn");

            if (selectBtn) {
                const index = parseInt(selectBtn.dataset.index, 10);
                selectedMovieObj = dailyMovies[index];

                if (seatMovieTitle) {
                    seatMovieTitle.textContent = `${selectedMovieObj.title} • ${selectedMovieObj.time} ($${selectedMovieObj.price.toFixed(2)}/seat)`;
                }

                renderSeatGrid();

                // Transition: Grid -> Seat Selection
                if (movieSelectionSec) movieSelectionSec.classList.remove("active");
                if (seatSelectionSec) {
                    seatSelectionSec.classList.remove("hidden");
                    seatSelectionSec.classList.add("active");
                }
            }

            if (trailerBtn) {
                const url = trailerBtn.dataset.url;
                if (url) window.open(url, "_blank", "noopener,noreferrer");
            }
        });
    }

    // Storage & History Logic
    function saveBookingToStorage(ticket) {
        const existingBookings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        existingBookings.unshift(ticket);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existingBookings));
        renderBookingHistory();
    }

    function renderBookingHistory() {
        if (!historyContainer) return;

        const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        if (bookings.length === 0) {
            historyContainer.innerHTML = "<p class='no-history'>No ticket purchases found.</p>";
            return;
        }

        historyContainer.innerHTML = bookings.map(b => `
            <div class="history-item">
                ${b.imageSrc 
                    ? `<img src="${b.imageSrc}" class="history-thumb" alt="${b.movie}">`
                    : `<div class="history-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.5rem;">🎬</div>`
                }
                <div class="history-details">
                    <div style="display: flex; justify-content: space-between; font-size: 0.8em; opacity: 0.8;">
                        <span>Ticket ID: <strong>${b.id}</strong></span>
                        <span>${b.bookedAt}</span>
                    </div>
                    <h4 style="margin: 4px 0; font-size: 0.95rem;">${b.movie}</h4>
                    <div style="display: flex; justify-content: space-between; font-size: 0.85em;">
                        <span>Time: ${b.time} | Seats: <strong>${Array.isArray(b.seats) ? b.seats.join(", ") : "N/A"}</strong></span>
                        <span>Paid: <strong>$${parseFloat(b.price).toFixed(2)}</strong> (${b.paymentMethod})</span>
                    </div>
                </div>
            </div>
        `).join("");
    }

    function clearHistory() {
        localStorage.removeItem(STORAGE_KEY);
        renderBookingHistory();
    }

    // QR Code & PDF Export
    function renderQRCode(ticket) {
        const qrContainer = document.getElementById("ticketQrContainer");
        if (!qrContainer || typeof QRCode === "undefined") return;

        qrContainer.innerHTML = "";

        new QRCode(qrContainer, {
            text: JSON.stringify({ id: ticket.id, title: ticket.movie, time: ticket.time, seats: ticket.seats }),
            width: 140,
            height: 140,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    function downloadPDF(ticket) {
        if (!window.jspdf) {
            alert("PDF generation library is missing.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: [80, 140] });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("LEGEND CINEMA", 40, 12, { align: "center" });

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text("Official E-Ticket Receipt", 40, 17, { align: "center" });
        doc.text("--------------------------------------------------", 40, 22, { align: "center" });

        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("Ticket ID:", 8, 30);
        doc.setFont("helvetica", "normal");
        doc.text(ticket.id, 32, 30);

        doc.setFont("helvetica", "bold");
        doc.text("Title:", 8, 38);
        doc.setFont("helvetica", "normal");
        const titleLines = doc.splitTextToSize(ticket.movie, 42);
        doc.text(titleLines, 32, 38);

        const offset = (titleLines.length - 1) * 4;

        doc.setFont("helvetica", "bold");
        doc.text("Showtime:", 8, 46 + offset);
        doc.setFont("helvetica", "normal");
        doc.text(ticket.time, 32, 46 + offset);

        doc.setFont("helvetica", "bold");
        doc.text("Seats:", 8, 54 + offset);
        doc.setFont("helvetica", "normal");
        doc.text(ticket.seats.join(", "), 32, 54 + offset);

        doc.setFont("helvetica", "bold");
        doc.text("Paid:", 8, 62 + offset);
        doc.setFont("helvetica", "normal");
        doc.text(`$${ticket.price.toFixed(2)} (${ticket.paymentMethod})`, 32, 62 + offset);

        const qrCanvas = document.querySelector("#ticketQrContainer canvas");
        if (qrCanvas) {
            doc.addImage(qrCanvas.toDataURL("image/png"), "PNG", 25, 70 + offset, 30, 30);
        }

        doc.setFontSize(8);
        doc.text("Present QR code at entrance.", 40, 106 + offset, { align: "center" });
        doc.save(`Ticket_${ticket.id}.pdf`);
    }

    // Checkout Completion
    function finalizeCheckout(paymentMethod = "Credit Card") {
        const calculatedPrice = selectedSeats.length * selectedMovieObj.price;

        currentActiveTicket = {
            id: "TKT-" + Math.floor(100000 + Math.random() * 900000),
            movie: selectedMovieObj.title,
            imageSrc: selectedMovieObj.imageSrc || "",
            time: selectedMovieObj.time,
            seats: selectedSeats,
            price: calculatedPrice,
            paymentMethod: paymentMethod,
            bookedAt: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        };

        saveBookingToStorage(currentActiveTicket);
        renderQRCode(currentActiveTicket);

        // Update Labels & Confirmed Image
        const tId = document.getElementById("confirmedTicketId");
        const tMovie = document.getElementById("confirmedMovie");
        const tTime = document.getElementById("confirmedTime");
        const tPrice = document.getElementById("confirmedPrice");
        const tSeats = document.getElementById("confirmedSeats");
        const confirmedImg = document.getElementById("confirmedImage");

        if (tId) tId.textContent = currentActiveTicket.id;
        if (tMovie) tMovie.textContent = currentActiveTicket.movie;
        if (tTime) tTime.textContent = currentActiveTicket.time;
        if (tPrice) tPrice.textContent = `$${currentActiveTicket.price.toFixed(2)}`;
        if (tSeats) tSeats.textContent = currentActiveTicket.seats.join(", ");
        if (confirmedImg) {
            if (currentActiveTicket.imageSrc) {
                confirmedImg.src = currentActiveTicket.imageSrc;
                confirmedImg.parentElement.style.display = "block";
            } else {
                confirmedImg.parentElement.style.display = "none";
            }
        }

        if (checkoutSection) {
            checkoutSection.classList.remove("active");
            checkoutSection.classList.add("hidden");
        }
        if (successSection) {
            successSection.classList.add("active");
        }
    }

    // DOM Setup
    document.addEventListener("DOMContentLoaded", () => {
        initScheduleDate();
        renderMovies();
        bindGridEvents();
        renderBookingHistory();

        // Proceed to Checkout
        if (proceedToCheckoutBtn) {
            proceedToCheckoutBtn.addEventListener("click", () => {
                const totalPrice = selectedSeats.length * selectedMovieObj.price;

                if (summaryMovie) summaryMovie.textContent = selectedMovieObj.title;
                if (summaryTime) summaryTime.textContent = selectedMovieObj.time;
                if (summaryPrice) summaryPrice.textContent = `$${totalPrice.toFixed(2)}`;
                if (summarySeats) summarySeats.textContent = selectedSeats.join(", ");

                if (summaryImage) {
                    if (selectedMovieObj.imageSrc) {
                        summaryImage.src = selectedMovieObj.imageSrc;
                        summaryImage.parentElement.style.display = "block";
                    } else {
                        summaryImage.parentElement.style.display = "none";
                    }
                }

                if (seatSelectionSec) {
                    seatSelectionSec.classList.remove("active");
                    seatSelectionSec.classList.add("hidden");
                }
                if (checkoutSection) {
                    checkoutSection.classList.remove("hidden");
                    checkoutSection.classList.add("active");
                }
            });
        }

        // Navigation Handlers
        const backToMoviesFromSeats = document.getElementById("backToMoviesFromSeats");
        if (backToMoviesFromSeats) {
            backToMoviesFromSeats.addEventListener("click", () => {
                if (seatSelectionSec) {
                    seatSelectionSec.classList.remove("active");
                    seatSelectionSec.classList.add("hidden");
                }
                if (movieSelectionSec) {
                    movieSelectionSec.classList.add("active");
                }
            });
        }

        const backBtn = document.getElementById("backToMovies");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                if (checkoutSection) {
                    checkoutSection.classList.remove("active");
                    checkoutSection.classList.add("hidden");
                }
                if (seatSelectionSec) {
                    seatSelectionSec.classList.remove("hidden");
                    seatSelectionSec.classList.add("active");
                }
            });
        }

        const resetBookingBtn = document.getElementById("resetBookingBtn");
        if (resetBookingBtn) {
            resetBookingBtn.addEventListener("click", () => {
                if (successSection) {
                    successSection.classList.remove("active");
                }
                if (movieSelectionSec) {
                    movieSelectionSec.classList.add("active");
                }
            });
        }

        // Payment Tabs
        const payTabs = document.querySelectorAll(".pay-tab");
        const payContents = document.querySelectorAll(".pay-content");

        payTabs.forEach(tab => {
            tab.addEventListener("click", e => {
                const targetId = e.currentTarget.dataset.target;

                payTabs.forEach(t => t.classList.remove("active"));
                payContents.forEach(c => c.classList.remove("active"));

                e.currentTarget.classList.add("active");

                const targetContent = document.getElementById(targetId);
                if (targetContent) targetContent.classList.add("active");
            });
        });

        // Payment Submit Actions
        const payCardBtn = document.getElementById("payCardBtn");
        if (payCardBtn) {
            payCardBtn.addEventListener("click", () => {
                const cardInput = document.getElementById("cardNumber");
                const cardNumber = cardInput ? cardInput.value.trim() : "";

                if (cardNumber.length < 12) {
                    alert("Please enter a valid Visa or Mastercard number.");
                    return;
                }

                finalizeCheckout("Credit Card");
            });
        }

        const payQrBtn = document.getElementById("payQrBtn");
        if (payQrBtn) {
            payQrBtn.addEventListener("click", () => finalizeCheckout("ABA / KHQR"));
        }

        // Receipt PDF Download
        const downloadBtn = document.getElementById("downloadReceiptBtn");
        if (downloadBtn) {
            downloadBtn.addEventListener("click", () => {
                if (currentActiveTicket) downloadPDF(currentActiveTicket);
            });
        }

        // Clear History Handler
        const clearHistoryBtn = document.getElementById("clearHistoryBtn");
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener("click", clearHistory);
        }
    });
})();
