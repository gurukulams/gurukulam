import { html } from 'lit-html';

import { until } from 'lit-html/directives/until.js';

const fetchExamas = async () => {
	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append(
		'authorization',
		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk2NDcyODM3LCJleHAiOjE1OTkwNjQ4Mzd9.5C2r_taYylA1DNlaHPNgDSeA9zid51nCI6SLZo-boBg',
	);
	const format = {
		method: 'GET',
		headers: myHeaders,
	};
	let myRequest = new Request(
		'https://cors-anywhere.herokuapp.com/http://ec2-13-126-173-216.ap-south-1.compute.amazonaws.com/exams',
	);
	const data = await fetch(myRequest, format).then((r) => r.json());
	return renderExam(data);
};
const renderExam = (db) => {
	return db.map(
		(i) => html`
			<tr>
				<td>${i.name}</td>
				<td>${i.type}</td>
				<td>
					<a class="nav-link active" href="javascript://" onclick="onNavigate('#/sql_exams/exam/question')"
						>Add Question</a
					>
				</td>
			</tr>
		`,
	);
};

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
			data:${until(fetchExamas(), html`<span>Loading...</span>`)}
		</tbody>
	</table>
	<ul class="nav justify-content-end">
		<li class="nav-item">
			<a class="nav-link active" href="javascript://" onclick="onNavigate('#/sql_exams/exam')">Create</a>
		</li>
	</ul>
`;
