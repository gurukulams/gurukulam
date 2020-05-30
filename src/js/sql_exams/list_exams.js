import { html } from 'lit-html';

export let list = html`
	<table class="table">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">First</th>
				<th scope="col">Last</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">1</th>
				<td>Mark</td>
				<td>Otto</td>
			</tr>
		</tbody>
	</table>
	<ul class="nav justify-content-end">
		<li class="nav-item">
			<a class="nav-link active" href="#" onclick="onNavigate('/sql_exams/exam')">Create</a>
		</li>
	</ul>
`;
