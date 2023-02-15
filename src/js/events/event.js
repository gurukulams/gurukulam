class Event {
  constructor() {
    const removeChoice = (event) => {
      console.log(event);
    };

    document
      .querySelector(".fa-trash-alt")
      .addEventListener("on-confirmation", removeChoice);
  }
}

new Event();
