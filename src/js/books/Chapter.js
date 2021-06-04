class Chapter {
  constructor(_parent) {
    this.parent = _parent;

    this.strikes = ["Let’s see what’s so special about JavaScript"];
    this.notes = [{ note: "DDDDDD", text: "as plain text." }];

    this.strikes.forEach((strike) => this.highlight(strike));

    this.notes.forEach((note) => this.highlightNotes(note));

    // eslint-disable-next-line no-undef
    this.myModal = new bootstrap.Modal(
      document.getElementById("noteModel"),
      {}
    );

    document
      .getElementById("noteModel")
      .addEventListener("shown.bs.modal", function () {
        document.getElementById("noteText").focus();
      });

    _parent.addEventListener("mousedown", () => {
      const strike = document.getSelection().toString().trim();
      if (!this.strikes.includes(strike) && strike.indexOf(" ") !== -1) {
        var range = window.getSelection().getRangeAt(0);
        var allWordsBefore = range.startContainer.wholeText
          .substr(0, range.startOffset)
          .trim()
          .split(" ");
        var prevWord = allWordsBefore[allWordsBefore.length - 1];
        console.log(prevWord);
        this.strikes.push(strike);
        this.highlight(strike);
      }
    });

    _parent.addEventListener("dblclick", () => {
      const selectedText = document.getSelection().toString().trim();
      if (selectedText.indexOf(" ") === -1) {
        var range = window.getSelection().getRangeAt(0);
        var allWordsBefore = range.startContainer.wholeText
          .substr(0, range.startOffset)
          .trim()
          .split(" ");
        var prevWord = allWordsBefore[allWordsBefore.length - 1];
        console.log(prevWord);

        this.myModal.show();
      }
    });
  }

  highlight(strike) {
    if (strike !== "") {
      let text = this.parent.innerHTML;
      let re = new RegExp(strike, "g"); // search for all instances
      let newText = text.replace(re, `<mark>${strike}</mark>`);
      this.parent.innerHTML = newText;
    }
  }

  highlightNotes(note) {
    if (note.text !== "") {
      let text = this.parent.innerHTML;
      let re = new RegExp(note.text, "g"); // search for all instances
      let newText = text.replace(
        re,
        `<mark class="text-info" data-bs-toggle="tooltip" data-bs-placement="top" title="${note.note}">
        ${note.text}
        </mark>`
      );
      this.parent.innerHTML = newText;
    }
  }
}

export default Chapter;