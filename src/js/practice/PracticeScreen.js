import QuestionPane from "./components/QuestionPane";

export default class PracticeScreen {
  constructor() {

    // On the current page:
    const urlParams = new URLSearchParams(window.location.search);
    const previousPageTitle = urlParams.get('prevTitle');
    if (previousPageTitle) {
        console.log("Previous page title:", previousPageTitle);
    }

    if (sessionStorage.auth) {
      const urlTokens = window.location.pathname.split("/questions/");

      if (!urlTokens[1] || urlTokens[1].trim() === "") {
        window.location.href = "/";
      }

      this.questionsUrl = "/api/questions/" + urlTokens[1];

      this.questionPane = new QuestionPane();
      this.questionPane.readOnly = true;

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
    if (this.explainToggleBtn.classList.contains("btn-primary")) {
      this.explainToggleBtn.classList.remove("btn-primary");
      this.explainToggleBtn.classList.add("btn-outline-primary");
      this.questionPane.doExplain(false);
    } else {
      this.explainToggleBtn.classList.remove("btn-outline-primary");
      this.explainToggleBtn.classList.add("btn-primary");
      this.questionPane.doExplain(true);
    }
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
      this.questionPane.readOnly = false;
      this.loadQuestions();
    } else {
      this.modeBtn.className = "fa-solid fa-pencil";
      this.addBtn.classList.add("d-none");
      this.deleteBtn.classList.add("d-none");
      this.saveBtn.classList.add("d-none");
      this.checkBtn.classList.remove("d-none");
      this.questionPane.readOnly = true;
    }
  }

  doSave() {
    console.log("Save Button clicked");
  }

  doCheck() {
    console.log("Check Button clicked");
    const question = this.questionPane.getQuestion();
    const answerText = this.questionPane.getAnswer();

    if(answerText === '') {
      window.error("Please Select Answer");
    } else {
      fetch("/api/questions/" + question.id + "/answer", {
        method: "POST",
        headers: window.ApplicationHeader(),
        body: answerText,
      })
        .then((response) => {
          // Shorthand to check for an HTTP 2xx response status.
          // See https://fetch.spec.whatwg.org/#dom-response-ok
          if (response.ok) {
            this.questionPane.verify(true);
          } else if (response.status === 406) {
            this.questionPane.verify(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }


  }

  addActions() {
    const navPane = document.getElementById("navPane");

    navPane.querySelectorAll("i").forEach((element) => {
      const classList = element.classList;
      if (classList.contains("fa-question")) {
        this.explainToggleBtn = element.parentElement;
        this.explainToggleBtn.addEventListener("click", () => this.doExplain());
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
