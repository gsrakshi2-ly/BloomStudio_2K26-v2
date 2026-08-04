/* =========================
   BLOOM STUDIO APP.JS
========================= */



// =========================
// LIVE CLOCK + GREETING
// =========================


function updateTime(){

    const now = new Date();

    let hour = now.getHours();

    let greeting;


    if(hour < 12){

        greeting = "Good Morning 🌸";

    }
    else if(hour < 18){

        greeting = "Good Afternoon 🌿";

    }
    else{

        greeting = "Good Evening ✨";

    }


    const welcome = document.querySelector(
        ".welcome-card h2"
    );


    if(welcome){

        welcome.innerHTML = greeting + ", Creator 💗";

    }

}

/* =========================
   DASHBOARD DATE SYSTEM
========================= */


function updateDashboardDate(){


    const date =
    new Date();



    const options = {

        weekday:"long",

        year:"numeric",

        month:"long",

        day:"numeric"

    };



    const formattedDate =
    date.toLocaleDateString(
        "en-US",
        options
    );



    const dateBox =
    document.getElementById(
        "today-date"
    );



    if(dateBox){

        dateBox.innerHTML =
        "📅 " + formattedDate;

    }


}



updateDashboardDate();








/* =========================
   APP NAVIGATION SYSTEM
========================= */


const sections =
document.querySelectorAll(
"main section"
);



const menuButtons =
document.querySelectorAll(
".nav-item"
);



menuButtons.forEach(
(button,index)=>{


button.addEventListener(
"click",
()=>{


    menuButtons.forEach(
    item=>{

        item.classList.remove(
            "active"
        );

    });



    button.classList.add(
        "active"
    );



    if(sections[index]){


        sections[index]
        .scrollIntoView({

            behavior:"smooth"

        });


    }



});


});


setInterval(updateTime,1000);

updateTime();








// =========================
// SIDEBAR NAVIGATION
// =========================


const navButtons =
document.querySelectorAll(".nav-item");



navButtons.forEach(button=>{


    button.addEventListener(
        "click",
        ()=>{


            navButtons.forEach(btn=>{

                btn.classList.remove("active");

            });


            button.classList.add("active");


            let name =
            button.innerText;


            console.log(
                "Opened:",
                name
            );


        }

    );


});








// =========================
// JOURNAL SAVE
// =========================


const saveButton =
document.querySelector(
".journal-container .primary-btn"
);



const journal =
document.querySelector(
".journal-container textarea"
);



if(saveButton){


saveButton.addEventListener(
"click",
()=>{


    localStorage.setItem(
        "BloomJournal",
        journal.value
    );


    alert(
        "Journal saved 🌸"
    );


});



}



window.addEventListener(
"load",
()=>{


    if(journal){


        journal.value =
        localStorage.getItem(
        "BloomJournal"
        ) || "";


    }


});








// =========================
// MUSIC BUTTONS
// =========================


const musicButtons =
document.querySelectorAll(
".music-btn"
);



musicButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


    if(button.innerHTML.includes("▶")){


        button.innerHTML =
        "⏸ Pause";


    }

    else{


        button.innerHTML =
        "▶ Play";


    }


});


});








// =========================
// BLOOM PET
// =========================


let petLevel = 1;

let happiness = 3;



const petButtons =
document.querySelectorAll(
".pet-info .primary-btn"
);



petButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


    happiness++;


    if(happiness >=5){

        petLevel++;

        happiness=0;

    }



    alert(
    "Your Bloom Pet is happy! 🐾🌸"
    );



});



});








// =========================
// THEME SWITCH
// =========================


const themeButtons =
document.querySelectorAll(
".setting-item button"
);



themeButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


    if(
    button.innerText.includes(
    "Dark"
    )
    ){


        document.body.style.background =
        "#222";


        document.body.style.color =
        "white";


    }



    else{


        document.body.style.background =
        "linear-gradient(135deg,#fff0f6,#f0fff4)";


        document.body.style.color =
        "#444";


    }



});


});








// =========================
// ASSISTANT BUTTONS
// =========================


const assistantButtons =
document.querySelectorAll(
".assistant-options button"
);



assistantButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


alert(

"Bloom Assistant 🌸\n\n" +

"I will help you with " +

button.innerText

);


});


});








// =========================
// START BUTTON
// =========================


const startButton =
document.querySelector(
".hero .primary-btn"
);



if(startButton){


startButton.addEventListener(
"click",
()=>{


document.querySelector(
"#planner"
)
.scrollIntoView(
{
behavior:"smooth"
}
);


});


}








// =========================
// WELCOME MESSAGE
// =========================


window.onload=function(){


console.log(
"🌸 Welcome to Bloom Studio!"
);


};