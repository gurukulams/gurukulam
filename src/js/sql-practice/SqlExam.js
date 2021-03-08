class SqlExam {

  constructor(_parent) {
    this.parent = _parent;
    this.oldChildNodes = [];

    while (this.parent.firstChild) {
      this.oldChildNodes.push(this.parent.removeChild(this.parent.firstChild));
    }

    let formEl = document.createElement('form');
    formEl.classList.add("row");
    formEl.classList.add("g-3");
    formEl.innerHTML = '<div class="col-md-6"><label for="inputEmail4" class="form-label">Name</label><input type="email" class="form-control" id="inputEmail4"></div><div class="col-md-6"><label for="inputState" class="form-label">Type</label><select id="inputState" class="form-select"><option selected>Choose...</option><option>Postgres</option></select></div><div class="col-12"><label for="inputAddress" class="form-label">Description</label><textarea class="form-control" id="inputAddress"></textarea></div> <div class="col-md-6"><label for="formFile" class="form-label">Scripts</label><input class="form-control" type="file" id="formFile"></div><div class="col-12"><button type="submit" class="btn btn-primary">Create</button> <button class="btn btn-secondary">Cancel</button></div>';
    this.parent.appendChild(formEl);

    this.render();
    this.registerEvents();
  }

  render() {

  }

  registerEvents() {
    let cancelBtn = this.parent.querySelector('form > div:nth-child(5) > button.btn.btn-secondary');
    cancelBtn.addEventListener('click', event => {
      event.preventDefault();
      this.parent.removeChild(this.parent.lastChild);
      console.log(this.oldChildNodes);
      this.oldChildNodes.forEach(child => {
        this.parent.appendChild(child);
      });
    });
  }

}

export default SqlExam;