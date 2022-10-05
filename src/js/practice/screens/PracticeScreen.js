class PracticeScreen {
  constructor(_parent, _caller) {
    this.parent = _parent;
    this.caller = _caller;
  }

  render(_id) {
    this.oldChildNodes = [];
    while (this.parent.firstChild) {
      this.oldChildNodes.push(this.parent.removeChild(this.parent.firstChild));
    }

    let formEl = document.createElement("form");
    formEl.classList.add("row");
    formEl.classList.add("g-3");
    formEl.classList.add("needs-validation");
    formEl.noValidate = true;
    formEl.innerHTML = `

    <div class="container vh-100">
   <div class="row">
      <div class="col-6">
      </div>
      <div class="col-6 ">

      <ul class="nav justify-content-end">
  
  <li class="nav-item">
  <button type="button" class="nav-link btn">Cancel</button>
  </li>
  <li class="nav-item">
  <button type="submit" class="nav-link btn">${_id ? "Save" : "Add"}</button>
  </li>
</ul>
      
         
        
      
      </div>
   </div>
   <div class="row">
   <div class="col-12 form-check">
        <label for="title" class="form-label">Title</label>
        <input class="form-control" id="title" required>
        <div class="invalid-feedback">
          Please choose a Title.
        </div>
      </div>
      <div class="col-12 form-check">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" required></textarea>
        <div class="invalid-feedback">
          Please write Description.
        </div>
      </div>
   </div>
</div>

      
      
      `;
    this.parent.appendChild(formEl);
    formEl.addEventListener(
      "submit",
      (e) => {
        if (formEl.checkValidity()) {
          this.saveExam(e);
        } else {
          e.preventDefault();
          e.stopPropagation();
        }
        formEl.classList.add("was-validated");
      },
      false
    );

    formEl
      .querySelector(
        "form > div > div:nth-child(1) > div:nth-child(2) > ul > li:nth-child(1) > button"
      )
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.goBack(this);
      });
    this._id = _id;

    if (_id) {
      fetch("/api/practices/" + this.parent.dataset.type + "/" + _id, {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
        },
      })
        .then((response) => response.json())
        .then((exam) => {
          formEl.querySelector("#title").value = exam.title;
          formEl.querySelector("#description").value = exam.description;
        });
    }
    document.getElementById("title").focus();
  }

  goBack(btnComponent) {
    // Navigate Back to Listing Screen
    btnComponent.parent.removeChild(btnComponent.parent.lastChild);
    btnComponent.oldChildNodes.forEach((child) => {
      this.parent.appendChild(child);
    });
    this.caller.render();
  }

  saveExam(event) {
    event.preventDefault();
    const { title, description } = event.target;

    var examObj = { title: title.value, description: description.value };
    if (this._id) {
      fetch("/api/practices/" + this.parent.dataset.type + "/" + this._id, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
        },
        body: JSON.stringify(examObj),
      })
        .then((response) => {
          if (response.status >= 400 && response.status < 600) {
            throw new Error("Bad response from server");
          }
          this.goBack(this);
          window.success("Saved Successfully");
        })
        .catch((e) => {
          window.error("Failed to update", e);
        });
    } else {
      fetch("/api/practices/" + this.parent.dataset.type, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + JSON.parse(sessionStorage.auth).authToken,
        },
        body: JSON.stringify(examObj),
      })
        .then((response) => {
          if (response.status >= 400 && response.status < 600) {
            throw new Error("Bad response from server");
          }
          this.goBack(this);
          window.success("success", "Added");
        })
        .catch((e) => {
          window.error("Failed to add", e);
        });
    }

    return false;
  }
}

export default PracticeScreen;
