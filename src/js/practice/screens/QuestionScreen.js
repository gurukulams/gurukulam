export default class QuestionScreen {
  constructor(_parent) {
    this.parent = _parent;
    this.isEditable = false;
    this.questions = [];
    this.selectedQuestionIndex = 0;

    this.deletedQuestions = new Set();
    this.updatedQuestions = new Set();
    this.addedQuestions = new Set();

    // Model Objects
    const urlTokens = window.location.pathname.split("/questions/");

    if (!urlTokens[1] || urlTokens[1].trim() === "") {
      window.location.href = "/";
    }

    this.chaptorPath = urlTokens[1];

    this.questionsUrl = "/api/questions/" + this.chaptorPath;

    this.setupLanguage(urlTokens);

    // eslint-disable-next-line no-undef
    this.questionEditor = new EasyMDE({
      autofocus: true,
      element: document.querySelector("#qTxt"),
    });
    // eslint-disable-next-line no-undef
    this.explanationEditor = new EasyMDE({
      element: document.querySelector("#eTxt"),
    });

    this.answerContainer = document.getElementById("answerContainer");

    document
      .querySelectorAll(".editor-toolbar")
      .forEach((element) => element.classList.add("d-none"));
    document
      .querySelectorAll(".editor-statusbar")
      .forEach((element) => element.classList.add("d-none"));

    this.questionEditor.togglePreview();
    this.explanationEditor.togglePreview();

    this.registerEvents();
  }

  setupLanguage(urlTokens) {
    const elements = document.querySelector(
      '[aria-labelledby="languageBtn"]'
    ).children;

    for (let element of elements) {
      if (element.children[0].dataset.code === "en") {
        element.children[0].href = "/questions/" + this.chaptorPath;
      } else {
        element.children[0].href =
          "/" +
          element.children[0].dataset.code +
          "/questions/" +
          this.chaptorPath;
      }
    }

    if (urlTokens[0] !== "") {
      const languageCode = urlTokens[0].substring(1);
      window.LANGUAGE = languageCode;

      for (let element of elements) {
        if (languageCode === element.children[0].dataset.code) {
          console.log(element.children[0]);

          document.getElementById("languageBtn").textContent =
            element.children[0].textContent;

          element.children[0].textContent = "English";
          element.children[0].setAttribute(
            "href",
            "/questions/" + this.chaptorPath
          );

          break;
        }
      }
    }
  }

  registerEvents() {
    const explainToggleBtn = document.getElementById("explainToggle");
    const explanationContainer = document.getElementById(
      "explanationContainer"
    );

    explainToggleBtn.addEventListener("click", () => {
      if (this.answerContainer.classList.contains("d-none")) {
        explanationContainer.classList.add("d-none");
        this.answerContainer.classList.remove("d-none");
        explainToggleBtn.classList.add("btn-outline-primary");
        explainToggleBtn.classList.remove("btn-primary");
      } else {
        explanationContainer.classList.remove("d-none");
        this.answerContainer.classList.add("d-none");
        explainToggleBtn.classList.remove("btn-outline-primary");
        explainToggleBtn.classList.add("btn-primary");
      }
    });

    document
      .querySelector(".add-btns")
      .childNodes.forEach((element) =>
        element.addEventListener("click", (event) => this.createQuestion(event))
      );

    document
      .querySelector("i.fa-pencil")
      .parentElement.addEventListener("click", () => {
        this.toggleEditor();
      });

    document
      .querySelector("i.fa-check")
      .parentElement.addEventListener("click", () => {
        this.answer();
      });

    document
      .querySelector("i.fa-floppy-disk")
      .parentElement.addEventListener("click", () => {
        this.save();
      });
    document
      .querySelector("i.fa-trash-alt")
      .parentElement.addEventListener("on-confirmation", () => this.delete());

    this.previousBtn = document.querySelector('[aria-label="Previous"]');
    this.nextBtn = document.querySelector('[aria-label="Next"]');
    this.previousBtn.addEventListener("click", () => {
      this.previous();
    });

    this.nextBtn.addEventListener("click", () => {
      this.next();
    });
  }

  createQuestion(event) {
    const newQuestion = {
      question: "",
      explanation: "",
      type: event.currentTarget.dataset.type,
    };
    this.questions.push(newQuestion);
    this.selectedQuestionIndex = this.questions.length - 1;
    this.addedQuestions.add(newQuestion);
    this.setCurrentQuestion();
  }

  save() {
    if (this.getQuestion()) {
      console.log("Save");
      const promises = [];
      this.deletedQuestions.forEach((question) => {
        promises.push(
          fetch("/api/questions/" + question.type + "/" + question.id, {
            method: "DELETE",
            headers: window.ApplicationHeader(),
          })
        );
      });

      this.updatedQuestions.forEach((question) => {
        promises.push(
          fetch("/api/questions/" + question.type + "/" + question.id, {
            method: "PUT",
            headers: window.ApplicationHeader(),
            body: JSON.stringify(question),
          })
        );
      });

      this.addedQuestions.forEach((question) => {
        promises.push(
          fetch("/api/questions/" + question.type + "/" + this.chaptorPath, {
            method: "POST",
            headers: window.ApplicationHeader(),
            body: JSON.stringify(question),
          })
        );
      });

      // eslint-disable-next-line no-undef
      Promise.allSettled(promises).then(() => {
        window.success("Questions Saved Successfully");
        this.loadQuestions();
      });
    }
  }

  loadQuestions() {
    fetch(this.questionsUrl, {
      headers: window.ApplicationHeader(),
    })
      .then((response) => {
        // Shorthand to check for an HTTP 2xx response status.
        // See https://fetch.spec.whatwg.org/#dom-response-ok
        if (response.ok) {
          if (response.status === 204) {
            this.questions = [];
          }
          return response.json();
        } else {
          // Raise an exception to reject the promise and trigger the outer .catch() handler.
          // By default, an error response status (4xx, 5xx) does NOT cause the promise to reject!
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        this.setQuestions(window.shuffle(data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  toggleEditor(intial = false) {
    this.isEditable = !this.isEditable;

    if (!intial) {
      this.setCurrentQuestion();
    }

    this.questionEditor.togglePreview();
    this.explanationEditor.togglePreview();

    const icon = document.getElementById("toggleViewBtn").firstChild;
    const saveBtn = document.querySelector(".fa-floppy-disk").parentElement;
    const addBtn = document.querySelector(".fa-plus").parentElement;
    const deleteBtn = document.querySelector(".fa-trash-alt").parentElement;

    const verifyBtn = document.querySelector(".fa-check").parentElement;

    if (this.isEditable) {
      icon.classList.add("fa-regular", "fa-eye");
      icon.classList.remove("fa-solid", "fa-pencil");

      saveBtn.classList.remove("d-none");
      addBtn.classList.remove("d-none");
      deleteBtn.classList.remove("d-none");

      verifyBtn.classList.add("d-none");

      document
        .querySelectorAll(".editor-toolbar")
        .forEach((element) => element.classList.remove("d-none"));
      document
        .querySelectorAll(".editor-statusbar")
        .forEach((element) => element.classList.remove("d-none"));
    } else {
      icon.classList.remove("fa-regular", "fa-eye");
      icon.classList.add("fa-solid", "fa-pencil");

      saveBtn.classList.add("d-none");
      addBtn.classList.add("d-none");
      deleteBtn.classList.add("d-none");

      verifyBtn.classList.remove("d-none");

      document
        .querySelectorAll(".editor-toolbar")
        .forEach((element) => element.classList.add("d-none"));
      document
        .querySelectorAll(".editor-statusbar")
        .forEach((element) => element.classList.add("d-none"));
    }
  }

  setQuestions(questions) {
    this.questions = questions;
    this.selectedQuestionIndex = 0;
    this.setCurrentQuestion();
  }

  delete() {
    const indexTobeDeleted = this.selectedQuestionIndex;

    const questionId = this.questions[indexTobeDeleted].id;

    this.updatedQuestions.forEach((question) => {
      if (question.id === questionId) {
        this.updatedQuestions.delete(question);
      }
    });

    this.deletedQuestions.add(this.questions[indexTobeDeleted]);

    // Last Element. Go to First
    if (indexTobeDeleted === this.questions.length - 1) {
      this.selectedQuestionIndex = 0;
    }

    this.questions.splice(indexTobeDeleted, 1);

    this.setCurrentQuestion();
  }

  previous() {
    if (this.getQuestion()) {
      this.selectedQuestionIndex = this.selectedQuestionIndex - 1;
      this.setCurrentQuestion();
    }
  }

  next() {
    if (this.getQuestion()) {
      this.selectedQuestionIndex = this.selectedQuestionIndex + 1;
      this.setCurrentQuestion();
    }
  }

  setCurrentQuestion() {
    if (this.questions[this.selectedQuestionIndex]) {
      document.getElementById("questionPane").classList.remove("d-none");
      document.getElementById("emptyPane").classList.add("d-none");
      document.getElementById("navPane").classList.remove("invisible");

      document
        .getElementById("actionsPane")
        .querySelectorAll("i")
        .forEach((element) => {
          if (!element.classList.contains("fa-plus")) {
            element.classList.remove("d-none");
          }
        });

      this.setQuestion(this.questions[this.selectedQuestionIndex]);

      if (this.selectedQuestionIndex === this.questions.length - 1) {
        this.nextBtn.parentElement.classList.add("disabled");
      } else {
        this.nextBtn.parentElement.classList.remove("disabled");
      }

      if (this.selectedQuestionIndex === 0) {
        this.previousBtn.parentElement.classList.add("disabled");
      } else {
        this.previousBtn.parentElement.classList.remove("disabled");
      }
    } else {
      document.getElementById("questionPane").classList.add("d-none");
      document.getElementById("emptyPane").classList.remove("d-none");

      document.getElementById("navPane").classList.add("invisible");

      document
        .getElementById("actionsPane")
        .querySelectorAll("i")
        .forEach((element) => {
          if (!element.classList.contains("fa-plus")) {
            element.classList.add("d-none");
          }
        });

      this.toggleEditor(true);
    }
  }

  answer() {
    const selectedQuestion = this.questions[this.selectedQuestionIndex];
    let selectedCheckBoxes, answers;
    switch (selectedQuestion.type) {
      case "CHOOSE_THE_BEST":
      case "MULTI_CHOICE":
        selectedCheckBoxes = document.querySelectorAll("input");
        answers = [];
        selectedCheckBoxes.forEach((input) => {
          input.parentElement.parentElement.classList.remove("bg-success");
          input.parentElement.parentElement.classList.remove("bg-danger");
          if (input.checked) {
            answers.push(input.value);
          }
        });

        if (answers.length === 0) {
          window.error("Please Select Answer");
        } else {
          fetch("/api/questions/" + selectedQuestion.id + "/answer", {
            method: "POST",
            headers: window.ApplicationHeader(),
            body: answers.join(","),
          })
            .then((response) => {
              // Shorthand to check for an HTTP 2xx response status.
              // See https://fetch.spec.whatwg.org/#dom-response-ok
              if (response.ok) {
                selectedCheckBoxes.forEach((input) => {
                  if (input.checked) {
                    input.parentElement.parentElement.classList.add(
                      "bg-success"
                    );
                  }
                });
              } else if (response.status === 406) {
                selectedCheckBoxes.forEach((input) => {
                  if (input.checked) {
                    input.parentElement.parentElement.classList.add(
                      "bg-danger"
                    );
                  }
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }

        break;
    }
  }

  getQuestion() {
    if (this.isEditable) {
      const selectedQuestion = this.questions[this.selectedQuestionIndex];
      if (selectedQuestion && this.isValid()) {
        let isChanged = false;
        if (selectedQuestion.question !== this.questionEditor.value()) {
          selectedQuestion.question = this.questionEditor.value();
          isChanged = true;
        }
        if (selectedQuestion.explanation !== this.explanationEditor.value()) {
          selectedQuestion.explanation = this.explanationEditor.value();
          isChanged = true;
        }

        if (selectedQuestion.choices) {
          selectedQuestion.choices.forEach((choice) => {
            // There is New Choice
            if (!choice.id) {
              isChanged = true;
            }
          });
        }

        if (isChanged) {
          this.markUpdated(selectedQuestion);
        }
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  isValid() {
    let isVal = false;
    if (this.questionEditor.value().trim() === "") {
      window.error("Please Enter Question");
    } else {
      isVal = true;
    }
    return isVal;
  }

  setQuestion(selectedQuestion) {
    this.questionEditor.value(
      selectedQuestion.question ? selectedQuestion.question : ""
    );
    this.explanationEditor.value(
      selectedQuestion.explanation ? selectedQuestion.explanation : ""
    );

    switch (selectedQuestion.type) {
      case "CHOOSE_THE_BEST":
        this.setChoices(true, selectedQuestion);
        break;
      case "MULTI_CHOICE":
        this.setChoices(false, selectedQuestion);
        break;
    }
  }

  setChoices(isSingle, selectedQuestion) {
    this.answerContainer.innerHTML = `<ul class="list-group">

    ${
      this.isEditable
        ? `<li class="list-group-item">
        <input class="form-control me-2" type="search" placeholder="Add New Choice. Press Enter" aria-label="Add New Choice">
        </li>`
        : ``
    }

    
    
  </ul>`;

    if (selectedQuestion.choices) {
      window.shuffle(selectedQuestion.choices);
    } else {
      selectedQuestion.choices = [];
    }

    selectedQuestion.choices.forEach((choice) => {
      this.setChoice(isSingle, choice);
    });

    if (this.isEditable) {
      this.answerContainer
        .querySelector(".form-control")
        .addEventListener("keyup", (event) => {
          if (event.keyCode === 13) {
            event.preventDefault();
            if (event.currentTarget.value !== "") {
              const choice = {
                value: event.currentTarget.value,
              };
              selectedQuestion.choices.push(choice);
              event.currentTarget.value = "";
              this.setChoice(isSingle, choice);
            }
          }
        });
    }
  }

  setChoice(isSingle, choice) {
    const ulEl = this.answerContainer.firstElementChild;
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item");
    liEl.classList.add("d-flex");
    liEl.classList.add("justify-content-between");
    liEl.classList.add("align-items-center");
    liEl.innerHTML = `<div class="form-check">
  <input class="form-check-input" type="${isSingle ? "radio" : "checkbox"}" ${
      this.isEditable && choice.answer ? "checked" : ""
    }
    name="flexRadioDefault" value="${choice.id}" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">

  </label>
</div>
${
  this.isEditable
    ? `<span class="badge text-dark rounded-pill justify-content-end"><i class="fa-solid fa-pen px-2"></i><i
    class="far fa-trash-alt" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></span>`
    : ``
}




`;
    ulEl.appendChild(liEl);

    if (this.isEditable) {
      liEl
        .querySelector(".fa-pen")
        .addEventListener("click", (event) => this.editChoice(event));
      liEl
        .querySelector(".fa-trash-alt")
        .addEventListener("on-confirmation", (event) =>
          this.removeChoice(event)
        );
    }

    liEl.firstElementChild.children[1].innerHTML = choice.value;
    return liEl;
  }

  editChoice(event) {
    const selectedQuestion = this.questions[this.selectedQuestionIndex];
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
      if (textToEdit.value !== selectedQuestion.choices[choiceIndex].value) {
        label.innerHTML = textToEdit.value;
        selectedQuestion.choices[choiceIndex].value = textToEdit.value;
        this.markUpdated(selectedQuestion);
      }
      label.classList.remove("d-none");
      eOptions.classList.remove("d-none");
    };

    textToEdit.addEventListener("focusout", afterSubmit);

    textToEdit.addEventListener("keydown", (event) => {
      if (event.isComposing || event.key === "Enter") {
        afterSubmit(event);
      }
    });
  }

  markUpdated(selectedQuestion) {
    if (selectedQuestion.id) {
      this.updatedQuestions.add(selectedQuestion);
    }
  }

  removeChoice(event) {
    const selectedQuestion = this.questions[this.selectedQuestionIndex];
    const parentLiEl = event.currentTarget.parentElement.parentElement;

    const choiceIndex =
      Array.from(parentLiEl.parentNode.children).indexOf(parentLiEl) - 1;
    this.markUpdated(selectedQuestion);

    selectedQuestion.choices.splice(choiceIndex, 1);
    parentLiEl.parentElement.removeChild(parentLiEl);
  }
}
