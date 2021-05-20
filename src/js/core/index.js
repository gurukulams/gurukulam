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

    window.showStatus = (type, statusMessage) => {
      console.log("{} => {}", type, statusMessage);
    };

    // Toast

    var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    toastElList.map(function (toastEl) {
      // eslint-disable-next-line no-undef
      return new bootstrap.Toast(toastEl, { autohide: true }).show();
    });
  }
}

new Core();
