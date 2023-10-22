import { Recogito } from "@recogito/recogito-js";

class TextNotes {
  constructor(_parent) {
    this.parent = _parent;

    if (document.querySelector(".fa-pencil")) {
      document
        .querySelector(".fa-pencil")
        .parentElement.classList.remove("d-none");
      this.path = window.location.pathname.trim();

      if (this.path.endsWith("/")) {
        this.path = this.path.slice(0, -1);
      }

      document.querySelectorAll("table").forEach((table) => {
        table.classList.add("table");
      });

      // eslint-disable-next-line no-undef
      this.recognito = new Recogito({ content: "content", readOnly: true });
      // this is the sample for creating and loading anotaions;

      this.recognito.on("createAnnotation", (annotation) =>
        this.saveAnnotaion(annotation)
      );
      // recognito.setAnnotations(data);
      // eslint-disable-next-line no-undef

      const checkbox = document.getElementById("btn-check-outlined");

      checkbox.addEventListener("change", (event) => {
        this.recognito.readOnly = !event.currentTarget.checked;
      });

      const tokens = window.location.href.split("/books/")[1].split("/");

      this.bookName = tokens[0];

      this.chapterPath = "";

      tokens.forEach((token, index) => {
        if (index !== 0 && token) {
          this.chapterPath = this.chapterPath + "/" + token;
        }
      });

      this.loadNotes();
    }
  }

  saveAnnotaion(annotation) {
    console.log(annotation);
    // {"text":" referred to as asexual reproducti","onSection":"/12th-botany/botany/reproduction/asexual_reproduction","note":"hello"}
    const note = {};

    note.value = annotation;

    fetch("/api/annotations" + this.path, {
      method: "POST",
      headers: window.ApplicationHeader(),
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((_note) => {
        console.log(_note.id);
      });
  }
  loadNotes() {
    fetch("/api/annotations" + this.path, {
      method: "GET",
      headers: window.ApplicationHeader(),
    })
      .then((response) => response.json())
      .then((notes) => {
        console.log(notes);
        this.recognito.setAnnotations(notes.map((t) => JSON.parse(t.value)));
      });
  }
}

export default TextNotes;