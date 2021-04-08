class SqlExam {
  constructor(_parent,_caller) {
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
    formEl.innerHTML = `
      <div class="col-md-6">
        <label for="name" class="form-label">Name</label>
        <input  class="form-control" id="name">
      </div>
      <div class="col-md-6">
        <label for="database" class="form-label">Type</label>
        <select id="database" class="form-select">
          <option selected>Choose...</option>
          <option value='h2'>H2</option>
          <option value='postgres'>Postgres</option>
        </select>
      </div>
      <div class="col-12">
        <label for="script" class="form-label">Script</label>
        <textarea class="form-control" id="script"></textarea>
      </div> 
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Create</button> 
        <button type="button" class="btn btn-secondary">Cancel</button>
      </div>`;
    this.parent.appendChild(formEl);
    formEl.addEventListener("submit", (e) => this.saveExam(e));

    this.parent.querySelector(
      "form > div:nth-child(4) > button.btn.btn-secondary"
    ).addEventListener("click", (event) => {
      event.preventDefault();
      this.goBack(this);
    });
  
  
  if(_id){
    fetch('/api/exams/sql/'+_id,{
      "headers": {
        "content-type": "application/json",
        "Authorization": "Bearer " + JSON.parse(sessionStorage.auth).authToken
      }
    }).then(response => response.json())
    .then(exam => console.log(exam));
    }
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
    const { name, database, script } = event.target;

    var examObj = { name: name.value, database: database.value,script: script.value };

    fetch("/api/exams/sql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + JSON.parse(sessionStorage.auth).authToken
      },
      body: JSON.stringify(examObj),
    })
      .then((response) => {
        this.goBack(this);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    return false;
  }

}

export default SqlExam;
