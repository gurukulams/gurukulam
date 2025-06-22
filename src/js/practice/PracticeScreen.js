import QuestionPane from "./components/QuestionPane";

export default class PracticeScreen {
  constructor() {
    if (sessionStorage.auth) {
      const urlTokens = window.location.pathname.split("/questions/");

      if (!urlTokens[1] || urlTokens[1].trim() === "") {
        window.location.href = "/";
      }

      this.questionsUrl = "/api/questions/" + urlTokens[1];

      this.questionPane = new QuestionPane();

      this.addActions();
      this.loadQuestions();
    } else {
      location.href = "/";
    }
  }

  loadQuestions() {
    fetch(this.questionsUrl, {
      headers: window.ApplicationHeader(),
    })
      .then((response) => {
        if (response.ok) {
          if (response.status === 204) {
            this.setQuestions([]);
          }
          return response.json();
        } else {
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

  setQuestions(_questions) {
    this.questions = _questions;
    this.currentQuestionIndex = 0;

    if (this.questions.length === 0) {
      console.log("Empty Questions");
    } else {
      this.setQuestion(0);
    }
  }

  setQuestion(questionIndex) {
    
    if (questionIndex === this.questions.length - 1) {
      this.nextBtn.classList.add("disabled");
    } else {
      this.nextBtn.classList.remove("disabled");
    }

    if (questionIndex === 0) {
      this.previousBtn.classList.add("disabled");
    } else {
      this.previousBtn.classList.remove("disabled");
    }

    this.currentQuestionIndex = questionIndex;
    this.questionPane.setQuestion(this.questions[this.currentQuestionIndex]);
  }

  doNext() {
    this.setQuestion(this.currentQuestionIndex + 1);
  }

  doPrevious() {
    this.setQuestion(this.currentQuestionIndex - 1);
  }

  doExplain() {
    console.log("explanation Button clicked");
  }

  doDelete() {
    console.log("Delete Button clicked");
  }
  doAdd(QuestionType) {
    console.log("Add Button clicked for " + QuestionType);
  }

  doEdit() {
    if( this.modeBtn.classList.contains("fa-pencil") ) {
      this.modeBtn.className = "fa-regular fa-eye";
      this.addBtn.classList.remove("d-none");
      this.deleteBtn.classList.remove("d-none");
      this.saveBtn.classList.remove("d-none");
      this.checkBtn.classList.add("d-none");
    } else {
      this.modeBtn.className = "fa-solid fa-pencil";
      this.addBtn.classList.add("d-none");
      this.deleteBtn.classList.add("d-none");
      this.saveBtn.classList.add("d-none");
      this.checkBtn.classList.remove("d-none");
    }
  }

  doSave() {
    console.log("Save Button clicked");
  }

  doCheck() {
    console.log("Check Button clicked");
  }

  addActions() {
    const navPane = document.getElementById("navPane");

    navPane.querySelectorAll("i").forEach((element) => {
      const classList = element.classList;
      if (classList.contains("fa-question")) {
        element.parentElement.addEventListener("click", () => this.doExplain());
      } else if (classList.contains("fa-pencil")) {
        this.modeBtn = element;
        element.parentElement.addEventListener("click", () => this.doEdit());
      } else if (classList.contains("fa-trash-alt")) {
        this.deleteBtn = element.parentElement;
        element.parentElement.addEventListener("on-confirmation", () =>
          this.doDelete()
        );
      } else if (classList.contains("fa-plus")) {
        const ulEl = element.parentElement.nextElementSibling;
        this.addBtn = element.parentElement;
        ulEl.querySelectorAll("li").forEach((liElement) => {
          liElement.parentElement.addEventListener("click", () =>
            this.doAdd(liElement.dataset.type)
          );
        });
      } else if (classList.contains("fa-floppy-disk")) {
        element.parentElement.addEventListener("click", () => this.doSave());
        this.saveBtn = element.parentElement;
      } else if (classList.contains("fa-check")) {
        this.checkBtn = element.parentElement;
        element.parentElement.addEventListener("click", () => this.doCheck());
      }
    });

    navPane.querySelectorAll("a.page-link").forEach((element) => {
      if (element.ariaLabel === "Next") {
        this.nextBtn = element;
        element.addEventListener("click", () => this.doNext());
      } else if (element.ariaLabel === "Previous") {
        this.previousBtn = element;
        element.addEventListener("click", () => this.doPrevious());
      }
    });
  }
}
