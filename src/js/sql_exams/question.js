import { html } from 'lit-html';

export let question = html`
	<nav class="navbar navbar-expand-md navbar-light bg-light">
		<a class="navbar-brand">
			<a class="nav-link" onclick="onNavigate('#/sql_exams')" href="javascript://"
				><i class="fas fa-arrow-circle-left"></i
			></a>
			Product DB -
			<p class="lead">MySQL</p>
			<small>Guided Exam like Google Email bottom arraw</small>
		</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav mr-auto"></ul>
			<ul class="navbar-nav">
				<a class="nav-link" href="#"><i class="fas fa-thumbtack"></i></a>
				<a class="nav-link" href="#"><i class="fas fa-play-circle"></i></a>
				<a class="nav-link" href="#"><i class="fas fa-arrow-circle-right"></i></a>

				<a class="nav-link" class="disabled" href="#">Save</a>
			</ul>
		</div>
	</nav>

	<div class="container-fluid vh-100">
		<div class="row form-group">
			<div class="col-6 col-md-6 col-lg-6 mt-4 border-right">
				<div id="rich-text-editor"></div>
			</div>
			<div class="col-6 col-md-6 col-lg-6 mt-4">
				<div id="editor">SELECT * FROM employee</div>
			</div>
		</div>
	</div>
`;
