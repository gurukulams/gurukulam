
class QuestionScreen {
  constructor(_parent, _caller) {
    this.parent = _parent;
    this.caller = _caller;

    // Model Objects
    this.questions = [];
    this.examId = null;
  }


  render(examId) {
    this.examId = examId;
    fetch('/api/practices/sql/' + examId + '/questions', {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Bearer " + JSON.parse(sessionStorage.auth).authToken
      }
    })
      .then(response => {

        // Shorthand to check for an HTTP 2xx response status.
        // See https://fetch.spec.whatwg.org/#dom-response-ok
        if (response.ok) {
          if (response.status == 204) {
            this.questions = [];
            this.renderQuestions(this);

          }
          return response.json();
        } else {
          // Raise an exception to reject the promise and trigger the outer .catch() handler.
          // By default, an error response status (4xx, 5xx) does NOT cause the promise to reject!
          throw Error(response.statusText);
        }


      })
      .then(data => {
        this.questions = data;
        this.renderQuestions(this);

      }).catch(function (error) {
        console.error(error);
      });;

  }

  

  deleteQuestion() {
    console.log("delete question button clicked");

  }

  saveExam() {
    console.log("save exam question button clicked");

  }

  renderQuestions(screen) {

    const addFunction = (event) => {
      console.log("add question button clicked");
      this.questions.push({});
      this.renderQuestions(this);
  
    }

    if (screen.questions.length == 0) {
      screen.parent.innerHTML = '<p class="lead">There are no questions. But you can create one <a href="javascript://">here</a></p>';
      screen.parent.querySelector("a").addEventListener("click", addFunction);
    }
    else {
      screen.parent.innerHTML = `<div class="container">
  <div class="row">
    <div class="col-8">
    <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      ${this.questions.map((question, index) => ` <li class="page-item">
      <a class="page-link" href="#" aria-label="${index}">${index+1}</a></li>`).join("")}
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
    </div>
    <div class="col-4 d-flex flex-row-reverse bd-highlight">

<div class="p-2 bd-highlight">
<button type="button" #id="btn-Add" class="btn">Add </button> 
<button type="button" class="btn">Delete</button> 
<button type="button" class="btn">Save</button> 
</div>
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
    }


  }




}



export default QuestionScreen;