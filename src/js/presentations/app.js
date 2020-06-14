import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import { render } from 'lit-html';
import { home } from './home.js';

const rootDiv = document.getElementById('root');

const routes = {
	'#/presentations': home,
};

const onNavigate = (hash) => {
	window.history.pushState({}, hash, window.location.origin + hash);
	render(routes[hash], rootDiv);
	onRender();
};

const onRender = () => {
	let deck = new Reveal({
		plugins: [Markdown, Highlight],
	});
	deck.initialize();
};
window.onpopstate = () => {
	render(routes[window.location.hash], rootDiv);
	onRender();
};

window['onNavigate'] = onNavigate;

// Default Page Load
console.log(window.location.hash);

onNavigate('#/presentations');
