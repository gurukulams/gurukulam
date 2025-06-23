// web component
export default class QuestionPane {
  
  constructor() {
    this.questionPane = document.getElementById("questionPane");

    this.answerContainer = document.getElementById("answerContainer");
    this.questionContainer = document.getElementById("questionContainer");
    this.matcheContainer = document.getElementById("matcheContainer");
    this.explanationContainer = document.getElementById("explanationContainer");

    // eslint-disable-next-line no-undef
    this.questionEditor = new EasyMDE({
      autofocus: true,
      element: this.questionPane.querySelector("#qTxt"),
    });

    this.explanationEditor = new EasyMDE({
      autofocus: true,
      element: this.questionPane.querySelector("#eTxt")
    });

    

    this.readOnly = true;

  }

  setQuestion(_question) {
    this.question = _question;
    this.questionEditor.value(
      _question.question ? _question.question : "",
    );

    this.explanationEditor.value(
      _question.explanation ? _question.explanation : "",
    );

    switch (_question.type) {
      case "CHOOSE_THE_BEST":
        this.setChoices(
          true,
          _question,
          "choices",
          this.answerContainer,
          true
        );
        break;
    }
  }

  setChoices(
    isSingle,
    question,
    propertyName,
    theContainer,
    skipShuffle,
  ) {
    theContainer.innerHTML = `<ul class="list-group"></ul>`;

    if (question[propertyName]) {
      if (!skipShuffle) {
        window.shuffle(question[propertyName]);
      }
    } else {
      question[propertyName] = [];
    }

    question[propertyName].forEach((choice) => {
      this.setChoice(isSingle, choice, theContainer, propertyName);
    });

    if (this.isEditable) {
      theContainer
        .querySelector(".form-control")
        .addEventListener("keyup", (event) => {
          if (event.keyCode === 13) {
            event.preventDefault();
            if (event.currentTarget.value !== "") {
              const choice = {
                cValue: event.currentTarget.value,
              };
              question[propertyName].push(choice);
              event.currentTarget.value = "";
              this.setChoice(isSingle, choice, theContainer, propertyName);
            }
          }
        });
    }
  }

  setChoice(isSingle, choice, theContainer, propertyName) {
    const ulEl = theContainer.firstElementChild;
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item");
    liEl.classList.add("d-flex");
    liEl.classList.add("align-items-center");
    liEl.innerHTML = `<div class="form-check" data-id="${choice.id}">
  <input class="form-check-input" type="${isSingle ? "radio" : "checkbox"}" ${
    this.isEditable && choice.answer ? "checked" : ""
  }
    name="flexRadioDefault" value="${choice.id}" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">

  </label>
</div>
${
  this.isEditable
    ? `<span class="badge text-dark rounded-pill justify-content-end"><i class="fa-solid fa-pen px-2"></i><i
    class="far fa-trash-alt" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></span>`
    : ``
}




`;
    ulEl.appendChild(liEl);

    if (this.isEditable) {
      liEl
        .querySelector("input.form-check-input")
        .addEventListener("change", (event) => {
          if (isSingle) {
            const question = questions[this.questionIndex];
            if (question[propertyName]) {
              question[propertyName].forEach((choice) => {
                delete choice.answer;
              });
            }
          }
          choice.answer = event.currentTarget.checked;
        });

      liEl
        .querySelector(".fa-pen")
        .addEventListener("click", (event) => this.editChoice(event));
      liEl
        .querySelector(".fa-trash-alt")
        .addEventListener("on-confirmation", (event) =>
          this.removeChoice(event),
        );
    }

    liEl.firstElementChild.children[1].innerHTML = choice.cValue;
    return liEl;
  }

  set readOnly(flag) {
    this.isEditable = !flag;
    this.questionEditor.togglePreview();
    this.explanationEditor.togglePreview();
    if (flag) {
      this.questionPane.querySelectorAll(".editor-toolbar")
      .forEach((element) => element.classList.add("d-none"));
      this.questionPane.querySelectorAll(".editor-statusbar")
      .forEach((element) => element.classList.add("d-none"));
    } else {
      this.questionPane.querySelectorAll(".editor-toolbar")
      .forEach((element) => element.classList.remove("d-none"));
      this.questionPane.querySelectorAll(".editor-statusbar")
      .forEach((element) => element.classList.remove("d-none"));
    }
  }
  
  doExplain(flag) {
    if(flag) {
      this.explanationContainer.classList.remove("d-none");
    } else {
      this.explanationContainer.classList.add("d-none");
    }

  }
  
}