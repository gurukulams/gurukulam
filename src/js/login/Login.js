class Login {
  constructor() {
    if (document.querySelector("#login-pane")) {
      this.registerEvents();
    }
  }

  registerEvents() {
    document.querySelectorAll("#login-pane>button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.login(e);
      });
    });
  }

  login(event) {
    event.preventDefault();
    let authRequest = {
      userName: event.currentTarget.name + "@email.com",
      password: event.currentTarget.name + "password",
    };
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(authRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((auth_response) => {
        if (auth_response.expiresIn) {
          auth_response.expiresIn = Date.now() + auth_response.expiresIn;
          sessionStorage.auth = JSON.stringify(auth_response);
          location.reload();
        } else {
          sessionStorage.setItem("ref_page", window.location.href);
          sessionStorage.setItem("reg_token", auth_response.registrationToken);
          sessionStorage.setItem("profile_pic", auth_response.profilePicture);
          window.location.href = "/welcome";
        }
      })
      .catch((err) => {
        // document.querySelector(".d-none").classList.remove("d-none");

        alert(err);
      });
  }
}

export default Login;
