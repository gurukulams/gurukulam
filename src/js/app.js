const hljs = require('highlight.js/lib/core')
class GurukulamsPage {
  constructor() {
    
    this.locale = document.getElementById("languageBtn").dataset.code;

    hljs.highlightAll();
    // Add copy button to each highlighted code block
    document.querySelectorAll('pre code').forEach((block) => {
      const button = document.createElement('button');
      button.className = 'hljs-copy-btn';
      button.innerHTML = '<i class="fa fa-copy"></i>';
      const pre = block.parentElement;
      pre.style.position = 'relative';
      pre.appendChild(button);
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(block.textContent).then(() => {
          button.innerHTML = '<i class="fa fa-check"></i>';
          setTimeout(() => (button.innerHTML = '<i class="fa fa-copy"></i>'), 1200);
        });
      });
    });

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
      return authObj.features && authObj.features.includes(feature);
    };

    const header = {
      "content-type": "application/json",
    };

    window.ApplicationHeader = () => {
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
    this.handleSearch();
    this.handleValidation();
    this.handleStatus();
    this.handleModelDialogs();
    this.handleTheme();
    this.setScrollIndicator();
    this.handleZenMode();
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
  }

  handleStatus() {
    const showStatus = (type, statusMessage) => {
      var delay = 2000;

      var toastConainerElement = document.getElementById("toast-container");
      toastConainerElement.innerHTML = `<div class="toast align-items-center border-0 text-${type}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex border border-${type}">
        <div class="toast-body">
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

  handleValidation() {}

  handleTheme() {
    const theme = localStorage.getItem("theme");
    const themeBtn = document.getElementById("themeBtn");
    const icons = {
      light: "moon-stars-fill",
      dark:  "sun-fill",
    };

    const setTheme = (theme) => {
      console.log("Set Theme " + theme);
      document.documentElement.setAttribute("data-bs-theme", theme);
      themeBtn.innerHTML = `<svg class="bi my-1 theme-icon-active" width="1em" height="1em"><use href="#${icons[theme]}"></use></svg>`;
      localStorage.setItem("theme", theme);
    };

    themeBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const selectedTheme =
        document.documentElement.getAttribute("data-bs-theme") === "light"
          ? "dark"
          : "light";
      console.log("selectedTheme" + selectedTheme);
      setTheme(selectedTheme);
    });

    if (theme) {
      setTheme(theme);
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  handleZenMode() {
    let zenMode = false;
    const scrollIndiHeight = getComputedStyle(
      document.getElementById("main-container")
    ).getPropertyValue("--header-size");

    const toggleZenMode = () => {
      zenMode = !zenMode;

      const getChildren = (n, skipMe) => {
        var r = [];
        for (; n; n = n.nextSibling)
          if (n.nodeType == 1 && n != skipMe) r.push(n);
        return r;
      };

      const getSiblings = (n) => {
        return getChildren(n.parentNode.firstChild, n);
      };

      if (zenMode) {
        getSiblings(document.getElementById("main-container")).forEach((s) => {
          s.classList.add("d-none");
        });

        document
          .querySelector("html")
          .style.setProperty("--header-size", "5px");
      } else {
        getSiblings(document.getElementById("main-container")).forEach((s) => {
          s.classList.remove("d-none");
        });

        document
          .querySelector("html")
          .style.setProperty("--header-size", scrollIndiHeight);
      }
    };

    document.addEventListener("keydown", (event) => {
      let isZKey = event.key === "z" || event.key === "Z";
      if (event.shiftKey && isZKey) {
        console.log("Shift + Z pressed");
        toggleZenMode();
      }
    });
  }

  setScrollIndicator() {
    window.addEventListener("scroll", () => {
      const scrollIndicator = document.getElementById("scrollIndicator");
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      scrollIndicator.style.width = scrollPercentage + "%";
    });
  }

  handleSecurity() {
    // If User is Logged in
    if (sessionStorage.auth) {
      document
        .getElementById("userBtn")
        .setAttribute("data-bs-toggle", "dropdown");

      // data-bs-toggle="dropdown"

      document.getElementById("login-pane").remove("d-none");

      document.getElementById("logoutBtn").addEventListener("click", () => {
        delete sessionStorage.auth;
        window.location.reload();
        fetch(`/api/auth/logout`, {
          method: "POST",
          headers: window.ApplicationHeader(),
        }).then((response) => {
          if (response.status === 200) {
            delete sessionStorage.auth;
            window.location.reload();
          }
        });
      });

      const userAuth = JSON.parse(sessionStorage.auth);

      document.querySelector(".avatar").src = userAuth.profilePicture;

      document.querySelectorAll(".secured").forEach((el) => {
        el.classList.remove("secured");
      });

      const userMenu = document.getElementById("userMenu");

      userMenu.classList.add("dropdown");
      userMenu.classList.add("dropdown-toggle");
    } else {
      // If User is not Logged in
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

  handleSearch() {
    if (sessionStorage.auth) {
      const offcanvasSearch = document.getElementById("offcanvas-search");
      offcanvasSearch.addEventListener("shown.bs.offcanvas", () => {
        console.log("Shown Canvas");
        document.getElementById("searchBox").focus();
      });

      const searchElements = document
        .getElementById("search-container")
        .querySelector("ul");

      const searchBox = document.getElementById("searchBox");

      const renderResults = (results, sText) => {
        let html = "";

        const filteredResults =
          sText.trim().length < 2
            ? results
            : results.filter(
                (result) =>
                  result &&
                  result.displayName.toLowerCase().includes(sText.toLowerCase())
              );

        if (filteredResults) {
          filteredResults.forEach((filteredResult) => {
            html += `<li class="list-group-item"><a href="/profile/${filteredResult.userHandle}">${filteredResult.displayName}</a></li>`;
          });
        }

        searchElements.innerHTML = html;
      };

      searchBox.addEventListener("keyup", () => {
        fetch(`/api/profiles`, {
          method: "GET",
          headers: window.ApplicationHeader(),
        })
          .then((response) => {
            if (response.status === 204) {
              return [];
            }
            return response.json();
          })
          .then((orgs) => {
            renderResults(orgs, searchBox.value);
          });
      });
    }
  }
}

class HomePage extends GurukulamsPage {}

new HomePage();
