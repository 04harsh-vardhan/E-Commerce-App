<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
 import 'vue3-spinners/spinners.css';
  const productData = useProductData();
  await callOnce(async () => {
    const response: any = await $fetch("api/data");
    productData.value = response.data;
  });
</script>
