class Events {
  constructor() {
    const mainBox = document.getElementById("main-content");
    const originalElements = [];

    const eventForm = document.createElement("div");
    eventForm.innerHTML = document.querySelector("#event-form").innerHTML;

    const showForm = () => {
      document.getElementById("cancelBtn").classList.remove("d-none");
      document.getElementById("saveBtn").innerHTML = "Save";
      mainBox.innerHTML = "";

      mainBox.appendChild(eventForm);

      document.querySelector("#titleTxt").focus();
    };

    const showEvents = (refresh) => {
      document.getElementById("cancelBtn").classList.add("d-none");
      document.getElementById("saveBtn").innerHTML = "Create New";
      mainBox.innerHTML = "";

      if (refresh) {
        fetch("/api/events", {
          headers: window.ApplicationHeader(),
        })
          .then((response) => {
            return response.json();
          })
          .then((events_response) => {
            while (originalElements.length > 0) {
              originalElements.pop();
            }

            var events_html = "";

            events_response.forEach((event) => {
              events_html += `
              <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="card-body">
                      <h5 class="card-title">${event.title}</h5>
                      <p class="card-text">${event.description}</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
              </div>
              `;
            });

            mainBox.innerHTML = events_html;

            Array.from(mainBox.children).forEach((childElement) => {
              originalElements.push(childElement);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        originalElements.forEach((childElement) => {
          mainBox.appendChild(childElement);
        });
      }
    };

    document.getElementById("saveBtn").addEventListener("click", () => {
      if (mainBox.firstChild === eventForm) {
        let eventRequest = {
          title: document.querySelector("#titleTxt").value,
          description: document.querySelector("#descriptionTxt").value,
          event_date: document.querySelector("#dateTxt").value,
        };

        fetch("/api/events", {
          method: "POST",
          headers: window.ApplicationHeader(),
          body: JSON.stringify(eventRequest),
        })
          .then((response) => {
            return response.json();
          })
          .then((event_response) => {
            console.log(event_response);
            showEvents(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        showForm();
      }
    });

    document.getElementById("cancelBtn").addEventListener("click", () => {
      showEvents(false);
    });

    showEvents(true);
  }
}

new Events();
