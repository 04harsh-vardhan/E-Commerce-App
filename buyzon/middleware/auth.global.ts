enum UrlPaths {
  HOME = "/",
  SIGNUP = "/signup",
  SIGNIN = "/signin",
}

export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useAuth();
  isAuthenticated.value = sessionStorage.getItem("token") ? true : false;
  if (!isAuthenticated.value) {
    switch (to.path) {
      case UrlPaths.HOME:
        break;
      case UrlPaths.SIGNIN:
        break;
      case UrlPaths.SIGNUP:
        break;
      default:
        return navigateTo("/");
    }
  }
});
