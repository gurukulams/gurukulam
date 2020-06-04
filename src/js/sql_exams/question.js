import { html } from 'lit-html';

export let question = html`
	<body class="text-center">
		<nav class="navbar navbar-expand navbar-dark bg-dark">
			<div class="col-11 col-md-11 col-lg-11 text-left">
				<a class="navbar-brand" href="#">
					<img
						src="https://techatpark.com/images/icons/logo_full.svg"
						width="30"
						height="30"
						class="d-inline-block align-top"
						alt=""
						loading="lazy"
					/>
					Product DB - QNumber - Indicaorr - CLue - View - KIDS Mode
				</a>
			</div>
			<div class="col-3 col-md-3 col-lg-3">
				<button type="button" class="btn btn-success">Previous</button>

				<button type="button" class="btn btn-success">Run</button>

				<button type="button" class="btn btn-success">Next</button>
			</div>
		</nav>

		<div class="container vh-100">
			<div class="row h-100 form-group">
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
	</body>
`;
