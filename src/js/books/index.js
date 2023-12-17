import TextNotes from "./TextNotes";
import ImageNotes from "./ImageNotes";
import Classes from "./../events/Classes";

if (sessionStorage.auth) {
  const contentEl = document.getElementById("content");

  document.getElementById("bookOptionsPane").classList.remove("d-none");
  document.getElementById("notesBtn").classList.remove("d-none");

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

        let html = '<li><h6 class="dropdown-header">Buddies</h6></li>';

        buddies.forEach((buddy) => {
          html += `<li class="dropdown-item"><img src="${buddy.profilePicture}" class="img-circle img-thumbnail avatar" style="vertical-align:middle;border-radius:50%;width:3rem" alt="avatar"></li>`;
        });

        html += '<li><hr class="dropdown-divider"></li>';

        dMenu.innerHTML = html + dMenu.innerHTML;
      }
    });

  new TextNotes(contentEl);

  new ImageNotes(contentEl);

  const classes = new Classes(
    document.getElementById("event-container"),
    document.querySelector("i.fa-chalkboard-user").parentElement.dataset.path
  );

  const myOffcanvas = document.getElementById("offcanvas-classes");
  myOffcanvas.addEventListener("hidden.bs.offcanvas", () => {
    classes.showEvents();
  });

  myOffcanvas.querySelector("i.fa-plus").addEventListener("click", () => {
    classes.openEvent({});
  });
}

let zenMode = false;
const scrollIndiHeight = getComputedStyle(
  document.getElementById("main-container")
).getPropertyValue("--header-size");

const toggleZenMode = () => {
  zenMode = !zenMode;

  const getChildren = (n, skipMe) => {
    var r = [];
    for (; n; n = n.nextSibling) if (n.nodeType == 1 && n != skipMe) r.push(n);
    return r;
  };

  const getSiblings = (n) => {
    return getChildren(n.parentNode.firstChild, n);
  };

  if (zenMode) {
    getSiblings(document.getElementById("main-container")).forEach((s) => {
      s.classList.add("d-none");
    });

    document.querySelector("html").style.setProperty("--header-size", "5px");
  } else {
    getSiblings(document.getElementById("main-container")).forEach((s) => {
      s.classList.remove("d-none");
    });

    document
      .querySelector("html")
      .style.setProperty("--header-size", scrollIndiHeight);
  }
};

document.addEventListener("keydown", (event) => {
  let isZKey = event.key === "z" || event.key === "Z";
  if (event.shiftKey && isZKey) {
    console.log("Shift + Z pressed");
    toggleZenMode();
  }
});
