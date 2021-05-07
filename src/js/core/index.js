class Core {
    constructor() {
        if (sessionStorage.auth) {
            document.querySelector(".logout").addEventListener("click", (event) => {
                delete sessionStorage.auth;
                window.location.href = '/';
            });
            document.querySelector(".avatar").src = JSON.parse(sessionStorage.auth).profilePicture;
        } else if(document.querySelector(".secured") != null ) {
            document.querySelector(".secured").classList.add("invisible");
        }


    }
}

new Core();