
class Question {
    constructor(_parent, _caller) {
        this.parent = _parent;
        this.caller = _caller;
    }
    render(id) {

        this.parent.innerHTML = `<div class="container">
        <div class="row">
          <div class="col-8">
            Question #2
          </div>
          <div class="col-4 d-flex flex-row-reverse bd-highlight">
      
  <div class="p-2 bd-highlight"><button type="button" class="btn btn-primary">Add</button> </div>
</div>
            
         
        </div>
        <div class="row">
          <div class="col-6">
          <div class="form-floating mb-3">
          <input type="question" class="form-control" id="floatingInput" placeholder="Question">
          <label for="floatingInput">Question</label>
        </div>
          </div>
          <div class="col-6">

          <div class="form-floating mb-3">
          <input type="answer" class="form-control" id="floatingInput" placeholder="Answer">
          <label for="floatingInput">Answer</label>
        </div>
          </div>
        </div>
      </div>`;

        console.log("render method called");
        console.log("render method for id called:" + id);
    }

}
export default Question;