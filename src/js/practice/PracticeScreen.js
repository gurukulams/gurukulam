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
    this.currentQuestionIndex = 0; 
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

    if(this.questions.length === 0) {
      console.log("Empty Questions");
    } else {
      this.questionPane.setQuestion(this.questions[0]);
    }
  }

  addActions() {
    const navPane = document.getElementById("navPane");

    navPane.querySelectorAll("i").forEach(element => {
      const classList = element.classList;
      if (classList.contains("fa-question")) {
        element.addEventListener("click", () => this.doExplain());
      } else if (classList.contains("fa-pencil")) {
        element.addEventListener("click", () => this.doEdit());
      } else if (classList.contains("fa-trash-alt")) {
        element.parentElement.addEventListener("on-confirmation", () => this.doDelete());
      } else if (classList.contains("fa-plus")) {
        const ulEl = element.parentElement.nextElementSibling;

        ulEl.querySelectorAll("li").forEach(liElement => {
          liElement.addEventListener("click", () => this.doAdd(liElement.dataset.type));
        })

      } else if (classList.contains("fa-floppy-disk")) {
        element.addEventListener("click", () => this.doSave());
      } else if (classList.contains("fa-check")) {
        element.addEventListener("click", () => this.doCheck());
      }
    });

    navPane.querySelectorAll("a.page-link").forEach(element => {
      if (element.ariaLabel === "Next") {
        element.addEventListener("click", () => this.doNext());
      } else if (element.ariaLabel === "Previous") {
        element.addEventListener("click", () => this.doPrevious());
      }
    });
  }

  doNext() {
    console.log("Next question");
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      const nextQ = this.questions[this.currentQuestionIndex];
      this.questionPane.setQuestion(nextQ);
    }
  }

  doPrevious() {
    console.log("Previous question");
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.questionPane.setQuestion(this.questions[this.currentQuestionIndex]);
    }
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
    console.log("Edit Button clicked");
  }

  doSave() {
    console.log("Save Button clicked");
  }

  doCheck() {
    console.log("Check Button clicked");
  }

}
