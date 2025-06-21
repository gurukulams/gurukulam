import QuestionPane from "./components/QuestionPane";

export default class PracticeScreen {
  constructor() {
    if (sessionStorage.auth) {
    } else {
      location.href = "/";
    }

    this.nextButton = document.querySelector('a.page-link[aria-label="Next"]');
    this.previousButton = document.querySelector('a.page-link[aria-label="Previous"]');
    this.explainBtn = document.getElementById("explainToggle");
    this.deleteButton = document.querySelector('.fa-trash-alt');
    this.addButton = document.getElementById('dropdownMenuButton1');
    this.editButton = document.querySelector('.fa-pencil');
    this.saveButton = document.querySelector('.fa-floppy-disk');
    this.checkButton = document.querySelector('.fa-check');

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => {
        this.doNext();
      });
    }

    if (this.previousButton) {
      this.previousButton.addEventListener('click', () => {
        this.doPrevious();
      });
    }

    if (this.explainBtn) {
      this.explainBtn.addEventListener('click', () => {
        this.doExplain();
      });
    }

    if (this.deleteButton) {
      this.deleteButton.addEventListener('click', () => 
        this.doDelete());
    }

    if (this.addButton) {
      this.addButton.addEventListener('click', () => {
        this.doAdd();
      });
    }

    if (this.editButton) {
      this.editButton.addEventListener('click', () => {
        this.doEdit();
      });
    }

    if (this.saveButton) {
      this.saveButton.addEventListener('click', () => {
        this.doSave();
      });
    }

    if (this.checkButton) {
      this.checkButton.addEventListener('click', () => {
        this.doCheck();
      });
    }

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
