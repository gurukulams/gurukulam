import { html, render } from 'lit-html';

const layout = html`<nav class="navbar navbar-expand navbar-dark bg-dark">
		<a class="navbar-brand" href="#">
			<img
				src="https://techatpark.com/images/icons/logo_full.svg"
				width="30"
				height="30"
				class="d-inline-block align-top"
				alt=""
				loading="lazy"
			/>
			Gurukulam
		</a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarsExample02"
			aria-controls="navbarsExample02"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarsExample02">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="#">SQL <span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">C</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">PHP</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Javascript</a>
				</li>
			</ul>
			<form class="form-inline my-2 my-md-0">
				<input class="form-control" type="text" placeholder="Search" />
			</form>
			<ul class="navbar-nav">
				<li class="nav-item active">
					<a class="nav-link" href="#"><i class="far fa-bell"></i></a>
				</li>

				<li class="nav-item active dropdown">
					<a
						class="nav-link dropdown-toggle"
						href="http://example.com"
						id="dropdown03"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
						><i class="far fa-user"></i
					></a>
					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown03">
						<a class="dropdown-item" href="#">Profile</a>
						<a class="dropdown-item" href="#">Help</a>
						<div class="dropdown-divider"></div>
						<a class="dropdown-item" href="/">Signout</a>
					</div>
				</li>
			</ul>
		</div>
	</nav>
	<div class="container-fluid mt-3" id="root"></div>`;

const login = () => {
	render(layout, document.body);
	if (!window.location.hash) {
		window.location.hash = '#/sql_exams';
		loadApp();
	} else {
		loadApp();
	}
};

const loadApp = () => {
	if (window.location.hash) {
		var module = window.location.hash.replace('#/', '').split('/')[0];
		loadjscssfile('/js/' + module + '.min.js', 'js');
	}
};

const loadjscssfile = (filename, filetype) => {
	if (filetype == 'js') {
		//if filename is a external JavaScript file
		var fileref = document.createElement('script');
		fileref.setAttribute('type', 'text/javascript');
		fileref.setAttribute('src', filename);
	} else if (filetype == 'css') {
		//if filename is an external CSS file
		var fileref = document.createElement('link');
		fileref.setAttribute('rel', 'stylesheet');
		fileref.setAttribute('type', 'text/css');
		fileref.setAttribute('href', filename);
	}
	if (typeof fileref != 'undefined') document.getElementsByTagName('body')[0].appendChild(fileref);
};

window['login'] = login;

login();
