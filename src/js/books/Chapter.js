import { Recogito } from "@recogito/recogito-js";
const data = [
  {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    type: "Annotation",
    body: [
      {
        type: "TextualBody",
        value: "hello",
        purpose: "commenting",
      },
    ],
    target: {
      selector: [
        {
          type: "TextQuoteSelector",
          exact: "clones. Higher plants\\nals",
        },
        {
          type: "TextPositionSelector",
          start: 742,
          end: 767,
        },
      ],
    },
    id: "#83c80da3-ca48-4da4-a711-6cd39c20e1df",
  },
  {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    type: "Annotation",
    body: [
      {
        type: "TextualBody",
        value: "hello",
        purpose: "tagging",
      },
    ],
    target: {
      selector: [
        {
          type: "TextQuoteSelector",
          exact: "metes is referred to as asexual\\nr",
        },
        {
          type: "TextPositionSelector",
          start: 95,
          end: 128,
        },
      ],
    },
    id: "#70bbbb32-8faa-4a13-ad1c-01143e77a9bb",
  },
];
class Chapter {
  constructor(_parent) {
    this.parent = _parent;

    // eslint-disable-next-line no-undef
    const r = new Recogito({ content: "content" });
    // this is the sample for creating and loading anotaions;
    console.log(r);
    r.on("createAnnotation", function (annotation) {
      console.log(annotation);
    });
    r.setAnnotations(data);
    // eslint-disable-next-line no-undef
    this.nodeModal = new bootstrap.Modal(
      document.getElementById("noteModel"),
      {}
    );

    // eslint-disable-next-line no-undef
    this.imageModel = new bootstrap.Modal(
      document.getElementById("imageModel"),
      {}
    );

    const model = this.nodeModal;
    document
      .getElementById("noteModel")
      .addEventListener("shown.bs.modal", function () {
        if (model.selectedNote.id) {
          document
            .getElementById("noteModel")
            .querySelector(".btn-danger")
            .classList.remove("d-none");
        } else {
          document
            .getElementById("noteModel")
            .querySelector(".btn-danger")
            .classList.add("d-none");
        }
        document.getElementById("noteText").value =
          model.selectedNote.note || "";
        document.getElementById("noteText").focus();
      });

    document
      .getElementById("noteModel")
      .querySelector(".btn-primary")
      .addEventListener("click", () => {
        this.saveNote();
      });

    document
      .getElementById("noteModel")
      .querySelector(".btn-danger")
      .addEventListener("click", () => {
        this.deleteNote();
      });
    const tokens = window.location.href.split("/books/")[1].split("/");

    this.bookName = tokens[0];

    this.chapterPath = "";

    tokens.forEach((token, index) => {
      if (index !== 0 && token) {
        this.chapterPath = this.chapterPath + "/" + token;
      }
    });

    // document.addEventListener("mouseup", () => {
    //   this.detectTextHighlight();
    // });

    document.querySelectorAll("figure>img").forEach((image) => {
      image.addEventListener("dblclick", (event) => {
        this.showImage(event);
      });
    });

    this.loadNotes();
  }

  loadNotes() {
    fetch("/api/books/" + this.bookName + "/note/_search", {
      method: "POST",
      headers: window.ApplicationHeader(),
      body: this.chapterPath,
    })
      .then((response) => response.json())
      .then((notes) => {
        this.notes = notes;
        this.notes.forEach((note) => {
          this.hightlightNote(note);

          var tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
          );
          tooltipTriggerList.map(function (tooltipTriggerEl) {
            // eslint-disable-next-line no-undef
            return new bootstrap.Tooltip(tooltipTriggerEl);
          });

          this.parent.querySelectorAll("mark").forEach((markEl) => {
            markEl.addEventListener("dblclick", () => {
              this.notes.forEach((note) => {
                if (note.id === markEl.id) {
                  this.editNote(note, markEl);
                }
              });
            });
          });
        });
      });
  }

  deleteNote() {
    const note = this.nodeModal.selectedNote;
    fetch("/api/books/" + this.bookName + "/note/" + note.id, {
      method: "DELETE",
      headers: window.ApplicationHeader(),
    }).then((response) => {
      console.log(response);
    });
    this.nodeModal.hide();
  }

  saveNote() {
    const note = this.nodeModal.selectedNote;

    note.onSection = this.chapterPath;
    note.note = document.getElementById("noteText").value;

    console.log(this.bookName);
    console.log(note);

    if (note.id) {
      fetch("/api/books/" + this.bookName + "/note/" + note.id, {
        method: "PUT",
        headers: window.ApplicationHeader(),
        body: JSON.stringify(note),
      })
        .then((response) => response.json())
        .then((_note) => {
          note.id = _note.id;
        });
    } else {
      fetch("/api/books/" + this.bookName + "/note", {
        method: "POST",
        headers: window.ApplicationHeader(),
        body: JSON.stringify(note),
      })
        .then((response) => response.json())
        .then((_note) => {
          note.id = _note.id;
        });
    }

    this.nodeModal.hide();
  }

  detectTextHighlight() {
    var selection = window.getSelection();

    var selection_text = selection.toString();

    if (selection.anchorNode && selection_text.trim().length !== 0) {
      var parent = selection.anchorNode.parentElement;
      // if (parent.nodeName !== "MARK") {
      if (parent.nodeName === "P") {
        console.log(selection.anchorNode);
        this.hightlight({ text: selection_text }, selection);
      }
    }
  }

  hightlightNote(note) {
    console.log(note);
    const searched = note.text;
    let text = this.parent.innerHTML;
    let re = new RegExp(searched, "g"); // search for all instances
    let newText = text.replace(
      re,
      `<mark id="${note.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="${note.note}" >${searched}</mark>`
    );
    this.parent.innerHTML = newText;
  }

  hightlight(note, selection) {
    var mark = document.createElement("mark");

    mark.textContent = note.text;

    mark.addEventListener("dblclick", (event) => {
      this.editNote(note, event.currentTarget);
    });

    var range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(mark);
  }

  editNote(note, markEl) {
    this.nodeModal.selectedNote = note;
    this.nodeModal.markEl = markEl;
    this.nodeModal.show();
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
