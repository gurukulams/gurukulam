class EventCard extends HTMLElement {
  // WIth EVent : User : State

  // connect component
  connectedCallback() {
    this.textContent = "Hello World!";
  }

  // Say HEllo
}

// register component
customElements.define("event-card", EventCard);
