import { list } from './list_exams';
import { exam } from './exam';
import { render } from 'lit-html';

const rootDiv = document.getElementById('root');

const routes = {
	'': list,
	'#/exam': exam,
};

const onNavigate = (hash) => {
	window.history.pushState({}, hash, window.location.origin + '/sql_exams/' + hash);
	render(routes[hash], rootDiv);
};

window.onpopstate = () => {
	render(routes[window.location.hash], rootDiv);
};

window['onNavigate'] = onNavigate;

// Default Page Load
console.log(window.location.hash);

onNavigate(window.location.hash);
