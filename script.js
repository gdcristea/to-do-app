// Global variables
const input = document.querySelector("input");
const listOfToDo = document.querySelector(".listOfToDo");
const numberOfTodos = document.getElementById("numberOfTodos");
const numberOfTodos2 = document.getElementById("numberOfTodos2");
const clearCompleted = document.getElementById("clearCompleted");
const clearCompleted2 = document.getElementById("clearCompleted2");
const filterButtons = document.querySelectorAll(".filterList span");

// Add new todos to the list
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value.length > 0) {
    createNewTodo(input.value);
    input.value = "";
  }
});

function createNewTodo(text) {
  const element = document.createElement("div");
  element.classList.add("todo");

  element.innerHTML = `
  <div>
    <button class="toDoCheck"></button>
    <p class="toDoText">${text}</p>
  </div>
  <img class="iconCross" src="images/icon-cross.svg" alt="">
  `;

  if (document.querySelector(".active").id === "completedAll") {
    element.classList.add("hidden");
    setNumberOfTodos(0);
  } else {
    setNumberOfTodos(1);
  }

  listOfToDo.appendChild(element);

  // todo border bottom color
  [...listOfToDo.children].forEach((child) => {
    if (body.classList.contains("bodyLight")) {
      child.classList.add("todoLight");
      child.children[0].children[1].classList.add("toDoTextLight");
      child.children[0].children[0].classList.add("toDoCheckLight");
    } else {
      child.classList.remove("todoLight");
      child.children[0].children[1].classList.remove("toDoTextLight");
      child.children[0].children[0].classList.remove("toDoCheckLight");
    }
  });
}

// Determine the number of todos in the list
function setNumberOfTodos(number) {
  numberOfTodos.innerText = +numberOfTodos.innerText + number;
  numberOfTodos2.innerText = +numberOfTodos2.innerText + number;
}

// Mark todos as complete
listOfToDo.addEventListener("click", (event) => {
  if (event.target.classList.contains("toDoCheck")) {
    const todoText = event.target.nextElementSibling;
    const todoCheck = event.target;

    if (body.classList.contains("bodyLight")) {
      if (!todoCheck.classList.contains("toDoCheckChecked")) {
        todoCheck.classList.add("toDoCheckChecked");
        todoText.classList.add("todoTextCheckedLight");
        todoText.classList.remove("todoTextChecked");
      } else {
        todoCheck.classList.remove("toDoCheckChecked");
        todoText.classList.remove("todoTextCheckedLight");
        todoText.classList.remove("todoTextChecked");
      }
    } else {
      if (!todoCheck.classList.contains("toDoCheckChecked")) {
        todoCheck.classList.add("toDoCheckChecked");
        todoText.classList.add("todoTextChecked");
      } else {
        todoCheck.classList.remove("toDoCheckChecked");
        todoText.classList.remove("todoTextChecked");
      }
    }
  }
});

//Delete todos from the list
listOfToDo.addEventListener("click", (event) => {
  if (event.target.className === "iconCross") {
    removeTodoItem(event.target.parentElement);
  }
});

function removeTodoItem(todo) {
  todo.remove();
  setNumberOfTodos(-1);
}

// Clear Completed-> Button
clearCompleted.addEventListener("click", () => {
  let todoCheckAll = document.querySelectorAll(".toDoCheckChecked");

  todoCheckAll.forEach((item) => {
    item.parentElement.parentElement.remove();
  });

  let numberOfTodo = todoCheckAll.length;

  setNumberOfTodos(-numberOfTodo);
});

clearCompleted2.addEventListener("click", () => {
  let todoCheckAll = document.querySelectorAll(".toDoCheckChecked");

  todoCheckAll.forEach((item) => {
    item.parentElement.parentElement.remove();
  });

  let numberOfTodo = todoCheckAll.length;

  setNumberOfTodos(-numberOfTodo);
});

// Sort todos -> All, Active, Completed
function deleteActiveClasses() {
  const buttonsActive = document.querySelectorAll(".active");

  buttonsActive.forEach((button) => {
    button.classList.remove("active");
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    filterTodos(event.target.id);

    deleteActiveClasses();
    event.target.classList.add("active");
  });
});

