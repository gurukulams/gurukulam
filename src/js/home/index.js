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

      const classes = new Classes(document.getElementById("event-container"));

      mainContainer
        .querySelectorAll("i.fa-chalkboard-user")
        .forEach((eventsBtn) => {
          eventsBtn.addEventListener("click", (event) => {
            classes.setChaptersPath(
              event.currentTarget.parentElement.parentElement.parentElement
                .dataset.path
            );
          });
        });

      const organizations = new Organizations(
        document.getElementById("org-container")
      );

      if (window.hasFeature("MANAGE_ORG")) {
        const createOrgBtn = document.querySelector("i.fa-plus");
        createOrgBtn.classList.remove("d-none");
        createOrgBtn.addEventListener("click", () => {
          organizations.openEvent({});
        });
      }
    }
  }
}

new Home();
