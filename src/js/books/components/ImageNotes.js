import CoreNotes from "./CoreNotes";
import { init, Toolbar } from "@recogito/annotorious";

class ImageNotes extends CoreNotes {
  constructor(_parent) {
    super(
      _parent,
      init({
        image: document.getElementById("imageModel").querySelector("img"),
        readOnly: true,
      }),
    );


    // eslint-disable-next-line no-undef
    this.imageModel = new bootstrap.Modal(
      document.getElementById("imageModel"),
      {},
    );

    this.imgEl = document.getElementById("imageModel").querySelector("img");
    this.figureEl = document
      .getElementById("imageModel")
      .querySelector("figure");

    document.querySelectorAll("figure>img").forEach((image) => {
      image.addEventListener("dblclick", (event) => {
        this.showImage(event);
      });
    });

    document.querySelectorAll(".goat>svg").forEach((svg) => {
      svg.addEventListener("dblclick", (event) => {
        this.showSVG(event);
      });
    });
  }

  showSVG(event) {
    this.imgEl.classList.add("d-none");
    this.figureEl.classList.remove("d-none");

    document.getElementById("imageModel").querySelector("h5").innerHTML =
      event.currentTarget.parentElement.parentElement.querySelector(
        "figcaption",
      ).innerHTML;

    this.figureEl.childNodes[0].innerHTML =
      event.currentTarget.parentElement.innerHTML;

    this.imageModel.show();
  }

  showImage(event) {
    this.imgEl.src = event.currentTarget.src;
    this.imgEl.classList.remove("d-none");
    this.figureEl.classList.add("d-none");

    document.getElementById("imageModel").querySelector("h5").innerHTML =
      event.currentTarget.parentElement.querySelector("figcaption").innerHTML;
    this.path = "/" + this.imgEl.src.split("/").slice(3).join("/");
    this.ontype = this.path.split("/")[1];
    this.oninstance = this.path.split("/" + this.ontype + "/")[1];
    this.loadNotes();
    this.imageModel.show();
  }
}

export default ImageNotes;
