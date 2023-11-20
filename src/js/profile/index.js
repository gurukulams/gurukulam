import Organizations from "../orgs/Organizations";

class Profile {
  constructor() {
    if (sessionStorage.auth) {
      const userName = window.location.pathname
        .split("profile/")[1]
        .replace("/", "");

      if (userName.trim().length === 0) {
        const profile = JSON.parse(sessionStorage.auth);
        this.setProfile(profile);
      } else {
        window.getUser(userName).then((profile) => {
          this.setProfile(profile);
        });

        if (userName.startsWith("org-")) {
          this.setOrg(userName);
        }
      }
    } else {
      location.href = "/";
    }
  }

  setProfile(profile) {
    document.querySelector(".card-header>.h5").innerHTML = profile.displayName;

    document.querySelector(".card-body>img.img-thumbnail").src =
      profile.profilePicture;

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

  setOrg(orgName) {
    fetch(`/api/orgs/${orgName}`, {
      method: "GET",
      headers: window.ApplicationHeader(),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("No Org");
        }
      })
      .then((org) => {
        document.getElementById("descriptionTxt").innerHTML = org.description;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

new Profile();
