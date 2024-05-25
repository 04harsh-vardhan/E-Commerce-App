<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
  import "vue3-spinners/spinners.css";
  import "primeicons/primeicons.css";

  const productsData = useProductDataStore();
  await callOnce(productsData.fetchData);
  
</script>
