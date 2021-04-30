
class QuestionScreen {
  constructor(_parent, _caller) {
    this.parent = _parent;
    this.caller = _caller;

    // Model Objects
    this.questions = [];
    this.selectedQuestion = null;
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
            throw Error('Empty Content 3');
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
        console.log(error); 
      });;

  }

  renderQuestions(screen) {

    const addFunction = (event) => {
      console.log("add question button clicked");
      this.selectedQuestion = {};
      this.questions.push(this.selectedQuestion);
      this.renderQuestions(this);
    }

    const deleteFn = (event) => {
      // Change the Data
      const sIndex = this.questions.indexOf(this.selectedQuestion);
      console.log("Item to be removed is at {}" , sIndex);
      this.questions.splice(sIndex, 1);

      // Change the UI
      var nodes = this.parent.querySelectorAll('.q-selector');
      nodes[sIndex].parentElement.remove(nodes[sIndex]);
      if(sIndex == 0) {
        this.renderQuestions(this);
      }else {
        this.selectedQuestion = this.questions[sIndex];
        this.parent.querySelectorAll('.q-selector')[sIndex].parentElement.classList.add("active");
      }

    }

    const saveFn = (event) => {
      console.log("save exam with id " + this.examId);
      console.log("with selectedQuestion {}" , this.selectedQuestion);
      console.log("with questions {}" , this.questions);
    }

          
    const setQTxt = (event) => {
      console.log("Set Q Value")
      this.selectedQuestion.question = event.currentTarget.value;
    }

    const selectQuestionFn = (event) => {
      const pageLink = event.currentTarget;
      const pageItem = pageLink.parentElement;

      pageLink.parentElement.parentElement.querySelector(".active").classList.remove("active");
      pageLink.parentElement.classList.add("active");

      this.selectedQuestion = this.questions[Array.from(pageItem.parentNode.children).indexOf(pageItem)-1];
      
      this.parent.querySelector('#qTxt').value = this.selectedQuestion.question;
      this.parent.querySelector('#aTxt').value = this.selectedQuestion.question;
      // console.log("Select Question Function you selcted " + pageLink.getAttribute("aria-label"));

    };

    if (screen.questions.length == 0) {
      screen.parent.innerHTML = '<p class="lead">There are no questions. But you can create one <a class="add-btn btn" href="javascript://">here</a></p>';
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
              <a class="page-link q-selector" href="#">${index + 1}</a></li>`).join("")}
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
        <button type="button" class="add-btn btn btn-secondary" class="btn">Add </button> 
        <button type="button" class="delete-btn btn btn-secondary">Delete</button> 
        <button type="button" class="save-btn btn btn-secondary">Save</button> 
        </div>
        </div>
              
          
          </div>
          <div class="row">
            <div class="col-6">
            <div class="form-floating mb-3">
            <input type="question" class="form-control" id="qTxt" placeholder="Question">
            <label for="qTxt">Question</label>
          </div>
            </div>
            <div class="col-6">
            <div class="form-floating mb-3">
            <input type="answer" class="form-control" id="aTxt" placeholder="Answer">
            <label for="aTxt" >Answer</label>
          </div>
            </div>
          </div>
        </div>`;
      screen.parent.querySelector(".save-btn").addEventListener("click", saveFn);
      screen.parent.querySelector(".delete-btn").addEventListener("click", deleteFn);

      screen.parent.querySelector("#qTxt").addEventListener("change", setQTxt);

      var nodes = screen.parent.querySelectorAll('.q-selector');
      nodes[nodes.length- 1].parentElement.classList.add('active');
  
      screen.parent.querySelectorAll(".q-selector")
      .forEach(element => element.addEventListener("click", selectQuestionFn));

      console.log(this.selectedQuestion);

    }

    screen.parent.querySelector(".add-btn").parentElement.classList.add('active');
    screen.parent.querySelector(".add-btn").addEventListener("click", addFunction);
    
  }

}
export default QuestionScreen;