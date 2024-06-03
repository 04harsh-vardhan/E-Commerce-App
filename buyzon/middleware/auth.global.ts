export default defineNuxtRouteMiddleware((toRoute, fromRoute) => {
  const { checkAuthentication } = useUtils();
  const isAuthenticated = useAuth();
  const uid = useUserUId();
  const feature = usefeatureState();
  isAuthenticated.value = checkAuthentication();
  const userId = localStorage.getItem("uid");
  if (userId) {
    uid.value = userId;
  }

  if (!isAuthenticated.value) {
    if (toRoute.path !== "/") {
      return navigateTo("/");
    }
  } else {
    if (toRoute.path === "/dashboard") {
      feature.value = "dashboard";
    } else if (toRoute.path === "/dashboard/cart") {
      feature.value = "cart";
    } else if (toRoute.path === "/dashboard/wishlist") {
      feature.value = "wishlist";
    } else if (toRoute.path === "/dashboard/userinfo") {
      feature.value = "userinfo";
    } else {
      feature.value = "detailview";
    }
  }
});
