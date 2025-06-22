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
    this.currentQuestionIndex = questionIndex;
    this.questionPane.setQuestion(this.questions[this.currentQuestionIndex]);

    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.nextBtn.parentElement.classList.add("disabled");
    } else {
      this.nextBtn.parentElement.classList.remove("disabled");
    }

    if (this.currentQuestionIndex === 0) {
      this.previousBtn.parentElement.classList.add("disabled");
    } else {
      this.previousBtn.parentElement.classList.remove("disabled");
    }
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
    } else {
      this.modeBtn.className = "fa-solid fa-pencil";
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
        element.addEventListener("click", () => this.doExplain());
      } else if (classList.contains("fa-pencil")) {
        this.modeBtn = element;
        element.addEventListener("click", () => this.doEdit());
      } else if (classList.contains("fa-trash-alt")) {
        element.parentElement.addEventListener("on-confirmation", () =>
          this.doDelete()
        );
      } else if (classList.contains("fa-plus")) {
        const ulEl = element.parentElement.nextElementSibling;

        ulEl.querySelectorAll("li").forEach((liElement) => {
          liElement.addEventListener("click", () =>
            this.doAdd(liElement.dataset.type)
          );
        });
      } else if (classList.contains("fa-floppy-disk")) {
        element.addEventListener("click", () => this.doSave());
      } else if (classList.contains("fa-check")) {
        element.addEventListener("click", () => this.doCheck());
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
