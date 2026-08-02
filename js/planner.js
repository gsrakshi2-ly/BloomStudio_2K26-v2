// ======================================
// BLOOM STUDIO
// Planner.js
// ======================================

// ------------------------------
// Start Planner
// ------------------------------

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

// ------------------------------
// Add Task
// ------------------------------

function addTask() {

    const input = document.getElementById("taskInput");

    if (!input) return;

    const taskText = input.value.trim();

    if (taskText === "") return;

    const tasks = getTasks();

    tasks.push({

        text: taskText,
        completed: false

    });

    saveTasks(tasks);

    input.value = "";

    loadTasks();

}

// ------------------------------
// Load Tasks
// ------------------------------

function loadTasks() {

    const taskList = document.getElementById("taskList");

    if (!taskList) return;

    taskList.innerHTML = "";

    const tasks = getTasks();

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `

            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div>

                <button onclick="toggleTask(${index})">
                    ✅
                </button>

                <button onclick="deleteTask(${index})">
                    ❌
                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}

// ------------------------------
// Complete Task
// ------------------------------

function toggleTask(index) {

    const tasks = getTasks();

    tasks[index].completed = !tasks[index].completed;

    saveTasks(tasks);

    loadTasks();

}

// ------------------------------
// Delete Task
// ------------------------------

function deleteTask(index) {

    const tasks = getTasks();

    tasks.splice(index, 1);

    saveTasks(tasks);

    loadTasks();

}

// ------------------------------
// Local Storage Helpers
// ------------------------------

function getTasks() {

    return JSON.parse(localStorage.getItem("tasks")) || [];

}

function saveTasks(tasks) {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}