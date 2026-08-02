function updateClock() {

    const now = new Date();

    // Clock
    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();

    // Date
    document.getElementById("date").innerHTML =
        now.toDateString();

    // Greeting
    let hour = now.getHours();

    let greeting = "";

    if(hour < 12){

        greeting = "🌸 Good Morning";

    }

    else if(hour < 17){

        greeting = "☀️ Good Afternoon";

    }

    else if(hour < 20){

        greeting = "🌅 Good Evening";

    }

    else{

        greeting = "🌙 Good Night";

    }

    document.getElementById("greeting").innerHTML = greeting;

}

setInterval(updateClock,1000);

updateClock();