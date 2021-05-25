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

  setSelectedQuestionIndex(selectedQIndex) {
    // Data Changes
    this.selectedQuestion = this.questions[selectedQIndex];

    // UI Changes

    const goPreviousFn = () => {
      this.setSelectedQuestionIndex(
        this.questions.indexOf(this.selectedQuestion) - 1
      );
    };

    const goNextFn = () => {
      this.setSelectedQuestionIndex(
        this.questions.indexOf(this.selectedQuestion) + 1
      );
    };

    const paginationElement = this.parent.querySelector(".pagination");

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
      paginationElement.lastElementChild.removeEventListener("click", goNextFn);
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

    this.renderAnswerElement();

    // Setting Answer
    // this.parent.querySelector("#answerElement").value = this.selectedQuestion
    //   .answer
    //   ? this.selectedQuestion.answer
    //   : "";

    this.questionEditor.focus();
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
        this.setSelectedQuestionIndex(0);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderAnswerElement() {
    const setATxt = (value) => {
      this.selectedQuestion.answer = value;
      if (this.selectedQuestion.id) {
        this.updatedQuestions.push(this.selectedQuestion);
      }
    };

    const onChangeText = (event) => {
      setATxt(event.currentTarget.value);
    };

    const setCodeEditor = (language) => {
      this.parent.querySelector("#answerContainer").innerHTML = ``;
      // eslint-disable-next-line no-undef
      require.config({
        paths: {
          vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs",
        },
      });
      // eslint-disable-next-line no-undef
      require(["vs/editor/editor.main"], () => {
        // eslint-disable-next-line no-undef
        const monEditor = monaco.editor.create(
          this.parent.querySelector("#answerContainer"),
          {
            value: this.selectedQuestion.answer,
            language: language,
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            theme: "vs-dark",
          }
        );
        monEditor.onDidChangeModelContent(function () {
          setATxt(monEditor.getValue());
        });
      });
    };

    switch (this.selectedQuestion.type) {
      case "ml":
        this.parent.querySelector(
          "#answerContainer"
        ).innerHTML = `<textarea type="answer" class="form-control h-100" 
                           placeholder="Answer">${this.selectedQuestion.answer}</textarea>
                          <label for="aTxt" >Answer</label>`;
        this.parent
          .querySelector("#answerContainer")
          .firstElementChild.addEventListener("change", onChangeText);
        break;
      case "code-sql":
        setCodeEditor("sql");
        break;
      case "code-java":
        setCodeEditor("java");
        break;
      default:
        this.parent.querySelector(
          "#answerContainer"
        ).innerHTML = `<input type="answer" class="form-control" 
                          placeholder="Answer" value="${this.selectedQuestion.answer}">
                          <label for="aTxt" >Answer</label>`;
        this.parent
          .querySelector("#answerContainer")
          .firstElementChild.addEventListener("change", onChangeText);
        break;
    }
  }

  renderQuestions(screen) {
    const addFunction = (event) => {
      this.selectedQuestion = {
        question: "",
        answer: "",
        type: event.currentTarget.dataset.type,
      };
      this.questions.push(this.selectedQuestion);
      this.renderQuestions(this);
      this.setSelectedQuestionIndex(this.questions.length - 1);
    };

    const deleteFn = () => {
      // Change the Data
      const selectedIndex = this.questions.indexOf(this.selectedQuestion);

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
        this.setSelectedQuestionIndex(nextIndexToSelect);
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

    const selectQuestionFn = (event) => {
      const pageItem = event.currentTarget;
      this.setSelectedQuestionIndex(
        Array.from(pageItem.parentNode.children).indexOf(pageItem) - 1
      );
    };

    screen.parent.innerHTML = `<div class="container vh-100">
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
                  <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Add
                  </button>
                  <ul class="dropdown-menu add-btns" aria-labelledby="dropdownMenuButton1">
                    <li data-type="sl"><a class="dropdown-item" href="#">Singleline</a></li>
                    <li data-type="ml"><a class="dropdown-item" href="#">Multiline</a></li>
                    <li data-type="code-sql"><a class="dropdown-item" href="#">Sql</a></li>
                    <li data-type="code-java"><a class="dropdown-item" href="#">Java</a></li>
                  </ul>
                  <button type="button" class="delete-btn btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button> 
                  <button type="button" class="save-btn btn">Save</button> 

              </div>
             
            </div>
          </div>


          ${
            screen.questions.length === 0
              ? `<p class="lead">There are no questions. But you can create one</p>`
              : `
              <div class="row h-50">
           <div class="col-6 ">

           <div id="qTxt">
           <p>Hello World!</p>
           <p>Some initial <strong>bold</strong> text</p>
           <p><br></p>
         </div>
           </div>
           <div class="col-6">
               <div class="form-floating mb-3 h-100" style="height:100%" id="answerContainer">
               
             </div>
           </div>
         `
          }

          
        </div>`;

    if (this.questions.length !== 0) {
      // screen.parent
      //   .querySelector("#answerElement")
      //   .addEventListener("change", setATxt);

      var options = {
        placeholder: "Compose a question...",

        theme: "snow",
      };
      // eslint-disable-next-line no-undef
      this.questionEditor = new Quill("#qTxt", options); // First matching element will be used
      // eslint-disable-next-line no-unused-vars
      this.questionEditor.on("text-change", function () {
        setQTxt();
      });

      // setSelectedQuestionIndex(0);

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
    document.getElementById("dropdown-menu add-btns").focus();

    screen.parent.querySelector(".save-btn").addEventListener("click", saveFn);
    screen.parent
      .querySelector(".delete-btn")
      .addEventListener("on-confirmation", deleteFn);
  }
}
export default QuestionScreen;
