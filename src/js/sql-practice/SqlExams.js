class SqlExams {

  constructor() {
    this.list = document.querySelector('.list-group');
    fetch('/api/exams/sql')
      .then(response => response.json())
      .then(page => this.render(page));
  }

  render(page) {
    this.list.innerHTML = '';
    const sqlExams = page.content;
    sqlExams.forEach(item => {
      this.createDomElements(item);
      this.list.appendChild(this.li);
    });
  }

  renderEditForm(event) {
    let id = event.target.getAttribute('data-id');
    document.querySelector('.edit-popup').classList.remove('hide');
    document.querySelector('.edit-popup').classList.add('show');
    document.querySelector('.btn-update').setAttribute('data-id', id);

    sqlExams.forEach(item => {
      if (item.id === id) {
        document.querySelector('.edit-item').value = item.title;
      }
    });
  }

  createDomElements(item) {
    this.li = document.createElement('li');
    this.li.classList.add("list-group-item");
    this.li.innerHTML = '<div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + item.name + '</h5> <small>' + item.database + '</small> </div> <p class="mb-1">Some placeholder content in a paragraph.</p> <small><a href="#">Add Question</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Edit</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Delete</a></small>';
  }

  insertItem() {
    let todoItem = document.querySelector('.item').value;

    let newItem = {
      id: Date.now().toString(),
      title: todoItem,
      done: false,
      date: new Date()
    };

    sqlExams.push(newItem);

    document.querySelector('.item').value = '';
    this.render();
  }

  removeItem(event) {
    let id = event.target.getAttribute('data-id');

    sqlExams = sqlExams.filter(item => {
      if (item.id !== id) {
        return item;
      }
    });

    this.render();
  }

  updateItem(event) {
    let id = event.target.getAttribute('data-id');
    let itemTobeUpdated = document.querySelector('.edit-item').value;

    sqlExams = sqlExams.map(item => {
      if (item.id === id) {
        item['title'] = itemTobeUpdated;
      }

      return item;
    });

    document.querySelector('.edit-popup').classList.remove('show');
    document.querySelector('.edit-popup').classList.add('hide');

    this.render();
  }

  setTaskComplete(event) {
    let id = event.target.getAttribute('data-id');

    sqlExams = sqlExams.map(item => {
      if (item.id === id) {
        item['done'] = true;
      }

      return item;
    });

    this.render();
  }
}

export default SqlExams;