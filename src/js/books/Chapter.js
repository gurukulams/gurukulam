class Chapter {
  constructor(_parent) {
    this.parent = _parent;
    this.strikes = ["have three special attributes"];

    this.strikes.forEach((strike) => this.highlight(strike));

    _parent.addEventListener("mousedown", () => {
      const strike = document.getSelection().toString();
      this.strikes.push(strike);
      this.highlight(strike);
    });
  }

  highlight(strike) {
    strike = strike.trim();
    if (strike !== "") {
      let text = this.parent.innerHTML;
      let re = new RegExp(strike, "g"); // search for all instances
      let newText = text.replace(re, `<mark>${strike}</mark>`);
      this.parent.innerHTML = newText;
    }
  }
}

export default Chapter;
