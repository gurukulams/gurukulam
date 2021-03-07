let page = {
  "content": [
    {
      "id": 1,
      "name": "Sathish",
      "database": "postgres"
    },
    {
      "id": 2,
      "name": "Sathish",
      "database": "postgres"
    },
    {
      "id": 3,
      "name": "Sathish",
      "database": "postgres"
    },
    {
      "id": 4,
      "name": "Sathish",
      "database": "postgres"
    }
  ],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "offset": 0,
    "pageNumber": 0,
    "pageSize": 20,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalPages": 1,
  "totalElements": 4,
  "size": 20,
  "number": 0,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "numberOfElements": 4,
  "first": true,
  "empty": false
};

class SqlExams {

  constructor() {
    let self = this;

    this.list = document.querySelector('.list-group');
    this.render();

    document.querySelector('.btn-add-item').addEventListener('click', this.insertItem.bind(this));
    document.querySelector('.btn-update').addEventListener('click', this.updateItem.bind(this));

    document.addEventListener('click', event => {
      if (!event.target) {
        return;
      }

      if (event.target.classList.contains('btn-delete')) {
        self.removeItem(event);
      }

      if (event.target.classList.contains('btn-edit')) {
        self.renderEditForm(event);
      }

      if (event.target.classList.contains('btn-complete')) {
        self.setTaskComplete(event);
      }
    });
  }

  render() {
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


    this.li.innerHTML = '<li class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"> <h5 class="mb-1">'+item.name+'</h5> <small>'+item.database+'</small> </div> <p class="mb-1">Some placeholder content in a paragraph.</p> <small><a href="#">Add Question</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Edit</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Delete</a></small></li>';

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