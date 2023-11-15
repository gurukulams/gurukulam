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

      new Classes(document.getElementById("event-container"));

      const organizations = new Organizations(
        document.getElementById("org-container")
      );

      document.querySelector("i.fa-plus").addEventListener("click", () => {
        organizations.openEvent({});
      });
    }
  }
}

new Home();
