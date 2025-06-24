export default class ChoiceList {
  constructor(isSingle, choices) {
    const template = document.querySelector(isSingle ? "#radioList" : "#checkboxList");

    this._element = document.createElement("ul");
    this._element.className = "list-group";

    choices.forEach((choice) => {
      const clone = template.content.cloneNode(true);
      const li = clone.querySelector("li");
      const input = li.querySelector("input");
      const label = li.querySelector("label");

      input.value = choice.cValue;
      label.textContent = choice.cValue;

      this._element.appendChild(li);
    });
  }

  get element() {
    return this._element;
  }
}
