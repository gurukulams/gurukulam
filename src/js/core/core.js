class Core {
    constructor() {
        if (sessionStorage.auth) {
            document.querySelector(".logout").addEventListener("click", (event) => {
                delete sessionStorage.auth;
                window.location.href = '/';
            });
        } else {
            document.querySelector(".secured").classList.add("invisible");
        }


    }
}

new Core();