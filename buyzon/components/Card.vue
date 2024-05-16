<script setup>
  const productData = useProductData();
  const { image, title ,price} = productData.value[0];
</script>
<template>
  <div id="main">
    <div><img :src="image" /></div>
    <div>
      <p>
        <b>{{ title }}</b>
      </p>
    </div>
    <div>
      <p>Rs. {{ price }}</p>
    </div>
  </div>
</template>
<style scoped>
  #main {
    width: 100px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 80px;
    height: 120px;
  }
</style>