function filterTodos(id) {
  const allItems = listOfToDo.querySelectorAll(".todo");

  switch (id) {
    case "allTodos":
      allItems.forEach((todo) => {
        todo.classList.remove("hidden");
      });
      numberOfTodos.innerText = allItems.length;
      numberOfTodos2.innerText = allItems.length;
      break;
    case "activeTodos":
      allItems.forEach((todo) => {
        todo.querySelector(".toDoCheck").classList.contains("toDoCheckChecked")
          ? todo.classList.add("hidden")
          : todo.classList.remove("hidden");
      });

      const allItemsActive = [...allItems].filter(
        (todo) =>
          !todo
            .querySelector(".toDoCheck")
            .classList.contains("toDoCheckChecked")
      );

      numberOfTodos.innerText = allItemsActive.length;
      numberOfTodos2.innerText = allItemsActive.length;

      break;
    default:
      allItems.forEach((todo) => {
        !todo.querySelector(".toDoCheck").classList.contains("toDoCheckChecked")
          ? todo.classList.add("hidden")
          : todo.classList.remove("hidden");
      });

      const allItemsCompleted = [...allItems].filter((todo) =>
        todo.querySelector(".toDoCheck").classList.contains("toDoCheckChecked")
      );

      numberOfTodos.innerText = allItemsCompleted.length;
      numberOfTodos2.innerText = allItemsCompleted.length;

      break;
  }
}

// Drag and drop to reorder items on the list
const dragArea = document.querySelector(".listOfToDo");
new Sortable(dragArea, {
  animation: 350,
});

// Toggle light and dark mode
const switchBtn = document.querySelector(".switchBtn");
const body = document.querySelector("body");
const dragAndDrop = document.querySelector(".dragAndDrop");
const footer = document.querySelector("footer");
const listOfToDoFooter = document.querySelector(".listOfToDoFooter");
const inputContainer = document.querySelector(".input");
const allTodos = document.getElementById("allTodos");
const activeTodos = document.getElementById("activeTodos");
const completedAll = document.getElementById("completedAll");
const bannerImgMobile = document.querySelector(".bannerImgMobile");
const bannerImgDesktop = document.querySelector(".bannerImgDesktop");

switchBtn.addEventListener("click", () => {
  body.classList.toggle("bodyLight");
  switchBtn.classList.toggle("switchBtnLight");
  dragAndDrop.classList.toggle("dragAndDropLight");
  footer.classList.toggle("footerLight");
  listOfToDoFooter.classList.toggle("listOfToDoFooterLight");
  inputContainer.classList.toggle("inputLight");
  listOfToDo.classList.toggle("listOfToDoLighter");
  clearCompleted.classList.toggle("clearCompletedLight");
  clearCompleted2.classList.toggle("clearCompletedLight");
  allTodos.classList.toggle("allTodosLight");
  activeTodos.classList.toggle("activeTodosLight");
  completedAll.classList.toggle("completedAllLight");

  // todo border bottom color + text color
  [...listOfToDo.children].forEach((child) => {
    if (body.classList.contains("bodyLight")) {
      child.classList.add("todoLight");
      child.children[0].children[1].classList.add("toDoTextLight");
      child.children[0].children[0].classList.add("toDoCheckLight");

      if (child.children[0].children[1].classList.contains("todoTextChecked")) {
        child.children[0].children[1].classList.remove("todoTextChecked");
        child.children[0].children[1].classList.add("todoTextCheckedLight");
      }
    } else {
      child.classList.remove("todoLight");
      child.children[0].children[1].classList.remove("toDoTextLight");
      child.children[0].children[0].classList.remove("toDoCheckLight");

      if (
        child.children[0].children[1].classList.contains("todoTextCheckedLight")
      ) {
        child.children[0].children[1].classList.remove("todoTextCheckedLight");
        child.children[0].children[1].classList.add("todoTextChecked");
      }
    }
  });

  inputContainer.children[0].classList.toggle("toDoCheckLight");
  inputContainer.children[1].classList.toggle("toDoTextInputLight");

  // banner image
  if (body.classList.contains("bodyLight")) {
    bannerImgMobile.src = "images/bg-mobile-light.jpg";
    bannerImgDesktop.src = "images/bg-desktop-light.jpg";
  } else {
    bannerImgMobile.src = "images/bg-mobile-dark.jpg";
    bannerImgDesktop.src = "images/bg-desktop-dark.jpg";
  }
});
