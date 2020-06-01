import { html } from 'lit-html';

export let list = html`
	<table class="table">
		<thead>
			<tr>
				
				<th scope="col">Exam Name</th>
				<th scope="col">Exam Type</th>
				<th scope="col">Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				
				<td>Product DB</td>
				<td>Potgres</td>
				<td><a class="nav-link active" href="javascript://" onclick="onNavigate('#/exam/question')">Add Question</a></td>
				
			</tr>
			<tr>
				
				<td>HR DB</td>
				<td>MySQL</td>
				<td><a class="nav-link active" href="javascript://" onclick="onNavigate('#/exam/question')">Take Exam</a></td>
			</tr>
		</tbody>
	</table>
	<ul class="nav justify-content-end">
		<li class="nav-item">
			<a class="nav-link active" href="javascript://" onclick="onNavigate('#/exam')">Create</a>
		</li>
	</ul>
`;
