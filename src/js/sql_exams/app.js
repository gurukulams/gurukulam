import { list } from './list_exams';
import { exam } from './exam';
import { render } from 'lit-html';
import { question } from './question';

import * as acemodule from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-dracula';

const rootDiv = document.getElementById('root');

const routes = {
	'': list,
	'#/exam': exam,
	'#/exam/question': question,
};

const onNavigate = (hash) => {
	window.history.pushState({}, hash, window.location.origin + '/sql_exams/' + hash);
	render(routes[hash], rootDiv);
	onRender();
};

const onRender = () => {
	ace.edit('editor', {
		mode: 'ace/mode/sql',
		theme: 'ace/theme/dracula',
		maxLines: 50,
		minLines: 10,
		fontSize: 18,
	});
};
window.onpopstate = () => {
	render(routes[window.location.hash], rootDiv);
	onRender();
};

window['onNavigate'] = onNavigate;

// Default Page Load
console.log(window.location.hash);

onNavigate(window.location.hash);
