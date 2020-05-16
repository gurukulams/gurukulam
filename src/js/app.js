import { about } from "./about";
import { home } from "./home";
import { contact } from "./contact";
import { render } from "lit-html";

const routes = {
	"/": home,
	"/contact": contact,
	"/about": about,
};

const rootDiv = document.getElementById("root");
render(routes[window.location.pathname], rootDiv);

const onNavigate = (pathname) => {
	window.history.pushState({}, pathname, window.location.origin + pathname);
	render(routes[pathname], rootDiv);
};

window["onNavigate"] = onNavigate;

window.onpopstate = () => {
	render(routes[window.location.pathname], rootDiv);
};
