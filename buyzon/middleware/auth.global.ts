export default defineNuxtRouteMiddleware((toRoute, fromRoute) => {
  const { checkAuthentication } = useUtils();
  const isAuthenticated = useAuth();
  const feature = usefeatureState();
  isAuthenticated.value = checkAuthentication();
  
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
