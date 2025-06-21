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
      console.log(element);
    });

    navPane.querySelectorAll("a.page-link").forEach(element => {
      console.log(element);
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
