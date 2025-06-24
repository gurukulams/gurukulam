export default class ChoiceList {
    constructor(isSingle, choices) {
        const template = document.querySelector(isSingle ? "#radioList" : "#checkboxList");
        this._element = template.content.cloneNode(true);
    }

    get element()  {
        return this._element;
    }
}