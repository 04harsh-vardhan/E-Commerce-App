const { UrlPaths } = enums();
export default defineNuxtRouteMiddleware((toRoute, fromRoute) => {
  const isAuthenticated = useAuth();
  const uid = useUserUId();
  const authToken: string | null = sessionStorage.getItem("token");
  isAuthenticated.value = authToken ? true : false;
  uid.value = authToken ? authToken : "";
  if (!isAuthenticated.value) {
    switch (toRoute.path) {
      case UrlPaths.HOME:
      case UrlPaths.SIGNIN:
      case UrlPaths.SIGNUP:
        break;
      default:
        return navigateTo("/");
    }
  }
});
