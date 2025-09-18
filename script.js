let input = document.querySelector("#input");
let container = document.querySelector("#container");
let task = [];
let currentSortMode = localStorage.getItem("sortMode") || null;
let sortBtn = document.querySelector("#sorting-btn");

// Set initial button text
if (currentSortMode === "asc_alpha") {
  sortBtn.innerText = "Z - A";
} else if (currentSortMode === "desc_alpha") {
  sortBtn.innerText = "A - Z";
} else {
  sortBtn.innerText = "A - Z";
}

// Load tasks from localStorage
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  const parsed = JSON.parse(storedTasks);
  parsed.forEach((text) => {
    let AppendContainer = document.createElement("div");
    let txtGettingDiv = document.createElement("div");
    txtGettingDiv.innerText = text; // Temporary without num
    txtGettingDiv.classList.add("txtGettingDiv");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete Task";
    deleteBtn.classList.add("deleteBtn");
    AppendContainer.appendChild(txtGettingDiv);
    AppendContainer.appendChild(deleteBtn);
    AppendContainer.classList.add("AppendContainer");
    task.push({ text, element: AppendContainer });

    // Add delete listener
    deleteBtn.addEventListener("click", (evt) => {
      const taskIndex = task.findIndex((t) => t.element === AppendContainer);
      if (taskIndex !== -1) {
        task.splice(taskIndex, 1);
      }
      AppendContainer.remove();
      // Re-sort if in sorted mode
      if (currentSortMode === "asc_alpha") {
        task.sort((a, b) => a.text.localeCompare(b.text));
      } else if (currentSortMode === "desc_alpha") {
        task.sort((a, b) => b.text.localeCompare(a.text));
      }
      // Re-append remaining tasks
      task.forEach((t) => container.appendChild(t.element));
      assignNums();
      updateTasksCount();
      saveTasks();
    });
  });

  // Apply saved sort mode
  if (currentSortMode === "asc_alpha") {
    task.sort((a, b) => a.text.localeCompare(b.text));
  } else if (currentSortMode === "desc_alpha") {
    task.sort((a, b) => b.text.localeCompare(a.text));
  }

  // Append tasks to container
  task.forEach((t) => container.appendChild(t.element));

  // Assign sequence numbers
  assignNums();

  // Update task count
  updateTasksCount();
}

// Function to assign sequence numbers in ascending order based on current display
function assignNums() {
  task.forEach((t, i) => {
    t.element.firstChild.innerText = `${t.text} : ${i + 1}`;
  });
}

// Function to update task count
function updateTasksCount() {
  document.querySelector(".tasks-Div").innerText = `Tasks ${task.length}`;
}

// Function to save tasks and sort mode
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(task.map((t) => t.text)));
  localStorage.setItem("sortMode", currentSortMode);
}

// Add task on Enter key
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (input.value === "") return;

    let inputValue = input.value.trim();
    if (inputValue.length >= 21) {
      alert("Please Remove Symbols & Character should be less than 20");
      return;
    }
    for (let items of inputValue) {
      if (
        items == "~" ||
        items == "!" ||
        items == "@" ||
        items == "#" ||
        items == "$" ||
        items == "%" ||
        items == "^" ||
        items == "&" ||
        items == "*" ||
        items == "(" ||
        items == ")" ||
        items == "-" ||
        items == "+" ||
        items == "=" ||
        items == "[" ||
        items == "]" ||
        items == "|" ||
        items == ":" ||
        items == ";" ||
        items == "'" ||
        items == "," ||
        items == "/" ||
        items == ";"
      ) {
        alert("Please Remove Symbols & Character should be less than 20");
        return;
      }
    }
    let AppendContainer = document.createElement("div");
    let txtGettingDiv = document.createElement("div");
    txtGettingDiv.innerText = inputValue; // Temporary without num
    txtGettingDiv.classList.add("txtGettingDiv");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete Task";
    deleteBtn.classList.add("deleteBtn");
    AppendContainer.appendChild(txtGettingDiv);
    AppendContainer.appendChild(deleteBtn);
    AppendContainer.classList.add("AppendContainer");

    task.push({ text: inputValue, element: AppendContainer });

    // Sort if in sorted mode (inserts new task in correct position)
    if (currentSortMode === "asc_alpha") {
      task.sort((a, b) => a.text.localeCompare(b.text));
    } else if (currentSortMode === "desc_alpha") {
      task.sort((a, b) => b.text.localeCompare(a.text));
    }

    // Append all tasks (reorders if sorted)
    task.forEach((t) => container.appendChild(t.element));

    // Assign sequence numbers
    assignNums();

    // Update task count
    updateTasksCount();

    // Save to localStorage
    saveTasks();

    // Add delete listener
    deleteBtn.addEventListener("click", (evt) => {
      const taskIndex = task.findIndex((t) => t.element === AppendContainer);
      if (taskIndex !== -1) {
        task.splice(taskIndex, 1);
      }
      AppendContainer.remove();
      // Re-sort if in sorted mode
      if (currentSortMode === "asc_alpha") {
        task.sort((a, b) => a.text.localeCompare(b.text));
      } else if (currentSortMode === "desc_alpha") {
        task.sort((a, b) => b.text.localeCompare(a.text));
      }
      // Re-append remaining tasks
      task.forEach((t) => container.appendChild(t.element));
      assignNums();
      updateTasksCount();
      saveTasks();
    });

    input.value = ""; // Clear input
  }
});

// Sorting button logic (alphabetical sorting)
sortBtn.addEventListener("click", () => {
  if (task.length <= 1) return;

  if (sortBtn.innerText === "A - Z") {
    task.sort((a, b) => a.text.localeCompare(b.text));
    currentSortMode = "asc_alpha";
    sortBtn.innerText = "Z - A";
  } else if (sortBtn.innerText === "Z - A") {
    task.sort((a, b) => b.text.localeCompare(a.text));
    currentSortMode = "desc_alpha";
    sortBtn.innerText = "A - Z";
  }

  // Re-append in new order
  task.forEach((t) => container.appendChild(t.element));

  // Assign new sequence numbers
  assignNums();

  // Save updated state
  saveTasks();
});

// localStorage clear by button
let clearBtn = document.querySelector("#resetButton");
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
