// Ensure code runs after full HTML loads
document.addEventListener("DOMContentLoaded", function () {

    // Step 1: Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Step 2: Define addTask function
    function addTask() {
        // Get and trim user input
        const taskText = taskInput.value.trim();

        // Check for empty input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create li
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task event
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Attach button and li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Step 3: Add event listeners
    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Step 4: Invoke addTask on DOMContentLoaded (per instructions)
    addTask();
});
