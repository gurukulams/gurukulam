class Core {
  constructor() {
    this.locale = document.getElementById("languageBtn").dataset.code;

    if (this.locale === "en") {
      this.locale = undefined;
    }

    window.LANGUAGE = this.locale;

    const getAuthToken = () => {
      const authObj = JSON.parse(sessionStorage.auth);

      if (Date.now() > authObj.expiresIn) {
        const data = JSON.stringify({
          token: authObj.refreshToken,
        });

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.open("POST", "/api/auth/refresh", false);
        xhr.setRequestHeader("authorization", "Bearer " + authObj.authToken);
        xhr.setRequestHeader("content-type", "application/json");

        xhr.send(data);

        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          data.expiresIn = Date.now() + data.expiresIn;

          sessionStorage.auth = JSON.stringify(data);

          return data.authToken;
        } else if (xhr.status === 401) {
          console.log("Invalid Refresh Token");
        }
      }

      return authObj.authToken;
    };

    window.ApplicationHeader = () => {
      const header = {
        "content-type": "application/json",
      };

      if (sessionStorage.auth) {
        header["Authorization"] = "Bearer " + getAuthToken();
      }
      if (window.LANGUAGE) {
        header["Accept-Language"] = window.LANGUAGE;
      } else {
        header["Accept-Language"] = "";
      }

      return header;
    };

    window.shuffle = (array) => {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    };

    this.handleSecurity();

    this.handleModelDialogs();
  }

  handleModelDialogs() {
    var myModalEl = document.getElementById("exampleModal");
    if (myModalEl) {
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
    }

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
      this.loadBoards();
      document.getElementById("login-pane").remove("d-none");

      document.querySelector(".logout").addEventListener("click", () => {
        delete sessionStorage.auth;
        window.location.reload();
      });
      document.querySelector(".avatar").src = JSON.parse(
        sessionStorage.auth
      ).profilePicture;

      document.querySelector(".secured").classList.remove("d-none");
    } else {
      const securedUrls = ["/events"];

      if (securedUrls.includes(window.location.pathname)) {
        document.body.querySelector("main").innerHTML = `
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center row">
                <div class=" col-md-6">
                    <img src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg" alt=""
                        class="img-fluid">
                </div>
                <div class=" col-md-6 mt-5">
                    <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                    <p class="lead">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <a href="/" class="btn btn-primary">Go Home</a>
                </div>

            </div>
        </div>
        `;
      }

      if (document.querySelector(".secured") !== null) {
        document.querySelector(".secured").classList.add("d-none");
        document.getElementById("login-pane").classList.remove("d-none");

        if (document.querySelector(".fa-google")) {
          document
            .querySelector(".fa-google")
            .parentElement.addEventListener("click", () => {
              sessionStorage.setItem("ref_page", window.location.href);
              window.location.href = `/oauth2/authorize/google?redirect_uri=${
                window.location.protocol + "//" + window.location.host
              }/welcome`;
            });
        }
      }
    }
  }

  loadBoards() {
    fetch("/api/boards", {
      headers: window.ApplicationHeader(),
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
        if (boards === undefined) {
          myDropDownEla.innerText = "-";
          document.getElementById("subjectList").style.visibility = "hidden";
        } else if (boards.length === 1) {
          myDropDownEla.innerText = boards[0].title;
          document.getElementById("subjectList").style.visibility = "visible";
          this.createSpanElementForBoard(boards[0], "boardsDropdown");
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
    this.loadGrades(item.id);
    liEl.addEventListener("click", () => {
      document.querySelector("#" + id + " > a").innerText = item.title;
      document.querySelectorAll("#" + id + " > ul > li").forEach((el) => {
        el.style.display = "block";
      });
      liEl.style.display = "none";
    });
    return liEl;
  }

  loadGrades(boardId) {
    fetch("/api/boards/" + boardId + "/grades", {
      headers: window.ApplicationHeader(),
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

        var ulEl;
        if (response === undefined) {
          myDropDownEla.innerText = "-";
          document.getElementById("subjectList").style.visibility = "hidden";
        } else if (response.length === 1) {
          document.getElementById("subjectList").style.visibility = "visible";
          this.loadSubjects(boardId, response[0].id);
          myDropDownEla.innerText = response[0].title;
          // ulEl = document.querySelector("#dropdownMenuButton2 > ul");
          // ulEl.style.visibility = "hidden";
        } else {
          document.getElementById("subjectList").style.visibility = "visible";
          ulEl = document.querySelector("#dropdownMenuButton2 > ul");
          if (ulEl === null) {
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
      this.loadSubjects(liEl.dataset.boardId, liEl.dataset.id);
    });
    return liEl;
  }

  loadSubjects(boardId, gradeId) {
    fetch("/api/boards/" + boardId + "/grades/" + gradeId + "/subjects", {
      headers: window.ApplicationHeader(),
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
        var subjectUl;
        if (response !== undefined) {
          subjectUl = document.getElementById("subjectList");
          subjectUl.innerHTML = "";
          response.forEach((subject) => {
            subjectUl.appendChild(
              this.createSubjectMenuItem(boardId, gradeId, subject)
            );
          });
        } else {
          subjectUl = document.getElementById("subjectList");
          subjectUl.innerHTML = "";
        }
      });
  }

  createSubjectMenuItem(boardId, gradeId, subject) {
    let liEl = document.createElement("li");
    liEl.dataset.id = subject.id;
    let path = "#";
    liEl.innerHTML = `<a class="nav-link" href="/books/${path}">${subject.title}</a>`;
    // Fetch Books under subject.id
    // book[0].path as href
    fetch(
      "/api/boards/" +
        boardId +
        "/grades/" +
        gradeId +
        "/subjects/" +
        subject.id +
        "/books",
      {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
          "Accept-Language": window.LANGUAGE,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 204) {
          return [];
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then((books) => {
        if (books.length !== 0) {
          path = books[0].path;
          if (window.LANGUAGE) {
            liEl.innerHTML = `<a class="nav-link" href="/${window.LANGUAGE}/books/${path}">${subject.title}</a>`;
          } else {
            liEl.innerHTML = `<a class="nav-link" href="/books/${path}">${subject.title}</a>`;
          }
        }
      });

    return liEl;
  }
}

new Core();
