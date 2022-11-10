class Chapter {
  constructor(_parent) {
    this.parent = _parent;

    // eslint-disable-next-line no-undef
    const myModal = new bootstrap.Modal(
      document.getElementById("noteModel"),
      {}
    );

    console.log(myModal);

    const tokens = window.location.href.split("/books/")[1].split("/");

    const bookName = tokens[0];

    console.log(bookName);

    const highLightText = () => {
      var selection = window.getSelection();
      var parent = selection.anchorNode.parentElement;
      var selection_text = selection.toString();

      if (selection_text.trim().length !== 0) {
        if (parent.nodeName === "MARK") {
          let grandParent = parent.parentElement;
          parent.replaceWith(document.createTextNode(parent.textContent));
          grandParent.normalize();
          return;
        }

        var mark = document.createElement("mark");

        mark.textContent = selection_text;

        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(mark);
      }
    };

    document.onmouseup = function () {
      highLightText();
    };
  }
}

export default Chapter;
