// Load tasks when page opens
window.onload = loadTasks;

function addTask() {

    const input = document.getElementById("taskInput");

    const task = input.value.trim();

    if (task === "") return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: task,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

    loadTasks();

}

function loadTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div>

                <button onclick="toggleTask(${index})">✅</button>

                <button onclick="deleteTask(${index})">❌</button>

            </div>
        `;

        taskList.appendChild(li);

    });

}

function toggleTask(index) {

    const tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();

}

function deleteTask(index) {

    const tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.splice(index,1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();

}