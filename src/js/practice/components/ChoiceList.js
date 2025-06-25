export default class ChoiceList {
  constructor(templateName, choices) {
    const template = document.getElementById(templateName);

    this._element = template.content.cloneNode(true).firstChild;

    let length = 0;

    if(templateName === "matchesList") {
        this.isMatches = true;
        choices.forEach((choice, index) => {
            const liEl = this._element.children[index];
            const labelEl = liEl.querySelector("label");
            labelEl.attributes["data-id"] = choice.id;
            labelEl.textContent = choice.cValue;

            liEl.querySelector("i.fa-arrow-up").addEventListener("click", (event) => {
              const liEl =
                  event.currentTarget.parentElement.parentElement.parentElement;

                if (liEl.parentElement.firstChild === liEl) {
                  liEl.parentNode.insertAfter(liEl, liEl.parentNode.lastChild);
                } else {
                  liEl.parentNode.insertBefore(
                    liEl,
                    liEl.previousElementSibling,
                  );
                }
            });

            liEl
              .querySelector("i.fa-arrow-down")
              .addEventListener("click", (event) => {
                const liEl =
                  event.currentTarget.parentElement.parentElement.parentElement;

                const ulNode = liEl.parentNode;

                if (liEl.parentElement.lastChild === liEl) {
                  ulNode.insertBefore(liEl, ulNode.firstChild);
                } else {
                  liEl.parentNode.insertBefore(
                    liEl,
                    liEl.nextElementSibling.nextElementSibling,
                  );
                }
              });

            length++;
        });
    } else {
        choices.forEach((choice, index) => {
            const liEl = this._element.children[index];
            liEl.querySelector("input").value = choice.id;
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

  get answer() {

    const answers = [];
    if(this.isMatches) {
      
      this._element.querySelectorAll("label")
      .forEach((element) => answers.push(element.attributes["data-id"]));
    } else {
      const selectedCheckBoxes = this._element.querySelectorAll("input");
      selectedCheckBoxes.forEach((input) => {
        if (input.checked) {
          answers.push(input.value);
        }
      });
    }
    
    console.log(answers);

    return answers;
  }

  get element() {
    return this._element;
  }
}
