import { html } from 'lit-html';

export let question = html`
	<body class="text-center">
		<nav class="navbar navbar-expand navbar-dark bg-dark">
		<div class="col-8 col-md-8 col-lg-8 text-left">
				Database TYpe
			</div>
			<div class="col-4 col-md-4 col-lg-4">
			<button type="button" class="btn btn-info ">Try Our KIDS mode!!!..</button>
				<button type="button" class="btn btn-success float-right">Run</button>

			</div>
		</nav>

		<div class="container vh-100">
			<div class="row h-75 form-group">
				<div class="col-6 col-md-6 col-lg-6 mt-4 border-right">
					<label for="question">Question:</label>
					<div id="rich-text-editor"></div>
				</div>
				<div class="col-6 col-md-6 col-lg-6 mt-4">
					<label for="answer">Answer:</label>
					<div id="editor"></div>
				</div>
				

			</div>
		</div>
		<nav class="navbar navbar-expand bg-secondary text-dark">
			<div class="col-4 col-md-4 col-lg-4 ">
			<button type="button" class="btn btn-primary">Previous</button>
			</div>
			<div class="col-4 col-md-4 col-lg-4 text-center">
			<button type="button" class="btn btn-warning">Clue</button>
			</div>
			<div class="col-4 col-md-4 col-lg-4 text-center float-right">
			<button type="button" class="btn btn-primary">Next</button>
			</div>
		
	</body>
`;
