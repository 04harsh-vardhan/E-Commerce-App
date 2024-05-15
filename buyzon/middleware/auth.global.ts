export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = useAuth();
    if(!isAuthenticated.value){
        if(to.path ==="/dashboard"){
            return navigateTo("/");
        }
    }
})