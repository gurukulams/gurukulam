import { Recogito } from "@recogito/recogito-js";
import CoreNotes from "./CoreNotes";

class TextNotes extends CoreNotes {
  constructor(_parent) {
    super(
      _parent,
      new Recogito({ content: "content", readOnly: true }),
      document.getElementById("btn-check-outlined")
    );

    const modeIcon1 = document.querySelector(".fa-pencil");
    const modeIcon2 = document.querySelector(".fa-bezier-curve");

    document
      .querySelector(".fa-bezier-curve")
      .parentElement.addEventListener("click", () => {
        const temp = modeIcon2.className;
        modeIcon2.className = modeIcon1.className;
        modeIcon1.className = temp;

        const annotationMode = modeIcon1.classList.contains("fa-pencil")
          ? "ANNOTATION"
          : "RELATIONS";
        this.annobase.setMode(annotationMode);

        this.checkbox.checked = true;
      });

    this.path = window.location.pathname.trim();

    if (this.path.endsWith("/")) {
      this.path = this.path.slice(0, -1);
    }

    const offcanvasNotes = document.getElementById("offcanvas-notes");

    const notesPane = offcanvasNotes.querySelector(".offcanvas-body>ul");

    const searchBox = offcanvasNotes.querySelector('input[type="search"]');

    searchBox.addEventListener("keyup", () => {
      this.listAnnotations(
        notesPane,
        this.findNotes(this.annobase.getAnnotations(), searchBox.value)
      );
    });

    offcanvasNotes.addEventListener("show.bs.offcanvas", () => {
      searchBox.focus();
    });

    offcanvasNotes.addEventListener("show.bs.offcanvas", () => {
      this.listAnnotations(notesPane, this.annobase.getAnnotations());
    });

    this.loadNotes();
  }

  listAnnotations(notesPane, annotations) {
    notesPane.innerHTML = "";

    annotations.forEach((annnotation) => {
      const liElement = document.createElement("li");
      liElement.classList.add("list-group-item");
      liElement.innerHTML = annnotation.body[0].value;
      notesPane.appendChild(liElement);
    });
  }

  findNotes(items, text) {
    text = text.split(" ");
    return items.filter((item) => {
      return text.every((el) => {
        return item.body[0].value.includes(el);
      });
    });
  }
}

export default TextNotes;
