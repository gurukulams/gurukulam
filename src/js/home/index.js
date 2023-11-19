import Classes from "../events/Classes";
import Organizations from "../orgs/Organizations";

class Home {
  constructor() {
    if (sessionStorage.auth) {
      const mainContainer = document.querySelector("main.container-fluid");
      const childNodes = mainContainer.querySelectorAll("*");

      const personalContent = document
        .getElementById("personal-home")
        .content.cloneNode(true);

      childNodes.forEach((element) => {
        element.remove();
      });

      mainContainer.appendChild(personalContent);

      const classContainer = document.getElementById("event-container");
      const classHeader = classContainer.previousSibling.querySelector("span");
      const classCloseBtn =
        classContainer.previousSibling.querySelector("button.btn-close");
      const originalClassesTitle = classHeader.innerHTML;

      classCloseBtn.addEventListener("click", () => {
        classHeader.innerHTML = originalClassesTitle;
        classes.setChaptersPath(null);
        classCloseBtn.classList.add("d-none");
      });

      const classes = new Classes(classContainer);

      mainContainer
        .querySelectorAll("i.fa-chalkboard-user")
        .forEach((eventsBtn) => {
          eventsBtn.addEventListener("click", (event) => {
            const liElement =
              event.currentTarget.parentElement.parentElement.parentElement;
            classHeader.innerHTML =
              liElement.firstChild.innerHTML + " " + originalClassesTitle;
            classes.setChaptersPath(liElement.dataset.path);
            classCloseBtn.classList.remove("d-none");
          });
        });
    }
  }
}

new Home();
