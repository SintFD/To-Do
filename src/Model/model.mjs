export default class Model {
  constructor() {
    this.arr = [];
  }

  addInput(newTask) {
    this.arr = [...this.arr, newTask];
    console.log(this.arr);
  }

  deletInput() {}

  sortInputs() {}
}
