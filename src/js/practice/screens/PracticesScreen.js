import PracticeScreen from "./PracticeScreen";
import QuestionScreen from "./QuestionScreen";
class PracticesScreen {
  constructor(_parent) {
    this.parent = _parent;
    _parent.render = this.render;
    this.sqlExam = new PracticeScreen(_parent, this);
    this.question = new QuestionScreen(_parent, this);
    this._this = this;
    this.pageNumber = 0;
    this.render();
  }

  render() {
    if (window.location.pathname.includes("/practices/books/")) {
      let bookName = window.location.pathname.split("/practices/books/")[1];
      const chaptorName = bookName.substring(bookName.indexOf("/") + 1);
      bookName = bookName.substring(0, bookName.indexOf("/"));
      //this.question.render(true, bookName, chaptorName);
      let localeCode = window.location.pathname.split("/practices/books/")[0];
      if (localeCode.trim().length === 0) {
        console.log("Def L");
      } else {
        window.LANGUAGE = localeCode.substring(1);
      }

      fetch("/api/books/" + bookName + "/owner", {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
        },
      })
        .then((response) => {
          if (response.status === 202) {
            this.question.render(true, bookName, chaptorName);
          } else if (response.status === 406) {
            this.question.render(false, bookName, chaptorName);
          }
          throw Error(response.statusText);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      fetch(
        "/api/practices/" +
          this.parent.dataset.type +
          "?size=6&page=" +
          this.pageNumber,
        {
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(sessionStorage.auth).authToken,
          },
        }
      )
        .then((response) => {
          if (response.status === 200) {
            return response;
          } else if (response.status === 204) {
            let e = new Error(response.statusText);
            e.title = "NoContent";
            e.root = this;
            throw e;
          }
          throw Error(response.statusText);
        })
        .then(function (response) {
          return response.json();
        })
        .then((page) => {
          var pageComponent = this.pagination(page);
          this.parent.innerHTML = `
            <nav class="navbar navbar-expand-lg" aria-label="Eleventh navbar example"> 
              <div class="container-fluid"> 
                <div class="collapse navbar-collapse" id="navbarsExample09"> 
                ${pageComponent}
                   <form> 
                    <button type="button" class="btn">Add</button> 
                  </form> 
                </div> 
              </div> 
            </nav> 
            <div class="container"> 
              <div class="items"> 
                
              </div> 
            </div>`;

          let ulEl = this.parent.querySelector(".items");
          ulEl.innerHTML = "";
          const sqlExams = page.content;
          sqlExams.forEach((item) => {
            ulEl.appendChild(this.createListElement(item));
          });
          this.registerEvents();
        })
        .catch(function (error) {
          if (error.title === "NoContent") {
            error.root.parent.innerHTML =
              '<p class="lead">There are no practices. But you can create one <a href="javascript://">here</a></p>';
            error.root.parent
              .querySelector("p > a")
              .addEventListener("click", () => {
                error.root.sqlExam.render();
              });
          } else {
            console.log("Request failed:", error);
          }
        });
    }
  }

  pagination(page) {
    return `
     <span>${page.size * page.number + 1} - ${
      page.totalElements > page.size * (page.number + 1)
        ? page.size * (page.number + 1)
        : page.totalElements
    } of ${page.totalElements}</span>
     <ul class="navbar-nav me-auto mb-2 mb-lg-0 pagination"> 

     ${
       page.first
         ? ""
         : ` <li class="page-item"><a class="page-link link-prev" href="#"><<</a></li> `
     }
     
     ${
       page.last
         ? ""
         : `<li class="page-item"><a class="page-link link-next" href="#">>></a></li> `
     }
     
    </ul>`;
  }
  registerEvents() {
    this.parent.querySelectorAll("a.h5").forEach((el) => {
      const practice = el.parentElement.parentElement.practice;
      el.addEventListener("click", () => {
        this.question.render(
          JSON.parse(sessionStorage.auth).userName === practice.owner,
          practice.id
        );
      });
    });

    this.parent.querySelectorAll("a.edit-btn").forEach((el) => {
      const id = el.parentElement.parentElement.dataset.id;
      el.addEventListener("click", () => {
        this.sqlExam.render(id);
      });
    });

    this.parent.querySelectorAll("a.del-btn").forEach((el) => {
      const id = el.parentElement.parentElement.dataset.id;
      el.addEventListener("on-confirmation", () => {
        fetch("/api/practices/" + this.parent.dataset.type + "/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(sessionStorage.auth).authToken,
          },
        }).then((response) => {
          if (response.status === 200) {
            this.render();
          }
        });
      });
    });

    var el = this.parent.querySelector(
      "#navbarsExample09 > ul > li > a.link-prev"
    );
    if (el) {
      el.addEventListener("click", () => {
        this.pageNumber = this.pageNumber - 1;
        this.render();
      });
    }
    el = this.parent.querySelector("#navbarsExample09 > ul > li > a.link-next");
    if (el) {
      el.addEventListener("click", () => {
        this.pageNumber = this.pageNumber + 1;
        this.render();
      });
    }
    // Add exam event
    this.parent
      .querySelector("#navbarsExample09 > form > button.btn")
      .addEventListener("click", () => {
        this.sqlExam.render();
      });
  }
  createListElement(item) {
    let liEl = document.createElement("div");
    liEl.classList.add("card");
    liEl.classList.add("border-0");
    liEl.dataset.id = item.id;
    liEl.practice = item;
    liEl.innerHTML = `
    <div class="card-body">
    <a class="h5 card-title">${item.title}</a>
    <p class="card-text">${item.description}</p>
    </div>
    <div class="card-footer bg-transparent border-bottom border-top-0 pt-0">
    ${
      JSON.parse(sessionStorage.auth).userName === item.owner
        ? `<a href="javascript://" class="edit-btn">Edit</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript://" data-bs-toggle="modal" data-bs-target="#exampleModal" class="del-btn">Delete</a>`
        : ``
    }
    </div>`;

    return liEl;
  }
}

export default PracticesScreen;
