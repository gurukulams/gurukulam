import QuestionScreen from "./QuestionScreen";

export default class QuestionController extends QuestionScreen {
  constructor(_parent) {
    super(_parent);
    if (sessionStorage.auth) {
      if (JSON.parse(sessionStorage.auth).userName === "tom@email.com") {
        _parent
          .querySelector(".fa-pencil")
          .parentElement.classList.remove("d-none");
      }

      this.loadQuestions();
    } else {
      location.href = "/";
    }
  }
}
