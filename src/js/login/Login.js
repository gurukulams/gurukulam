class Login {
  constructor() {
    if (document.querySelector("#userName")) {
      document.querySelector("#userName").focus();
      this.registerEvents();
    }

    // fetch("/api/info")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     document.querySelector(
    //       ".app-info"
    //     ).innerHTML = `<br><b class="text-primary">v${data.appVersion}</b> runs on Java <b class="text-success">${data.javaVersion}</b>`;
    //     console.log(data);
    //   });
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
      .then((data) => {
        data.expiresIn = Date.now() + data.expiresIn;

        sessionStorage.auth = JSON.stringify(data);
        location.reload();
      })
      .catch((err) => {
        document.querySelector(".d-none").classList.remove("d-none");
        console.error(err);
      });
  }
}

export default Login;
