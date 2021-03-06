export default class Model {
  constructor() {
    this.arr = [];
    this.counter = 0;
  }

  addInput(newTask) {
    this.arr = [
      ...this.arr,
      { id: this.counter, text: newTask, readonly: "true" },
    ];
    this.counter++;
  }

  deletTask(selectIndex) {
    this.arr = this.arr.filter((el, index) => index !== selectIndex);
  }

  editTask(selectIndex, value) {
    this.arr[selectIndex].readonly = value;
  }

  sortTasks() {
    this.arr.sort((a, b) =>
      a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1
    );
    this.arr.forEach((el,index)=>{
      el.id = index
    })
  }

  sortTasksReverse() {
    this.arr.sort((a, b) =>
      a.text.toLowerCase() < b.text.toLowerCase() ? 1 : -1
    );
    this.arr.forEach((el,index)=>{
      el.id = index
    })
  }

  changeTask(index, editTask) {
    this.arr[index].text = editTask;
  }

  draggTasks(id, index) {
    this.arr[id].id = Number(index);
  }

  draggSort() {
    this.arr.sort((a, b) => a.id - b.id);
  }
}
