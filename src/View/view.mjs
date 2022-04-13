export default class View {
  constructor() {
    this.root = document.getElementById("root");
  }

  createButton(props) {
    const button = document.createElement("button");

    props.text && (button.innerText = props.text);
    props.id && (button.id = props.id);
    props.class && (button.className = props.class);
    props.type && (button.type = props.type);
    return button;
  }

  createDiv(props) {
    const div = document.createElement("div");

    props.text && (div.innerText = props.text);
    props.id && (div.id = props.id);

    return div;
  }

  createImg(props) {
    const img = document.createElement("img");

    props.class && (img.className = props.class);
    props.src && (img.src = props.src);

    return img;
  }

  createForm(props) {
    const form = document.createElement("form");

    props.id && (form.id = props.id);

    return form;
  }

  createLable(props) {
    const label = document.createElement("label");

    props.text && (label.innerText = props.text);
    props.id && (label.id = props.id);

    return label;
  }

  createInput(props) {
    const input = document.createElement("input");

    props.text && (input.value = props.text);
    props.name && (input.name = props.name);
    props.id && (input.id = props.id);

    return input;
  }

  createUl(props) {
    const ul = document.createElement("ul");

    props.id && (ul.id = props.id);

    return ul;
  }

  createLi(props) {
    const li = document.createElement("li");

    props.text && (li.innerHTML = props.text);
    props.class && (li.className = props.class);

    return li;
  }

  init() {
    this.top = this.createDiv({
      id: "top",
    });

    this.plas = this.createDiv({
      text: "+",
      id: "plas",
    });
    this.buttonText = this.createDiv({
      text: "Добавить",
      id: "add",
    });
    this.buttonAdd = this.createButton({
      id: "buttonAdd",
    });

    this.label = this.createLable({
      text: "To-do list",
      id: "todo-text",
    });

    this.form = this.createForm({
      id: "todo-list",
    });

    this.input = this.createInput({
      id: "add-task",
      name: "task-input",
    });

    this.ul = this.createUl({
      id: "allList",
    });

    this.imgSort = this.createImg({
      class: "sort-img",
      src: "./assets/photo/Group 73.png",
    });

    this.imgSortReverse = this.createImg({
      class: "sort-img",
      src: "./assets/photo/Group 91.png",
    });

    this.sortButton = this.createButton({
      
      class: 'button-sort',
      type: "button",
    });

    this.sortButtonReverse = this.createButton({
      
      class: 'button-sort button-none',
      type: "button",
    });

    this.form.append(this.top);
    this.form.append(this.label);
    this.form.append(this.ul);
    this.form.append(this.buttonAdd);

    this.sortButton.append(this.imgSort);
    this.sortButtonReverse.append(this.imgSortReverse)

    this.label.append(this.sortButton);
    this.label.append(this.sortButtonReverse);
    this.label.append(this.input);

    this.buttonAdd.append(this.plas);
    this.buttonAdd.append(this.buttonText);
    this.root.append(this.form);
  }
}