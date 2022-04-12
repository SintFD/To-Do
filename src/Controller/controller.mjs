export default class Controller {
    constructor(model,view){
        this.model = model
        this.view = view
    }

    init(){
        this.view.init()
        this.view.buttonAdd.addEventListener('click',(e)=>{
            const newTask = this.view.input.value
            e.preventDefault()
            if(newTask !== ''){
                this.view.ul.className = 'allList'
                this.model.addInput(newTask)
                this.newArr = this.model.arr.slice(-1)
                console.log(this.newArr)
                
                this.newLi = this.view.createLi({
                    text: this.newArr, 
                    class: 'addNewTask'
                })
                this.view.ul.append(this.newLi)

                this.view.input.value = ''
            }
        })
    }
}