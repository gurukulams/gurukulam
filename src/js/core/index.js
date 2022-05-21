class Core {
  constructor() {
    this.locale = document.getElementById("languageBtn").dataset.code;

    if (this.locale === "en") {
      this.locale = undefined;
    }

    this.handleSecurity();

    this.handleModelDialogs();

    this.loadBoards();
  }

  handleModelDialogs() {
    var myModalEl = document.getElementById("exampleModal");
    let cRelatedTarget = null;
    myModalEl.addEventListener("shown.bs.modal", function (event) {
      cRelatedTarget = event.relatedTarget;
      myModalEl
        .querySelector(".btn-primary")
        .addEventListener("click", (event) => {
          if (!event.calledFlag) {
            event.calledFlag = true;
            const confirmationEvent = new Event("on-confirmation");
            cRelatedTarget.dispatchEvent(confirmationEvent, {
              bubbles: false,
              detail: { text: () => "textarea.value" },
            });
            // eslint-disable-next-line no-undef
            bootstrap.Modal.getInstance(myModalEl).hide();
          }
        });
    });

    const showStatus = (type, statusMessage) => {
      var delay = 2000;

      var toastConainerElement = document.getElementById("toast-container");
      toastConainerElement.innerHTML = `<div class="toast align-items-center  border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body text-${type}">
          ${statusMessage}
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      </div>`;
      // eslint-disable-next-line no-undef
      var toast = new bootstrap.Toast(toastConainerElement.firstElementChild, {
        delay: delay,
        animation: true,
      });
      toast.show();

      // setTimeout(() => toastElement.remove(), delay + 3000); // let a certain margin to allow the "hiding toast animation"
    };

    window.success = (statusMessage) => {
      showStatus("success", statusMessage);
    };

    window.error = (statusMessage) => {
      showStatus("danger", statusMessage);
    };

    window.warning = (statusMesaage) => {
      showStatus("warning", statusMesaage);
    };

    window.info = (statusMesaage) => {
      showStatus("info", statusMesaage);
    };
  }

  handleSecurity() {
    if (sessionStorage.auth) {
      document.querySelector(".logout").addEventListener("click", () => {
        delete sessionStorage.auth;
        window.location.href = "/";
      });
      document.querySelector(".avatar").src = JSON.parse(
        sessionStorage.auth
      ).profilePicture;

      document.querySelector(".navbar-brand").href = "books/maths";
    } else if (document.querySelector(".secured") !== null) {
      document.querySelector(".secured").classList.add("invisible");
    }
  }

  loadBoards() {
    fetch("/api/boards", {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
        "Accept-Language": this.locale,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          return response.json();
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then((boards) => {
        var myDropDownEl = document.getElementById("boardsDropdown");
        var myDropDownEla = document.querySelector("#boardsDropdown > a");
        if (boards == undefined) {
          myDropDownEla.innerText = "-";
          document.getElementById("subjectList").style.visibility = "hidden";
        } else if (boards.length == 1) {
          myDropDownEla.innerText = boards[0].title;
          document.getElementById("subjectList").style.visibility = "visible";
        } else {
          document.getElementById("subjectList").style.visibility = "visible";
          var ulEl = document.createElement("ul");
          ulEl.classList.add("dropdown-menu");
          ulEl.setAttribute("aria-labelledby", "boardsDropdown");
          ulEl.innerHTML = "";

          myDropDownEl.appendChild(ulEl);
          boards.forEach((item) => {
            ulEl.appendChild(
              this.createSpanElementForBoard(item, "boardsDropdown")
            );
          });

          ulEl.firstChild.click();
        }
      });
  }

  createSpanElementForBoard(item, id) {
    let liEl = document.createElement("li");
    liEl.dataset.id = item.id;
    liEl.innerHTML = `<span class="dropdown-item">${item.title}</span>`;

    liEl.addEventListener("click", () => {
      document.querySelector("#" + id + " > a").innerText = item.title;
      document.querySelectorAll("#" + id + " > ul > li").forEach((el) => {
        el.style.display = "block";
      });
      liEl.style.display = "none";

      this.loadGrades(liEl.dataset.id);
    });
    return liEl;
  }

  loadGrades(boardId) {
    fetch("/api/boards/" + boardId + "/grades", {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
        "Accept-Language": this.locale,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          return response.json();
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then((response) => {
        var myDropDownEl = document.getElementById("dropdownMenuButton2");
        var myDropDownEla = document.querySelector("#dropdownMenuButton2 > a");

        if (response == undefined) {
          myDropDownEla.innerText = "-";
          document.getElementById("subjectList").style.visibility = "hidden";
        } else if (response.length == 1) {
          var ulEl = document.querySelector("#dropdownMenuButton2 > ul");
          ulEl.style.visibility = "hidden";
          myDropDownEla.innerText = response[0].title;
          document.getElementById("subjectList").style.visibility = "visible";
          this.loadSyllabus(boardId, response[0].id);
        } else {
          document.getElementById("subjectList").style.visibility = "visible";
          var ulEl = document.querySelector("#dropdownMenuButton2 > ul");
          if (ulEl == null) {
            ulEl = document.createElement("ul");
            ulEl.classList.add("dropdown-menu");
            ulEl.setAttribute("aria-labelledby", "dropdownMenuButton2");
          }

          ulEl.style.visibility = "visible";
          ulEl.innerHTML = "";

          myDropDownEl.appendChild(ulEl);
          response.forEach((item) => {
            ulEl.appendChild(
              this.createSpanElementForGrade(
                item,
                "dropdownMenuButton2",
                boardId
              )
            );
          });

          ulEl.firstChild.click();

          //this.listSyllabus(id, ulEl.firstChild.dataset.id);
        }
      });
  }

  createSpanElementForGrade(item, elementId, boardId) {
    let liEl = document.createElement("li");
    liEl.dataset.id = item.id;
    liEl.dataset.boardId = boardId;
    liEl.innerHTML = `<span class="dropdown-item">${item.title}</span>`;

    liEl.addEventListener("click", () => {
      document.querySelector("#" + elementId + " > a").innerText = item.title;
      document
        .querySelectorAll("#" + elementId + " > ul > li")
        .forEach((el) => {
          el.style.display = "block";
        });

      liEl.style.display = "none";
      this.loadSyllabus(liEl.dataset.boardId, liEl.dataset.id);
    });
    return liEl;
  }

  loadSyllabus(boardId, gradeId) {
    fetch("/api/boards/" + boardId + "/grades/" + gradeId + "/subjects", {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
        "Accept-Language": this.locale,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          return response.json();
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then((response) => {
        if (response !== undefined) {
          var subjectUl = document.getElementById("subjectList");
          subjectUl.innerHTML = "";
          response.forEach((item) => {
            subjectUl.appendChild(this.createLiElementForSyllabus(item));
          });
        } else {
          var subjectUl = document.getElementById("subjectList");
          subjectUl.innerHTML = "";
        }
      });
  }

  createLiElementForSyllabus(item) {
    let liEl = document.createElement("li");
    liEl.dataset.id = item.id;
    liEl.innerHTML = `<a class="nav-link" href="/books/${item.title.toLowerCase()}">${
      item.title
    }</a>`;
    return liEl;
  }
}

new Core();
