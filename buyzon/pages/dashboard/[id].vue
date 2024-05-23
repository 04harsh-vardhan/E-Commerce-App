<script setup lang="ts">
  const { getProducts } = useUtils();
  const productsData = await getProducts();
  const route = useRoute();
  const productInfo = productsData.find(
    (item) => item.id.toString() === route.params.id
  );
</script>
<template>
  <div id="main">
    <div class="product-container">
      <div class="product-image">
        <img :src="productInfo?.image" :alt="productInfo?.title" />
      </div>
      <div class="product-details">
        <h1>{{ productInfo?.title }}</h1>
        <p class="category">Category: {{ productInfo?.category }}</p>
        <p class="price">Rs {{ productInfo?.price }}</p>
        <p class="description">
          {{ productInfo?.description }}
        </p>
        <div class="rating">
          <span
            >Rating: {{ productInfo?.rating.rate }}/5<span
              class="pi pi-star-fill"
            ></span
          ></span>
          <span>({{ productInfo?.rating.count }} )</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  .product-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
  }

  .product-image {
    flex: 1;
    padding-right: 20px;
  }

  .product-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .product-details {
    flex: 2;
  }

  .product-details h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .product-details .category {
    font-size: 14px;
    color: #555;
    margin-bottom: 15px;
  }

  .product-details .price {
    font-size: 20px;
    color: #b12704;
    margin-bottom: 15px;
  }

  .product-details .description {
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
  }

  .product-details .rating {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #777;
  }

  .product-details .rating span {
    margin-right: 10px;
  }
</style>
