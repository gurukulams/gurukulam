import Classes from "../events/Classes";

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
    }
  }
}

new Home();
