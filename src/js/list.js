const {
	LitElement,
	html,
	css
} = litElement;
import {
	until
} from 'lit-html/directives/until.js';

class List extends LitElement {
	static get properties() {
		return {
			questions: {
				type: Array
			},
		};
	}

	static get styles() {
		return css`
            span {
                display: none;
            }
            `;
	}

	constructor() {
		super();
		this.questions = [{
			id: 1,
			name: "thiru",
			type: "mysql"
		}, {
			id: 2,
			name: "sathish",
			type: "psql"
		}];
	}
	connectedCallback() {
		super.connectedCallback();

		console.log('connected');
		// fetch("http://www.mocky.io/v2/5ebd805831000071285b147f").then(r => {
		//     // console.log(r.json());

		//     return r.text()}).then(res => {

		//     console.log(JSON.parse(JSON.stringify(res)))
		// 	this.questions = JSON.parse(JSON.stringify(res));
		// }).catch(e=>{
		//     console.log(e)
		// })
	}
	_triggerEdit(id) {
		console.log("edit event triggered", id);
	}

	_triggerDelete(id) {
		console.log("delete event triggered", id);
	}
	_triggerElement(id) {
		console.log("eho     event triggered", id);
	}


	render() {
		return html`
        <div class="table-responsive">
        <table class="table table-bordered table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            ${this.questions.map((question) => html`
                <tr>
                    <th scope="row">${question.id}</th>
                    <td>${question.name}</td>
                    <td>${question.type}</td>
                    <td>
                    <i class="fas fa-edit" @click=${() => this._triggerEdit(question.id)}></i>
                        <i class="fas fa-trash-alt" @click=${() => this._triggerDelete(question.id)}></i>
                        <i class="fab fa-elementor" @click=${() => this._triggerElement(question.id)}></i>
                    </td>
                </tr>
            `)}
            </tbody>
        </table>
    </div>
        `;
	}
	createRenderRoot() {
		return this;
	}
}
customElements.define('q-list', List);
