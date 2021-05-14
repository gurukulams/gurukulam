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

        // Confirmation Modal pop up logic
        var myModalEl = document.getElementById('exampleModal')
        let cRelatedTarget = null;
        myModalEl.addEventListener('shown.bs.modal', function (event) {

            cRelatedTarget = event.relatedTarget;
            myModalEl.querySelector('.btn-primary').addEventListener("click", (event) => {
                
                if(!event.calledFlag) {
                    event.calledFlag = true;
                    const confirmationEvent = new Event('on-confirmation');
                    cRelatedTarget.dispatchEvent(confirmationEvent,{ bubbles: false, detail: { text: () => "textarea.value" } });
                    bootstrap.Modal.getInstance(myModalEl).hide();  
                      
                }
                
      
            });
        })

    }
}

new Core();