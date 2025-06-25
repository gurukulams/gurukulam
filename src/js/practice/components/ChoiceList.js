export default class ChoiceList {
  constructor(templateName, choices) {
    const template = document.getElementById(templateName);

    this._element = template.content.cloneNode(true).firstChild;

    let length = 0;

    if(templateName === "matchesList") {
        choices.forEach((choice, index) => {
            const liEl = this._element.children[index];
            liEl.querySelector("label").textContent = choice.cValue;
            length++;
        });
    } else {
        choices.forEach((choice, index) => {
            const liEl = this._element.children[index];
            liEl.querySelector("input").value = choice.cValue;
            liEl.querySelector("label").textContent = choice.cValue;
            length++;
        });
    }
    
    // Remove Unused Items
    const total = this._element.children.length;
    for (let index = length; index < total; index++) {
      this._element.removeChild(this._element.children[length]);
    }
  }

  get element() {
    return this._element;
  }
}
