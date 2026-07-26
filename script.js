/* ========================================================= 
   PHASE 13: LEGEND CINEMA DAILY SCHEDULE & TRAILERS
========================================================= */

(() => {
    "use strict";

    // Daily updated movie schedule including trailer embed links
    const dailyMovies = [
        { 
            title: "Spider-Man: Brand New Day", 
            genre: "Action / Sci-Fi • 2h 15m", 
            price: 6.50, 
            icon: "🕷️", 
            time: "07:30 PM",
            trailerUrl: "https://youtu.be/FU-P3Jcfo2o?si=mwZAvMcjhgnv7DCU" // Replace with actual trailer embed link
        },
        { 
            title: "The Odyssey", 
            genre: "Adventure / Drama • 2h 40m", 
            price: 6.00, 
            icon: "🏛️", 
            time: "04:15 PM",
            trailerUrl: "https://youtu.be/Mzw2ttJD2qQ?si=41cHepS_mdoBOoGR" 
        },
        { 
            title: "Cyber Heist: Phnom Penh", 
            genre: "Thriller / Cyberpunk • 1h 55m", 
            price: 7.00, 
            icon: "💻", 
            time: "09:00 PM",
            trailerUrl: "https://youtu.be/fHrEootHhlc?si=HQDe5YfuG6ebdX3H" 
        }
    ];

    let selectedMovieName = "";
    let selectedMoviePrice = 0;
    let selectedShowtime = "";

    const currentDateDisplay = document.getElementById("currentDateDisplay");
    const movieGrid = document.getElementById("movieGrid");
    const checkoutSection = document.getElementById("checkoutSection");
    const successSection = document.getElementById("successSection");
    const movieSelectionSec = document.getElementById("movieSelection");

    const summaryMovie = document.getElementById("summaryMovie");
    const summaryTime = document.getElementById("summaryTime");
    const summaryPrice = document.getElementById("summaryPrice");

    // Modal elements
    const trailerModal = document.getElementById("trailerModal");
    const modalMovieTitle = document.getElementById("modalMovieTitle");
    const trailerIframe = document.getElementById("trailerIframe");
    const closeModalBtn = document.getElementById("closeModalBtn");

    function initScheduleDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        if (currentDateDisplay) {
            currentDateDisplay.textContent = today.toLocaleDateString("en-US", options) + " (Synced with Legend Daily Feed)";
        }
    }

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
                <button class="btn-primary select-movie-btn" data-movie="${movie.title}" data-price="${movie.price}" data-time="${movie.time}">Select Showtime</button>
                <button class="btn-secondary-outline watch-trailer-btn" data-title="${movie.title}" data-url="${movie.trailerUrl}">Watch Trailer 🎬</button>
            `;
            movieGrid.appendChild(card);
        });

        // Attach event listeners for showtime selection
        document.querySelectorAll(".select-movie-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                selectedMovieName = e.target.getAttribute("data-movie");
                selectedMoviePrice = e.target.getAttribute("data-price");
                selectedShowtime = e.target.getAttribute("data-time");

                summaryMovie.textContent = selectedMovieName;
                summaryTime.textContent = selectedShowtime;
                summaryPrice.textContent = selectedMoviePrice;

                movieSelectionSec.classList.remove("active");
                checkoutSection.classList.remove("hidden");
                checkoutSection.classList.add("active");
            });
        });

        // Attach event listeners for trailer popup
        document.querySelectorAll(".watch-trailer-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const title = e.target.getAttribute("data-title");
                const url = e.target.getAttribute("data-url");

                modalMovieTitle.textContent = `${title} - Official Trailer`;
                trailerIframe.src = url;
                trailerModal.classList.remove("hidden");
            });
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        initScheduleDate();
        renderMovies();

        // Close Modal Handler
        if (closeModalBtn) {
            closeModalBtn.addEventListener("click", () => {
                trailerIframe.src = ""; // Stop video playback
                trailerModal.classList.add("hidden");
            });
        }

        // Close modal when clicking outside content box
        if (trailerModal) {
            trailerModal.addEventListener("click", (e) => {
                if (e.target === trailerModal) {
                    trailerIframe.src = "";
                    trailerModal.classList.add("hidden");
                }
            });
        }

        const backBtn = document.getElementById("backToMovies");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                checkoutSection.classList.remove("active");
                checkoutSection.classList.add("hidden");
                movieSelectionSec.classList.add("active");
            });
        }

        // Payment tab switching
        const payTabs = document.querySelectorAll(".pay-tab");
        const payContents = document.querySelectorAll(".pay-content");
        payTabs.forEach(tab => {
            tab.addEventListener("click", (e) => {
                payTabs.forEach(t => t.classList.remove("active"));
                payContents.forEach(c => c.classList.remove("active"));
                e.target.classList.add("active");
                document.getElementById(e.target.getAttribute("data-target")).classList.add("active");
            });
        });

        const payCardBtn = document.getElementById("payCardBtn");
        const payQrBtn = document.getElementById("payQrBtn");
        const resetBookingBtn = document.getElementById("resetBookingBtn");

        if (payCardBtn) {
            payCardBtn.addEventListener("click", () => {
                const cardNumber = document.getElementById("cardNumber").value;
                if (!cardNumber || cardNumber.length < 12) {
                    alert("Please enter a valid Visa or Mastercard number.");
                    return;
                }
                finalizeCheckout();
            });
        }

        if (payQrBtn) {
            payQrBtn.addEventListener("click", finalizeCheckout);
        }

        if (resetBookingBtn) {
            resetBookingBtn.addEventListener("click", () => {
                successSection.classList.remove("active");
                movieSelectionSec.classList.add("active");
            });
        }
    });

    function finalizeCheckout() {
        checkoutSection.classList.remove("active");
        checkoutSection.classList.add("hidden");
        successSection.classList.add("active");
    }

})();
