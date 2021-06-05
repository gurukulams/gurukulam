class Chapter {
  constructor(_parent) {
    this.parent = _parent;

    // eslint-disable-next-line no-undef
    const myModal = new bootstrap.Modal(
      document.getElementById("noteModel"),
      {}
    );

    const editNote = (event) => {
      myModal.selectedMark = event.currentTarget;
      myModal.show();
    };

    this.strikes = [];

    const highlightNotes = (strike) => {
      if (strike.text !== "") {
        let text = this.parent.innerHTML;
        //let re = new RegExp(strike.prevWord + " " + strike.text, "g"); // search for all instances

        let marked = strike.note
          ? `<mark data-bs-toggle="tooltip" data-bs-placement="top" title="${strike.note}">
        ${strike.text}
        </mark>`
          : `<mark>
        ${strike.text}
        </mark>`;
        let newText = text.replace(
          strike.prevWord + " " + strike.text,
          strike.prevWord + " " + marked
        );
        this.parent.innerHTML = newText;
        _parent.querySelectorAll("mark").forEach((markEl) => {
          markEl.addEventListener("dblclick", (event) => {
            editNote(event);
          });
        });
      }
    };

    this.strikes.forEach((strike) => highlightNotes(strike));

    _parent.querySelectorAll("mark").forEach((markEl) => {
      markEl.addEventListener("dblclick", (event) => {
        editNote(event);
      });
    });

    document
      .getElementById("noteModel")
      .querySelector(".btn-primary")
      .addEventListener("click", () => {
        const note = document.getElementById("noteText").value.trim();
        if (note === "") {
          myModal.selectedMark.removeAttribute("title");
          myModal.selectedMark.removeAttribute("data-bs-toggle");
          myModal.selectedMark.removeAttribute("top");
        } else {
          myModal.selectedMark.setAttribute("title", note);
        }
        myModal.hide();
      });

    document
      .getElementById("noteModel")
      .addEventListener("shown.bs.modal", function () {
        document.getElementById("noteText").value =
          myModal.selectedMark.getAttribute("title");
        document.getElementById("noteText").focus();
      });

    document
      .getElementById("noteModel")
      .addEventListener("hide.bs.modal", function () {
        myModal.selectedMark = null;
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
          highlightNotes(strike);
        }
      }
    });
  }
}

export default Chapter;
