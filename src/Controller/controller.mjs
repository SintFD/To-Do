export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  buttonSortTasks() {
    if (this.view.sortButton !== "button-none") {
      this.view.sortButton.addEventListener("click", (e) => {
        this.model.sortTasks();
        this.render();
        this.view.sortButton.classList.add("button-none");
        this.view.sortButtonReverse.classList.remove("button-none");
      });
    }
    if (this.view.sortButtonReverse !== "button-none") {
      this.view.sortButtonReverse.addEventListener("click", (e) => {
        this.model.sortTasksReverse();
        this.render();
        this.view.sortButtonReverse.classList.add("button-none");
        this.view.sortButton.classList.remove("button-none");
      });
    }
  }

  render() {
    this.view.ul.innerHTML = "";

    this.model.arr.forEach((el, index) => {
      this.newLi = this.view.createLi({
        class: "addNewTask",
      });

      this.newInput = this.view.createInput({
        text: el,
        name: "inputTask",
        class: "input-task",
      });
      this.newInput.addEventListener("keyup", (event) => {
        this.model.changeTask(index, event.target.value);
      });

      this.deletButton = this.view.createButton({
        text: "x",
        class: "deletTask",
        type: "button",
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
      this.newLi.append(this.deletButton);
    });
  }

  init() {
    this.view.init();
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
    this.buttonSortTasks();
  }
}
