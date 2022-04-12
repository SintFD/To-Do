export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
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
        id: "input-task",
      });
      this.view.ul.append(this.newLi);
      this.newLi.append(this.newInput);

      this.deletButton = this.view.createButton({
        text: "x",
        class: "deletTask",
        type: "button",
      });

      this.newLi.append(this.deletButton);

      this.deletButton.addEventListener('click',()=>{
        this.model.deletTask(index)
        this.render()
        if(this.view.ul.innerHTML === ''){
          this.view.ul.className = ''
        }
      })
      
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
  }
}
