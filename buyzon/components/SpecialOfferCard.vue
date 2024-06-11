<script setup lang="ts">
  const productId = Math.floor(Math.random() * 19 + 1);
  const specialOffer = useSpecialOfferFlag();
  const { getProduct } = useProductDataStore();
  const product = getProduct(productId) as ProductData;
  async function handleProduct() {
    specialOffer.value = false;
    await navigateTo(`/dashboard/${productId}`);
  }
</script>
<template>
  <div id="main">
    <div @click="handleProduct" id="offer-container">
      <div @click.stop="specialOffer = false" class="closeBtn">
        <span class="pi pi-times"></span>
      </div>
      <h1>✨ Special Offer! ✨</h1>
      <div>
        <div class="product-image"><img :src="product.image" /></div>
        <div>{{ product.title }}</div>
      </div>
      <div class="message">
        ✨✨✨
        <h3>Lowest Prices ever</h3>
        ✨✨✨
      </div>
    </div>
  </div>
</template>
<style scoped>
  .message {
    display: flex;
    justify-content: center;
  }
  .product-image {
    display: flex;
    justify-content: center;
  }
  img {
    width: 100px;
  }
  #offer-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: fit-content;
    height: fit-content;
  }
  #offer-container:hover {
    cursor: pointer;
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
</style>
