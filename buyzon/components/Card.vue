<script setup>
  const props = defineProps(["product"]);
  const { image, title, price } = props.product;
  const { addToCart } = useUtils();
  function addProductToCart() {
    addToCart(props.product);
  }
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
      <button class="btn btn-info" @click="addProductToCart">
        Add to Cart
      </button>
    </div>
  </div>
</template>
<style scoped>
  @import url("bootstrap/dist/css/bootstrap.min.css");
  #main {
    width: 200px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: bisque;
  }
  img {
    width: 80px;
    height: 120px;
    object-fit: cover;
  }
</style>
