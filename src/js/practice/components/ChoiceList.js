export default class ChoiceList {
  constructor(templateName, choices) {
    const template = document.getElementById(templateName);

    this._element = template.content.cloneNode(true).firstChild;

    if(templateName === "matchesList") {
        choices.forEach((choice, index) => {
            const liEl = this._element.children[index];
            liEl.querySelector(".form-check").innerHTML = choice.cValue;
        });
    } else {
        choices.forEach((choice, index) => {
            const liEl = this._element.children[index];
            liEl.querySelector("input").value = choice.cValue;
            liEl.querySelector("label").textContent = choice.cValue;
        });
    }
  }

  get element() {
    return this._element;
  }
}
