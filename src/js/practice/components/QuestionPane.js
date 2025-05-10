// web component
export default class QuestionPane {
  
  constructor() {
    const questionPane = document.getElementById("questionPane");

    this.qTxt = document.getElementById("qTxt");
  }

  setQuestion(_question) {
    this.question = _question;
    console.log(_question);
    this.qTxt.value = _question.question;
    
  }


  
}