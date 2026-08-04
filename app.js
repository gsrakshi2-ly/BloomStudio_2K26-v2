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

/* =========================
   SMART PLANNER SYSTEM
========================= */


let tasks =
JSON.parse(
localStorage.getItem("BloomTasks")
)
||
[];




const taskInput =
document.getElementById(
"task-input"
);



const addTask =
document.getElementById(
"add-task"
);



const taskList =
document.getElementById(
"task-list"
);



const progressFill =
document.getElementById(
"progress-fill"
);



const progressText =
document.getElementById(
"progress-text"
);





function saveTasks(){

localStorage.setItem(
"BloomTasks",
JSON.stringify(tasks)
);

}






function updateProgress(){


let completed =
tasks.filter(
task=>task.done
).length;



let percent =
tasks.length
?
Math.round(
(completed/tasks.length)*100
)
:
0;



progressFill.style.width =
percent+"%";



progressText.innerHTML =
percent+
"% Completed 🌸";


}







function displayTasks(){


taskList.innerHTML="";



tasks.forEach(
(task,index)=>{


let li =
document.createElement(
"li"
);



li.className =
"task-item";



if(task.done){

li.classList.add(
"completed"
);

}



li.innerHTML = `

<span>
${task.text}
</span>


<div class="task-buttons">

<button onclick="completeTask(${index})">
✓
</button>


<button onclick="deleteTask(${index})">
🗑
</button>


</div>

`;



taskList.appendChild(li);



});



updateProgress();

}







addTask.addEventListener(
"click",
()=>{


let text =
taskInput.value.trim();



if(text){


tasks.push({

text:text,

done:false

});



taskInput.value="";


saveTasks();


displayTasks();


}


});







function completeTask(index){


tasks[index].done =
!tasks[index].done;



saveTasks();


displayTasks();


}







function deleteTask(index){


tasks.splice(
index,
1
);


saveTasks();


displayTasks();


}




displayTasks();

/* =========================
   DRAWING CANVAS
========================= */


const canvas =
document.getElementById(
"drawing-canvas"
);



if(canvas){


const ctx =
canvas.getContext("2d");



let drawing = false;

let erasing = false;

let size = 5;





canvas.addEventListener(
"mousedown",
(e)=>{

drawing=true;

ctx.beginPath();

ctx.moveTo(
e.offsetX,
e.offsetY
);

});





canvas.addEventListener(
"mousemove",
(e)=>{


if(!drawing)
return;



ctx.lineWidth=size;

ctx.lineCap="round";



if(erasing){

ctx.strokeStyle="white";

}

else{

ctx.strokeStyle="#d85b91";

}



ctx.lineTo(
e.offsetX,
e.offsetY
);



ctx.stroke();


});






canvas.addEventListener(
"mouseup",
()=>{

drawing=false;

});







document
.getElementById("brush-size")
.addEventListener(
"input",
(e)=>{

size=e.target.value;

});






document
.getElementById("eraser-tool")
.addEventListener(
"click",
()=>{

erasing=true;

});






document
.getElementById("pencil-tool")
.addEventListener(
"click",
()=>{

erasing=false;

});







document
.getElementById("clear-canvas")
.addEventListener(
"click",
()=>{


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);


});







document
.getElementById("save-canvas")
.addEventListener(
"click",
()=>{


let link =
document.createElement(
"a"
);


link.download =
"Bloom-Design.png";


link.href =
canvas.toDataURL();


link.click();


});


}