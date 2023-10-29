class CoreNotes {
  constructor(_parent, _annobase, _checkbox) {
    this.parent = _parent;

    this.annobase = _annobase;

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
    console.log(annotation);
    // {"text":" referred to as asexual reproducti","onSection":"/12th-botany/botany/reproduction/asexual_reproduction","note":"hello"}
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
        this.annobase.setAnnotations(
          notes.map((t) => ({ ...t.note, id: t.id }))
        );
      });
  }
}

export default CoreNotes;
