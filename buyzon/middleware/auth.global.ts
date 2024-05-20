enum UrlPaths {
  HOME = "/",
  SIGNUP = "/signup",
  SIGNIN = "/signin",
}

export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useAuth();
  const uid = useUserUId();
  const authToken: string | null = sessionStorage.getItem("token");
  isAuthenticated.value = authToken ? true : false;
  uid.value = authToken ? authToken : "";
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
