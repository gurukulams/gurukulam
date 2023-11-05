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
    this.descriptionTxt = classesPane.querySelector("#descriptionTxt");
    this.eventDateTxt = classesPane.querySelector("#eventDateTxt");

    classesPane.querySelector("i.fa-plus").addEventListener("click", () => {
      this.openEvent({});
    });

    classesPane
      .querySelector("button.btn-primary")
      .addEventListener("click", () => {
        this.saveEvent();
      });

    classesPane
      .querySelector("button.btn-danger")
      .addEventListener("on-confirmation", () => {
        this.deleteEvent();
      });

    this.listEvents();
  }

  openEvent(_event) {
    this.event = _event;
    this.titleTxt.value = this.event.title ? this.event.title : "";
    this.descriptionTxt.value = this.event.description
      ? this.event.description
      : "";
    this.eventDateTxt.value = this.event.eventDate ? this.event.eventDate : "";
    this.eventsView.classList.add("d-none");
    this.editForm.classList.remove("d-none");
  }

  saveEvent() {
    this.event.title = this.titleTxt.value;
    this.event.description = this.descriptionTxt.value;
    this.event.eventDate = this.eventDateTxt.value;
    if (this.event.id) {
      fetch("/api/events/" + this.event.id, {
        method: "PUT",
        headers: window.ApplicationHeader(),
        body: JSON.stringify(this.event),
      })
        .then((response) => response.json())
        .then(() => {
          window.success("Event updated successfully");
          this.listEvents();
        });
    } else {
      fetch("/api/events" + this.chaptersPath, {
        method: "POST",
        headers: window.ApplicationHeader(),
        body: JSON.stringify(this.event),
      })
        .then((response) => response.json())
        .then(() => {
          window.success("Event created successfully");
          this.listEvents();
        });
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
      .then((response) => response.json())
      .then((_events) => {
        console.log(_events);
        this.events = _events;

        this.events.forEach((event) => {
          const liElement = document.createElement("li");
          liElement.classList.add("list-group-item");
          liElement.classList.add("card");
          liElement.innerHTML = `
          <div class="card-body">
              <h5 class="card-title">${event.title}</h5>
              <h6 class="card-subtitle mb-2 text-primary">${
                event.createdBy
              }</h6>
              <p class="card-text">${event.description}</p>
              <small class="card-link"><i class="fa-regular fa-calendar"></i> ${new Date(
                event.eventDate
              ).toDateString()}</small>
              <a href="javascript://" class="btn btn-success rounded-pill float-end">&#8377; 10</a>
            </div>
          `;
          this.eventsView.appendChild(liElement);

          liElement
            .querySelector(".card-title")
            .addEventListener("click", () => {
              this.openEvent(event);
            });

          liElement
            .querySelector(".rounded-pill")
            .addEventListener("click", () => {
              const ulEl = liElement.parentElement;
              ulEl.classList.add("d-none");

              const buyEvent = document.createElement("div");
              buyEvent.classList.add("card");

              buyEvent.innerHTML = `
              <div class="card">
                <div class="card-header">
                  <span class="h6">${event.title}</span>
                  <a href="javascript://" class="btn btn-secondary float-end">Cancel</a>
                </div>
                <div class="card-body">
                  <canvas id="qr" class="w-100"></canvas>
                  <p class="card-text lead">${event.description}</p>
                </div>
              </div>`;
              ulEl.parentElement.appendChild(buyEvent);

              var qr = new QRious({
                element: buyEvent.querySelector("#qr"),
                value: "https://github.com/neocotic/qrious",
              });

              buyEvent
                .querySelector(".btn-secondary")
                .addEventListener("click", () => {
                  ulEl.parentElement.removeChild(buyEvent);
                  ulEl.classList.remove("d-none");
                });
            });
        });
      });

    this.showEvents();
  }
}

export default Classes;
