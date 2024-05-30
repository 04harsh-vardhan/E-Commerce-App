<script setup lang="ts">
  const productId = Math.floor(Math.random() * 19 + 1);
  const specialOffer = useSpecialOfferFlag();
  const { getProduct } = useProductDataStore();
  const product = getProduct(productId) as ProductData;
  function handleProduct() {
    specialOffer.value = false;
    navigateTo(`/dashboard/${productId}`);
  }
</script>
<template>
  <div id="main">
    <div @click="handleProduct" id="offer-container">
      <h1>✨ Special Offer! ✨</h1>
    </div>
  </div>
</template>
<style scoped>
  #offer-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  #main {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
