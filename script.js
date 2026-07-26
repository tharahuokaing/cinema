/* =========================================================
   PHASE 13: LEGEND CINEMA DAILY SCHEDULE & TRAILERS
========================================================= */

(() => {
    "use strict";

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

    function initScheduleDate() {
        const today = new Date();
        const options = {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
        };

        if (currentDateDisplay) {
            currentDateDisplay.textContent =
                today.toLocaleDateString("en-US", options) +
                " (Synced with Legend Daily Feed)";
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

                <p class="showtime-tag">
                    Showtime:
                    <strong>${movie.time}</strong>
                </p>

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

        // Select movie
        document.querySelectorAll(".select-movie-btn").forEach(btn => {

            btn.addEventListener("click", e => {

                selectedMovieName =
                    e.currentTarget.dataset.movie;

                selectedMoviePrice =
                    e.currentTarget.dataset.price;

                selectedShowtime =
                    e.currentTarget.dataset.time;

                summaryMovie.textContent = selectedMovieName;
                summaryTime.textContent = selectedShowtime;
                summaryPrice.textContent = selectedMoviePrice;

                movieSelectionSec.classList.remove("active");

                checkoutSection.classList.remove("hidden");
                checkoutSection.classList.add("active");

            });

        });

        // Redirect trailer to YouTube
        document.querySelectorAll(".watch-trailer-btn").forEach(btn => {

            btn.addEventListener("click", e => {

                const url = e.currentTarget.dataset.url;

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            });

        });

    }

    function finalizeCheckout() {

        checkoutSection.classList.remove("active");
        checkoutSection.classList.add("hidden");

        successSection.classList.add("active");

    }

    document.addEventListener("DOMContentLoaded", () => {

        initScheduleDate();
        renderMovies();

        // Back button
        const backBtn =
            document.getElementById("backToMovies");

        if (backBtn) {

            backBtn.addEventListener("click", () => {

                checkoutSection.classList.remove("active");
                checkoutSection.classList.add("hidden");

                movieSelectionSec.classList.add("active");

            });

        }

        // Payment tabs
        const payTabs =
            document.querySelectorAll(".pay-tab");

        const payContents =
            document.querySelectorAll(".pay-content");

        payTabs.forEach(tab => {

            tab.addEventListener("click", e => {

                payTabs.forEach(t =>
                    t.classList.remove("active"));

                payContents.forEach(c =>
                    c.classList.remove("active"));

                e.currentTarget.classList.add("active");

                document
                    .getElementById(
                        e.currentTarget.dataset.target
                    )
                    .classList.add("active");

            });

        });

        // Card payment
        const payCardBtn =
            document.getElementById("payCardBtn");

        if (payCardBtn) {

            payCardBtn.addEventListener("click", () => {

                const cardNumber =
                    document
                    .getElementById("cardNumber")
                    .value
                    .trim();

                if (cardNumber.length < 12) {

                    alert(
                        "Please enter a valid Visa or Mastercard number."
                    );

                    return;
                }

                finalizeCheckout();

            });

        }

        // QR payment
        const payQrBtn =
            document.getElementById("payQrBtn");

        if (payQrBtn) {

            payQrBtn.addEventListener(
                "click",
                finalizeCheckout
            );

        }

        // Reset booking
        const resetBookingBtn =
            document.getElementById("resetBookingBtn");

        if (resetBookingBtn) {

            resetBookingBtn.addEventListener("click", () => {

                successSection.classList.remove("active");

                movieSelectionSec.classList.add("active");

            });

        }

    });

})();