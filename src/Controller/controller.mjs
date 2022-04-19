export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.init();
    this.initForm();
    this.buttonSortTasks();
    this.clearInput();
    this.dragoverListener();
  }

  initForm() {
    this.view.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const newTask = data.get("task-input");
      if (newTask !== "") {
        this.view.ul.className = "allList";
        this.model.addInput(newTask);
        this.render();
        this.view.input.value = "";
      }
    });
  }

  buttonSortTasks() {
    this.view.sortButton.addEventListener("click", (e) => {
      if (e.target.className === "button-sort") {
        this.model.sortTasks();
      } else {
        this.model.sortTasksReverse();
      }
      this.render();
      e.target.classList.toggle("sort-reverse");
    });
  }

  clearInput() {
    this.view.clearInputValue.addEventListener("click", () => {
      this.view.input.value = "";
    });
  }

  dragoverListener() {
    this.view.ul.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.afterElement = this.getDragAfterElement(this.view.ul, e.clientY);

      this.draggable = document.querySelector(".dragging");
      if (this.afterElement == null) {
        this.view.ul.append(this.draggable);
      } else {
        this.view.ul.insertBefore(this.draggable, this.afterElement);
      }
    });
  }

  getDragAfterElement(container, y) {
    this.draggableElements = [
      ...container.querySelectorAll(".addNewTask:not(.dragging)"),
    ];

    return this.draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 7;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  render() {
    this.view.ul.innerHTML = "";

    this.model.arr.forEach((el, index) => {
      this.newLi = this.view.createLi({
        class: "addNewTask",
        id: index,
        draggable: "true",
      });

      this.newInput = this.view.createInput({
        text: el.text,
        name: "inputTask",
        class: "input-task",
        id: index,
      });

      this.editButton = this.view.createButton({
        class: "edit-button",
        type: "button",
      });

      this.deletButton = this.view.createButton({
        class: "deletTask",
        type: "button",
      });

      if (el.readonly === "true") {
        this.newInput.setAttribute("readonly", "true");
      } else {
        this.editButton.classList.add("finish-edit");
      }

      this.editButton.addEventListener("click", (e) => {
        if (el.readonly === "true") {
          this.model.editTask(index, "false");
        } else {
          this.model.editTask(index, "true");
        }
        this.render();
      });

      this.newInput.addEventListener("keyup", (event) => {
        this.model.changeTask(index, event.target.value);
      });

      this.deletButton.addEventListener("click", (e) => {
        this.model.deletTask(index);
        this.render();
        if (this.view.ul.innerHTML === "") {
          this.view.ul.className = "";
        }
      });

      this.newLi.addEventListener("dragstart", (e) => {
        e.target.classList.add("dragging");
      });

      this.newLi.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging");

        this.allDraggableEl = this.view.ul.querySelectorAll(".addNewTask");

        this.allDraggableEl.forEach((el, index) => {
          if (el.id != index) {
            this.model.draggTasks(el.id, index);
          }
        });

        this.model.draggSort();
        this.render();
      });

      this.view.ul.append(this.newLi);
      this.newLi.append(this.newInput);
      this.newLi.append(this.editButton);
      this.newLi.append(this.deletButton);
    });
    this.allDraggableElements = [
      ...this.view.ul.querySelectorAll(".addNewTask"),
    ];
  }
}
