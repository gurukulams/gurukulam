class Classes {
  constructor(_parent) {
    this.parent = _parent;
    this.chaptersPath = document.querySelector(
      "i.fa-chalkboard-user"
    ).parentElement.dataset.path;

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
              liElement.classList.add("w-100");
              liElement.classList.add("h-100");
            });
        });
      });

    this.eventsView.classList.remove("d-none");
    this.editForm.classList.add("d-none");
  }
}

export default Classes;
