// Ensure the code runs only after the HTML document has fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Utility: get tasks array from localStorage (returns Array)
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem("tasks") || "[]");
    }

    // Utility: save tasks array to localStorage
    function saveTasksArray(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Create a single task <li> element and append to DOM
    // If save === true, the caller expects the task to be stored in localStorage as well.
    function addTask(taskText, save = true) {
        // defensive trim
        const text = String(taskText).trim();
        if (text === "") {
            if (save) alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement("li");
        li.textContent = text;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn"); // required by checker

        // Remove handler: remove from DOM and update localStorage
        removeBtn.addEventListener("click", () => {
            // Remove from DOM
            if (li.parentNode === taskList) taskList.removeChild(li);

            // Remove from localStorage array
            const tasks = getStoredTasks();
            // Remove first matching taskText — keeps simple behavior
            const index = tasks.indexOf(text);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasksArray(tasks);
            }
        });

        // Append button and li to DOM
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Optionally save to localStorage
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(text);
            saveTasksArray(tasks);
        }
    }

    // Load tasks from localStorage and render them (do not re-save)
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Handler when user clicks add or presses Enter
    function handleAddFromInput() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText, true);
        taskInput.value = "";
        taskInput.focus();
    }

    // Attach event listeners
    addButton.addEventListener("click", handleAddFromInput);

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleAddFromInput();
        }
    });

    // Load persisted tasks on start
    loadTasks();
});
