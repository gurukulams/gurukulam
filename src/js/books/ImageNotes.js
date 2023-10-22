class ImageNotes {
  constructor(_parent) {
    this.parent = _parent;

    // eslint-disable-next-line no-undef
    this.imageModel = new bootstrap.Modal(
      document.getElementById("imageModel"),
      {}
    );

    document.querySelectorAll("figure>img").forEach((image) => {
      image.addEventListener("dblclick", (event) => {
        this.showImage(event);
      });
    });
  }

  showImage(event) {
    document.getElementById("imageModel").querySelector("img").src =
      event.currentTarget.src;

    document.getElementById("imageModel").querySelector("h5").innerHTML =
      event.currentTarget.parentElement.querySelector("figcaption").innerHTML;

    this.imageModel.show();
  }
}

export default ImageNotes;
