import SqlExam from "./SqlExam";

class SqlExams {
  constructor(_parent) {
    this.parent = _parent;
    _parent.render =this.render;
    this.sqlExam = new SqlExam(_parent,this);
    this._this=this;
    this.pageNumber=0;
    this.render();
  }

  render() {
    console.log(this);
    fetch("/api/exams/sql?size=6&page="+this.pageNumber, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Bearer " + JSON.parse(sessionStorage.auth).authToken
      }
    })
      .then((response) => {
        if (response.status == 200) {
          return response;
        } else if (response.status == 204) {
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
        var pageComponent=this.pagination(page);
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
        if (error.name == "NoContent") {
          error.root.parent.innerHTML =
            '<p class="lead">There are no exams. But you can create one <a href="javascript://">here</a></p>';
          error.root.parent
            .querySelector("p > a")
            .addEventListener("click", (event) => {
              error.root.sqlExam.render();
            });
        } else {
          console.log("Request failed:", error);
        }
      });
  }
    
     pagination(page) {
     return `<ul class="navbar-nav me-auto mb-2 mb-lg-0 pagination"> 

     ${page.first ? '' : ` <li class="page-item"><a class="page-link" href="#">Previous</a></li> ` }
     ${page.totalPages !==1? Array(page.totalPages).join(0).split(0).map((item, i) => `
     <li class="page-item">
     <a class="page-link by-number" href="#"> ${i+1}</a>
   `).join(''): ''}
     ${page.last ? '' : `<li class="page-item"><a class="page-link" href="#">Next</a></li> `}
    </ul>`
     }
     registerEvents() {
    this.parent
      .querySelectorAll("div > div > ul > li > small")
      .forEach((el) => {
        const id = el.dataset.id;
        el.querySelector(".del-btn").addEventListener("click", (event) => {
          fetch("/api/exams/sql/" + id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + JSON.parse(sessionStorage.auth).authToken
            },
          }).then((response) => {
            if (response.status == 200) {
              this.render();
            }
          });
        });
      });

      this.parent
      .querySelectorAll("div > div > ul > li > small")
      .forEach((el) => {
        const id = el.dataset.id;
        el.querySelector(".edit-btn").addEventListener("click", (event) => {
          this.sqlExam.render();
        });
      });

      this.parent
      .querySelectorAll("#navbarsExample09 > ul > li > a.by-number")
      
      .forEach((el) => {
      el.addEventListener("click", (event) => {
        this.pageNumber=parseInt(event.currentTarget.innerHTML) - 1;
        this.render();
      })
  });

    this.parent
      .querySelector("#navbarsExample09 > form > button.btn-primary")
      .addEventListener("click", (event) => {
        this.sqlExam.render();
      });
  }

  createListElement(item) {
    let liEl = document.createElement("li");
    liEl.classList.add("list-group-item");
    liEl.innerHTML =
      '<div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' +
      item.name +
      "</h5> <small>" +
      item.database +
      '</small> </div> <p class="mb-1">Some placeholder content in a paragraph.</p> <small data-id="' +
      item.id +
      '"><a href="#">Add Question</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript://" class="edit-btn">Edit</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript://" class="del-btn">Delete</a></small>';
    return liEl;
  }
}

export default SqlExams;
