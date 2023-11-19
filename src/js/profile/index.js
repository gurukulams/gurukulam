import Organizations from "../orgs/Organizations";

class Profile {
  constructor() {
    if (sessionStorage.auth) {
      document.querySelector(".card-header>.h5").innerHTML = JSON.parse(
        sessionStorage.auth
      ).displayName;

      document.querySelector(".card-body>img.img-thumbnail").src =
        document.querySelector(".avatar").src;

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

new Profile();
