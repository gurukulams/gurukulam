// web component
export default class QuestionPane {
  
  constructor() {
    const questionPane = document.getElementById("questionPane");

    // eslint-disable-next-line no-undef
    this.questionEditor = new EasyMDE({
      autofocus: true,
      element: questionPane.querySelector("#qTxt"),
    });

    this.explanationEditor = new EasyMDE({
      autofocus: true,
      element: questionPane.querySelector("#eTxt")
    });

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
  }

  
}