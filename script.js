let input = document.querySelector("#input");
let container = document.querySelector("#container");
let sortNum = 1;
let task = [];

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (input.value === "") return; // Condition if input value is empty

    let AppendContainer = document.createElement("div"); // Tasks Appending Container

    let txtGettingDiv = document.createElement("div"); // Text getting div
    let inputValue = input.value.trim();

    // Sorting Tasks
    txtGettingDiv.innerText = `${inputValue} : ${sortNum}`;
    task.push({ text: inputValue, num: sortNum, element: AppendContainer });
    sortNum++;
    console.log(task);

    // Styling to Input value
    txtGettingDiv.classList.add("txtGettingDiv");

    // Tasks Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete Task";
    deleteBtn.classList.add("deleteBtn");
    AppendContainer.appendChild(txtGettingDiv); // Append to container to display
    AppendContainer.appendChild(deleteBtn);

    // Appeding task to main container
    container.appendChild(AppendContainer);
    AppendContainer.classList.add("AppendContainer"); // style to AppendContainer

    // logic for delete button
    deleteBtn.addEventListener("click", () => {
      txtGettingDiv.remove();
      deleteBtn.remove();
      AppendContainer.remove();
    });

    input.value = ""; // Clear input after Enter

    let tasksCount = document.querySelector(".tasks-Div");
    tasksCount.innerText = `Tasks ${sortNum - 1}`;
  }
});

// Sorting by Button
let sortBtn = document.querySelector("#sorting-btn");
sortBtn.addEventListener("click", () => {
  if (sortBtn.innerText == "A - Z") {
    if (sortNum == 2) return;
    task.sort((a, b) => a.num - b.num);
    sortBtn.innerText = "Z - A";
  } else if (sortBtn.innerText == "Z - A") {
    if (sortNum == 2) return;
    task.sort((a, b) => b.num - a.num);
    sortBtn.innerText = "A - Z";
  }
  // Append sorted tasks back to container
  task.forEach((t) => container.appendChild(t.element));
});

// add a logic if task is only one then it will not be sort
// add a logic when some one delete tasks from any one there will be tasks numbers in the sequence like 1, 2, 3?
// add a logic when there is no task then innerText of sortBtn= Z - A
