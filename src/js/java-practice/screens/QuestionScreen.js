
class QuestionScreen {
  constructor(_parent, _caller) {
    this.parent = _parent;
    this.caller = _caller;

    // Model Objects
    this.questions = [];
    this.selectedQuestion = null;
    this.examId = null;

    this.deletedQuestionIds = [];
    this.updatedQuestions = [];

  }


  render(examId) {

    this.oldChildNodes = [];
    while (this.parent.firstChild) {
      this.oldChildNodes.push(this.parent.removeChild(this.parent.firstChild));
    }

    this.examId = examId;
    fetch('/api/practices/java/' + examId + '/questions', {
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
      console.log("add question button clicked {}",event.currentTarget);
      this.selectedQuestion = {question:'',answer:'', type: event.currentTarget.dataset.type};
      this.questions.push(this.selectedQuestion);
      this.renderQuestions(this);
    }

    const deleteFn = (event) => {
      // Change the Data
      const selectedIndex = this.questions.indexOf(this.selectedQuestion);
      console.log("Item to be removed is at {}" , selectedIndex);
      this.questions.splice(selectedIndex, 1);

      // Store Deleted Question Id
      if(this.selectedQuestion.id) {
        this.deletedQuestionIds.push(this.selectedQuestion.id);
      }
      

      // Change the UI
      var nodes = this.parent.querySelectorAll('.q-selector');
      nodes[selectedIndex].parentElement.remove(nodes[selectedIndex]);
      if(selectedIndex == 0) {
        this.renderQuestions(this);
      }else {
        const nextIndexToSelect = selectedIndex == this.questions.length ? (selectedIndex - 1) : selectedIndex;
        this.selectedQuestion = this.questions[nextIndexToSelect];
        this.parent.querySelectorAll('.q-selector')[nextIndexToSelect].parentElement.classList.add("active");
      }

    }

    const goBack = () => {
      // Navigate Back to Listing Screen
      const screen = this;
      this.parent.removeChild(this.parent.lastChild);
      this.oldChildNodes.forEach((child) => {
        screen.parent.appendChild(child);
      });
      this.caller.render();
    }

    const saveFn = (event) => {
      console.log("save exam with id " + this.examId);
      console.log("with selectedQuestion {}" , this.selectedQuestion);
      console.log("with questions {}" , this.questions);

      this.questions.forEach(question => {

        if(!question.id) {
          fetch("/api/practices/java/" +this.examId+ "/questions/" +question.type , {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "Authorization": "Bearer " + JSON.parse(sessionStorage.auth).authToken
            },
            body: JSON.stringify(question),
          })
        }
     
      });

      this.updatedQuestions.forEach(question => {

        
          fetch("/api/practices/java/" +this.examId+ "/questions/"+question.id, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              "Authorization": "Bearer " + JSON.parse(sessionStorage.auth).authToken
            },
            body: JSON.stringify(question),
          })
        
     
      });

      this.deletedQuestionIds.forEach(dQuestionId => {
        fetch("/api/practices/java/" +this.examId+ "/questions/"+dQuestionId, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + JSON.parse(sessionStorage.auth).authToken
          }
        })
      });

      goBack();
    }

          
    const setQTxt = (event) => {
      console.log("Set Q Value")
      this.selectedQuestion.question = event.currentTarget.value;
      if(this.selectedQuestion.id) {
        this.updatedQuestions.push(this.selectedQuestion);
      }
    }

    const setATxt = (event) => {
      console.log("Set A Value")
      this.selectedQuestion.answer = event.currentTarget.value;
      if(this.selectedQuestion.id) {
        this.updatedQuestions.push(this.selectedQuestion);
      }
    }

    const selectQuestionFn = (event) => {
      const pageLink = event.currentTarget;
      const pageItem = pageLink.parentElement;

      pageLink.parentElement.parentElement.querySelector(".active").classList.remove("active");
      pageLink.parentElement.classList.add("active");

      this.selectedQuestion = this.questions[Array.from(pageItem.parentNode.children).indexOf(pageItem)-1];
      
      this.parent.querySelector('#qTxt').value = this.selectedQuestion.question ? this.selectedQuestion.question : '' ;
      this.parent.querySelector('#aTxt').value = this.selectedQuestion.answer ? this.selectedQuestion.answer : '' ;    

    };

    if (screen.questions.length == 0) {
      screen.parent.innerHTML = `<p class="lead">There are no questions. But you can create one <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Add
      </button>
      <ul class="dropdown-menu add-btns" aria-labelledby="dropdownMenuButton1">
        <li data-type="sl"><a class="dropdown-item" href="#">Singleline</a></li>
        <li data-type="ml"><a class="dropdown-item" href="#">Multiline</a></li>
      </ul>
    </div></p>`;
    }
    else {
      screen.parent.innerHTML = `<div class="container">
          <div class="row">
            <div class="col-6">
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
            <div class="col-6 d-flex">

       
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Add
            </button>
            <ul class="dropdown-menu add-btns" aria-labelledby="dropdownMenuButton1">
              <li data-type="sl"><a class="dropdown-item" href="#">Singleline</a></li>
              <li data-type="ml"><a class="dropdown-item" href="#">Multiline</a></li>
            </ul>
          </div>
        <button type="button" class="delete-btn btn btn-secondary">Delete</button> 
        <button type="button" class="save-btn btn btn-secondary">Save</button> 
       
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
      screen.parent.querySelector('#aTxt').addEventListener("change", setATxt);

      var nodes = screen.parent.querySelectorAll('.q-selector');
      nodes[nodes.length- 1].parentElement.classList.add('active');
      this.selectedQuestion = this.questions[nodes.length- 1];
      screen.parent.querySelector("#qTxt").value = this.selectedQuestion.question;
      screen.parent.querySelector('#aTxt').value = this.selectedQuestion.answer;
  
      screen.parent.querySelectorAll(".q-selector")
      .forEach(element => element.addEventListener("click", selectQuestionFn));

      console.log(this.selectedQuestion);

    }

    //screen.parent.querySelector(".add-btn").parentElement.classList.add('active');
    screen.parent.querySelector(".add-btns").childNodes
    .forEach(element => element.addEventListener("click", addFunction));
    
  }

}
export default QuestionScreen;