class CoreNotes {
  constructor(_parent, _annobase) {
    this.parent = _parent;

    this.annobase = _annobase;

    // this is the sample for creating and loading anotaions;

    this.annobase.on("createAnnotation", (annotation) =>
      this.createAnnotaion(annotation),
    );

    this.annobase.on("updateAnnotation", (annotation, previous) =>
      this.updateAnnotation(annotation, previous),
    );

    this.annobase.on("deleteAnnotation", (annotation) =>
      this.deleteNote(annotation),
    );
    // recognito.setAnnotations(data);
    // eslint-disable-next-line no-undef
  }

  updateAnnotation(annotation, previous) {
    let id = previous.id.split("#")[1];
    fetch(
      "/api/annotations/" + this.ontype + "/" + id + "/" + this.oninstance,
      {
        method: "PUT",
        headers: window.ApplicationHeader(),
        body: JSON.stringify(annotation),
      },
    )
      .then((response) => response.json())
      .then((_annotation) => {
        console.log(_annotation);
      });
  }

  deleteNote(annotation) {
    let id = annotation.id.split("#")[1];
    fetch(
      "/api/annotations/" + this.ontype + "/" + id + "/" + this.oninstance,
      {
        method: "DELETE",
        headers: window.ApplicationHeader(),
      },
    ).then(console.log);
  }
  createAnnotaion(annotation) {
    fetch("/api/annotations" + this.path, {
      method: "POST",
      headers: window.ApplicationHeader(),
      body: JSON.stringify(annotation),
    })
      .then((response) => response.json())
      .then((_annotation) => {
        console.log(_annotation);
      });
  }
  loadNotes() {
    fetch("/api/annotations" + this.path, {
      method: "GET",
      headers: window.ApplicationHeader(),
    })
      .then((response) => response.json())
      .then((annotations) => {
        annotations.forEach((annotation) => {
          if (typeof annotation.body === "string") {
            annotation.body = JSON.parse(annotation.body);
            annotation.target = JSON.parse(annotation.target);
          }
        });

        this.annobase.setAnnotations(annotations);
      });
  }
}

export default CoreNotes;
