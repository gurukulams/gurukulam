
class QuestionScreen {
    constructor(_parent, _caller) {
        this.parent = _parent;
        this.caller = _caller;

        // Model Objects
        this.questions = [];
    }
    render(examId) {
        console.log("fetch call examId");
        fetch('/api/practices/sql/'+examId + '/questions',{
            "headers": {
              "content-type": "application/json",
              "Authorization": "Bearer " + JSON.parse(sessionStorage.auth).authToken
            }
          }).then(response => response.json())  // Converting as JSON
          .then(data => {
            this.questions = data;
            this.parent.innerHTML = `<div class="container">
        <div class="row">
          <div class="col-8">
          <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            ${this.questions.map(question => `<li class="page-item active"><a class="page-link" href="#">${question.id}</a></li>`).join("")}
            
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
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
          });
        
    }
}



export default QuestionScreen;