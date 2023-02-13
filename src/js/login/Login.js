class Login {
  constructor() {
    if (document.querySelector("#userName")) {
      document.querySelector("#userName").focus();
      this.registerEvents();
    }
  }

  registerEvents() {
    document
      .querySelector("form")
      .addEventListener("submit", (e) => this.login(e));
  }

  login(event) {
    event.preventDefault();
    let authRequest = {
      userName: document.querySelector("#userName").value,
      password: document.querySelector("#password").value,
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
