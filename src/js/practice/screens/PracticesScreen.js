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
    fetch(
      "/api/practices/" +
        this.parent.dataset.type +
        "?size=6&page=" +
        this.pageNumber,
      {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else if (response.status === 204) {
          let e = new Error(response.statusText);
          e.name = "NoContent";
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
        <nav class="navbar navbar-expand-lg navbar-light bg-light rounded" aria-label="Eleventh navbar example"> 
          <div class="container-fluid"> 
            <div class="collapse navbar-collapse" id="navbarsExample09"> 
            ${pageComponent}
               <form> 
                <button type="button" class="btn btn-primary">Add</button> 
              </form> 
            </div> 
          </div> 
        </nav> 
        <div class="container"> 
          <div class="items"> 
            <ul class="list-group"> 
              <li class="list-group-item"> 
                <div class="d-flex w-100 justify-content-between"> 
                  <h5 class="mb-1">List group item heading</h5> 
                  <small>3 days ago</small> 
                </div> 
                <p class="mb-1">Some placeholder content in a paragraph.</p> 
                <small>And some small print.</small> 
              </li> 
              <li class="list-group-item">
                <div class="d-flex w-100 justify-content-between"> 
                  <h5 class="mb-1">List group item heading</h5> 
                  <small>3 days ago</small> 
                </div> 
                <p class="mb-1">Some placeholder content in a paragraph.</p> 
                <small>And some small print.</small> 
              </li> 
            </ul> 
          </div> 
        </div>`;

        let ulEl = this.parent.querySelector(".list-group");
        ulEl.innerHTML = "";
        const sqlExams = page.content;
        sqlExams.forEach((item) => {
          ulEl.appendChild(this.createListElement(item));
        });
        this.registerEvents();
      })
      .catch(function (error) {
        if (error.name === "NoContent") {
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
    this.parent
      .querySelectorAll("div > div > ul > li > small")
      .forEach((el) => {
        const id = el.dataset.id;
        el.querySelector(".del-btn").addEventListener("on-confirmation", () => {
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
        el.querySelector(".edit-btn").addEventListener("click", () => {
          this.sqlExam.render(id);
        });

        el.querySelector(".add-q-btn").addEventListener("click", () => {
          console.log("add question button clicked" + id);
          this.question.render(id);
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
      .querySelector("#navbarsExample09 > form > button.btn-primary")
      .addEventListener("click", () => {
        console.log("add exam button clicked");
        this.sqlExam.render();
      });
  }
  createListElement(item) {
    let liEl = document.createElement("li");
    liEl.classList.add("list-group-item");
    liEl.innerHTML =
      '<div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' +
      item.name +
      `</h5> </div> <p class="mb-1">${item.description}</p> <small data-id="` +
      item.id +
      '"><a href="javascript://" class="add-q-btn">Questions</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript://" class="edit-btn">Edit</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript://" data-bs-toggle="modal" data-bs-target="#exampleModal" class="del-btn">Delete</a></small>';
    return liEl;
  }
}

export default PracticesScreen;