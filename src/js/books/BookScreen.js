import TextNotes from "./components/TextNotes";
import ImageNotes from "./components/ImageNotes";
import Classes from "./../events/Classes";

export default class BookScreen {
  constructor() {
    if(sessionStorage.auth) {
      const contentEl = document.getElementById("content");

      document.getElementById("bookOptionsPane").classList.remove("d-none");
      // document.getElementById("notesBtn").classList.remove("d-none");

      document.querySelectorAll("i.fa-user-check,i.fa-trophy")
        .forEach((element) => {
          element.parentElement
                      .addEventListener("click", (event) => {
            sessionStorage.setItem('titleBar', document.querySelector(".breadcrumb").innerHTML);            
            window.location = event.currentTarget.dataset.link;
        })
      });

      const textNotes = new TextNotes(contentEl);
      const imageNotes = new ImageNotes(contentEl);

      document.getElementById("btn-check-outlined")
        .addEventListener("change", (event) => {
          textNotes.annobase.readOnly = !event.currentTarget.checked;
          imageNotes.annobase.readOnly = !event.currentTarget.checked;
      });
    
      const classes = new Classes(
        document.getElementById("event-container"),
        document.querySelector("i.fa-chalkboard-user").parentElement.dataset.path,
      );

      const myOffcanvas = document.getElementById("offcanvas-classes");
      myOffcanvas.addEventListener("hidden.bs.offcanvas", () => {
        classes.showEvents();
      });

      myOffcanvas.querySelector("i.fa-plus").addEventListener("click", () => {
        classes.openEvent({});
      });
      }
      
      handlePageNavigation();

      function handlePageNavigation() {
        
        const prePage = document.querySelector(".col-4.text-start a");
        const nextPage = document.querySelector(".col-4.text-end a");

        document.addEventListener("keydown", function (event) {
          if (event.key === "ArrowLeft") {
            if (prePage) {
              window.location.href = prePage.href;
            }
          } else if (event.key === "ArrowRight") {
            if (nextPage) {
              window.location.href = nextPage.href;
            }
          }
        });
      }
    }
  }
