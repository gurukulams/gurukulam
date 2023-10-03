import QuestionScreen from "./QuestionScreen";

export default class QuestionController extends QuestionScreen {
  constructor(_parent) {
    super(_parent);
    this.loadQuestions();
  }
}
