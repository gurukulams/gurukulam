import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';

const onNavigate = () => {
	var hash = window.location.hash;
	window.history.pushState({}, hash, window.location.origin + hash);
	var presentation_path = hash.replace('#/presentations', '');
	fetch('/presentations' + presentation_path + '.html')
		.then(function (response) {
			if (response.status == 200) {
				response.text().then(function (html) {
					renderPresentation(html);
				});
			} else if (response.status == 404) {
				fetch('/presentations' + presentation_path + '/index.html').then(function (response) {
					if (response.status == 200) {
						response.text().then(function (html) {
							renderPresentation(html);
						});
					}
				});
			}
		})
		.catch(function (err) {
			console.log('error loading presentation file');
		});

	/*
	
	*/
};

const renderPresentation = (html) => {
	document.getElementById('root').innerHTML = html;
	let deck = new Reveal({
		plugins: [Markdown, Highlight],
	});
	deck.initialize();
	//TODO. This is ti fix Navbar Misalignment. Check any other approach
	document.body.classList.remove('reveal-viewport');
};

onNavigate();
