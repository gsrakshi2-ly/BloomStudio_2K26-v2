
"use strict";

const Bloom = {

    version: "5.0",

    taskKey: "BloomTasks",

    journalKey: "BloomJournal",

    themeKey: "BloomTheme",

    boardKey: "BloomBoard",

    canvasKey: "BloomCanvas"

};


const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);

function showToast(message){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },20);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },400);

    },2500);

}

function updateGreeting(){

    const hour = new Date().getHours();

    let text;

    if(hour < 12){

        text = "Good Morning 🌸";

    }

    else if(hour < 18){

        text = "Good Afternoon 🌿";

    }

    else{

        text = "Good Evening ✨";

    }

    const greeting = $("#greeting");

    if(greeting){

        greeting.innerHTML = text + ", Creator 💗";

    }

}

function updateDate(){

    const today = new Date();

    const options = {

        weekday:"long",

        year:"numeric",

        month:"long",

        day:"numeric"

    };

    const box = $("#today-date");

    if(box){

        box.innerHTML =
        "📅 " +
        today.toLocaleDateString(
            "en-US",
            options
        );

    }

}

function setupNavigation(){

    const buttons = $$(".nav-item");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            buttons.forEach(item=>{

                item.classList.remove("active");

            });

            button.classList.add("active");

            const target =
            button.textContent
            .trim()
            .toLowerCase()
            .replace(/\s+/g,"-");

            const section =
            document.getElementById(target);

            if(section){

                section.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

}

function setupHeroButton(){

    const button =
    $(".hero .primary-btn");

    if(!button) return;

    button.addEventListener("click",()=>{

        $("#planner").scrollIntoView({

            behavior:"smooth"

        });

    });

}

function loadTheme(){

    const theme =
    localStorage.getItem(
        Bloom.themeKey
    );

    if(theme==="dark"){

        document.body.classList.add(
            "dark"
        );

    }

}

function setTheme(mode){

    if(mode==="dark"){

        document.body.classList.add(
            "dark"
        );

    }

    else{

        document.body.classList.remove(
            "dark"
        );

    }

    localStorage.setItem(
        Bloom.themeKey,
        mode
    );

}

function setupThemeButtons(){

    const buttons =
    $$(".setting-item button");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            if(button.textContent.includes("Dark")){

                setTheme("dark");

                showToast(
                    "🌙 Dark Mode Enabled"
                );

            }

            else if(button.textContent.includes("Light")){

                setTheme("light");

                showToast(
                    "☀️ Light Mode Enabled"
                );

            }

        });

    });

}

function setupMusic(){

    const buttons =
    $$(".music-btn");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            if(button.textContent.includes("Play")){

                button.textContent =
                "⏸ Pause";

            }

            else{

                button.textContent =
                "▶ Play";

            }

        });

    });

}

document.addEventListener(
"DOMContentLoaded",
()=>{

    updateGreeting();

    updateDate();

    setupNavigation();

    setupHeroButton();

    loadTheme();

    setupThemeButtons();

    setupMusic();

    setInterval(updateGreeting,60000);

    console.log(
        "🌸 Bloom Studio v5.0 Loaded"
    );

});

let tasks = JSON.parse(
    localStorage.getItem(Bloom.taskKey)
) || [];

const taskInput = $("#task-input");
const addTaskBtn = $("#add-task");
const taskList = $("#task-list");
const progressFill = $("#progress-fill");
const progressText = $("#progress-text");

function saveTasks(){

    localStorage.setItem(
        Bloom.taskKey,
        JSON.stringify(tasks)
    );

}


function updatePlannerProgress(){

    if(!progressFill || !progressText) return;

    const completed =
    tasks.filter(task=>task.done).length;

    const percent =
    tasks.length===0
    ?0
    :Math.round(
        completed/tasks.length*100
    );

    progressFill.style.width =
    percent+"%";

    progressText.textContent =
    percent+"% Completed 🌸";

}

function renderTasks(){

    if(!taskList) return;

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        const li =
        document.createElement("li");

        li.className="task-item";

        if(task.done){

            li.classList.add("completed");

        }

        li.innerHTML=`

        <span>${task.text}</span>

        <div class="task-buttons">

            <button class="complete-btn">
            ✓
            </button>

            <button class="delete-btn">
            🗑
            </button>

        </div>

        `;

        li.querySelector(".complete-btn")
        .addEventListener("click",()=>{

            tasks[index].done=
            !tasks[index].done;

            saveTasks();

            renderTasks();

        });

        li.querySelector(".delete-btn")
        .addEventListener("click",()=>{

            tasks.splice(index,1);

            saveTasks();

            renderTasks();

            showToast(
                "🗑 Task Deleted"
            );

        });

        taskList.appendChild(li);

    });

    updatePlannerProgress();

}

