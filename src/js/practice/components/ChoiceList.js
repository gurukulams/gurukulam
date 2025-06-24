export default class ChoiceList {
    constructor(isSingle) {
        const template = document.querySelector(isSingle ? "#radioList" : "#checkboxList");
        this._element = template.content.cloneNode(true);
    }

    setChoices(choices) {

    }

    get element()  {
        return this._element;
    }
}