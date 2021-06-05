class Chapter {
  constructor(_parent) {
    this.parent = _parent;

    this.strikes = [
      { note: "DDDDDD", text: "as plain text.", prevWord: "executed" },
    ];

    this.strikes.forEach((strike) => this.highlightNotes(strike));

    // eslint-disable-next-line no-undef
    const myModal = new bootstrap.Modal(
      document.getElementById("noteModel"),
      {}
    );

    document
      .getElementById("noteModel")
      .querySelector(".btn-primary")
      .addEventListener("click", () => {
        console.log(myModal.selection);
        myModal.hide();
      });

    document
      .getElementById("noteModel")
      .addEventListener("shown.bs.modal", function () {
        document.getElementById("noteText").focus();
      });

    document
      .getElementById("noteModel")
      .addEventListener("hide.bs.modal", function () {
        myModal.selection = null;
      });

    _parent.addEventListener("mousedown", () => {
      const selectedText = document.getSelection().toString().trim();
      let strike = this.strikes.find((strike) => strike.text === selectedText);

      if (selectedText.indexOf(" ") !== -1) {
        var range = window.getSelection().getRangeAt(0);
        var allWordsBefore = range.startContainer.wholeText
          .substr(0, range.startOffset)
          .trim()
          .split(" ");
        var prevWord = allWordsBefore[allWordsBefore.length - 1];

        if (strike && strike.prevWord === prevWord) {
          console.log(prevWord);
        } else {
          strike = {};
          strike.text = selectedText;
          strike.prevWord = prevWord;
          // strike.note = "DDDDQWQWQ";
          this.strikes.push(strike);
          this.highlightNotes(strike);
        }
      }
    });

    _parent.addEventListener("dblclick", () => {});
  }

  highlightNotes(strike) {
    if (strike.text !== "") {
      let text = this.parent.innerHTML;
      let re = new RegExp(strike.prevWord + " " + strike.text, "g"); // search for all instances

      let marked = strike.note
        ? `<mark data-bs-toggle="tooltip" data-bs-placement="top" title="${strike.note}">
      ${strike.text}
      </mark>`
        : `<mark>
      ${strike.text}
      </mark>`;
      let newText = text.replace(re, strike.prevWord + " " + marked);
      this.parent.innerHTML = newText;
    }
  }
}

export default Chapter;
