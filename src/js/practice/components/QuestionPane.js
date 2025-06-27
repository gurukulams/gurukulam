import ChoiceList from "./ChoiceList";

export default class QuestionPane {
  
  constructor() {
    this.questionPane = document.getElementById("questionPane");

    this.answerContainer = document.getElementById("answerContainer");
    this.questionContainer = document.getElementById("questionContainer");
    this.matcheContainer = document.getElementById("matcheContainer");
    this.explanationContainer = document.getElementById("explanationContainer");



    // eslint-disable-next-line no-undef
    this.questionEditor = new EasyMDE({
      autofocus: true,
      element: this.questionPane.querySelector("#qTxt"),
    });

    this.explanationEditor = new EasyMDE({
      autofocus: true,
      element: this.questionPane.querySelector("#eTxt")
    });

    this.readOnly = true;

  }

  verify(success) {
    switch (this.question.type) {
      case "CHOOSE_THE_BEST":
        this.chooseTheBestList.verify(success)
        break;
      case "MULTI_CHOICE":
        this.mcqList.verify(success)
        break;
      case "MATCH_THE_FOLLOWING":
        this.mtfList.verify(success)
        break;
    }
  }

  getAnswer() {
    let answer ;

    switch (this.question.type) {
      case "CHOOSE_THE_BEST":
        answer = this.chooseTheBestList.answer.join(",");
        break;
      case "MULTI_CHOICE":
        answer = this.mcqList.answer.join(",");
        break;
      case "MATCH_THE_FOLLOWING":
        const matches = this.mtfList.answer;
        const choices = this.mtfChoicesList.answer;

        choices.push(matches.slice(0, choices.length));
        

        answer = choices.join(",");
        break;
    }

    return answer;

  }

  getQuestion() {
    return this.question;
  }

  setQuestion(_question) {
    this.question = _question;
    this.questionEditor.value(
      _question.question ? _question.question : "",
    );

    this.explanationEditor.value(
      _question.explanation ? _question.explanation : "",
    );

    this.answerContainer.innerHTML = '';

    this.questionContainer.classList.remove('d-none');
    this.matcheContainer.classList.add('d-none');
    

    switch (_question.type) {
      case "CHOOSE_THE_BEST":
        this.chooseTheBestList = new ChoiceList(this.isEditable, "radioList", _question.choices);
        this.answerContainer.appendChild(this.chooseTheBestList.element);
        break;
      case "MULTI_CHOICE":
        this.mcqList = new ChoiceList(this.isEditable,"checkboxList", _question.choices);
        this.answerContainer.appendChild(this.mcqList.element);
        break;
      case "MATCH_THE_FOLLOWING":
        this.mtfList = new ChoiceList(this.isEditable,"matchesList", _question.matches);
        this.answerContainer.appendChild(this.mtfList.element);
        this.mtfChoicesList = new ChoiceList(this.isEditable,"matchesList", _question.choices);
        this.matcheContainer.innerHTML = '';
        this.matcheContainer.appendChild(this.mtfChoicesList.element);
        this.mtfChoicesList.element.querySelectorAll("li>span").forEach(element=> {
          element.parentElement.removeChild(element);
        })
        this.matcheContainer.classList.remove('d-none');
        this.questionContainer.classList.add('d-none');
        break;
    }
  }

  set readOnly(flag) {
    this.isEditable = !flag;
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
    if(this.question) {
      this.setQuestion(this.question)
    }
    
  }
  
  doExplain(flag) {
    if(flag) {
      this.explanationContainer.classList.remove("d-none");
      this.answerContainer.classList.add("d-none");
    } else {
      this.explanationContainer.classList.add("d-none");
      this.answerContainer.classList.remove("d-none");
    }

  }
  
}