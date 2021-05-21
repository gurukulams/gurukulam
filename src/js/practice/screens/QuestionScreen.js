class QuestionScreen {
  constructor(_parent, _caller) {
    this.parent = _parent;
    this.caller = _caller;

    this.questionEditor = null;

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
    fetch(
      "/api/practices/" +
        this.parent.dataset.type +
        "/" +
        examId +
        "/questions",
      {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
        },
      }
    )
      .then((response) => {
        // Shorthand to check for an HTTP 2xx response status.
        // See https://fetch.spec.whatwg.org/#dom-response-ok
        if (response.ok) {
          if (response.status === 204) {
            this.questions = [];
            this.renderQuestions(this);
            throw Error("Empty Content 3");
          }
          return response.json();
        } else {
          // Raise an exception to reject the promise and trigger the outer .catch() handler.
          // By default, an error response status (4xx, 5xx) does NOT cause the promise to reject!
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        this.questions = data;
        this.renderQuestions(this);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderQuestions(screen) {
    const addFunction = (event) => {
      console.log("add question button clicked {}", event.currentTarget);
      this.selectedQuestion = {
        question: "",
        answer: "",
        type: event.currentTarget.dataset.type,
      };
      this.questions.push(this.selectedQuestion);
      this.renderQuestions(this);
    };

    const deleteFn = () => {
      // Change the Data
      const selectedIndex = this.questions.indexOf(this.selectedQuestion);
      console.log("Item to be removed is at {}", selectedIndex);
      this.questions.splice(selectedIndex, 1);

      // Store Deleted Question Id
      if (this.selectedQuestion.id) {
        this.deletedQuestionIds.push(this.selectedQuestion.id);
      }

      // Change the UI
      const paginationElement = screen.parent.querySelector(".pagination");
      var liToKill = paginationElement.children[selectedIndex + 1];
      liToKill.parentNode.removeChild(liToKill);

      if (selectedIndex === 0) {
        this.renderQuestions(this);
      } else {
        const nextIndexToSelect =
          selectedIndex === this.questions.length
            ? selectedIndex - 1
            : selectedIndex;
        setSelectedQuestionIndex(nextIndexToSelect);
      }
    };

    const goBack = () => {
      // Navigate Back to Listing Screen
      const screen = this;
      this.parent.removeChild(this.parent.lastChild);
      this.oldChildNodes.forEach((child) => {
        screen.parent.appendChild(child);
      });
      this.caller.render();
    };

    const saveFn = () => {
      console.log("save exam with id " + this.examId);
      console.log("with selectedQuestion {}", this.selectedQuestion);
      console.log("with questions {}", this.questions);

      this.questions.forEach((question) => {
        if (!question.id) {
          fetch(
            "/api/practices/" +
              this.parent.dataset.type +
              "/" +
              this.examId +
              "/questions/" +
              question.type,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                Authorization:
                  "Bearer " + JSON.parse(sessionStorage.auth).authToken,
              },
              body: JSON.stringify(question),
            }
          );
        }
      });

      this.updatedQuestions.forEach((question) => {
        fetch(
          "/api/practices/" +
            this.parent.dataset.type +
            "/" +
            this.examId +
            "/questions/" +
            question.id,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              Authorization:
                "Bearer " + JSON.parse(sessionStorage.auth).authToken,
            },
            body: JSON.stringify(question),
          }
        );
      });

      this.deletedQuestionIds.forEach((dQuestionId) => {
        fetch(
          "/api/practices/" +
            this.parent.dataset.type +
            "/" +
            this.examId +
            "/questions/" +
            dQuestionId,
          {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              Authorization:
                "Bearer " + JSON.parse(sessionStorage.auth).authToken,
            },
          }
        );
      });

      goBack();
    };

    const setQTxt = () => {
      this.selectedQuestion.question = this.questionEditor.root.innerHTML;
      if (this.selectedQuestion.id) {
        this.updatedQuestions.push(this.selectedQuestion);
      }
    };

    const setATxt = (event) => {
      this.selectedQuestion.answer = event.currentTarget.value;
      if (this.selectedQuestion.id) {
        this.updatedQuestions.push(this.selectedQuestion);
      }
    };

    const selectQuestionFn = (event) => {
      const pageItem = event.currentTarget;
      setSelectedQuestionIndex(
        Array.from(pageItem.parentNode.children).indexOf(pageItem) - 1
      );
    };

    const setSelectedQuestionIndex = (selectedQIndex) => {
      // Data Changes
      this.selectedQuestion = this.questions[selectedQIndex];

      // UI Changes

      const paginationElement = screen.parent.querySelector(".pagination");

      if (selectedQIndex === 0) {
        paginationElement.firstElementChild.classList.add("disabled");
        paginationElement.firstElementChild.removeEventListener(
          "click",
          goPreviousFn
        );
      } else {
        paginationElement.firstElementChild.classList.remove("disabled");
        paginationElement.firstElementChild.addEventListener(
          "click",
          goPreviousFn
        );
      }

      if (selectedQIndex === this.questions.length - 1) {
        paginationElement.lastElementChild.classList.add("disabled");
        paginationElement.lastElementChild.removeEventListener(
          "click",
          goNextFn
        );
      } else {
        paginationElement.lastElementChild.classList.remove("disabled");
        paginationElement.lastElementChild.addEventListener("click", goNextFn);
      }

      if (paginationElement.querySelector(".active")) {
        paginationElement.querySelector(".active").classList.remove("active");
      }

      paginationElement.children[selectedQIndex + 1].classList.add("active");

      this.questionEditor.root.innerHTML = this.selectedQuestion.question
        ? this.selectedQuestion.question
        : "";
      this.parent.querySelector("#aTxt").value = this.selectedQuestion.answer
        ? this.selectedQuestion.answer
        : "";

      this.questionEditor.focus();
    };

    const goPreviousFn = () => {
      setSelectedQuestionIndex(
        this.questions.indexOf(this.selectedQuestion) - 1
      );
    };

    const goNextFn = () => {
      setSelectedQuestionIndex(
        this.questions.indexOf(this.selectedQuestion) + 1
      );
    };

    screen.parent.innerHTML = `<div class="container">
          <div class="row">
            <div class="col-6">
              ${
                screen.questions.length !== 0
                  ? `
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" id="previousPagination">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                    ${this.questions
                      .map(
                        (
                          _question,
                          index
                        ) => ` <li class="page-item q-selector">
                  <a class="page-link" href="#">${index + 1}</a></li>`
                      )
                      .join("")}
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" id="nextPagination">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>`
                  : ``
              }
            </div>
            <div class="col-6">
              <div class="dropdown float-end">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Add
                  </button>
                  <ul class="dropdown-menu add-btns" aria-labelledby="dropdownMenuButton1">
                    <li data-type="sl"><a class="dropdown-item" href="#">Singleline</a></li>
                    <li data-type="ml"><a class="dropdown-item" href="#">Multiline</a></li>
                  </ul>
                  <button type="button" class="delete-btn btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button> 
                  <button type="button" class="save-btn btn btn-secondary">Save</button> 

              </div>
             
            </div>
          </div>


          ${
            screen.questions.length === 0
              ? `<p class="lead">There are no questions. But you can create one</p>`
<<<<<<< HEAD
              : `<div class = "container h-100">
              <div class="row h-100">
           <div class="col-6 ">
=======
              : `<div class="row h-100">
           <div class="col-6">
>>>>>>> ebce54e544996b9cb70cc36d7db83514582f1f9d
           <div id="qTxt">
           <p>Hello World!</p>
           <p>Some initial <strong>bold</strong> text</p>
           <p><br></p>
         </div>
           </div>
           <div class="col-6">
               <div class="form-floating mb-3">
               <input type="answer" class="form-control" id="aTxt" placeholder="Answer">
               <label for="aTxt" >Answer</label>
             </div>
           </div>
         </div>`
          }

          
        </div>`;

    if (this.questions.length !== 0) {
      screen.parent.querySelector("#aTxt").addEventListener("change", setATxt);

      var options = {
        debug: "info",

        placeholder: "Compose a question...",

        theme: "snow",
      };
      // eslint-disable-next-line no-undef
      this.questionEditor = new Quill("#qTxt", options); // First matching element will be used
      // eslint-disable-next-line no-unused-vars
      this.questionEditor.on("text-change", function () {
        setQTxt();
      });

      setSelectedQuestionIndex(0);

      screen.parent
        .querySelectorAll(".q-selector")
        .forEach((element) =>
          element.addEventListener("click", selectQuestionFn)
        );
    }

    //screen.parent.querySelector(".add-btn").parentElement.classList.add('active');
    screen.parent
      .querySelector(".add-btns")
      .childNodes.forEach((element) =>
        element.addEventListener("click", addFunction)
      );

    screen.parent.querySelector(".save-btn").addEventListener("click", saveFn);
    screen.parent
      .querySelector(".delete-btn")
      .addEventListener("on-confirmation", deleteFn);

    const paginationElement = screen.parent.querySelector(".pagination");
    if (paginationElement) {
      paginationElement.firstElementChild.addEventListener(
        "click",
        goPreviousFn
      );
      paginationElement.lastElementChild.addEventListener("click", goNextFn);
    }
  }
}
export default QuestionScreen;
