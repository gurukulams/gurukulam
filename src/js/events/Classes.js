import {QRious} from "qrious";
class Classes {
  constructor(classesPane, _chaptersPath) {
    this.editView = classesPane.querySelector("#event-form");
    this.listView = document.createElement("ul");
    this.listView.classList.add("list-group");
    classesPane.appendChild(this.listView);

    this.titleTxt = classesPane.querySelector("#titleTxt");
    this.descriptionTxt = classesPane.querySelector("#descriptionTxt");
    this.eventDateTxt = classesPane.querySelector("#eventDateTxt");

    this.deleteEventBtn = this.editView.querySelector("button.btn-danger");

    this.deleteEventBtn.addEventListener("on-confirmation", () => {
      this.deleteEvent();
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

    this.setChaptersPath(_chaptersPath);
  }

  setChaptersPath(_chaptersPath) {
    this.chaptersPath = _chaptersPath ? _chaptersPath : "";
    this.listEvents();
  }

  openEvent(_event) {
    this.event = _event;
    this.titleTxt.value = this.event.title ? this.event.title : "";
    this.descriptionTxt.value = this.event.description
      ? this.event.description
      : "";
    this.eventDateTxt.value = this.event.eventDate ? this.event.eventDate : "";
    this.listView.classList.add("d-none");
    this.editView.classList.remove("d-none");
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
    this.listView.classList.remove("d-none");
    this.editView.classList.add("d-none");
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

  setupJoining(event, callToActionBtn) {
    fetch("/api/events/" + event.id + "/_join", {
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

    fetch("/api/events" + this.chaptersPath, {
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
      .querySelector("#event-card")
      .content.cloneNode(true);

    liElement.querySelector(".card-title").innerHTML = event.title;
    liElement.querySelector(".card-text").innerHTML = event.description;

    const eventDate = new Date(event.eventDate);

    liElement.querySelector(".card-link").innerHTML =
      eventDate.toLocaleDateString();

    liElement.querySelector(".card-link:last-of-type").innerHTML =
      eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const callToActionBtn = liElement.querySelector("button.btn");
    const imageEl = liElement.querySelector("img");
    const nameEl = liElement.querySelector(".card-subtitle");

    window.getUser(event.createdBy).then((user) => {
      imageEl.src = user.profilePicture;
      nameEl.innerHTML = user.displayName;
    });

    if (JSON.parse(sessionStorage.auth).userName === event.createdBy) {
      if (this.readyToStart(eventDate)) {
        callToActionBtn.innerHTML = "Start";
        callToActionBtn.addEventListener("click", () => {
          this.setupStart(event);
        });
        this.setupJoining(event, callToActionBtn);
      } else {
        callToActionBtn.innerHTML =
          '<i class="fa-solid fa-pencil" title="Edit Event"></i>';
        callToActionBtn.addEventListener("click", () => {
          this.openEvent(event);
        });
      }
    } else {
      fetch("/api/events/" + event.id, {
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
            this.setupRegisteration(event),
          );
        }
      });
    }

    return liElement;
  }

  setupStart(event) {
    this.listView.classList.add("d-none");

    const startEventForm = document.createElement("form");
    startEventForm.classList.add("card");
    startEventForm.classList.add("h-100");

    startEventForm.innerHTML = `
              <div class="card-header">
                <input class="form-control" type="url" placeholder="Enter Event URL" aria-label="default input example" required>
              </div>
              <div class="card-body">
              <div class="d-flex justify-content-center">
                <img src="/img/meeting.svg" alt="meeting" class="img-thumbnail w-50">
              </div>
              <h6>${event.title}</h6>
                <p class="card-text lead">${event.description}</p>
              </div>
              <div class="card-footer">
              <a href="javascript://" class="btn btn-secondary">Cancel</a>
                <button type="submit" type="role" class="btn btn-success float-end">Start</a>
            </div>`;
    this.listView.parentElement.appendChild(startEventForm);

    const textInput = startEventForm.querySelector("input");

    const backToListing = () => {
      this.listView.parentElement.removeChild(startEventForm);
      this.listView.classList.remove("d-none");
      this.listEvents();
    };

    startEventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      fetch("/api/events/" + event.id + "/_start", {
        method: "POST",
        headers: window.ApplicationHeader(),
        body: textInput.value,
      }).then((response) => {
        if (response.status === 201) {
          window.open(response.headers.get("location"), "_gmeet");
          backToListing();
        } else {
          window.error("Event not available ");
        }
      });
    });

    startEventForm
      .querySelector(".btn-secondary")
      .addEventListener("click", () => {
        backToListing();
      });
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
  }

  readyToStart(eventDate) {
    const start = new Date();
    start.setMinutes(start.getMinutes() - 10);

    const end = new Date();
    end.setMinutes(end.getMinutes() + 10);
    return eventDate.getTime() > start && eventDate.getTime() < end;
  }
}

export default Classes;
