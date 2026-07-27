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
            title: "Dune: Part Two",
            genre: "Sci-Fi / Adventure • 2h 46m",
            price: 7.50,
            icon: "🏜️",
            time: "01:15 PM",
            trailerUrl: "https://youtu.be/Way9Dexny3w"
        },
        {
            title: "Inside Out 2",
            genre: "Animation / Family • 1h 36m",
            price: 5.50,
            icon: "🧠",
            time: "03:00 PM",
            trailerUrl: "https://youtu.be/LEjhY15eCx0"
        },
        {
            title: "Deadpool & Wolverine",
            genre: "Action / Comedy • 2h 08m",
            price: 7.00,
            icon: "⚔️",
            time: "04:45 PM",
            trailerUrl: "https://youtu.be/73_1biulk6s"
        },
        {
            title: "Alien: Romulus",
            genre: "Horror / Sci-Fi • 1h 59m",
            price: 6.50,
            icon: "👾",
            time: "08:15 PM",
            trailerUrl: "https://youtu.be/x0XDEhP4MQs"
        },
        {
            title: "The Batman II",
            genre: "Action / Crime • 2h 50m",
            price: 7.50,
            icon: "🦇",
            time: "09:30 PM",
            trailerUrl: "https://youtu.be/mqqft2x_Aa4"
        },
        {
            title: "Interstellar (Re-Release)",
            genre: "Sci-Fi / Drama • 2h 49m",
            price: 6.00,
            icon: "🚀",
            time: "10:00 PM",
            trailerUrl: "https://youtu.be/zSWdZVtXT7E"
        },
        {
            title: "Kung Fu Panda 4",
            genre: "Animation / Action • 1h 34m",
            price: 5.00,
            icon: "🐼",
            time: "11:30 AM",
            trailerUrl: "https://youtu.be/_inKs4eeHiI"
        }
        {
            title: "Gladiator II",
            genre: "Action / Drama • 2h 28m",
            price: 7.00,
            icon: "⚔️",
            time: "10:30 AM",
            trailerUrl: "https://youtu.be/4mgU8803328"
        },
        {
            title: "Wicked",
            genre: "Fantasy / Musical • 2h 40m",
            price: 6.50,
            icon: "🧹",
            time: "11:15 AM",
            trailerUrl: "https://youtu.be/6COmYeLsz4c"
        },
        {
            title: "Moana 2",
            genre: "Animation / Adventure • 1h 40m",
            price: 5.50,
            icon: "🌊",
            time: "01:30 PM",
            trailerUrl: "https://youtu.be/hDZ7y8RP5HE"
        },
        {
            title: "Beetlejuice Beetlejuice",
            genre: "Comedy / Horror • 1h 44m",
            price: 6.00,
            icon: "🧌",
            time: "02:45 PM",
            trailerUrl: "https://youtu.be/CoZqL9N6Rx4"
        },
        {
            title: "Godzilla x Kong: The New Empire",
            genre: "Action / Sci-Fi • 1h 55m",
            price: 6.50,
            icon: "🦍",
            time: "04:15 PM",
            trailerUrl: "https://youtu.be/lV1OOlGwExM"
        },
        {
            title: "Kingdom of the Planet of the Apes",
            genre: "Sci-Fi / Action • 2h 25m",
            price: 6.50,
            icon: "🦧",
            time: "05:30 PM",
            trailerUrl: "https://youtu.be/XtFI7SNtVpY"
        },
        {
            title: "Twisters",
            genre: "Action / Thriller • 2h 02m",
            price: 6.00,
            icon: "🌪️",
            time: "06:45 PM",
            trailerUrl: "https://youtu.be/J9qI-C-E1v4"
        },
        {
            title: "Despicable Me 4",
            genre: "Animation / Comedy • 1h 35m",
            price: 5.50,
            icon: "🍌",
            time: "07:15 PM",
            trailerUrl: "https://youtu.be/qQlr9-rF32E"
        },
        {
            title: "A Quiet Place: Day One",
            genre: "Horror / Sci-Fi • 1h 39m",
            price: 6.00,
            icon: "🤫",
            time: "08:45 PM",
            trailerUrl: "https://youtu.be/YPY7J-lS8Lk"
        },
        {
            title: "Furiosa: A Mad Max Saga",
            genre: "Action / Sci-Fi • 2h 28m",
            price: 7.00,
            icon: "🔥",
            time: "09:45 PM",
            trailerUrl: "https://youtu.be/XJMuhwVlca4"
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
        },
        {
            title: "The Clock: Spirits Awakening (នាឡិកាដាស់ព្រលឹង)",
            genre: "Horror / Mystery • 1h 50m",
            price: 5.00,
            icon: "⏰",
            time: "03:15 PM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
        },
        {
            title: "Tenement (អ្នកស្នងអគារ)",
            genre: "Horror / Psychological • 1h 35m",
            price: 5.50,
            icon: "🏢",
            time: "05:00 PM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
        },
        {
            title: "The Night Curse of Reatrei (បណ្ដាសានាងរាត្រី)",
            genre: "Horror / Mystery • 1h 42m",
            price: 5.00,
            icon: "🕯️",
            time: "06:45 PM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
        },
        {
            title: "Ghost Banana Tree (ខ្មោចដើមចេកជ្វា)",
            genre: "Classic Horror • 2h 00m",
            price: 4.50,
            icon: "🍌",
            time: "08:15 PM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
        },
        {
            title: "The Haunted House (ផ្ទះខ្មោចទិញ)",
            genre: "Horror / Urban Legend • 1h 55m",
            price: 4.50,
            icon: "🏚️",
            time: "09:30 PM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
        },
        {
            title: "The Ritual (ធ្មប់)",
            genre: "Supernatural / Thriller • 1h 45m",
            price: 5.00,
            icon: "🔮",
            time: "10:15 PM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
        },
        {
            title: "Mind Cage (សតិជាប់ទ្រុង)",
            genre: "Psychological Thriller • 1h 38m",
            price: 5.00,
            icon: "🧠",
            time: "11:00 PM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
        },
        {
            title: "Lady Vampire / Nieng Arp (អាប)",
            genre: "Folklore / Horror • 1h 50m",
            price: 4.50,
            icon: "🩸",
            time: "11:45 PM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
        },
        {
            title: "The Snake King's Child (កូនពស់កេងកង)",
            genre: "Dark Fantasy / Horror • 2h 05m",
            price: 4.50,
            icon: "🐍",
            time: "12:30 AM",
            trailerUrl: "https://youtu.be/zMcULtxq76s"
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
