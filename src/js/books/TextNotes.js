import { Recogito } from "@recogito/recogito-js";
import CoreNotes from "./CoreNotes";

class TextNotes extends CoreNotes {
  constructor(_parent) {
    super(
      _parent,
      new Recogito({ content: "content", readOnly: true }),
      document.getElementById("btn-check-outlined")
    );

    const modeIcon = document.querySelector(".fa-pencil");

    document
      .querySelector(".fa-pencil")
      .parentElement.classList.remove("d-none");

    document
      .querySelector(".fa-bezier-curve")
      .addEventListener("click", (event) => {
        const temp = event.currentTarget.className;
        event.currentTarget.className = modeIcon.className;
        modeIcon.className = temp;
      });

    this.path = window.location.pathname.trim();

    if (this.path.endsWith("/")) {
      this.path = this.path.slice(0, -1);
    }

    this.loadNotes();
  }
}

export default TextNotes;
