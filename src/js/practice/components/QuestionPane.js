// web component
export default class QuestionPane {
  
  constructor() {
    this.questionPane = document.getElementById("questionPane");

    // eslint-disable-next-line no-undef
    this.questionEditor = new EasyMDE({
      autofocus: true,
      element: this.questionPane.querySelector("#qTxt"),
    });

    this.explanationEditor = new EasyMDE({
      autofocus: true,
      element: this.questionPane.querySelector("#eTxt")
    });

    this.explanationContainer = this.questionPane.querySelector("#explanationContainer");

    this.readOnly = true;

  }

  setQuestion(_question) {
    this.question = _question;
    this.questionEditor.value(
      _question.question ? _question.question : "",
    );

    this.explanationEditor.value(
      _question.explanation ? _question.explanation : "",
    );
  }

  set readOnly(flag) {
    this.questionEditor.togglePreview();
    this.explanationEditor.togglePreview();
    if (flag) {
      this.questionPane.querySelectorAll(".editor-toolbar")
      .forEach((element) => element.classList.add("d-none"));
      this.questionPane.querySelectorAll(".editor-statusbar")
      .forEach((element) => element.classList.add("d-none"));
    } else {
      this.questionPane.querySelectorAll(".editor-toolbar")
      .forEach((element) => element.classList.remove("d-none"));
      this.questionPane.querySelectorAll(".editor-statusbar")
      .forEach((element) => element.classList.remove("d-none"));
    }
  }
  
  doExplain(flag) {
    if(flag) {
      this.explanationContainer.classList.remove("d-none");
    } else {
      this.explanationContainer.classList.add("d-none");
    }

  }
  
}