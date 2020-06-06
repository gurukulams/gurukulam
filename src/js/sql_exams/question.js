import { html } from 'lit-html';

export let question = html`
	<body class="text-center">
		<nav class="navbar navbar-expand-md navbar-light bg-light">
				<a class="navbar-brand" href="#">
				<a class="nav-link" href="#"><i class="fas fa-arrow-circle-left"></i></a>
					Product DB
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
							
						</ul>
				</div>
		</nav>

		<div class="container vh-100">
			<div class="row form-group">
				<div class="col-6 col-md-6 col-lg-6 mt-4 border-right">
					<label for="question">Question:</label>
					<div id="rich-text-editor"><p>Query the names of all American cities in CITY with populations larger than 120000.</p><br> 
						<p>The CountryCode for America is USA.</p><br>
					    <p>Input Format.</p><br>
						<p>The CITY table is described as follows: </p>
					</div>
				</div>
				<div class="col-6 col-md-6 col-lg-6 mt-4">
					<label for="answer">Answer:</label>
					<div id="editor">SELECT * FROM employee</div>
		 		</div>
			</div>
		</div>
			
	</body>
`;
