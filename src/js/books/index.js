import TextNotes from "./TextNotes";
import ImageNotes from "./ImageNotes";
import Classes from "./../events/Classes";

if (sessionStorage.auth) {
  const contentEl = document.getElementById("content");

  document.getElementById("bookOptionsPane").classList.remove("d-none");
  document.getElementById("notesBtn").classList.remove("d-none");

  new TextNotes(contentEl);

  new ImageNotes(contentEl);

  const classes = new Classes(
    document.getElementById("event-container"),
    document.querySelector("i.fa-chalkboard-user").parentElement.dataset.path
  );

  const myOffcanvas = document.getElementById("offcanvas-classes");
  myOffcanvas.addEventListener("hidden.bs.offcanvas", () => {
    classes.showEvents();
  });

  myOffcanvas.querySelector("i.fa-plus").addEventListener("click", () => {
    classes.openEvent({});
  });
}
