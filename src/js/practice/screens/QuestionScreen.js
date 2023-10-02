export default class QuestionScreen {
  constructor() {
    this.chaptorName = window.location.pathname.split("/questions/")[1];

    this.isEditable = false;

    // eslint-disable-next-line no-undef
    this.questionEditor = new EasyMDE({
      autofocus: true,
      element: document.querySelector("#qTxt"),
    });
    // eslint-disable-next-line no-undef
    this.explanationEditor = new EasyMDE({
      element: document.querySelector("#eTxt"),
    });

    document
      .querySelectorAll(".editor-toolbar")
      .forEach((element) => element.classList.add("d-none"));
    document
      .querySelectorAll(".editor-statusbar")
      .forEach((element) => element.classList.add("d-none"));

    this.questionEditor.togglePreview();
    this.explanationEditor.togglePreview();

    this.registerEvents();
  }

  registerEvents() {
    const explainToggleBtn = document.getElementById("explainToggle");
    const explanationContainer = document.getElementById(
      "explanationContainer"
    );
    const answerContainer = document.getElementById("answerContainer");

    explainToggleBtn.addEventListener("click", () => {
      if (answerContainer.classList.contains("d-none")) {
        explanationContainer.classList.add("d-none");
        answerContainer.classList.remove("d-none");
        explainToggleBtn.classList.add("btn-outline-primary");
        explainToggleBtn.classList.remove("btn-primary");
      } else {
        explanationContainer.classList.remove("d-none");
        answerContainer.classList.add("d-none");
        explainToggleBtn.classList.remove("btn-outline-primary");
        explainToggleBtn.classList.add("btn-primary");
      }
    });

    document
      .querySelector("i.fa-pencil")
      .parentElement.addEventListener("click", (event) => {
        this.toggleEditor(event);
      });
  }

  toggleEditor(event) {
    this.isEditable = !this.isEditable;

    this.questionEditor.togglePreview();
    this.explanationEditor.togglePreview();

    const icon = event.currentTarget.firstChild;
    const saveBtn = document.querySelector(".fa-floppy-disk").parentElement;
    const addBtn = document.querySelector(".fa-plus").parentElement;
    const deleteBtn = document.querySelector(".fa-trash-alt").parentElement;

    const verifyBtn = document.querySelector(".fa-check").parentElement;

    if (this.isEditable) {
      icon.classList.add("fa-regular", "fa-eye");
      icon.classList.remove("fa-solid", "fa-pencil");

      saveBtn.classList.remove("d-none");
      addBtn.classList.remove("d-none");
      deleteBtn.classList.remove("d-none");

      verifyBtn.classList.add("d-none");

      document
        .querySelectorAll(".editor-toolbar")
        .forEach((element) => element.classList.remove("d-none"));
      document
        .querySelectorAll(".editor-statusbar")
        .forEach((element) => element.classList.remove("d-none"));
    } else {
      icon.classList.remove("fa-regular", "fa-eye");
      icon.classList.add("fa-solid", "fa-pencil");

      saveBtn.classList.add("d-none");
      addBtn.classList.add("d-none");
      deleteBtn.classList.add("d-none");

      verifyBtn.classList.remove("d-none");

      document
        .querySelectorAll(".editor-toolbar")
        .forEach((element) => element.classList.add("d-none"));
      document
        .querySelectorAll(".editor-statusbar")
        .forEach((element) => element.classList.add("d-none"));
    }
  }
}
