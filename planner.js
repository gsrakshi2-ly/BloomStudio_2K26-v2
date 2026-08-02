function addTask(){

    let input = document.getElementById("taskInput");

    let task = input.value.trim();

    if(task==="") return;

    let li = document.createElement("li");

    li.innerHTML = `
        ${task}
        <button onclick="this.parentElement.remove()">
            ❌
        </button>
    `;

    document.getElementById("taskList").appendChild(li);

    input.value="";

}