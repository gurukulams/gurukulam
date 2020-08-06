import { html } from 'lit-html';
// console.log(fetch)

let data = {
	name:"",
	type:""
};
const clickHandler = {
	// handleEvent method is required.
	handleEvent(e) { 
	  console.log('clicked!',e.target.value);
	  console.log(data);
	},

	// fetch("","POST",)
	// event listener objects can also define zero or more of the event 
	// listener options: capture, passive, and once.
	capture: true,
  };

  const onChangeType= {
	handleEvent(e) { 
		console.log('clicked!',e.target.value);
		data.type= e.target.value;
	},
  
	  // fetch("","POST",)
	  // event listener objects can also define zero or more of the event 
	  // listener options: capture, passive, and once.
	  capture: true,
  };
  const onChangeName= {
	handleEvent(e) { 
		console.log('clicked!',e.target.value);
	  },
  
	  // fetch("","POST",)
	  // event listener objects can also define zero or more of the event 
	  // listener options: capture, passive, and once.
	  capture: true,
  };
  
export let exam = html`
	<main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
		<div
			class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
		>
			<h6 class="h2">Create a new exam</h6>
		</div>

			<div class="form-group">
				<label for="examName">Name of Exam</label>
				<input class="form-control" @change=${onChangeName} .value={data.name} />
			</div>

			<div class="form-group">
				<label for="database">Database</label>
				<select class="form-control" @change=${onChangeType} .value=${data.type}>
					<option>POSTGRES</option>
					<option>MYSQL</option>
				</select>
			</div>

			<div class="form-group">
				<label for="scriptUpload">Scripts</label>
				<input type="file" class="form-control-file" id="scriptUpload" />
			</div>

			<button class="btn btn-secondary">Cancel</button>
			<button class="btn btn-primary" @click=${clickHandler}>dai</button>
	</main>
`;
