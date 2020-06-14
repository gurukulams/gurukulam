import { html } from 'lit-html';

export let exam = html`
	<main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
		<div
			class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
		>
			<h6 class="h2">Create a new exam</h6>
		</div>

		<form class="text-left">
			<div class="form-group">
				<label for="examName">Name of Exam</label>
				<input class="form-control" />
			</div>

			<div class="form-group">
				<label for="database">Database</label>
				<select class="form-control">
					<option>POSTGRES</option>
					<option>MYSQL</option>
				</select>
			</div>

			<div class="form-group">
				<label for="scriptUpload">Scripts</label>
				<input type="file" class="form-control-file" id="scriptUpload" />
			</div>

			<button class="btn btn-secondary">Cancel</button>
			<button class="btn btn-primary" onclick="onNavigate('#/sql_exams')">Save</button>
		</form>
	</main>
`;
