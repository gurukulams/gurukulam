import QuestionScreen from "./QuestionScreen";

export default class QuestionController extends QuestionScreen {
  constructor(_parent) {
    super(_parent);
    if (sessionStorage.auth) {
      this.loadQuestions();
    } else {
      location.href = "/";
    }
  }
}
