
class QuestionScreen{
    constructor(_parent,_caller){
        this.parent=_parent;
        this.caller=_caller;
    }
    render(id){
        this.parent.innerHTML=`<h1>Question screen created</h1>`
        console.log("render method called");
        console.log("render method for id called:"+id);
    }
}
    this.parent
    .querySelector("#navbarsExample09 > form > button.btn-primary")
    .addEventListener("click", (event) => {
      console.log("add exam question button clicked");
   
    });


export default QuestionScreen;