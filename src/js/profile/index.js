import QRious from "qrious";

class Profile {
  constructor() {
    if (sessionStorage.auth) {
      this.subscribeBtn = document.getElementById("subscribeBtn");

      const userName = window.location.pathname
        .split("profile/")[1]
        .replace("/", "");

      if (userName.trim().length === 0) {
        const profile = JSON.parse(sessionStorage.auth);
        this.setProfile(profile);
        this.setLearner(profile.userName);
      } else {
        window.getUser(userName).then((profile) => {
          this.setProfile(profile);
        });

        if (userName.startsWith("org-")) {
          this.setOrg(userName);
        } else {
          this.setLearner(userName);
        }
      }
    } else {
      location.href = "/";
    }
  }

  setProfile(profile) {
    document.getElementById("handleName").innerHTML = profile.displayName;

    document.querySelector(".card-body>img.img-thumbnail").src =
      profile.profilePicture;
  }

  setLearner(learnerName) {
    fetch(`/api/profiles/${learnerName}/orgs`, {
      method: "GET",
      headers: window.ApplicationHeader(),
    })
      .then((response) => {
        if (response.status === 204) {
          return [];
        }
        return response.json();
      })
      .then((orgs) => {
        this.listOrgalizations(orgs, "company");
        this.listOrgalizations(orgs, "school");
        this.listOrgalizations(orgs, "college");
        this.listOrgalizations(orgs, "community");
        this.listOrgalizations(orgs, "institute");
      });
  }

  listOrgalizations(orgs, section) {
    const experinces = orgs.filter((org) => org.orgType === section);

    if (experinces.length !== 0) {
      const expSection = document.getElementById(section + "Section");
      expSection.classList.remove("d-none");
      const ulElement = expSection.querySelector("ul");

      experinces.forEach((org) => {
        ulElement.appendChild(this.createOrgCard(org));
      });
    }
  }

  createOrgCard(org) {
    const liElement = document
      .querySelector("#org-card")
      .content.cloneNode(true);

    liElement.querySelector(".card-title").innerHTML = org.title;
    liElement.querySelector(".card-text").innerHTML = org.description;
    liElement.querySelector("img").src = org.imageUrl;

    return liElement;
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
        this.subscribeBtn.classList.remove("d-none");
        document.getElementById("descriptionTxt").innerHTML = org.description;
        fetch("/api/orgs/" + org.userHandle, {
          method: "HEAD",
          headers: window.ApplicationHeader(),
        }).then((response) => {
          if (response.ok) {
            this.setSubscribed();
          } else {
            this.subscribeBtn.addEventListener("click", () =>
              this.setupRegisteration(org)
            );
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setSubscribed() {
    this.subscribeBtn.classList.remove("btn-primary");
    this.subscribeBtn.classList.add("btn-outline-success");
    this.subscribeBtn.disabled = true;
    this.subscribeBtn.innerHTML = "Subscribed";
  }

  setupRegisteration(org) {
    const buyEvent = document.createElement("div");
    buyEvent.classList.add("card");
    buyEvent.classList.add("h-100");

    buyEvent.innerHTML = `
              <div class="card-body">
              <div class="d-flex justify-content-center d-none">
                <canvas id="qr" class="w-50"></canvas>
              </div>
              <h6>${org.title}</h6>
                <p class="card-text lead">${org.description}</p>
              </div>
              <div class="card-footer">
              <a href="javascript://" class="btn btn-secondary">Cancel</a>
                <a href="javascript://" class="btn btn-success float-end">&#8377; 10 | Register</a>
            </div>`;

    const listView = document.getElementById("orgContainer");
    listView.classList.add("d-none");

    listView.parentElement.appendChild(buyEvent);

    const regButton = buyEvent.querySelector(".btn-success");
    const qrEl = buyEvent.querySelector("#qr");

    const backToListing = () => {
      listView.parentElement.removeChild(buyEvent);
      listView.classList.remove("d-none");
    };

    var qr = new QRious({
      element: qrEl,
      value: "https://github.com/neocotic/qrious",
    });
    qrEl.parentElement.classList.remove("d-none");
    regButton.addEventListener("click", () => {
      fetch("/api/orgs/" + org.userHandle, {
        method: "POST",
        headers: window.ApplicationHeader(),
      }).then(() => {
        window.success("Event registered successfully");
        this.setSubscribed();
        backToListing();
      });
    });

    buyEvent.querySelector(".btn-secondary").addEventListener("click", () => {
      backToListing();
    });
  }
}

new Profile();
