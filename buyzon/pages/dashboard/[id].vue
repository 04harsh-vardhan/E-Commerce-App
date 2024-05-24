<script setup lang="ts">
  const {
    getProducts,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
  } = useUtils();
  const productsData = await getProducts();
  const route = useRoute();
  const productInfo = productsData.find(
    (item) => item.id.toString() === route.params.id
  ) as ProductData;

  const userCart = useUserCart();
  const userWishlist = useUserWishlist();

  let indexInCart: number;
  const isInCart = ref(checkPresence());
  const msg = computed(() =>
    isInCart.value ? "Remove From Cart" : "Add To Cart"
  );
  function handleProduct() {
    if (isInCart.value) {
      removeFromCart(productInfo.id);
      userCart.value.splice(indexInCart, 1);
      isInCart.value = false;
    } else {
      addToCart(productInfo);
      userCart.value.push(productInfo);
      isInCart.value = true;
    }
  }
  function checkPresence() {
    let isPresent = false;
    userCart.value.forEach((item, index) => {
      if (item.id === productInfo.id) {
        isPresent = true;
        indexInCart = index;
      }
    });
    return isPresent;
  }
</script>
<template>
  <div id="main">
    <div id="header">
      <Header></Header>
    </div>
    <div class="product-container">
      <img class="product-image" :src="productInfo?.image" />
      <div class="product-details">
        <h2 class="product-title">
          {{ productInfo?.title }}
        </h2>
        <p class="product-price">Rs {{ productInfo?.price }}</p>
        <p class="product-description">
          {{ productInfo?.description }}
        </p>
        <p class="product-category">Category: {{ productInfo?.category }}</p>
        <div class="product-rating">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/star--v1.png"
            alt="Rating"
          />
          <span
            >{{ productInfo?.rating.rate }} (120
            {{ productInfo?.rating.count }})</span
          >
        </div>
        <div class="buttons">
          <button @click="handleProduct" class="btn btn-cart">{{ msg }}</button>
          <button class="btn btn-wishlist">Add to Wishlist</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #header {
    height: 20vh;
  }
  #main {
    display: flex;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #f4f4f4;
  }

  .product-container {
    background-color: #fff;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    max-width: 800px;
    width: 100%;
    overflow: hidden;
  }

  .product-image {
    width: 50%;
    object-fit: cover;
  }

  .product-details {
    padding: 20px;
    width: 50%;
  }

  .product-title {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  .product-price {
    color: #e67e22;
    font-size: 1.2em;
    margin-bottom: 20px;
  }

  .product-description {
    font-size: 0.9em;
    color: #7f8c8d;
    margin-bottom: 20px;
  }

  .product-category {
    font-size: 0.8em;
    color: #95a5a6;
    margin-bottom: 20px;
  }

  .product-rating {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .product-rating img {
    width: 20px;
    height: 20px;
  }

  .product-rating span {
    margin-left: 5px;
    font-size: 0.9em;
    color: #34495e;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  .btn-cart {
    background-color: #e74c3c;
    color: #fff;
  }

  .btn-wishlist {
    background-color: #3498db;
    color: #fff;
  }

  .btn:hover {
    opacity: 0.9;
  }
</style>
