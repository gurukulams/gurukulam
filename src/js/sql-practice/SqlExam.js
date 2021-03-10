class SqlExam {
  constructor(_parent) {
    this.parent = _parent;
  }

  render() {

    this.oldChildNodes = [];
    while (this.parent.firstChild) {
      this.oldChildNodes.push(this.parent.removeChild(this.parent.firstChild));
    }

    let formEl = document.createElement("form");
    formEl.classList.add("row");
    formEl.classList.add("g-3");
    formEl.enctype = "multipart/form-data";
    formEl.innerHTML = `
      <div class="col-md-6">
        <label for="name" class="form-label">Name</label>
        <input  class="form-control" id="name">
      </div>
      <div class="col-md-6">
        <label for="database" class="form-label">Type</label>
        <select id="database" class="form-select">
          <option selected>Choose...</option>
          <option value='postgres'>Postgres</option>
        </select>
      </div>
      <div class="col-12">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description"></textarea>
      </div> 
      <div class="col-md-6">
        <label for="scripts" class="form-label">Scripts</label>
        <input class="form-control" type="file" id="scripts">
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Create</button> 
        <button class="btn btn-secondary">Cancel</button>
      </div>`;
    this.parent.appendChild(formEl);
    formEl.addEventListener("submit", (e) => this.saveExam(e));

    this.parent.querySelector(
      "form > div:nth-child(5) > button.btn.btn-secondary"
    ).addEventListener("click", (event) => {
      event.preventDefault();
      this.parent.removeChild(this.parent.lastChild);
      this.oldChildNodes.forEach((child) => {
        this.parent.appendChild(child);
      });
    });
  }

  saveExam(event) {
    event.preventDefault();
    const { name, database, description, scripts } = event.target;
    const formData = new FormData();

    var obj = { name: name.value, database: database.value };

    formData.append("exam", JSON.stringify(obj));
    formData.append("scripts", scripts.files[0]);

    fetch("/api/exams/sql/", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      },
      body: formData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    return false;
  }

}

export default SqlExam;
