export default class Model {
  constructor() {
    this.arr = [];
  }

  addInput(newTask) {
    this.arr = [...this.arr, newTask];
  }

  deletTask(selectIndex) {
    this.arr = this.arr.filter((el, index) => index !== selectIndex)
  }

  sortTasks(el) {
    this.arr = this.arr.sort((a,b) => a > b)
  }
}
