
class Question{
    constructor(_parent,_caller){
        this.parent=_parent;
        this.caller=_caller;
    }
    render(id){
        console.log("render method called");
        console.log("render method for id called:"+id);
    }

}
export default Question;