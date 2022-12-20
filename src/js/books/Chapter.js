import { Recogito } from "@recogito/recogito-js";

class Chapter {
  constructor(_parent) {
    this.parent = _parent;

    this.path = window.location.pathname.trim();

    if (this.path.endsWith("/")) {
      this.path = this.path.slice(0, -1);
    }

    document.querySelectorAll("table").forEach((table) => {
      table.classList.add("table");
    });

    // eslint-disable-next-line no-undef
    this.imageModel = new bootstrap.Modal(
      document.getElementById("imageModel"),
      {}
    );

    // eslint-disable-next-line no-undef
    this.recognito = new Recogito({ content: "content" });
    // this is the sample for creating and loading anotaions;

    this.recognito.on("createAnnotation", (annotation) =>
      this.saveAnnotaion(annotation)
    );
    // recognito.setAnnotations(data);
    // eslint-disable-next-line no-undef

    const tokens = window.location.href.split("/books/")[1].split("/");

    this.bookName = tokens[0];

    this.chapterPath = "";

    tokens.forEach((token, index) => {
      if (index !== 0 && token) {
        this.chapterPath = this.chapterPath + "/" + token;
      }
    });

    this.loadNotes();

    document.querySelectorAll("figure>img").forEach((image) => {
      image.addEventListener("dblclick", (event) => {
        this.showImage(event);
      });
    });
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
        this.recognito.setAnnotations(notes.map((t) => t.value));
      });
  }

  showImage(event) {
    console.log("Show Image");

    document.getElementById("imageModel").querySelector("img").src =
      event.currentTarget.src;

    document.getElementById("imageModel").querySelector("h5").innerHTML =
      event.currentTarget.parentElement.querySelector("figcaption").innerHTML;

    this.imageModel.show();
  }
}

export default Chapter;
