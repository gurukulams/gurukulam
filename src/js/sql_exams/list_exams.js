import { html } from 'lit-html';

export let list = html`
	<table class="table">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Exam Name</th>
				<th scope="col">Exam Type</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">1</th>
				<td>Product DB</td>
				<td>Potgres</td>
			</tr>
			<tr>
				<th scope="row">2</th>
				<td>HR DB</td>
				<td>MySQL</td>
			</tr>
		</tbody>
	</table>
	<ul class="nav justify-content-end">
		<li class="nav-item">
			<a class="nav-link active" href="javascript://" onclick="onNavigate('#/exam')">Create</a>
		</li>
	</ul>
`;
