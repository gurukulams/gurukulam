import TextNotes from "./TextNotes";
import ImageNotes from "./ImageNotes";

if (sessionStorage.auth) {
  const contentEl = document.getElementById("content");

  document.getElementById("bookOptionsPane").classList.remove("d-none");

  new TextNotes(contentEl);

  new ImageNotes(contentEl);
}
