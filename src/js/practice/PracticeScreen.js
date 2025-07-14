import QuestionPane from "./components/QuestionPane";

export default class PracticeScreen {
  constructor() {
    if (sessionStorage.auth) {
      const pathname = window.location.pathname;
      const urlTokens = pathname.includes("/questions/")
        ? pathname.split("/questions/")
        : pathname.split("/quiz/");

      if (!urlTokens[1] || urlTokens[1].trim() === "") {
        window.location.href = "/";
      }

      this.questionsUrl = "/api/questions/" + urlTokens[1];

      const titleBarTxt = sessionStorage.getItem("titleBar");

      if (titleBarTxt) {
        document.querySelector(".breadcrumb").innerHTML = titleBarTxt;
        const lastBEl = document
          .querySelector(".breadcrumb")
          .querySelector(".active");
        if (lastBEl) {
          const anchorEl = document.createElement("a");
          anchorEl.href = document.referrer;
          anchorEl.innerHTML = lastBEl.innerHTML;
          lastBEl.innerHTML = "";
          lastBEl.appendChild(anchorEl);
        }
      }

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
        this.originalQuestions = JSON.parse(JSON.stringify(data));
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
      document.getElementById("notfound").classList.remove("d-none");
      document.getElementById("content").classList.add("d-none");
      const primaryAnchor = document
        .getElementById("notfound")
        .querySelector("a.btn-primary");
      primaryAnchor.href = document.referrer;
      primaryAnchor.innerHTML = "Go Back";
    } else {
      this.setQuestion(0);
      document.getElementById("notfound").classList.add("d-none");
      document.getElementById("content").classList.remove("d-none");
    }
  }

  setQuestion(questionIndex) {
    // is Practice Mode
    if (this.checkBtn && !this.checkBtn.classList.contains("d-none")) {
      this.explainToggleBtn.classList.add("d-none");
      this.doExplain(false);
    }

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

  doExplain(explain) {
    if (explain) {
      this.explainToggleBtn.classList.remove("btn-outline-primary");
      this.explainToggleBtn.classList.add("btn-primary");
    } else {
      this.explainToggleBtn.classList.remove("btn-primary");
      this.explainToggleBtn.classList.add("btn-outline-primary");
    }
    this.questionPane.doExplain(explain);
  }

  doDelete() {
    console.log("Delete Button clicked");
  }
  doAdd(QuestionType) {
    console.log("Add Button clicked for " + QuestionType);
  }

  doEdit() {
    if (this.modeBtn.classList.contains("fa-pencil")) {
      this.modeBtn.className = "fa-regular fa-eye";
      this.addBtn.classList.remove("d-none");
      this.deleteBtn.classList.remove("d-none");
      this.saveBtn.classList.remove("d-none");
      this.explainToggleBtn.classList.remove("d-none");
      this.checkBtn.classList.add("d-none");
      this.questionPane.readOnly = false;
      this.loadQuestions();
    } else {
      this.modeBtn.className = "fa-solid fa-pencil";
      this.addBtn.classList.add("d-none");
      this.deleteBtn.classList.add("d-none");
      this.saveBtn.classList.add("d-none");
      this.explainToggleBtn.classList.add("d-none");
      this.checkBtn.classList.remove("d-none");
      this.questionPane.readOnly = true;
    }
  }

  doSave() {
    console.log("Save Button clicked");
  }

  doSubmit() {
    console.log("Submit Button clicked");

    const statusTxt = document.getElementById("statusTxt");

    statusTxt.innerHTML = "";

    const cIndex = this.currentQuestionIndex;

    let correctAnswers = 0;

    for (let i = 0; i < this.questions.length; i++) {
      this.setQuestion(i);
      if (this.doCheck(true)) {
        correctAnswers++;
      }
    }

    this.setQuestion(cIndex);

    statusTxt.innerHTML =
      "<span class='text-primary'>Congratulations !</span> You Scored <span class='text-success'>" +
      correctAnswers +
      "</span> out of " +
      this.questions.length;
  }

  doCheck(silentMode) {
    const question = this.questionPane.getQuestion();
    const answerText = this.questionPane.getAnswer();
    let isCorrect = false;

    if (answerText === "" && !silentMode) {
      window.error("Please Select Answer");
    } else {
      switch (question.type) {
        case "CHOOSE_THE_BEST": {
          const correctChoice = question.choices.find(
            (choice) => choice.answer === true
          );
          isCorrect = correctChoice && correctChoice.id === answerText;
          break;
        }

        case "MULTI_CHOICE": {
          const correctChoiceIds = question.choices
            .filter((choice) => choice.answer === true)
            .map((choice) => choice.id)
            .sort();

          const selectedChoiceIds = answerText
            .split(",")
            .map((id) => id.trim())
            .sort();

          isCorrect =
            JSON.stringify(correctChoiceIds) ===
            JSON.stringify(selectedChoiceIds);
          break;
        }

        case "MATCH_THE_FOLLOWING": {
          if (this.originalQuestions) {
            const originalQuestion = this.originalQuestions.find(
              (q) => q.id === question.id
            );

            if (originalQuestion) {
              const fullList = [
                ...originalQuestion.choices,
                ...originalQuestion.matches.slice(
                  0,
                  originalQuestion.choices.length
                ),
              ];
              const correctAnswer = fullList.map((item) => item.id).join(",");
              isCorrect = correctAnswer === answerText;
            }
          }
          break;
        }
      }

      if (isCorrect) {
        this.questionPane.verify(true);
        if (!silentMode) {
          window.success("Correct Answer");
        }
        if (this.explainToggleBtn) {
          this.explainToggleBtn.classList.remove("btn-outline-danger");
          this.explainToggleBtn.classList.add("btn-outline-success");
          this.explainToggleBtn.classList.remove("d-none");
        }
      } else {
        this.questionPane.verify(false);
        if (!silentMode) {
          window.error("Wrong Answer");
        }
        if (this.explainToggleBtn) {
          this.explainToggleBtn.classList.remove("btn-outline-success");
          this.explainToggleBtn.classList.add("btn-outline-danger");
          this.explainToggleBtn.classList.remove("d-none");
        }
      }
      return isCorrect;
    }
  }

  addActions() {
    const navPane = document.getElementById("navPane");
    const fabPane = document.getElementById("fabPane");

    fabPane.querySelectorAll("i").forEach((element) => {
      const classList = element.classList;
      if (classList.contains("fa-floppy-disk")) {
        element.parentElement.addEventListener("click", () => this.doSave());
        this.saveBtn = element.parentElement;
      } else if (classList.contains("fa-check")) {
        this.checkBtn = element.parentElement;
        element.parentElement.addEventListener("click", () => this.doCheck());
      } else if (classList.contains("fa-envelope")) {
        this.submitBtn = element.parentElement;
        element.parentElement.addEventListener("click", () => this.doSubmit());
      }
    });

    navPane.querySelectorAll("i").forEach((element) => {
      const classList = element.classList;
      if (classList.contains("fa-question")) {
        this.explainToggleBtn = element.parentElement;
        this.explainToggleBtn.addEventListener("click", () =>
          this.doExplain(
            !this.explainToggleBtn.classList.contains("btn-primary")
          )
        );
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