function addTask(){

    if(!taskInput) return;

    const text=
    taskInput.value.trim();

    if(text===""){

        showToast(
        "Please enter a task."
        );

        return;

    }

    tasks.push({

        text:text,

        done:false,

        created:new Date().toISOString()

    });

    taskInput.value="";

    saveTasks();

    renderTasks();

    showToast(
        "🌸 Task Added!"
    );

}

if(taskInput){

taskInput.addEventListener(
"keypress",
e=>{

if(e.key==="Enter"){

addTask();

}

});

}

if(addTaskBtn){

addTaskBtn.addEventListener(
"click",
addTask
);

}


renderTasks();

const journalBox =
$(".journal-container textarea");

const journalSave =
$(".journal-container .primary-btn");


function loadJournal(){

if(!journalBox) return;

journalBox.value=

localStorage.getItem(
Bloom.journalKey
)||"";

}

function saveJournal(){

if(!journalBox) return;

localStorage.setItem(

Bloom.journalKey,

journalBox.value

);

showToast(

"📖 Journal Saved"

);

}

if(journalBox){

journalBox.addEventListener(

"input",

()=>{

localStorage.setItem(

Bloom.journalKey,

journalBox.value

);

}

);

}

if(journalSave){

journalSave.addEventListener(

"click",

saveJournal

);

}

loadJournal();

const canvas = $("#drawing-canvas");

if(canvas){

    const ctx = canvas.getContext("2d");

    let drawing = false;
    let erasing = false;
    let brushSize = 5;

    function saveCanvas(){

        localStorage.setItem(
            Bloom.canvasKey,
            canvas.toDataURL()
        );

    }

    function loadCanvas(){

        const data =
        localStorage.getItem(
            Bloom.canvasKey
        );

        if(!data) return;

        const image = new Image();

        image.onload = () => {

            ctx.drawImage(
                image,
                0,
                0
            );

        };

        image.src = data;

    }

    loadCanvas();

    canvas.addEventListener("mousedown",(e)=>{

        drawing = true;

        ctx.beginPath();

        ctx.moveTo(
            e.offsetX,
            e.offsetY
        );

    });

    canvas.addEventListener("mousemove",(e)=>{

        if(!drawing) return;

        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";

        ctx.strokeStyle =
        erasing
        ? "#ffffff"
        : "#d85b91";

        ctx.lineTo(
            e.offsetX,
            e.offsetY
        );

        ctx.stroke();

    });

    canvas.addEventListener("mouseup",()=>{

        drawing = false;

        saveCanvas();

    });

    canvas.addEventListener("mouseleave",()=>{

        drawing = false;

    });

    $("#brush-size")?.addEventListener(
        "input",
        e=>{

            brushSize =
            Number(e.target.value);

        }
    );

    $("#pencil-tool")?.addEventListener(
        "click",
        ()=>{

            erasing = false;

            showToast(
                "✏ Pencil Selected"
            );

        }
    );

    $("#eraser-tool")?.addEventListener(
        "click",
        ()=>{

            erasing = true;

            showToast(
                "🧽 Eraser Selected"
            );

        }
    );

    $("#clear-canvas")?.addEventListener(
        "click",
        ()=>{

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            localStorage.removeItem(
                Bloom.canvasKey
            );

            showToast(
                "🗑 Canvas Cleared"
            );

        }
    );

    $("#save-canvas")?.addEventListener(
        "click",
        ()=>{

            const link =
            document.createElement("a");

            link.download =
            "Bloom-Studio-Art.png";

            link.href =
            canvas.toDataURL();

            link.click();

            showToast(
                "💾 Drawing Saved"
            );

        }
    );

}

const boardGrid = $("#board-grid");

function saveBoard(){

    if(!boardGrid) return;

    localStorage.setItem(

        Bloom.boardKey,

        boardGrid.innerHTML

    );

}

function loadBoard(){

    if(!boardGrid) return;

    boardGrid.innerHTML =

    localStorage.getItem(

        Bloom.boardKey

    ) || "";

}

loadBoard();

function createDeleteButton(card){

    const btn =
    document.createElement("button");

    btn.className =
    "delete-board-item";

    btn.textContent =
    "🗑 Remove";

    btn.onclick = ()=>{

        card.remove();

        saveBoard();

    };

    card.appendChild(btn);

}

$("#image-upload")?.addEventListener(
"change",
e=>{

    const file =
    e.target.files[0];

    if(!file) return;

    const reader =
    new FileReader();

    reader.onload = ()=>{

        const card =
        document.createElement("div");

        card.className =
        "board-item";

        card.innerHTML =

        `<img src="${reader.result}">`;

        createDeleteButton(card);

        boardGrid.appendChild(card);

        saveBoard();

        showToast(
            "🖼 Image Added"
        );

    };

    reader.readAsDataURL(file);

});

$("#add-note")?.addEventListener(
"click",
()=>{

    const input =
    $("#note-input");

    if(!input.value.trim()) return;

    const card =
    document.createElement("div");

    card.className =
    "board-item";

    card.innerHTML =

    `<p>${input.value}</p>`;

    createDeleteButton(card);

    boardGrid.appendChild(card);

    input.value="";

    saveBoard();

    showToast(
        "📝 Note Added"
    );

});

