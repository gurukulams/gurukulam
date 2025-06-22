// web component
export default class QuestionPane {
  
  constructor() {
    const questionPane = document.getElementById("questionPane");

    // eslint-disable-next-line no-undef
    this.questionEditor = new EasyMDE({
      autofocus: true,
      element: document.querySelector("#qTxt"),
    });
  }

  setQuestion(_question) {
    this.question = _question;
    this.questionEditor.value(
      _question.question ? _question.question : "",
    );
  }


  
}