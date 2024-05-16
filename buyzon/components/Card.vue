<script setup>
  const { image, title, price } = defineProps(["image", "title", "price"]);
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
      <button class="btn btn-info">Add to Cart</button>
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
