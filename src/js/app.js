import { about } from "./about";
import { home } from "./home";
import { contact } from "./contact";

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
