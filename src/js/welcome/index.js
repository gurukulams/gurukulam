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
            auth_response.authToken = params.get("token");
            auth_response.expiresIn = Date.now() + auth_response.expiresIn;
            sessionStorage.auth = JSON.stringify(auth_response);
            this.reload();
          } else {
            this.register(
              auth_response.registrationToken,
              auth_response.profilePicture
            );
          }
        });
    } else {
      if (sessionStorage.getItem("reg_token")) {
        this.register(
          sessionStorage.getItem("reg_token"),
          sessionStorage.getItem("profile_pic")
        );
      }
    }
  }

  reload() {
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
    document.body.querySelector("img").src = profile_pic;
    document.querySelector("main").classList.remove("d-none");
    document.querySelector("#firstName").focus();

    document.querySelector("form").addEventListener("submit", (event) => {
      event.token = registrationToken;
      event.preventDefault();

      let regRequest = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        dob: document.querySelector("#dob").value,
      };

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
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((auth_response) => {
          auth_response.expiresIn = Date.now() + auth_response.expiresIn;
          sessionStorage.auth = JSON.stringify(auth_response);
          this.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
}

new Welcome();
