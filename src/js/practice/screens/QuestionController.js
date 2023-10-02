import QuestionScreen from "./QuestionScreen";

export default class QuestionController extends QuestionScreen {
  constructor(_parent) {
    super();
    this.parent = _parent;

    // Model Objects

    const urlTokens = window.location.pathname.split("/questions/");
    this.chaptorPath = urlTokens[1];

    this.setupLanguage(urlTokens);

    this.questions = [];
    this.selectedQuestion = null;
  }

  setupLanguage(urlTokens) {
    const elements = document.querySelector(
      '[aria-labelledby="languageBtn"]'
    ).children;

    for (let element of elements) {
      if (element.children[0].dataset.code === "en") {
        element.children[0].href = "/questions/" + this.chaptorPath;
      } else {
        element.children[0].href =
          "/" +
          element.children[0].dataset.code +
          "/questions/" +
          this.chaptorPath;
      }
    }

    if (urlTokens[0] !== "") {
      const languageCode = urlTokens[0].substring(1);

      for (let element of elements) {
        if (languageCode === element.children[0].dataset.code) {
          console.log(element.children[0]);

          document.getElementById("languageBtn").textContent =
            element.children[0].textContent;

          element.children[0].textContent = "English";
          element.children[0].setAttribute(
            "href",
            "/questions/" + this.chaptorPath
          );

          break;
        }
      }
    }
  }
}
