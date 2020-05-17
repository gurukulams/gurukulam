import { html } from "lit-html";

export let home = html`
	<div class="container vh-100">
		<div class="row h-100 justify-content-center align-items-center align-middle">
			<div class="col-10 col-md-8 col-lg-6">

			<img class="mb-4" src="https://techatpark.com/images/icons/logo_full.svg" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal">Gurukulam</h1>
    <p>எண்ணென்ப ஏனை எழுத்தென்ப இவ்விரண்டும் </br>
	கண்ணென்ப வாழும் உயிர்க்கு</p>
<a href="#" onclick="onNavigate('/about')" class="btn btn-outline-primary">
	<i class="fab fa-github"></i>
</button>
			</div>
		</div>
	</div>
`;
