import QRious from "qrious";

class Profile {
  constructor() {
    if (sessionStorage.auth) {
      this.subscribeBtn = document.getElementById("subscribeBtn");

      let userName = window.location.pathname
        .split("profile")[1]
        .replace("/", "");

      if (userName.trim().length === 0) {
        userName = JSON.parse(sessionStorage.auth).userName;
        this.subscribeBtn.classList.add("d-none");
      } else if (userName === JSON.parse(sessionStorage.auth).userName) {
        this.subscribeBtn.classList.add("d-none");
      }

      window.getUser(userName).then((profile) => {
        this.setProfile(profile);
      });
    } else {
      location.href = "/";
    }
  }

  setProfile(profile) {
    this.profile = profile;
    document.getElementById("handleName").innerHTML = profile.displayName;

    document.querySelector(".card-body>img.img-thumbnail").src =
      profile.profilePicture;

    if (profile.userHandle.startsWith("org-")) {
      this.setOrg(profile.userHandle);
    } else {
      this.setLearner(profile.userHandle);
    }
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

    fetch(`/api/profiles/${learnerName}/buddies`, {
      method: "GET",
      headers: window.ApplicationHeader(),
    })
      .then((response) => {
        if (response.status === 204) {
          return [];
        }
        return response.json();
      })
      .then((buddies) => {
        if (buddies.length !== 0) {
          const buddiesSection = document.getElementById("buddiesSection");
          buddiesSection.classList.remove("d-none");
          const ulElement = buddiesSection.querySelector("ul");

          buddies.forEach((buddy) => {
            ulElement.appendChild(this.createBuddyCard(buddy));
          });
        }
      });

    if (learnerName !== JSON.parse(sessionStorage.auth).userName) {
      fetch("/api/profiles/" + learnerName, {
        method: "HEAD",
        headers: window.ApplicationHeader(),
      }).then((response) => {
        if (response.ok) {
          this.setSubscribed();
        } else {
          this.subscribeBtn.addEventListener("click", () =>
            this.setupRegisteration(this.profile),
          );
        }
      });
    }
  }

  createBuddyCard(buddy) {
    const liElement = document
      .querySelector("#buddy-card")
      .content.cloneNode(true);
    liElement.querySelector("a").href = "/profile/" + buddy.userHandle;
    liElement.querySelector("h6").innerHTML = buddy.displayName;
    liElement.querySelector("img").src = buddy.profilePicture;

    return liElement;
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
        document.getElementById("descriptionTxt").innerHTML = org.description;
        fetch("/api/orgs/" + org.userHandle, {
          method: "HEAD",
          headers: window.ApplicationHeader(),
        }).then((response) => {
          if (response.ok) {
            this.setSubscribed();
          } else {
            this.subscribeBtn.addEventListener("click", () =>
              this.setupRegisteration(this.profile),
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
      if (this.profile.userHandle.startsWith("org-")) {
        fetch("/api/orgs/" + this.profile.userHandle, {
          method: "POST",
          headers: window.ApplicationHeader(),
        }).then(() => {
          window.success("Org registered successfully");
          this.setSubscribed();
          backToListing();
        });
      } else {
        fetch("/api/profiles/" + this.profile.userHandle, {
          method: "POST",
          headers: window.ApplicationHeader(),
        }).then(() => {
          window.success("User subscribed successfully");
          this.setSubscribed();
          backToListing();
        });
      }
    });

    buyEvent.querySelector(".btn-secondary").addEventListener("click", () => {
      backToListing();
    });
  }
}

new Profile();