$("#add-color")?.addEventListener(
"click",
()=>{

    const color =
    $("#color-picker").value;

    const card =
    document.createElement("div");

    card.className =
    "board-item";

    card.innerHTML =

    `<div class="color-preview"
    style="background:${color};"></div>

    <p>${color}</p>`;

    createDeleteButton(card);

    boardGrid.appendChild(card);

    saveBoard();

    showToast(
        "🎨 Colour Added"
    );

});

const academy =
$$(".academy-level");

academy.forEach(level=>{

    level.addEventListener(
    "click",
    ()=>{

        academy.forEach(item=>{

            item.classList.remove(
                "active"
            );

        });

        level.classList.add(
            "active"
        );

        const title =
        level.querySelector("h3")
        .textContent;

        showToast(

            "📚 " +
            title +
            " Selected"

        );

    });

});

function setupMusicPlayer(){

    const buttons = document.querySelectorAll(".music-btn");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            if(button.dataset.playing==="true"){

                button.dataset.playing="false";
                button.textContent="▶ Play";

                showToast("⏸ Music Paused");

            }

            else{

                buttons.forEach(btn=>{

                    btn.dataset.playing="false";
                    btn.textContent="▶ Play";

                });

                button.dataset.playing="true";
                button.textContent="⏸ Pause";

                showToast("🎵 Music Started");

            }

        });

    });

}

let pet = JSON.parse(localStorage.getItem("BloomPet")) || {
    level:1,
    happiness:3,
    energy:4
};

const petButtons=document.querySelectorAll(".pet-info .primary-btn");
const petInfo=document.querySelector(".pet-info");

function savePet(){

    localStorage.setItem("BloomPet",JSON.stringify(pet));

}

function renderPet(){

    if(!petInfo) return;

    petInfo.innerHTML=`
        <h3>Luna the Bloom Cat</h3>

        <p>Level: ${pet.level} 🌱</p>

        <p>Happiness:
        ${"⭐".repeat(pet.happiness)}
        ${"☆".repeat(5-pet.happiness)}
        </p>

        <p>Energy:
        ${"⭐".repeat(pet.energy)}
        ${"☆".repeat(5-pet.energy)}
        </p>

        <button class="primary-btn" id="feed-pet">
        Feed 🍎
        </button>

        <button class="primary-btn" id="play-pet">
        Play 🎾
        </button>
    `;

    document.getElementById("feed-pet").onclick=()=>{

        pet.happiness=Math.min(5,pet.happiness+1);

        if(pet.happiness===5){

            pet.level++;

        }

        savePet();

        renderPet();

        showToast("🍎 Luna enjoyed the food!");

    };

    document.getElementById("play-pet").onclick=()=>{

        pet.energy=Math.min(5,pet.energy+1);

        savePet();

        renderPet();

        showToast("🎾 Luna loved playing!");

    };

}

renderPet();

const assistantMessages={
    "📚 Study Help":"Let's create a study plan together!",
    "🎨 Design Mentor":"Practice one sketch every day.",
    "💡 Ideas":"Try designing your dream bedroom today.",
    "🌱 Motivation":"Every masterpiece starts with one line."
};

document.querySelectorAll(".assistant-options button").forEach(button=>{

    button.addEventListener("click",()=>{

        const reply=document.createElement("p");

        reply.className="assistant-reply";

        reply.textContent=
        assistantMessages[button.textContent] ||
        "I'm here to help you!";

        const content=document.querySelector(".assistant-content");

        const old=document.querySelector(".assistant-reply");

        if(old){

            old.remove();

        }

        content.appendChild(reply);

    });

});

function updateJourney(){

    const cards=document.querySelectorAll(".journey-card p");

    if(cards.length<4) return;

    cards[0].textContent=
    tasks.length+" Tasks";

    cards[1].textContent=
    document.querySelector(".academy-level.active h3").textContent;

    cards[2].textContent=
    document.querySelectorAll(".board-item").length+" Designs";

    cards[3].textContent=
    "Level "+pet.level;

}

setInterval(updateJourney,2000);

document.querySelectorAll(".setting-item input").forEach(input=>{

    const key="setting-"+input.parentElement.textContent.trim();

    input.checked=
    localStorage.getItem(key)==="true";

    input.addEventListener("change",()=>{

        localStorage.setItem(
            key,
            input.checked
        );

        showToast("⚙ Settings Updated");

    });

});

function welcomePopup(){

    const today=
    new Date().toDateString();

    const saved=
    localStorage.getItem("BloomWelcome");

    if(saved!==today){

        showToast("🌸 Welcome back to Bloom Studio!");

        localStorage.setItem(
            "BloomWelcome",
            today
        );

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    setupMusicPlayer();

    renderPet();

    updateJourney();

    welcomePopup();

    console.log("🌸 Bloom Studio v5.0 Ready!");

});