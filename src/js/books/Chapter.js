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
  }
}

export default Chapter;
