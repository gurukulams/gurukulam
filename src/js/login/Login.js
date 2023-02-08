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
          document.body.innerHTML = `
          <main class="col-lg-6 col-md-8 mx-auto text-center">
            <form>
              <img class="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
              <h1 class="h3 mb-3 fw-normal">Welcome to Gurukulams</h1>

              <div class="form-floating">
                <input  class="form-control" id="id" placeholder="">
                <label for="id">User Name</label>
              </div>

              <div class="form-floating">
                <input  class="form-control" id="firstName" placeholder="">
                <label for="firstName">First Name</label>
              </div>
              <div class="form-floating">
                <input  class="form-control" id="lastName" placeholder="">
                <label for="lastName">Last Name</label>
              </div>
              <div class="form-floating">
                <input  class="form-control" type="date" id="dob" placeholder="">
                <label for="dob">Date Of Birth</label>
              </div>

              <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>

            </form>
          </main>

          `;

          document.body.querySelector("img").src = auth_response.profilePicture;

          document.querySelector("form").addEventListener("submit", (e) => {
            e.token = auth_response.registrationToken;
            this.register(e);
          });
        }
      })
      .catch((err) => {
        document.querySelector(".d-none").classList.remove("d-none");
        console.error(err);
      });
  }

  register(event) {
    event.preventDefault();

    let regRequest = {
      id: document.querySelector("#id").value,
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
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
        location.reload();
      })
      .catch((err) => {
        document.querySelector(".d-none").classList.remove("d-none");
        console.error(err);
      });
  }
}

export default Login;
