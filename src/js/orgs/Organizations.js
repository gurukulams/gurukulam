import QRious from "qrious";
class Organizations {
  constructor(classesPane) {
    this.editView = classesPane.querySelector("#org-form");
    this.listView = document.createElement("ul");
    this.listView.classList.add("list-group");
    classesPane.appendChild(this.listView);

    this.idTxt = classesPane.querySelector("#idTxt");
    this.titleTxt = classesPane.querySelector("#titleTxt");
    this.typeSelect = classesPane.querySelector("#typeSelect");
    this.descriptionTxt = classesPane.querySelector("#descriptionTxt");
    this.imageUrlTxt = classesPane.querySelector("#imageUrlTxt");

    this.deleteEventBtn = this.editView.querySelector("button.btn-danger");

    this.deleteEventBtn.addEventListener("on-confirmation", () => {
      this.deleteEvent();
    });

    classesPane
      .querySelector("#org-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.saveEvent();
      });

    classesPane
      .querySelector("button.btn-secondary")
      .addEventListener("click", () => {
        this.listEvents();
      });

    this.listEvents();
  }

  openEvent(_event) {
    this.event = _event;
    this.idTxt.value = this.event.userHandle ? this.event.userHandle : "";
    this.titleTxt.value = this.event.title ? this.event.title : "";
    this.typeSelect.value = this.event.orgType ? this.event.orgType : "";
    this.descriptionTxt.value = this.event.description
      ? this.event.description
      : "";
    this.imageUrlTxt.value = this.event.imageUrl ? this.event.imageUrl : "";
    this.listView.classList.add("d-none");
    this.editView.classList.remove("d-none");
    this.idTxt.focus();

    if (_event.userHandle) {
      this.idTxt.parentElement.classList.add("d-none");
      this.typeSelect.parentElement.classList.add("d-none");
      this.deleteEventBtn.classList.remove("d-none");
    } else {
      this.idTxt.parentElement.classList.remove("d-none");
      this.typeSelect.parentElement.classList.remove("d-none");
      this.deleteEventBtn.classList.add("d-none");
    }
  }

  isValid() {
    let isValid = true;
    return isValid;
  }

  saveEvent() {
    if (this.isValid()) {
      this.event.title = this.titleTxt.value;
      this.event.orgType = this.typeSelect.value;
      this.event.description = this.descriptionTxt.value;
      this.event.imageUrl = this.imageUrlTxt.value;
      if (this.event.userHandle) {
        fetch("/api/orgs/" + this.event.userHandle, {
          method: "PUT",
          headers: window.ApplicationHeader(),
          body: JSON.stringify(this.event),
        }).then((response) => {
          if (response.ok) {
            window.success("Event updated successfully");
            this.listEvents();
          } else {
            window.error("Unable to update event");
          }
        });
      } else {
        this.event.userHandle = this.idTxt.value;
        fetch("/api/orgs", {
          method: "POST",
          headers: window.ApplicationHeader(),
          body: JSON.stringify(this.event),
        }).then((response) => {
          if (response.status === 201) {
            window.success("Event created successfully");
            this.listEvents();
          } else {
            window.error("Unable to create event");
          }
        });
      }
    }
  }

  showEvents() {
    this.listView.classList.remove("d-none");
    this.editView.classList.add("d-none");
  }

  deleteEvent() {
    if (this.event.userHandle) {
      fetch("/api/orgs/" + this.event.userHandle, {
        method: "DELETE",
        headers: window.ApplicationHeader(),
      }).then(() => {
        window.success("Event deleted successfully");
        this.listEvents();
      });
    } else {
      this.listEvents();
    }
  }

  setupJoining(event, callToActionBtn) {
    fetch("/api/orgs/" + event.userHandle + "/_join", {
      method: "POST",
      headers: window.ApplicationHeader(),
    }).then((response) => {
      if (response.status === 201) {
        const joinLink = document.createElement("a");
        joinLink.classList.add("btn");
        joinLink.classList.add("btn-success");
        joinLink.classList.add("float-end");
        joinLink.target = "_GMEET";
        joinLink.innerHTML = "Join";
        joinLink.href = response.headers.get("location");

        const parentElement = callToActionBtn.parentElement;

        parentElement.removeChild(callToActionBtn);
        parentElement.appendChild(joinLink);
      }
    });
  }

  listEvents() {
    this.listView.innerHTML = "";

    fetch("/api/orgs", {
      method: "GET",
      headers: window.ApplicationHeader(),
    })
      .then((response) => {
        if (response.status === 204) {
          this.listView.innerHTML = "There are no events schduled";
          return [];
        }
        return response.json();
      })
      .then((_events) => {
        this.events = _events;
        this.events.forEach((event) => {
          const liElement = this.createEventCard(event);

          this.listView.appendChild(liElement);
        });
      });

    this.showEvents();
  }

  createEventCard(event) {
    const liElement = document
      .querySelector("#org-card")
      .content.cloneNode(true);

    liElement.querySelector(".card-title").innerHTML = event.title;
    liElement.querySelector(".card-text").innerHTML = event.description;
    liElement.querySelector("img").src = event.imageUrl;

    liElement.querySelector(".card-link").innerHTML = event.orgType;

    const callToActionBtn = liElement.querySelector("button.btn");
    const nameEl = liElement.querySelector(".card-subtitle");

    window.getUser(event.createdBy).then((user) => {
      nameEl.innerHTML = user.name;
    });

    if (JSON.parse(sessionStorage.auth).userName === event.createdBy) {
      callToActionBtn.innerHTML =
        '<i class="fa-solid fa-pencil" title="Edit Event"></i>';
      callToActionBtn.addEventListener("click", () => {
        this.openEvent(event);
      });
    } else {
      fetch("/api/orgs/" + event.userHandle, {
        method: "HEAD",
        headers: window.ApplicationHeader(),
      }).then((response) => {
        if (response.ok) {
          callToActionBtn.classList.remove("btn-primary");
          callToActionBtn.classList.add("btn-outline-success");
          callToActionBtn.disabled = true;
          callToActionBtn.innerHTML = "Attending";

          this.setupJoining(event, callToActionBtn);
        } else {
          callToActionBtn.addEventListener("click", () =>
            this.setupRegisteration(event)
          );
        }
      });
    }

    return liElement;
  }

  setupRegisteration(event) {
    this.listView.classList.add("d-none");

    const buyEvent = document.createElement("div");
    buyEvent.classList.add("card");
    buyEvent.classList.add("h-100");

    buyEvent.innerHTML = `
              <div class="card-body">
              <div class="d-flex justify-content-center d-none">
                <canvas id="qr" class="w-50"></canvas>
              </div>
              <h6>${event.title}</h6>
                <p class="card-text lead">${event.description}</p>
              </div>
              <div class="card-footer">
              <a href="javascript://" class="btn btn-secondary">Cancel</a>
                <a href="javascript://" class="btn btn-success float-end">&#8377; 10 | Register</a>
            </div>`;
    this.listView.parentElement.appendChild(buyEvent);

    const regButton = buyEvent.querySelector(".btn-success");
    const qrEl = buyEvent.querySelector("#qr");
    const backToListing = () => {
      this.listView.parentElement.removeChild(buyEvent);
      this.listView.classList.remove("d-none");
      this.listEvents();
    };

    var qr = new QRious({
      element: qrEl,
      value: "https://github.com/neocotic/qrious",
    });
    qrEl.parentElement.classList.remove("d-none");
    regButton.addEventListener("click", () => {
      fetch("/api/orgs/" + event.userHandle, {
        method: "POST",
        headers: window.ApplicationHeader(),
      }).then(() => {
        window.success("Event registered successfully");
        backToListing();
      });
    });

    buyEvent.querySelector(".btn-secondary").addEventListener("click", () => {
      backToListing();
    });
  }
}

export default Organizations;
