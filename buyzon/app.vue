<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
  import "vue3-spinners/spinners.css";
  import "primeicons/primeicons.css";

  const { getProducts, getCart } = useUtils();
  const productData = useProductData();
  await callOnce(async () => {
    productData.value = await getProducts();
  });
</script>
