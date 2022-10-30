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

    const tokens = window.location.href.split("/books/")[1].split("/");

    const bookName = tokens[0];

    let chapterPath = "";

    tokens.forEach((token, index) => {
      if (index !== 0 && token) {
        chapterPath = chapterPath + "/" + token;
      }
    });
    console.log(bookName);
    console.log(chapterPath);

    const highlightMarkings = (marking) => {
      if (marking.text !== "") {
        let text = this.parent.innerHTML;
        let re = new RegExp(marking.prevWord + " " + marking.text, "g"); // search for all instances

        let marked = marking.note
          ? `<mark data-bs-toggle="tooltip" data-bs-placement="top" title="${marking.note}">
        ${marking.text}
        </mark>`
          : `<mark class='text-dark'>
        ${marking.text}
        </mark>`;

        let txt2 = text.replace(re, marked);
        this.parent.innerHTML = txt2;

        _parent.querySelectorAll("mark").forEach((markEl) => {
          markEl.addEventListener("dblclick", (event) => {
            editNote(event);
          });
        });
      }
    };

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
      let marking = this.markings.find(
        (marking) => marking.text === selectedText
      );

      if (selectedText.indexOf(" ") !== -1) {
        var range = window.getSelection().getRangeAt(0);
        var allWordsBefore = range.startContainer.wholeText
          .substr(0, range.startOffset)
          .trim()
          .split(" ");
        var prevWord = allWordsBefore[allWordsBefore.length - 1];

        if (marking && marking.prevWord === prevWord) {
          console.log(prevWord);
        } else {
          marking = {};
          marking.text = selectedText;
          marking.prevWord = prevWord;
          // marking.note = "DDDDQWQWQ";
          this.markings.push(marking);
          highlightMarkings(marking);
        }
      }
    });

    fetch("/api/books/" + bookName + "/note/_search", {
      method: "POST",
      headers: window.ApplicationHeader(),
      body: chapterPath,
    })
      .then((response) => response.json())
      .then((markings) => {
        this.markings = markings;
        this.markings.forEach((marking) => highlightMarkings(marking));
      });

    this.parent.addEventListener("mouseleave", () => {
      if (this.markings !== 0) {
        this.markings.forEach((marking) => {
          if (!marking.id) {
            marking.onSection = chapterPath;
            fetch("/api/books/" + bookName + "/note", {
              method: "POST",
              headers: window.ApplicationHeader(),
              body: JSON.stringify(marking),
            });
          }
        });
      }
    });
  }
}

export default Chapter;
