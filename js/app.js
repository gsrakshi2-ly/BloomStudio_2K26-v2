// ================================
// BLOOM STUDIO
// app.js
// ================================

function updateClock() {

    const now = new Date();

    // -------------------
    // Clock
    // -------------------

    const clock = document.getElementById("clock");

    if (clock) {
        clock.textContent = now.toLocaleTimeString();
    }

    // -------------------
    // Date
    // -------------------

    const date = document.getElementById("date");

    if (date) {
        date.textContent = now.toDateString();
    }

    // -------------------
    // Greeting
    // -------------------

    const greeting = document.getElementById("greeting");

    if (greeting) {

        const hour = now.getHours();

        let message = "";

        if (hour < 12) {

            message = "🌸 Good Morning";

        } else if (hour < 17) {

            message = "☀️ Good Afternoon";

        } else if (hour < 20) {

            message = "🌅 Good Evening";

        } else {

            message = "🌙 Good Night";

        }

        greeting.textContent = message;
    }

}

// Update immediately
updateClock();

// Update every second
setInterval(updateClock, 1000);