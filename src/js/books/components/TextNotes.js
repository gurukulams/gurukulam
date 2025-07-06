import { Recogito } from "@recogito/recogito-js";
import CoreNotes from "./CoreNotes";

class TextNotes extends CoreNotes {
  constructor(_parent) {
    super(
      _parent,
      new Recogito({ content: "content", readOnly: true }),
    );

    const modeIcon1 = document.querySelector(".fa-pencil");
    const modeIcon2 = document.querySelector(".fa-bezier-curve");

    this.labelElement = document
      .getElementById("notesBtn")
      .querySelector("label.btn");

    document
      .querySelector(".fa-bezier-curve")
      .parentElement.addEventListener("click", () => {
        const temp = modeIcon2.className;
        modeIcon2.className = modeIcon1.className;
        modeIcon1.className = temp;

        const annotationMode = modeIcon1.classList.contains("fa-pencil")
          ? "ANNOTATION"
          : "RELATIONS";
        this.annobase.setMode(annotationMode);

        this.checkbox.checked = true;
        this.annobase.readOnly = false;
      });

    this.path = window.location.pathname.trim();
    if (this.path.endsWith("/")) {
      this.path = this.path.slice(0, -1);
    }

    this.ontype = this.path.split("/")[1];
    this.oninstance = this.path.split("/" + this.ontype + "/")[1];

    const offcanvasNotes = document.getElementById("offcanvas-notes");

    const notesPane = offcanvasNotes.querySelector(".offcanvas-body>ul");

    const searchBox = offcanvasNotes.querySelector('input[type="search"]');

    searchBox.addEventListener("keyup", () => {
      this.listAnnotations(
        notesPane,
        this.findNotes(this.annobase.getAnnotations(), searchBox.value),
      );
    });

    offcanvasNotes.addEventListener("show.bs.offcanvas", () => {
      searchBox.focus();
    });

    offcanvasNotes.addEventListener("show.bs.offcanvas", () => {
      this.listAnnotations(notesPane, this.annobase.getAnnotations());
    });

    this.loadNotes();
    this.listBuddies();
  }

  listAnnotations(notesPane, annotations) {
    notesPane.innerHTML = "";

    annotations.forEach((annnotation) => {
      const liElement = document.createElement("li");
      liElement.classList.add("list-group-item");
      liElement.innerHTML = annnotation.body[0].value;
      notesPane.appendChild(liElement);
    });
  }

  findNotes(items, text) {
    text = text.split(" ");
    return items.filter((item) => {
      return text.every((el) => {
        return item.body[0].value.includes(el);
      });
    });
  }

  listBuddies() {
    fetch(`/api/profiles/${JSON.parse(sessionStorage.auth).userName}/buddies`, {
      method: "GET",
      headers: window.ApplicationHeader(),
    })
      .then((response) => {
        if (response.status === 204) {
          return [];
        }
        return response.json();
      })
      .then((buddies) => {
        if (buddies.length !== 0) {
          const dMenu = document
            .getElementById("notesBtn")
            .querySelector("ul.dropdown-menu");

          let liSeparatorElement = document.createElement("li");
          liSeparatorElement.innerHTML = `<hr class="dropdown-divider">`;
          dMenu.insertBefore(liSeparatorElement, dMenu.firstChild);

          let liHeaderElement = document.createElement("li");
          liHeaderElement.innerHTML = `<h6 class="dropdown-header">Buddies</h6>`;
          dMenu.insertBefore(liHeaderElement, dMenu.firstChild);

          buddies.forEach((buddy) => {
            let liBuddyElement = document.createElement("li");
            liBuddyElement.classList.add("dropdown-item");
            liBuddyElement.innerHTML = `<img src="${buddy.profilePicture}" class="img-circle img-thumbnail avatar" style="vertical-align:middle;border-radius:50%;width:3rem" alt="avatar">`;
            dMenu.insertBefore(liBuddyElement, liSeparatorElement);

            liBuddyElement.addEventListener("click", () => {
              this.switchtoBuddy(buddy);
            });
          });

          // dMenu.innerHTML = html + dMenu.innerHTML;
        }
      });
  }

  switchtoBuddy(buddy) {
    this.checkbox.checked = false;
    this.annobase.readOnly = true;

    const buddyEl = document.createElement("span");
    buddyEl.className = document.getElementById("notesBtn").className;

    buddyEl.innerHTML = `
    <img src="${buddy.profilePicture}" class="form-control img-circle img-thumbnail avatar" style="vertical-align:middle;border-radius:50%;width:3rem" alt="avatar">
    <span class="input-group-text" id="basic-addon2"><i class="fa-regular fa-rectangle-xmark"></i></span>
    `;

    document.getElementById("notesBtn").parentElement.appendChild(buddyEl);
    document.getElementById("notesBtn").classList.add("d-none");
    window.ApplicationHeader()["X-Buddy-For"] = buddy.userHandle;
    this.loadNotes();

    buddyEl
      .querySelector("span.input-group-text")
      .addEventListener("click", () => {
        document.getElementById("notesBtn").parentElement.removeChild(buddyEl);
        document.getElementById("notesBtn").classList.remove("d-none");
        delete window.ApplicationHeader()["X-Buddy-For"];
        this.loadNotes();
      });
  }
}

export default TextNotes;
