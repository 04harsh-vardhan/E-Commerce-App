<script setup lang="ts">
  const props = defineProps<{
    id: number;
    image?: string;
  }>();
  const { image, id } = props;
</script>
<template>
  <div class="product-card">
    <img :src="image" />
    <div class="product-info">
      <h3 class="product-title"><slot name="title"></slot></h3>
      <p class="product-price">
        Rs <slot name="price"></slot> <slot name="wishIcon" :id="id"></slot>
      </p>
      <p class="quantity"><slot name="quantity"></slot></p>
      <slot name="button" :id="id"></slot>
      <slot name="msg"></slot>
    </div>
  </div>
</template>

<style scoped>
  .quantity {
    font-weight: 500;
  }
  .product-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 167px;
    text-align: center;
    transition: transform 0.3s;
  }
  .product-card:hover {
    cursor: pointer;
  }

  .product-card:hover {
    transform: translateY(-10px);
  }

  .product-card img {
    width: 67px;
    height: 80px;
  }

  .product-info {
    padding: 15px; 
  }

  .product-title {
    font-size: 16px; 
    margin: 0;
    color: #333;
    height: 60px;
    overflow: hidden;
  }

  .product-price {
    font-size: 1em; 
    color: #ff7e5f;
    margin: 10px 0;
  }
</style>
