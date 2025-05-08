let tasksList = [
  {
    title: "Read a book",
    date: "2025-5-01",
    isDone: false,
  },
  {
    title: "Complete the project",
    date: "2025-5-02",
    isDone: false,
  },
  {
    title: "Go to the gym",
    date: "2025-5-03",
    isDone: false,
  },
];

function getTaskFromStorge() {
  let retrivedTasks = JSON.parse(localStorage.getItem("Tasks"));
  if (retrivedTasks == null) {
    tasksList = [];
  } else {
    tasksList = retrivedTasks;
  }
}
getTaskFromStorge();
let tasks = document.querySelector(".tasks");
function renderTasks() {
  tasks.innerHTML = "";
  tasksList.forEach((task, index) => {
    let content = `
    <div class="task ${task.isDone ? "done" : ""}">
      <div class="task-title">
        <h2>${task.title}</h2>
        <div class="task-date">${task.date}</div>
      </div>
      <div class="task-actions">
        <button class="edit-button" onclick="updateTask(${index})"><i class="bx bx-edit"></i></button>
        <button class="done-button" style="background-color: ${
          task.isDone ? "red" : ""
        };" onclick="doneTask(${index})">
          <i class="bx ${task.isDone ? "bx-x" : "bx-check"}"></i>
        </button>
        <button class="delete-button" onclick="deleteTask(${index})"><i class="bx bx-trash"></i></button>
      </div>
    </div>
    `;
    tasks.innerHTML += content;
  });
}

renderTasks();
const addButton = document.getElementById("add-task-button");
const popUpAdd = document.getElementById("popup");
const taskTitle = document.getElementById("task-title");
const saveButton = document.getElementById("save-button");
const closeButton = document.getElementById("close-button");

addButton.addEventListener("click", function () {
  popUpAdd.classList.add("active");
  titlePopup.innerHTML = "Add task";
  saveButton.innerHTML = "Save";
});

closeButton.addEventListener("click", function () {
  popUpAdd.classList.remove("active");
});
saveButton.addEventListener("click", function () {
  updateButton.style.display = "none";
  saveButton.style.display = "block ";
  console.log(taskTitle.value);
  if (taskTitle.value === "") {
    popUpAdd.classList.remove("active");
  } else {
    let taskObj = {
      title: taskTitle.value,
      date: new Date().toLocaleDateString(),
      isDone: false,
    };
    tasksList.push(taskObj);
    taskTitle.value = ""; // Clear the input field after saving
    storeTask();
    renderTasks();
    popUpAdd.classList.remove("active");
  }
});

const deleteButton = document.getElementById("delete-button");
const editButton = document.getElementById("edit-button");
const doneButton = document.getElementById("done-button");
const acceptDelete = document.getElementById("accept-delete");
const cancelDelete = document.getElementById("cancel-delete");
const popupCheck = document.getElementById("popup-check");
const titlePopup = document.getElementById("title-popup");
const updateButton = document.getElementById("update-button");

function deleteTask(index) {
  popupCheck.classList.add("active");

  acceptDelete.onclick = function () {
    tasksList.splice(index, 1);
    popupCheck.classList.remove("active");
    storeTask();
    renderTasks();
  };

  cancelDelete.onclick = function () {
    popupCheck.classList.remove("active");
  };
}

function updateTask(index) {
  titlePopup.innerHTML = "Edit task";
  saveButton.innerHTML = "Update";
  updateButton.style.display = "block";
  saveButton.style.display = "none";
  popUpAdd.classList.add("active");

  taskTitle.value = tasksList[index].title;
  updateButton.onclick = function () {
    let task = tasksList[index];
    task.title = taskTitle.value;
    popUpAdd.classList.remove("active");
    storeTask();
    renderTasks();
  };

  closeButton.addEventListener("click", function () {
    popUpAdd.classList.remove("active");
    saveButton.style.display = "block";
    updateButton.style.display = "none";
    taskTitle.value = "";
  });
}

function doneTask(index) {
  tasksList[index].isDone = !tasksList[index].isDone;
  storeTask();
  renderTasks();
}

// Storge Function
function storeTask() {
  localStorage.setItem("Tasks", JSON.stringify(tasksList));
}
