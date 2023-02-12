class Events {
  constructor() {
    console.log("Welcome to events");

    const eventForm = document.getElementById("event-form");
    const eventContent = document.getElementById("main-content").innerHTML;

    document.getElementById("saveBtn").addEventListener("click", () => {
      document.getElementById("cancelBtn").classList.remove("d-none");
      document.getElementById("saveBtn").innerHTML = "Save";
      document.getElementById("main-content").innerHTML = eventForm.innerHTML;
    });

    document.getElementById("cancelBtn").addEventListener("click", () => {
      document.getElementById("cancelBtn").classList.add("d-none");
      document.getElementById("saveBtn").innerHTML = "Create New";
      document.getElementById("main-content").innerHTML = eventContent;
    });
  }
}

new Events();
