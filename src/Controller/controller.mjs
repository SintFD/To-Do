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

  render() {
    this.view.ul.innerHTML = "";

    this.model.arr.forEach((el, index) => {
      this.newLi = this.view.createLi({
        class: "addNewTask",
        draggable: "true",
      });

      this.newInput = this.view.createInput({
        text: el.text,
        name: "inputTask",
        class: "input-task",
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

      this.deletButton.addEventListener("click", () => {
        this.model.deletTask(index);
        this.render();
        if (this.view.ul.innerHTML === "") {
          this.view.ul.className = "";
        }
      });

      this.view.ul.append(this.newLi);
      this.newLi.append(this.newInput);
      this.newLi.append(this.editButton);
      this.newLi.append(this.deletButton);
    });
  }

  clearInput() {
    this.view.clearInputValue.addEventListener("click", () => {
      this.view.input.value = "";
    });
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
}
