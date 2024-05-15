<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup>
  const productData = useProductData();
  await callOnce(async () => {
    const { data } = await useFetch("https://fakestoreapi.com/products");
    productData.value = toRaw(data.value);
  });
  
</script>
