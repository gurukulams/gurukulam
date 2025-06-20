import QuestionScreen from "./QuestionScreen";

export default class QuestionController extends QuestionScreen {
  constructor() {
    super(document.getElementById("content"));
    if (sessionStorage.auth) {
      if (window.hasFeature("MANAGE_QUESTION")) {
        document
          .querySelector("i.fa-pencil")
          .parentElement.classList.remove("d-none");
      }

      this.loadQuestions();
    } else {
      location.href = "/";
    }
  }
}
