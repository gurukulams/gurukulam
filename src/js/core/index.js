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

        var myModalEl = document.getElementById('exampleModal')
        myModalEl.addEventListener('shown.bs.modal', function (event) {
            const modelElement = event.currentTarget;
            modelElement.querySelector('.btn-primary').addEventListener("click", (event) => {
                document.getElementById('exampleModal').onConfirmation();
                var modal = bootstrap.Modal.getInstance(modelElement)
                modal.hide();

            });
        })

    }
}

new Core();