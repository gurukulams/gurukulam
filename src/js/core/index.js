class Core {
  constructor() {
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

    // Confirmation Modal pop up logic
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

    fetch("/api/board", {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
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
        var myDropDownEl = document.getElementById("dropdownMenuButton1");
        var myDropDownEla = document.querySelector("#dropdownMenuButton1 > a");
        if (response == undefined) {
          myDropDownEla.innerText = "-";
          document.getElementById("subjectList").style.visibility = "hidden";
        } else if (response.length == 1) {
          myDropDownEla.innerText = response[0].title;
          document.getElementById("subjectList").style.visibility = "visible";
        } else {
          var ulEl = document.createElement("ul");
          ulEl.classList.add("dropdown-menu");
          ulEl.setAttribute("aria-labelledby", "dropdownMenuButton1");
          ulEl.innerHTML = "";

          myDropDownEl.appendChild(ulEl);
          response.forEach((item) => {
            ulEl.appendChild(
              this.createSpanElementForBoard(item, "dropdownMenuButton1")
            );
          });

          ulEl.firstChild.click();
        }
      });

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

      this.addGradeByBoardId(liEl.dataset.id);
    });
    return liEl;
  }

  addGradeByBoardId(id) {
    fetch("/api/board/" + id + "/grades", {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
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
          myDropDownEla.innerText = response[0].title;
          document.getElementById("subjectList").style.visibility = "visible";
        } else {
          var ulEl = document.querySelector("#dropdownMenuButton2 > ul");
          if (ulEl == null) {
            ulEl = document.createElement("ul");
            ulEl.classList.add("dropdown-menu");
            ulEl.setAttribute("aria-labelledby", "dropdownMenuButton2");
          }

          ulEl.innerHTML = "";

          myDropDownEl.appendChild(ulEl);
          response.forEach((item) => {
            ulEl.appendChild(
              this.createSpanElementForGrade(item, "dropdownMenuButton2")
            );
          });

          ulEl.firstChild.click();
        }
      });
  }

  createSpanElementForGrade(item, id) {
    let liEl = document.createElement("li");
    liEl.dataset.id = item.id;
    liEl.innerHTML = `<span class="dropdown-item">${item.title}</span>`;

    liEl.addEventListener("click", () => {
      document.querySelector("#" + id + " > a").innerText = item.title;
      document.querySelectorAll("#" + id + " > ul > li").forEach((el) => {
        el.style.display = "block";
      });

      liEl.style.display = "none";
      this.listSyllabus(liEl.dataset.id);
    });
    return liEl;
  }

  listSyllabus(id) {
    fetch("/api/grades/" + id + "/syllabus", {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
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
        var subjectUl = document.getElementById("subjectList");
        subjectUl.innerHTML = "";
        response.forEach((item) => {
          subjectUl.appendChild(this.createLiElementForSyllabus(item));
        });
      });
  }

  createLiElementForSyllabus(item, id) {
    let liEl = document.createElement("li");
    liEl.dataset.id = item.id;
    liEl.innerHTML = `<a class="nav-link" href="/books/${item.title}">${item.title}</a>`;

    liEl.addEventListener("click", () => {
      document.querySelector("#" + id + " > a").innerText = item.title;
      document.querySelectorAll("#" + id + " > ul > li").forEach((el) => {
        el.style.display = "block";
      });

      liEl.style.display = "none";

      // this.addGradeByBoardId(liEl.dataset.id);
    });
    return liEl;
  }
}

new Core();
