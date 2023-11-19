class Core {
  constructor() {
    this.handleModelDialogs();

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

    window.hasFeature = (feature) => {
      const authObj = JSON.parse(sessionStorage.auth);
      console.log(authObj.features);

      return authObj.features && authObj.features.includes(feature);
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

    window.getUser = async (id) => {
      const response = await fetch(`/api/profiles/${id}`, {
        method: "GET",
        headers: window.ApplicationHeader(),
      });
      const json = await response.json();
      return json;
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

    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );

    [...popoverTriggerList].map((popoverTriggerEl) => {
      // eslint-disable-next-line no-undef
      new bootstrap.Popover(popoverTriggerEl);
    });
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
      //this.loadBoards();
      document.getElementById("login-pane").remove("d-none");

      document.getElementById("logoutBtn").addEventListener("click", () => {
        delete sessionStorage.auth;
        window.location.reload();
      });

      const userAuth = JSON.parse(sessionStorage.auth);

      document.querySelector(".avatar").src = userAuth.profilePicture;

      document.getElementById("profileBtn").href =
        "/profile/" + userAuth.userName;

      document.querySelectorAll(".secured").forEach((el) => {
        el.classList.remove("invisible");
        el.classList.remove("d-none");
      });
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
}

new Core();
