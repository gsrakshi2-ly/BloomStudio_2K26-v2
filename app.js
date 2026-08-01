function updateClock() {

    const now = new Date();

    // Time
    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    // Date
    const date = now.toLocaleDateString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    document.getElementById("clock").textContent = "🕒 " + time;

    document.getElementById("date").textContent = "📅 " + date;

}

updateClock();

setInterval(updateClock, 1000);
