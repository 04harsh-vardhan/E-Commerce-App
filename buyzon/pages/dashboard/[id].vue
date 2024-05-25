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
  const id = route.params.id as string;
  const product = productsData.find(
    (item) => item.id.toString() === id
  ) as ProductData;

  const userCart = useUserCart();
  const userWishlist = useUserWishlist();

  const isPresentInCart = ref(isInCart());
  let indexInCart: number = -1;
  const isPresentInWishlist = ref(isInWishlist());
  let indexInWishlist: number = -1;
  const cartMsg = computed(() =>
    isPresentInCart.value ? "Remove From Cart" : "Add To Cart"
  );
  const wishlistMsg = computed(() =>
    isPresentInWishlist.value ? "Remove From Cart" : "Add To Cart"
  );
  function isInCart() {
    for (let i = 0; i < userCart.value.length; i++) {
      if (userCart.value[i].id === Number(id)) {
        indexInCart = i;
        return true;
      }
    }
    return false;
  }
  function isInWishlist() {
    for (let i = 0; i < userWishlist.value.length; i++) {
      if (userWishlist.value[i].id === Number(id)) {
        indexInWishlist = i;
        return true;
      }
    }
    return false;
  }
  function handleCartProduct() {
    if (isPresentInCart.value) {
      removeFromCart(Number(id));
      userCart.value.splice(indexInCart, 1);
      isPresentInCart.value = false;
    } else {
      addToCart(product);
      userCart.value.push(product);
      isPresentInCart.value = true;
    }
  }
  function handleWishlistProduct() {
    if (isPresentInWishlist.value) {
      removeFromWishlist(Number(id));
      userWishlist.value.splice(indexInCart, 1);
      isPresentInWishlist.value = false;
    } else {
      addToWishlist(product);
      userWishlist.value.push(product);
      isPresentInWishlist.value = true;
    }
  }
</script>
<template>
  <div id="main">
    <div id="header">
      <Header></Header>
    </div>
    <div class="product-container">
      <img class="product-image" :src="product.image" />
      <div class="product-details">
        <h2 class="product-title">
          {{ product.title }}
        </h2>
        <p class="product-price">Rs {{ product.price }}</p>
        <p class="product-description">
          {{ product.description }}
        </p>
        <p class="product-category">Category: {{ product.category }}</p>
        <div class="product-rating">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/star--v1.png"
            alt="Rating"
          />
          <span
            >{{ product.rating.rate }} (120 {{ product.rating.count }})</span
          >
        </div>
        <div class="buttons">
          <button @click="handleCartProduct" class="btn btn-cart">
            {{ cartMsg }}
          </button>
          <button @click="handleWishlistProduct" class="btn btn-wishlist">
            {{ wishlistMsg }}
          </button>
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
