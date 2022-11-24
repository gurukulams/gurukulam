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
    // {"text":" referred to as asexual reproducti","onSection":"/12-biology/botany/reproduction/asexual_reproduction","note":"hello"}
    const note = {};
    note.onSection = this.chapterPath;
    note.note = "hello";
    note.text = JSON.stringify(annotation);
    fetch("/api/books/" + this.bookName + "/note", {
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
    fetch("/api/books/" + this.bookName + "/note/_search", {
      method: "POST",
      headers: window.ApplicationHeader(),
      body: this.chapterPath,
    })
      .then((response) => response.json())
      .then((notes) => {
        console.log(notes);
        this.recognito.setAnnotations(notes.map((t) => JSON.parse(t.text)));
      });
  }

  // deleteNote() {
  //   const note = this.nodeModal.selectedNote;
  //   fetch("/api/books/" + this.bookName + "/note/" + note.id, {
  //     method: "DELETE",
  //     headers: window.ApplicationHeader(),
  //   }).then((response) => {
  //     console.log(response);
  //   });
  //   this.nodeModal.hide();
  // }

  // saveNote() {
  //   const note = this.nodeModal.selectedNote;

  //   note.onSection = this.chapterPath;
  //   note.note = document.getElementById("noteText").value;

  //   console.log(this.bookName);
  //   console.log(note);

  //   if (note.id) {
  //     fetch("/api/books/" + this.bookName + "/note/" + note.id, {
  //       method: "PUT",
  //       headers: window.ApplicationHeader(),
  //       body: JSON.stringify(note),
  //     })
  //       .then((response) => response.json())
  //       .then((_note) => {
  //         note.id = _note.id;
  //       });
  //   } else {
  //     fetch("/api/books/" + this.bookName + "/note", {
  //       method: "POST",
  //       headers: window.ApplicationHeader(),
  //       body: JSON.stringify(note),
  //     })
  //       .then((response) => response.json())
  //       .then((_note) => {
  //         note.id = _note.id;
  //       });
  //   }

  //   this.nodeModal.hide();
  // }

  // detectTextHighlight() {
  //   var selection = window.getSelection();

  //   var selection_text = selection.toString();

  //   if (selection.anchorNode && selection_text.trim().length !== 0) {
  //     var parent = selection.anchorNode.parentElement;
  //     // if (parent.nodeName !== "MARK") {
  //     if (parent.nodeName === "P") {
  //       console.log(selection.anchorNode);
  //       this.hightlight({ text: selection_text }, selection);
  //     }
  //   }
  // }

  // hightlightNote(note) {
  //   console.log(note);
  //   const searched = note.text;
  //   let text = this.parent.innerHTML;
  //   let re = new RegExp(searched, "g"); // search for all instances
  //   let newText = text.replace(
  //     re,
  //     `<mark id="${note.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="${note.note}" >${searched}</mark>`
  //   );
  //   this.parent.innerHTML = newText;
  // }

  // hightlight(note, selection) {
  //   var mark = document.createElement("mark");

  //   mark.textContent = note.text;

  //   mark.addEventListener("dblclick", (event) => {
  //     this.editNote(note, event.currentTarget);
  //   });

  //   var range = selection.getRangeAt(0);
  //   range.deleteContents();
  //   range.insertNode(mark);
  // }

  // editNote(note, markEl) {
  //   this.nodeModal.selectedNote = note;
  //   this.nodeModal.markEl = markEl;
  //   this.nodeModal.show();
  // }

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
