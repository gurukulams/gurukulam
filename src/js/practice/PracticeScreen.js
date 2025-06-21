import QuestionPane from "./components/QuestionPane";

export default class PracticeScreen {
  constructor() {
    if (sessionStorage.auth) {
      this.addActions();
    } else {
      location.href = "/";
    }
  }

  addActions() {
    const navPane = document.getElementById("navPane");

    navPane.querySelectorAll("i").forEach(element => {
      const classList = element.classList;
      if(classList.contains("fa-question")) {
        element.addEventListener("click", () => this.doExplain());
      } else if(classList.contains("fa-pencil")) {
        element.addEventListener("click", () => this.doEdit());
      } else if(classList.contains("fa-trash-alt")) {
        element.addEventListener("on-confirmation", () => this.doDelete());
      } else if(classList.contains("fa-plus")) {
        element.addEventListener("click", () => this.doAdd());
      } else if(classList.contains("fa-floppy-disk")) {
        element.addEventListener("click", () => this.doSave());
      } else if(classList.contains("fa-check")) {
        element.addEventListener("click", () => this.doCheck());
      }
    });

    navPane.querySelectorAll("a.page-link").forEach(element => {
      if(element.ariaLabel === "Next") {
        element.addEventListener("click", () => this.doNext());
      } else if(element.ariaLabel === "Previous") {
        element.addEventListener("click", () => this.doPrevious());
      }
    });
  }

  doNext() {
    console.log("Next question");
  }

  doPrevious() {
    console.log("Previous question");
  }

  doExplain() {
    console.log("explanation Button clicked");
  }

  doDelete() {
    console.log("Delete Button clicked");
  }

  doAdd() {
    console.log("Add Button clicked");
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
