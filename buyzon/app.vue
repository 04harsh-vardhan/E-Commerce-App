<template>
  <NuxtLoadingIndicator :height="15" />
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
  import "vue3-spinners/spinners.css";
  import "primeicons/primeicons.css";
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "./assets/firebase.js";

  const uid = useUserUId();
  const isAuthenticated = useAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid.value = user.uid;
      isAuthenticated.value = true;
    } else {
      uid.value = "";
      isAuthenticated.value = false;
    }
  });
</script>
