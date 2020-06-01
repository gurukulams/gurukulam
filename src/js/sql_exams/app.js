import { list } from './list_exams';
import { exam } from './exam';
import { render } from 'lit-html';
import { question } from './question';

const rootDiv = document.getElementById('root');

const routes = {
	'': list,
	'#/exam': exam,
	'#/exam/question': question
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
