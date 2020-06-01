import { html } from 'lit-html';

export let question = html`
	<body class="text-center">
		<nav class="navbar navbar-expand navbar-dark bg-dark">
			<div class="col-11 col-md-11 col-lg-11 text-left">
				<a class="navbar-brand" href="#">
					<i class="fas fa-home"></i>
				</a>
				<a class="navbar-brand" href="#">
					<i class="fas fa-bars"></i>
				</a>
				<a class="navbar-brand" href="#">
					<i class="far fa-save"></i>
				</a>
			</div>
			<div class="col-1 col-md-1 col-lg-1">
				<a class="navbar-brand" href="#">
					<button type="button" class="btn btn-success">Run</button>
				</a>
			</div>
		</nav>

		<div class="container vh-100">
			<div class="row h-100 form-group">
				<div class="col-6 col-md-6 col-lg-6 mt-4 border-right">
					<label for="question">Question:</label>
					<textarea class="form-control" rows="17" id="question"></textarea>
				</div>
				<div class="col-6 col-md-6 col-lg-6 mt-4">
					<label for="answer">Answer:</label>
					<div id="editor"></div>
				</div>
			</div>
		</div>
	</body>
`;
