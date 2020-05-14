// import { LitElement, css, html } from 'lit-element';
import "./list"
const {
	LitElement,
	css,
	html
} = litElement;

class DropDownMenu extends LitElement {
	static get properties() {
		return {
			open: {
				type: Boolean
			},
		};
	}

	static get styles() {
		return css `
      ul.hidden {
        display: none;
      }
    `;
	}

	constructor() {
		super();
		this.open = false;
	}

	toggleMenu() {
		this.open = !this.open;
	}

	render() {
		return html `
    <q-list></q-list>
      <button class="btn btn-primary" @click=${this.toggleMenu} type="button"><i class="fa fa-plus-square-o pr-2" aria-hidden="true"></i>Create</button>
      <ul class=${this.open ? '' : 'hidden'}>
        <slot></slot>
      </ul>
    `;
	}
	createRenderRoot() {
		return this;
	}
}
customElements.define('drop-down-menu', DropDownMenu);
