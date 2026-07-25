/* ========================================================= 
   PHASE 13: LEGEND CINEMA TICKETING CONTROLLER
========================================================= */

(() => {
    "use strict";

    // State Variables
    let selectedMovieName = "";
    let selectedMoviePrice = 0;

    // DOM Elements
    const movieSelectionSec = document.getElementById("movieSelection");
    const checkoutSection = document.getElementById("checkoutSection");
    const successSection = document.getElementById("successSection");

    const summaryMovie = document.getElementById("summaryMovie");
    const summaryPrice = document.getElementById("summaryPrice");

    const selectMovieBtns = document.querySelectorAll(".select-movie-btn");
    const backToMoviesBtn = document.getElementById("backToMovies");
    const payTabs = document.querySelectorAll(".pay-tab");
    const payContents = document.querySelectorAll(".pay-content");

    const payCardBtn = document.getElementById("payCardBtn");
    const payQrBtn = document.getElementById("payQrBtn");
    const resetBookingBtn = document.getElementById("resetBookingBtn");

    // 1. Handle Movie Selection
    selectMovieBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".movie-card");
            selectedMovieName = card.getAttribute("data-movie");
            selectedMoviePrice = card.getAttribute("data-price");

            // Update Summary View
            summaryMovie.textContent = selectedMovieName;
            summaryPrice.textContent = selectedMoviePrice;

            // Switch Sections
            movieSelectionSec.classList.remove("active");
            checkoutSection.classList.remove("hidden");
            checkoutSection.classList.add("active");
        });
    });

    // 2. Navigation Back
    backToMoviesBtn.addEventListener("click", () => {
        checkoutSection.classList.remove("active");
        checkoutSection.classList.add("hidden");
        movieSelectionSec.classList.add("active");
    });

    // 3. Payment Method Tabs Switching (Card vs QR)
    payTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            payTabs.forEach(t => t.classList.remove("active"));
            payContents.forEach(c => c.classList.remove("active"));

            e.target.classList.add("active");
            const targetId = e.target.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
        });
    });

    // 4. Simulate Credit Card Payment (Visa/Mastercard)
    payCardBtn.addEventListener("click", () => {
        const cardNumber = document.getElementById("cardNumber").value;
        if (!cardNumber || cardNumber.length < 12) {
            alert("Please enter a valid Visa or Mastercard number.");
            return;
        }
        processSuccessfulPayment();
    });

    // 5. Simulate QR Scan Payment
    payQrBtn.addEventListener("click", () => {
        processSuccessfulPayment();
    });

    // Finalize Transaction Flow
    function processSuccessfulPayment() {
        checkoutSection.classList.remove("active");
        checkoutSection.classList.add("hidden");
        successSection.classList.add("active");
    }

    // Reset Booking Flow
    resetBookingBtn.addEventListener("click", () => {
        successSection.classList.remove("active");
        movieSelectionSec.classList.add("active");
    });

})();
