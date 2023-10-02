import QuestionScreen from "./QuestionScreen";

export default class QuestionController extends QuestionScreen {
  constructor(_parent) {
    super();
    this.parent = _parent;

    // Model Objects

    const urlTokens = window.location.pathname.split("/questions/");
    this.chaptorPath = urlTokens[1];

    if (urlTokens[0] !== "") {
      const languageCode = urlTokens[0].substring(1);

      const elements = document.querySelector(
        '[aria-labelledby="languageBtn"]'
      ).children;

      for (let element of elements) {
        if (languageCode === element.children[0].dataset.code) {
          console.log(element.children[0]);

          element.children[0].textContent = "English";
          element.children[0].setAttribute(
            "href",
            "/questions/" + this.chaptorPath
          );

          console.log(element.children[0].href);

          break;
        }
      }
    }

    this.questions = [];
    this.selectedQuestion = null;

    const list = document.querySelector(
      '[aria-labelledby="languageBtn"]'
    ).children;

    for (let item of list) {
      const languageCode = item.children[0].dataset.code;

      console.log();

      if (languageCode === "en") {
        item.children[0].href = "/questions/" + this.chaptorName;
      } else {
        item.children[0].href =
          item.children[0].dataset.code + window.location.pathname;
      }
    }
  }
}
