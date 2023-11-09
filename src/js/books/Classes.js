import QRious from "qrious";
class Classes {
  constructor(_parent) {
    this.parent = _parent;
    this.chaptersPath = document.querySelector(
      "i.fa-chalkboard-user"
    ).parentElement.dataset.path;

    const myOffcanvas = document.getElementById("offcanvas-classes");
    myOffcanvas.addEventListener("hidden.bs.offcanvas", (event) => {
      this.showEvents();
    });

    const classesPane = document.getElementById("offcanvas-classes");
    this.editForm = classesPane.querySelector("#event-form");
    this.eventsView = classesPane.querySelector("ul");

    this.titleTxt = classesPane.querySelector("#titleTxt");
    this.meetingUrlTxt = classesPane.querySelector("#meetingUrlTxt");
    this.descriptionTxt = classesPane.querySelector("#descriptionTxt");
    this.eventDateTxt = classesPane.querySelector("#eventDateTxt");

    this.deleteEventBtn = classesPane.querySelector("button.btn-danger");

    this.deleteEventBtn.addEventListener("on-confirmation", () => {
      this.deleteEvent();
    });

    classesPane.querySelector("i.fa-plus").addEventListener("click", () => {
      this.openEvent({});
    });

    classesPane
      .querySelector("#event-form")
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
    this.titleTxt.value = this.event.title ? this.event.title : "";
    this.meetingUrlTxt.value = this.event.meetingUrl
      ? this.event.meetingUrl
      : "";
    this.descriptionTxt.value = this.event.description
      ? this.event.description
      : "";
    this.eventDateTxt.value = this.event.eventDate ? this.event.eventDate : "";
    this.eventsView.classList.add("d-none");
    this.editForm.classList.remove("d-none");
    this.titleTxt.focus();

    if (_event.id) {
      this.deleteEventBtn.classList.remove("d-none");
    } else {
      this.deleteEventBtn.classList.add("d-none");
    }
  }

  isValid() {
    let isValid = true;
    const eventDate = new Date(this.eventDateTxt.value);
    var after = function (d1, d2) {
      var diff = d1.getTime() - d2.getTime();
      return Math.round(diff / (1000 * 60 * 60 * 24));
    };
    const afterinDays = after(eventDate, new Date());

    if (afterinDays < 0 || afterinDays > 20) {
      isValid = false;
      window.error("Events can not be schduled after 20 days");
    }

    return isValid;
  }

  saveEvent() {
    if (this.isValid()) {
      this.event.title = this.titleTxt.value;
      this.event.meetingUrl = this.meetingUrlTxt.value;
      this.event.description = this.descriptionTxt.value;
      this.event.eventDate = this.eventDateTxt.value;
      if (this.event.id) {
        fetch("/api/events/" + this.event.id, {
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
        fetch("/api/events" + this.chaptersPath, {
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
    this.eventsView.classList.remove("d-none");
    this.editForm.classList.add("d-none");
  }

  deleteEvent() {
    if (this.event.id) {
      fetch("/api/events/" + this.event.id, {
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

  listEvents() {
    this.eventsView.innerHTML = "";

    fetch("/api/events" + this.chaptersPath, {
      method: "GET",
      headers: window.ApplicationHeader(),
    })
      .then((response) => {
        if (response.status === 204) {
          this.eventsView.innerHTML = "There are no events schduled";
        }
        return response.json();
      })
      .then((_events) => {
        this.events = _events;
        this.events.forEach((event) => {
          const liElement = this.createEventCard(event);

          this.eventsView.appendChild(liElement);
        });
      });

    this.showEvents();
  }

  createEventCard(event) {
    const liElement = document
      .querySelector("#event-card")
      .content.cloneNode(true);

    liElement.querySelector(".card-title").innerHTML = event.title;
    liElement.querySelector(".card-subtitle").innerHTML = event.createdBy;
    liElement.querySelector(".card-text").innerHTML = event.description;

    const eventDate = new Date(event.eventDate);

    liElement.querySelector(".card-link").innerHTML =
      eventDate.toLocaleDateString();

    liElement.querySelector(".card-link:last-of-type").innerHTML =
      eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const callToActionBtn = liElement.querySelector("button.btn");
    const imageEl = liElement.querySelector("img");

    window.getUser(event.createdBy).then((user) => {
      imageEl.src = user.imageUrl;
    });

    if (JSON.parse(sessionStorage.auth).userName === event.createdBy) {
      callToActionBtn.innerHTML =
        '<i class="fa-solid fa-pencil" title="Edit Event"></i>';
      callToActionBtn.addEventListener("click", () => {
        this.openEvent(event);
      });
    } else {
      fetch("/api/events/" + event.id, {
        method: "HEAD",
        headers: window.ApplicationHeader(),
      }).then((response) => {
        if (response.ok) {
          if (this.doesStartShortly(eventDate)) {
            callToActionBtn.innerHTML = "Join";
          } else {
            callToActionBtn.classList.remove("btn-outline-primary");
            callToActionBtn.classList.add("btn-outline-info");
            callToActionBtn.innerHTML = "Attending";
          }
        } else {
          this.setupRegisteration(liElement, event, callToActionBtn);
        }
      });
    }

    return liElement;
  }

  setupRegisteration(liElement, event, callToActionBtn) {
    const registerEvent = () => {
      this.eventsView.classList.add("d-none");

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
      this.eventsView.parentElement.appendChild(buyEvent);

      const regButton = buyEvent.querySelector(".btn-success");
      const qrEl = buyEvent.querySelector("#qr");
      const backToListing = () => {
        this.eventsView.parentElement.removeChild(buyEvent);
        this.eventsView.classList.remove("d-none");
        this.listEvents();
      };

      var qr = new QRious({
        element: qrEl,
        value: "https://github.com/neocotic/qrious",
      });
      qrEl.parentElement.classList.remove("d-none");
      regButton.addEventListener("click", () => {
        fetch("/api/events/" + event.id, {
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
    };

    callToActionBtn.addEventListener("click", registerEvent);
  }

  doesStartShortly(eventDate) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);
    return eventDate.getTime() < now;
  }
}

export default Classes;
