import { state } from "./state";
import { ProfilePage, editProfile } from "./page/profile";
import { ErrorPage } from "./page/error";
import { LoginPage, btnLogin, btnLogout } from "./page/login";
import { MainPage } from "./page/mainPage";

const render = () => {
  state.isLogin = !!localStorage.getItem("user");

  document.querySelector("#root").innerHTML = App();

  document.body.removeEventListener("submit", handleSubmit);
  document.body.removeEventListener("click", handleClick);

  document.body.addEventListener("submit", handleSubmit);
  document.body.addEventListener("click", handleClick);
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (e.target.id === "profile-form") {
    editProfile();
  }

  if (e.target.id === "login-form") {
    btnLogin();
    history.pushState(null, "", "/");
    render();
  }
};

const handleClick = (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();

    const path = e.target.href.replace(location.origin, "");

    if (e.target.id === "logout") {
      btnLogout();
      history.pushState(null, "", "/login");
      render();
    } else {
      history.pushState(null, "", path);
    }

    render();
  }
};

const routes = {
  "/": () => MainPage(),
  "/login": () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.username) {
      history.pushState(null, "", "/");
      return MainPage();
    }

    return LoginPage();
  },
  "/profile": () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.username) {
      history.pushState(null, "", "/login");
      return LoginPage();
    }
    return ProfilePage();
  },
};

const App = () => {
  const path = window.location.pathname;
  const PageComponent = routes[path] || (() => ErrorPage());
  return PageComponent();
};

render();
window.addEventListener("popstate", render);
