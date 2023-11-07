import QuestionScreen from "./QuestionScreen";

export default class QuestionController extends QuestionScreen {
  constructor(_parent) {
    super(_parent);
    if (sessionStorage.auth) {
      if (JSON.parse(sessionStorage.auth).userName !== "tom") {
        document.querySelector("pencilbtn").classList.add("invisible");
      }

      this.loadQuestions();
    } else {
      location.href = "/";
    }
  }
}
