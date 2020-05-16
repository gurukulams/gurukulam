let about = `
<h1>I am About Page.</h1>
`;

let home = `
<h1>I am home Page</h1>
`;
let contact = `
  <h1>I am contact Page</h1>
`;

const routes = {
	"/": home,
	"/contact": contact,
	"/about": about,
};

const rootDiv = document.getElementById("root");
rootDiv.innerHTML = routes[window.location.pathname];

const onNavigate = (pathname) => {
	window.history.pushState({}, pathname, window.location.origin + pathname);
	rootDiv.innerHTML = routes[pathname];
};

window["onNavigate"] = onNavigate;

window.onpopstate = () => {
	rootDiv.innerHTML = routes[window.location.pathname];
};
