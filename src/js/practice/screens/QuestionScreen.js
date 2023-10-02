export default class QuestionScreen {
  constructor(_parent) {
    this.parent = _parent;
    this.isEditable = false;
    this.questions = [];
    this.selectedQuestionIndex = 0;

    this.deletedQuestionIds = [];

    // Model Objects
    const urlTokens = window.location.pathname.split("/questions/");
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
      .querySelector("i.fa-pencil")
      .parentElement.addEventListener("click", (event) => {
        this.toggleEditor(event);
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

  save() {
    console.log("Save");
    console.log(this.deletedQuestionIds);
  }

  toggleEditor(event) {
    this.isEditable = !this.isEditable;

    this.setCurrentQuestion();

    this.questionEditor.togglePreview();
    this.explanationEditor.togglePreview();

    const icon = event.currentTarget.firstChild;
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
    this.deletedQuestionIds.push(this.questions[indexTobeDeleted].id);

    // Last Element. Go to First
    if (indexTobeDeleted === this.questions.length - 1) {
      this.selectedQuestionIndex = 0;
    }

    this.questions.splice(indexTobeDeleted, 1);

    this.setCurrentQuestion();
  }

  previous() {
    this.selectedQuestionIndex = this.selectedQuestionIndex - 1;
    this.setCurrentQuestion();
  }

  next() {
    this.selectedQuestionIndex = this.selectedQuestionIndex + 1;
    this.setCurrentQuestion();
  }

  setCurrentQuestion() {
    if (this.questions[this.selectedQuestionIndex]) {
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
      document.getElementById(
        "questionPane"
      ).innerHTML = `<p class="lead">There are no questions. But you can create one</p>`;
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
                  input.parentElement.parentElement.classList.add("bg-success");
                }
              });
            } else if (response.status === 406) {
              selectedCheckBoxes.forEach((input) => {
                if (input.checked) {
                  input.parentElement.parentElement.classList.add("bg-danger");
                }
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        break;
    }
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
    liEl.firstElementChild.children[1].innerHTML = choice.value;
    return liEl;
  }
}
