import TextNotes from "./TextNotes";
import ImageNotes from "./ImageNotes";

if (sessionStorage.auth && document.querySelector(".fa-pencil")) {
  const contentEl = document.getElementById("content");

  new TextNotes(contentEl);

  new ImageNotes(contentEl);
}
