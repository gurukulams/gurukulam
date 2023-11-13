class EventCard extends HTMLElement {
  // WIth EVent : User : State

  // connect component
  connectedCallback() {
    this.textContent = "Hello World!";
  }
}

// register component
customElements.define("event-card", EventCard);
