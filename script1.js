/* =========================================================
   PHASE 13: LEGEND CINEMA DAILY SCHEDULE & LOCALSTORAGE
========================================================= */

(() => {
    "use strict";

    const STORAGE_KEY = "legend_cinema_bookings";

    // Daily movie schedule
    const dailyMovies = [
        {
            title: "Spider-Man: Brand New Day",
            genre: "Action / Sci-Fi • 2h 15m",
            price: 6.50,
            icon: "🕷️",
            time: "07:30 PM",
            trailerUrl: "https://youtu.be/FU-P3Jcfo2o?si=mwZAvMcjhgnv7DCU"
        },
        {
            title: "Cyber Heist: Phnom Penh",
            genre: "Thriller / Cyberpunk • 1h 55m",
            price: 7.00,
            icon: "💻",
            time: "09:00 PM",
            trailerUrl: "https://youtu.be/fHrEootHhlc?si=HQDe5YfuG6ebdX3H"
        },
        {
            title: "The Dark Mother (ម៉ែក្រឡាភ្លើង)",
            genre: "Horror / Supernatural • 1h 48m",
            price: 5.00,
            icon: "👻",
            time: "01:30 PM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
        }
    ];

    // State Variables
    let selectedMovieName = "";
    let selectedMoviePrice = 0;
    let selectedShowtime = "";

    // DOM Elements
    const currentDateDisplay = document.getElementById("currentDateDisplay");
    const movieGrid = document.getElementById("movieGrid");
    const checkoutSection = document.getElementById("checkoutSection");
    const successSection = document.getElementById("successSection");
    const movieSelectionSec = document.getElementById("movieSelection");
    const historyContainer = document.getElementById("bookingHistoryList");

    const summaryMovie = document.getElementById("summaryMovie");
    const summaryTime = document.getElementById("summaryTime");
    const summaryPrice = document.getElementById("summaryPrice");

    // Initialize daily schedule date header
    function initScheduleDate() {
        const today = new Date();
        const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
        if (currentDateDisplay) {
            currentDateDisplay.textContent = `${today.toLocaleDateString("en-US", options)} (Synced with Legend Daily Feed)`;
        }
    }

    // Render movies into grid dynamically
    function renderMovies() {
        if (!movieGrid) return;
        movieGrid.innerHTML = "";

        dailyMovies.forEach(movie => {
            const card = document.createElement("div");
            card.className = "movie-card";

            card.innerHTML = `
                <div class="movie-poster-placeholder">${movie.icon}</div>
                <h3>${movie.title}</h3>
                <p class="genre">${movie.genre}</p>
                <p class="showtime-tag">Showtime: <strong>${movie.time}</strong></p>
                <button 
                    class="btn-primary select-movie-btn" 
                    data-movie="${movie.title}" 
                    data-price="${movie.price}" 
                    data-time="${movie.time}">
                    Select Showtime
                </button>
                <button 
                    class="btn-secondary-outline watch-trailer-btn" 
                    data-url="${movie.trailerUrl}">
                    Watch Trailer 🎬
                </button>
            `;

            movieGrid.appendChild(card);
        });
    }

    // Event Delegation on Movie Grid
    function bindGridEvents() {
        if (!movieGrid) return;

        movieGrid.addEventListener("click", e => {
            const selectBtn = e.target.closest(".select-movie-btn");
            const trailerBtn = e.target.closest(".watch-trailer-btn");

            if (selectBtn) {
                selectedMovieName = selectBtn.dataset.movie;
                selectedMoviePrice = parseFloat(selectBtn.dataset.price);
                selectedShowtime = selectBtn.dataset.time;

                if (summaryMovie) summaryMovie.textContent = selectedMovieName;
                if (summaryTime) summaryTime.textContent = selectedShowtime;
                if (summaryPrice) summaryPrice.textContent = `$${selectedMoviePrice.toFixed(2)}`;

                if (movieSelectionSec) movieSelectionSec.classList.remove("active");
                if (checkoutSection) {
                    checkoutSection.classList.remove("hidden");
                    checkoutSection.classList.add("active");
                }
            }

            if (trailerBtn) {
                const url = trailerBtn.dataset.url;
                if (url) window.open(url, "_blank", "noopener,noreferrer");
            }
        });
    }

    // --- LOCAL STORAGE FUNCTIONS ---

    // Save single booking to local storage
    function saveBookingToStorage(paymentMethod = "Card") {
        const existingBookings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        const newBooking = {
            id: "TKT-" + Math.floor(100000 + Math.random() * 900000),
            movie: selectedMovieName,
            time: selectedShowtime,
            price: selectedMoviePrice,
            paymentMethod: paymentMethod,
            bookedAt: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        };

        existingBookings.unshift(newBooking); // Put newest booking at top
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existingBookings));

        renderBookingHistory();
    }

    // Retrieve and render history in UI
    function renderBookingHistory() {
        if (!historyContainer) return;

        const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        if (bookings.length === 0) {
            historyContainer.innerHTML = "<p class='no-history'>No ticket purchases found.</p>";
            return;
        }

        historyContainer.innerHTML = bookings.map(b => `
            <div class="ticket-card" style="border: 1px solid #333; padding: 12px; margin-bottom: 10px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85em; opacity: 0.8;">
                    <span>Ticket ID: <strong>${b.id}</strong></span>
                    <span>${b.bookedAt}</span>
                </div>
                <h4 style="margin: 6px 0;">${b.movie}</h4>
                <div style="display: flex; justify-content: space-between; font-size: 0.9em;">
                    <span>Showtime: ${b.time}</span>
                    <span>Paid: <strong>$${parseFloat(b.price).toFixed(2)}</strong> (${b.paymentMethod})</span>
                </div>
            </div>
        `).join("");
    }

    // Clear history helper
    function clearHistory() {
        localStorage.removeItem(STORAGE_KEY);
        renderBookingHistory();
    }

    // Switch view to completion screen & save data
    function finalizeCheckout(paymentMethod = "Card") {
        saveBookingToStorage(paymentMethod);

        if (checkoutSection) {
            checkoutSection.classList.remove("active");
            checkoutSection.classList.add("hidden");
        }
        if (successSection) {
            successSection.classList.add("active");
        }
    }

    // Document Initialization
    document.addEventListener("DOMContentLoaded", () => {
        initScheduleDate();
        renderMovies();
        bindGridEvents();
        renderBookingHistory(); // Load previous tickets on page launch

        // Back to Movies Button
        const backBtn = document.getElementById("backToMovies");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                if (checkoutSection) {
                    checkoutSection.classList.remove("active");
                    checkoutSection.classList.add("hidden");
                }
                if (movieSelectionSec) {
                    movieSelectionSec.classList.add("active");
                }
            });
        }

        // Payment Tabs Switcher
        const payTabs = document.querySelectorAll(".pay-tab");
        const payContents = document.querySelectorAll(".pay-content");

        payTabs.forEach(tab => {
            tab.addEventListener("click", e => {
                const targetId = e.currentTarget.dataset.target;

                payTabs.forEach(t => t.classList.remove("active"));
                payContents.forEach(c => c.classList.remove("active"));

                e.currentTarget.classList.add("active");

                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add("active");
                }
            });
        });

        // Card Payment Handler
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

        // QR Payment Handler
        const payQrBtn = document.getElementById("payQrBtn");
        if (payQrBtn) {
            payQrBtn.addEventListener("click", () => finalizeCheckout("ABA / KHQR"));
        }

        // Clear History Button Handler (if present in HTML)
        const clearHistoryBtn = document.getElementById("clearHistoryBtn");
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener("click", clearHistory);
        }

        // Reset / Book Again Handler
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
    });
})();
