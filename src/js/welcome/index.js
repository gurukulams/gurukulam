class Welcome {
  constructor() {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    if (token) {
      fetch("/api/auth/welcome", {
        headers: {
          "content-type": "application/json",
          Authorization: params.get("token"),
        },
      })
        .then((response) => response.json())
        .then((auth_response) => {
          if (auth_response.authToken) {
            // Why day ? Why ?
            // auth_response.authToken = params.get("token");
            auth_response.expiresIn = Date.now() + auth_response.expiresIn;
            sessionStorage.auth = JSON.stringify(auth_response);
            Welcome.reload();
          } else {
            this.register(
              auth_response.registrationToken,
              auth_response.profilePicture,
            );
          }
        });
    } else {
      if (sessionStorage.getItem("reg_token")) {
        this.register(
          sessionStorage.getItem("reg_token"),
          sessionStorage.getItem("profile_pic"),
        );
      }
    }
    this.setTheme();
  }

  static reload() {
    const refPage = sessionStorage.getItem("ref_page");
    sessionStorage.removeItem("ref_page");
    if (refPage) {
      window.location.href = refPage;
      window.location.replace(refPage);
    } else {
      window.location.href = "/";
      window.location.replace("/");
    }
  }

  register(registrationToken, profile_pic) {
    this.errorPane = document.querySelector(".text-danger");

    document.body.querySelector("img").src = profile_pic;
    document.querySelector("main").classList.remove("d-none");
    document.querySelector("#name").focus();

    document.querySelector("form").addEventListener("submit", (event) => {
      event.token = registrationToken;
      event.preventDefault();
      this.errorPane.classList.add("d-none");
      let regRequest = {
        name: document.querySelector("#name").value,
        dob: document.querySelector("#dob").value,
      };

      const age = this.getAge(regRequest.dob);

      if (age < 10 || age > 80) {
        this.showError("Please Enter valid Date of Birth");
      } else {
        fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + event.token,
          },
          body: JSON.stringify(regRequest),
        })
          .then((response) => {
            if (!response.ok) {
              this.showError("Unable to register. Please contact admin");
            } else {
              return response.json();
            }
          })
          .then((auth_response) => {
            auth_response.expiresIn = Date.now() + auth_response.expiresIn;
            sessionStorage.auth = JSON.stringify(auth_response);
            Welcome.reload();
          })
          .catch(() => {
            this.showError("Unable to register. Please contact admin");
          });
      }
    });
  }

  getAge(value) {
    var selectedDate = new Date(value);
    var now = new Date();

    if (selectedDate > now) {
      return -1;
    }

    //calculate month difference from current date in time
    var month_diff = now - selectedDate.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    return Math.abs(year - 1970);
  }

  showError(errorTxt) {
    this.errorPane.classList.remove("d-none");
    this.errorPane.innerHTML = errorTxt;
  }

  static cancel() {
    Welcome.reload();
  }

  setTheme() {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute("data-bs-theme", theme);
    } else {
      document.documentElement.setAttribute("data-bs-theme", "auto");
    }
  }
}

new Welcome();
