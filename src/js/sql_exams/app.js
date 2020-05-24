import { home } from './home';
import { exam } from './exam';
import { render } from 'lit-html';

const rootDiv = document.getElementById('root');

const routes = {
	'/sql_exams/': home,
	'/sql_exams/exam': exam,
};

const onNavigate = (pathname) => {
	window.history.pushState({}, pathname, window.location.origin + pathname);
	render(routes[pathname], rootDiv);
};

window['onNavigate'] = onNavigate;

window.onpopstate = () => {
	render(routes[window.location.pathname], rootDiv);
};

// Default Page Load
console.log(window.location.pathname);

render(routes[window.location.pathname], rootDiv);
