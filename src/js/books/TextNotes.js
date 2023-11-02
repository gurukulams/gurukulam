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

        console.log("Annotation mode is " + annotationMode);
        this.annobase.setMode(annotationMode);

        this.checkbox.checked = true;
      });

    this.path = window.location.pathname.trim();

    if (this.path.endsWith("/")) {
      this.path = this.path.slice(0, -1);
    }

    this.loadNotes();
  }
}

export default TextNotes;
