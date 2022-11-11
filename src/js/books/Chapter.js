class Chapter {
  constructor(_parent) {
    this.parent = _parent;

    // eslint-disable-next-line no-undef
    this.myModal = new bootstrap.Modal(
      document.getElementById("noteModel"),
      {}
    );

    const model = this.myModal;
    document
      .getElementById("noteModel")
      .addEventListener("shown.bs.modal", function () {
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

    const tokens = window.location.href.split("/books/")[1].split("/");

    this.bookName = tokens[0];

    this.chapterPath = "";

    tokens.forEach((token, index) => {
      if (index !== 0 && token) {
        this.chapterPath = this.chapterPath + "/" + token;
      }
    });

    document.addEventListener("mouseup", () => {
      this.detectTextHighlight();
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
        });
      });
  }

  saveNote() {
    console.log("SAVE");

    const note = this.myModal.selectedNote;

    note.onSection = this.chapterPath;
    note.note = document.getElementById("noteText").value;

    console.log(this.bookName);
    console.log(note);

    if (note.id) {
      // Update
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

    this.myModal.hide();
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
    const regex = new RegExp(note.text, "gi");
    let text = this.parent.innerHTML;
    text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, "");
    const newText = text.replace(regex, '<mark id="' + note.id + '">$&</mark>');
    this.parent.innerHTML = newText;

    if (document.getElementById(note.id)) {
      document.getElementById(note.id).addEventListener("dblclick", (event) => {
        this.editNote(note, event.currentTarget);
      });
    }
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
    this.myModal.selectedNote = note;
    this.myModal.markEl = markEl;
    this.myModal.show();
  }
}

export default Chapter;
