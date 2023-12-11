class CoreNotes {
  constructor(_parent, _annobase, _checkbox) {
    this.parent = _parent;

    this.annobase = _annobase;
    this.checkbox = _checkbox;

    _checkbox.addEventListener("change", (event) => {
      this.annobase.readOnly = !event.currentTarget.checked;
    });

    // this is the sample for creating and loading anotaions;

    this.annobase.on("createAnnotation", (annotation) =>
      this.saveAnnotaion(annotation)
    );
    this.annobase.on("deleteAnnotation", (annotation) =>
      this.deleteNote(annotation)
    );
    // recognito.setAnnotations(data);
    // eslint-disable-next-line no-undef
  }
  deleteNote(annotation) {
    let id = annotation.id;
    let ontype = this.path.split("/")[1];
    fetch("/api/annotations/" + ontype + "/" + id, {
      method: "DELETE",
      headers: window.ApplicationHeader(),
    }).then(console.log);
  }
  saveAnnotaion(annotation) {
    const note = {};

    note.note = annotation;

    fetch("/api/annotations" + this.path, {
      method: "POST",
      headers: window.ApplicationHeader(),
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((_note) => {
        console.log(_note.id);
      });
  }
  loadNotes() {
    fetch("/api/annotations" + this.path, {
      method: "GET",
      headers: window.ApplicationHeader(),
    })
      .then((response) => response.json())
      .then((notes) => {
        const annotations = notes.map((t) => {
          const annotation = { ...t.note, id: "#" + t.id };

          console.log(annotation);

          if (Array.isArray(annotation.target)) {
            annotation.target.forEach((target) => {
              target.id = "#" + target.id;
            });
            console.log(annotation);
          }

          return annotation;
        });
        this.annobase.setAnnotations(annotations);
        console.log(annotations);
      });
  }
}

export default CoreNotes;
