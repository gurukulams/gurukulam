import { html } from 'lit-html';

export let exam = html`
	

			<main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
				<div
					class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
				>
					<h1 class="h2">Exam</h1>					
				</div>
				<form class="text-left">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button class="btn btn-primary" onclick="onNavigate('')">Save</button>
  <button class="btn btn-secondary">Cancel</button>
</form>
			</main>
		</div>
	</div>
`;
