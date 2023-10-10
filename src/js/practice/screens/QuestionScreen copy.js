class QuestionScreen {
  constructor(_parent, _caller) {
    this.parent = _parent;
    this.caller = _caller;

    this.questionEditor = null;
    this.explanationEditor = null;

    // Model Objects
    this.questions = [];
    this.selectedQuestion = null;

    this.chaptorPath = null;

    this.isOwner = true;

    this.deletedQuestionIds = [];

    this.chaptorName = window.location.pathname.split("/questions/")[1];

    this.render(this.isOwner, this.chaptorName);

    const list = document.querySelector(
      '[aria-labelledby="languageBtn"]'
    ).children;

    for (let item of list) {
      if (item.children[0].dataset.code === "en") {
        item.children[0].href = "/questions/" + this.chaptorName;
      } else {
        item.children[0].href =
          item.children[0].dataset.code + window.location.pathname;
      }
    }
  }

  isValid() {
    if (!this.isOwner) {
      return true;
    }
    let isVal = false;
    if (this.selectedQuestion.question.trim() === "") {
      window.error("Please Enter Question");
    } else if (
      !this.selectedQuestion.choices ||
      this.selectedQuestion.choices.length < 2
    ) {
      window.error("Please Enter 2 Choices Minimum");
    } else if (
      this.selectedQuestion.choices.filter((choice) => choice.answer).length ===
      0
    ) {
      window.error("Please Select right answer");
    } else {
      isVal = true;
    }
    return isVal;
  }

  setSelectedQuestionIndex(selectedQIndex) {
    // Data Changes
    this.selectedQuestion = this.questions[selectedQIndex];

    // UI Changes

    const goPreviousFn = () => {
      if (this.isValid()) {
        this.setSelectedQuestionIndex(
          this.questions.indexOf(this.selectedQuestion) - 1
        );
      }
    };

    const goNextFn = () => {
      if (this.isValid()) {
        this.setSelectedQuestionIndex(
          this.questions.indexOf(this.selectedQuestion) + 1
        );
      }
    };

    const paginationElement = this.parent.querySelector(".pagination");
    if (paginationElement) {
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

      if (this.isOwner) {
        this.questionEditor.value(
          this.selectedQuestion.question ? this.selectedQuestion.question : ""
        );
        this.explanationEditor.value(
          this.selectedQuestion.explanation
            ? this.selectedQuestion.explanation
            : ""
        );
      } else {
        this.questionEditor.innerHTML = window
          .markdownit()
          .renderInline(
            this.selectedQuestion.question ? this.selectedQuestion.question : ""
          );
        this.explanationEditor.innerHTML = window
          .markdownit()
          .renderInline(
            this.selectedQuestion.explanation
              ? this.selectedQuestion.explanation
              : ""
          );
        if (window.renderMath) {
          window.renderMath(this.questionEditor);
          window.renderMath(this.explanationEditor);
        }
      }

      this.renderAnswerElement();

      // Setting Answer
      // this.parent.querySelector("#answerElement").value = this.selectedQuestion
      //   .answer
      //   ? this.selectedQuestion.answer
      //   : "";
      if (this.questionEditor.codemirror) {
        this.questionEditor.codemirror.focus();
      }

      document.dispatchEvent(new Event("onrender"));
    }
  }

  render(_owner, _chaptorName) {
    this.isOwner = _owner;

    this.oldChildNodes = [];
    while (this.parent.firstChild) {
      this.oldChildNodes.push(this.parent.removeChild(this.parent.firstChild));
    }

    let questionsUrl;
    if (_chaptorName) {
      this.chaptorPath = _chaptorName;
      questionsUrl = "/api/questions/" + this.chaptorPath;
    }

    fetch(questionsUrl, {
      headers: window.ApplicationHeader(),
    })
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
        this.questions = window.shuffle(data);
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
        this.selectedQuestion.updated = true;
      }
    };

    const onChangeText = (event) => {
      setATxt(event.currentTarget.value);
    };

    const setChoices = (isSingle) => {
      if (!this.selectedQuestion.choices) {
        this.selectedQuestion.choices = [];
      }

      const answerContainer = this.parent.querySelector("#answerContainer");
      answerContainer.innerHTML = `<ul class="list-group">

      ${
        this.isOwner
          ? `<li class="list-group-item">
          <input class="form-control me-2" type="search" placeholder="Add New Choice. Press Enter" aria-label="Add New Choice">
          </li>`
          : ``
      }

      
      
    </ul>`;

      const selectedQuestion = this.selectedQuestion;

      const editChoice = (event) => {
        const parentLiEl = event.currentTarget.parentElement.parentElement;

        const choiceIndex =
          Array.from(parentLiEl.parentNode.children).indexOf(parentLiEl) - 1;

        const label = parentLiEl.children[0].children[1];
        const eOptions = event.currentTarget.parentElement;

        const textToEdit = document.createElement("input");
        textToEdit.classList.add("form-control");
        textToEdit.classList.add("me-2");
        textToEdit.value = label.innerHTML;

        label.classList.add("d-none");
        eOptions.classList.add("d-none");

        parentLiEl.children[0].insertBefore(textToEdit, label);

        textToEdit.focus();
        textToEdit.select();

        const afterSubmit = () => {
          textToEdit.parentElement.removeChild(textToEdit);
          label.innerHTML = textToEdit.value;
          selectedQuestion.choices[choiceIndex].value = textToEdit.value;
          label.classList.remove("d-none");
          eOptions.classList.remove("d-none");
        };

        textToEdit.addEventListener("focusout", afterSubmit);

        textToEdit.addEventListener("keydown", (event) => {
          if (event.isComposing || event.key === "Enter") {
            afterSubmit(event);
          }
        });

        //<input class="form-control me-2" type="search" placeholder="Add New Choice. Press Enter" aria-label="Add New Choice">

        console.log(label);
      };

      const removeChoice = (event) => {
        const parentLiEl = event.currentTarget.parentElement.parentElement;

        const choiceIndex =
          Array.from(parentLiEl.parentNode.children).indexOf(parentLiEl) - 1;

        selectedQuestion.choices.splice(choiceIndex, 1);
        parentLiEl.parentElement.removeChild(parentLiEl);
      };

      const setChoiceAnswer = (event) => {
        const parentLiEl = event.currentTarget.parentElement.parentElement;
        const choiceIndex =
          Array.from(parentLiEl.parentNode.children).indexOf(parentLiEl) - 1;

        if (this.isOwner) {
          if (event.currentTarget.type === "radio") {
            selectedQuestion.choices.forEach((choice, index) => {
              choice.answer = index === choiceIndex;
            });
          } else {
            selectedQuestion.choices[choiceIndex].answer =
              event.currentTarget.checked;
          }
        } else {
          if (event.currentTarget.type === "radio") {
            selectedQuestion.answer = event.currentTarget.value;
          } else {
            if (event.currentTarget.checked) {
              if (!selectedQuestion.answer) {
                selectedQuestion.answer = [];
              }

              selectedQuestion.answer.push(event.currentTarget.value);
            } else {
              selectedQuestion.answer.slice(event.currentTarget.value, 1);
            }
          }
        }
      };

      const renderChoice = (choice) => {
        const ulEl = answerContainer.firstElementChild;
        const liEl = document.createElement("li");
        liEl.classList.add("list-group-item");
        liEl.classList.add("d-flex");
        liEl.classList.add("justify-content-between");
        liEl.classList.add("align-items-center");
        liEl.innerHTML = `<div class="form-check">
    <input class="form-check-input" type="${isSingle ? "radio" : "checkbox"}" ${
          choice.answer ? " checked " : ""
        } name="flexRadioDefault" value="${choice.id}" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
   
    </label>
  </div>
  ${
    this.isOwner
      ? `<span class="badge text-dark rounded-pill justify-content-end"><i class="fa-solid fa-pen px-2"></i><i class="far fa-trash-alt" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></span>`
      : ``
  }
  
  
  
  
  `;
        ulEl.appendChild(liEl);
        if (this.isOwner) {
          liEl.querySelector(".fa-pen").addEventListener("click", editChoice);
          liEl
            .querySelector(".fa-trash-alt")
            .addEventListener("on-confirmation", removeChoice);
        }

        liEl
          .querySelector("#flexCheckDefault")
          .addEventListener("change", setChoiceAnswer);
        liEl.firstElementChild.children[1].innerHTML = choice.value;
        return liEl;
      };

      const renderChoices = () => {
        const choiceElms = [];
        if (selectedQuestion.choices !== 0) {
          window.shuffle(this.selectedQuestion.choices);
          this.selectedQuestion.choices.forEach((choice) => {
            choiceElms.push(renderChoice(choice));
          });
        }
        return choiceElms;
      };

      if (this.isOwner) {
        answerContainer
          .querySelector(".form-control")
          .addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
              event.preventDefault();
              if (event.currentTarget.value !== "") {
                const choice = {
                  value: event.currentTarget.value,
                };
                selectedQuestion.choices.push(choice);
                event.currentTarget.value = "";
                renderChoice(choice);
              }
            }
          });
      }

      const choiceElms = renderChoices();

      if (window.renderMath) {
        console.log("choiceElms " + choiceElms);
      }
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
      case "MULTI_LINE":
        this.parent.querySelector(
          "#answerContainer"
        ).innerHTML = `<textarea type="answer" class="form-control h-100" 
                           placeholder="Answer">${
                             this.selectedQuestion.answer
                               ? this.selectedQuestion.answer
                               : ""
                           }</textarea>
                          <label for="aTxt" >Answer</label>`;
        this.parent
          .querySelector("#answerContainer")
          .firstElementChild.addEventListener("change", onChangeText);
        break;
      case "CHOOSE_THE_BEST":
        setChoices(true);
        break;
      case "MULTI_CHOICE":
        setChoices(false);
        break;
      case "CODE_SQL":
        setCodeEditor("sql");
        break;
      case "CODE_JAVA":
        setCodeEditor("java");
        break;
      default:
        this.parent.querySelector(
          "#answerContainer"
        ).innerHTML = `<input type="answer" class="form-control" 
                          placeholder="Answer" value="${
                            this.selectedQuestion.answer
                              ? this.selectedQuestion.answer
                              : ""
                          }">
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
        explanation: "",
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
        this.deletedQuestionIds.push(this.selectedQuestion);
      }

      // Change the UI
      const paginationElement = screen.parent.querySelector(".pagination");
      if (paginationElement) {
        var liToKill = paginationElement.children[selectedIndex + 1];
        liToKill.parentNode.removeChild(liToKill);
      }

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

    const submitFn = () => {
      if (this.checkedBoxes) {
        this.checkedBoxes.forEach((input) => {
          input.parentElement.parentElement.classList.remove("bg-success");
          input.parentElement.parentElement.classList.remove("bg-danger");
        });
      }
      this.checkedBoxes = document.querySelectorAll("input:checked");

      if (this.selectedQuestion.answer) {
        const answer = Array.isArray(this.selectedQuestion.answer)
          ? this.selectedQuestion.answer.join(",")
          : this.selectedQuestion.answer;
        fetch("/api/questions/" + this.selectedQuestion.id + "/answer", {
          method: "POST",
          headers: window.ApplicationHeader(),
          body: answer,
        })
          .then((response) => {
            // Shorthand to check for an HTTP 2xx response status.
            // See https://fetch.spec.whatwg.org/#dom-response-ok
            if (response.ok) {
              this.checkedBoxes.forEach((input) => {
                console.log(
                  input.parentElement.parentElement.classList.add("bg-success")
                );
              });
            } else if (response.status === 406) {
              this.checkedBoxes.forEach((input) => {
                console.log(
                  input.parentElement.parentElement.classList.add("bg-danger")
                );
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    };
    const toggleFn = () => {
      this.isOwner = !this.isOwner;
      this.render(this.isOwner, this.chaptorName);
    };
    const saveFn = () => {
      if (this.isValid()) {
        const promises = [];

        this.questions.forEach((question) => {
          const addEndPointUrl =
            "/api/questions/" + question.type + "/" + this.chaptorPath;

          const updateEndPointUrl =
            "/api/questions/" + question.type + "/" + question.id;

          if (!question.id) {
            promises.push(
              fetch(addEndPointUrl, {
                method: "POST",
                headers: window.ApplicationHeader(),
                body: JSON.stringify(question),
              })
            );
          } else if (question.updated) {
            promises.push(
              fetch(updateEndPointUrl, {
                method: "PUT",
                headers: window.ApplicationHeader(),
                body: JSON.stringify(question),
              })
            );
          }
        });

        this.deletedQuestionIds.forEach((question) => {
          promises.push(
            fetch("/api/questions/" + question.type + "/" + question.id, {
              method: "DELETE",
              headers: window.ApplicationHeader(),
            })
          );
        });

        // eslint-disable-next-line no-undef
        Promise.allSettled(promises).then(() => {
          window.success("Questions Saved Successfully");
          toggleFn();
        });
      }
    };

    const setQTxt = () => {
      this.selectedQuestion.question = this.questionEditor.value();
      if (this.selectedQuestion.id) {
        this.selectedQuestion.updated = true;
      }
    };
    const setETxt = () => {
      this.selectedQuestion.explanation = this.explanationEditor.value();
      if (this.selectedQuestion.id) {
        this.selectedQuestion.updated = true;
      }
    };
    const selectQuestionFn = (event) => {
      if (this.isValid()) {
        const pageItem = event.currentTarget;
        this.setSelectedQuestionIndex(
          Array.from(pageItem.parentNode.children).indexOf(pageItem) - 1
        );
      }
    };

    screen.parent.innerHTML = `<div class="container vh-100">

          <div class="row">
          
            <div class="col-6">
            <div class="row">
            <div class="col-1 pe-0 text-center">
            ${
              screen.questions.length !== 0
                ? `
                <div class="btn-group" role="group" aria-label="Basic example">
                <button id="explainToggle" type="button" class="btn btn-outline-primary" data-bs-toggle='tooltip' data-bs-placement='bottom' title='Explain'>
                <i class="fa-solid fa-question" ></i>
                </button>
              </div>
              `
                : ``
            }
            </div>
            <div class="col-11 px-0">
            ${
              screen.questions.length !== 0
                ? `
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="javascript://" aria-label="Previous" id="previousPagination">
                  <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                  ${this.questions
                    .map(
                      (_question, index) => ` <li class="page-item q-selector">
                <a class="page-link" href="javascript://">${index + 1}</a></li>`
                    )
                    .join("")}
                <li class="page-item">
                  <a class="page-link" href="javascript://" aria-label="Next" id="nextPagination">
                  <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>`
                : ``
            }
            </div>
            </div>
            
              
              
            </div>
            <div class="col-6">
              <div class="dropdown float-end">
              ${
                screen.isOwner
                  ? `

                  <button type="button" class="delete-btn btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-trash-alt"></i></button> 

                  <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-plus"></i>
                  </button>
                  <ul class="dropdown-menu add-btns" aria-labelledby="dropdownMenuButton1">
                    <li data-type="CHOOSE_THE_BEST"><a class="dropdown-item" href="javascript://">Choose the best</a></li>
                    <li data-type="MULTI_CHOICE"><a class="dropdown-item" href="javascript://">Multi-choice</a></li>
                
                    
                  </ul>
                  <button type="button" class="toggle-btn btn"><i class="fa-regular fa-eye"></i></button>
                  <button type="button" class="save-btn btn"><i class="fa-solid fa-floppy-disk"></i></button>`
                  : `<button type="button" class="toggle-btn btn"><i class="fa-solid fa-pencil"></i></button>
                  <button type="button" class="submit-btn btn"><i class="fa-solid fa-check"></i></button>`
              }

              </div>
             
            </div>
          </div>


          ${
            screen.questions.length === 0
              ? `<p class="lead">There are no questions. But you can create one</p>`
              : `
              <div class="row h-50">
           <div class="col-6 ">

              <div class="form-floating mb-3 h-100">
              ${
                screen.isOwner
                  ? `<textarea class="form-control h-100" placeholder="Question" id="qTxt" rows="3"></textarea>`
                  : `<div class="h-100" id="qTxt"></div>`
              }
              
            </div>
           </div>
           <div class="col-6">
           <span id="explanationContainer" class="d-none">
           ${
             screen.isOwner
               ? `<textarea class="form-control h-100" placeholder="Explanation" id="eTxt" rows="3"></textarea>`
               : `<div class="h-100" id="eTxt"></div>`
           }
           </span>
               <div class="form-floating mb-3 h-100" style="height:100%" id="answerContainer">
               
             </div>
           </div>
         `
          }

          
        </div>`;

    if (document.getElementById("explainToggle")) {
      document.getElementById("explainToggle").addEventListener("click", () => {
        if (
          document
            .getElementById("answerContainer")
            .classList.contains("d-none")
        ) {
          document
            .getElementById("explanationContainer")
            .classList.add("d-none");
          document.getElementById("answerContainer").classList.remove("d-none");

          document
            .getElementById("explainToggle")
            .classList.add("btn-outline-primary");
          document
            .getElementById("explainToggle")
            .classList.remove("btn-primary");
        } else {
          document
            .getElementById("explanationContainer")
            .classList.remove("d-none");
          document.getElementById("answerContainer").classList.add("d-none");
          document
            .getElementById("explainToggle")
            .classList.remove("btn-outline-primary");
          document.getElementById("explainToggle").classList.add("btn-primary");
        }
      });
    }

    if (this.questions.length !== 0) {
      if (screen.isOwner) {
        // eslint-disable-next-line no-undef
        this.questionEditor = new SimpleMDE({
          autofocus: true,
          element: this.parent.querySelector("#qTxt"),
        });

        this.questionEditor.codemirror.on("change", function () {
          setQTxt();
        });
        // eslint-disable-next-line no-undef
        this.explanationEditor = new SimpleMDE({
          element: this.parent.querySelector("#eTxt"),
        });

        this.explanationEditor.codemirror.on("change", function () {
          setETxt();
        });
      } else {
        // eslint-disable-next-line no-undef
        this.questionEditor = this.parent.querySelector("#qTxt");
        this.explanationEditor = this.parent.querySelector("#eTxt");
      }

      // setSelectedQuestionIndex(0);

      screen.parent
        .querySelectorAll(".q-selector")
        .forEach((element) =>
          element.addEventListener("click", selectQuestionFn)
        );
    } else {
      screen.parent.querySelector(".delete-btn").style.display = "none";
    }

    //screen.parent.querySelector(".add-btn").parentElement.classList.add('active');
    if (screen.isOwner) {
      screen.parent
        .querySelector(".add-btns")
        .childNodes.forEach((element) =>
          element.addEventListener("click", addFunction)
        );
      screen.parent
        .querySelector(".save-btn")
        .addEventListener("click", saveFn);
      screen.parent
        .querySelector(".delete-btn")
        .addEventListener("on-confirmation", deleteFn);
    } else {
      screen.parent
        .querySelector(".submit-btn")
        .addEventListener("click", submitFn);
    }
    screen.parent
      .querySelector(".toggle-btn")
      .addEventListener("click", toggleFn);
  }
}
export default QuestionScreen;