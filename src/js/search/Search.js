class Search {
  constructor(_parent) {
    this.parent = _parent;
    this.render();
  }

  render() {
    fetch("/api/browse/" + "product")
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
        console.log(page);
      })
      .catch(function (error) {
        console.log("Request failed:", error);
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
}

export default Search;
