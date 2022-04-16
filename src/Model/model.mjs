export default class Model {
  constructor() {
    this.arr = [];
    this.counter = 0;
  }

  addInput(newTask) {
    this.arr = [...this.arr,{ id: this.counter, text: newTask, readonly: "true" },
    ];
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
  }

  sortTasksReverse() {
    this.arr.sort((a, b) =>
      a.text.toLowerCase() < b.text.toLowerCase() ? 1 : -1
    );
  }

  changeTask(index, editTask) {
    this.arr[index].text = editTask;
  }

  
}
