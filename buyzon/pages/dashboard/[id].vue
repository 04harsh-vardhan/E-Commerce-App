<script setup lang="ts">
  const {
    addToWishlist,
    removeFromWishlist,
    attachEventOnProdQuantity,
    updateProductQuantity,
    notifyUser
  } = useUtils();
  const { getProduct } = useProductDataStore();
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();

  const route = useRoute();
  const id = Number(route.params.id);
  const product = getProduct(id) as ProductData;
  const productCount = ref(cartStore.productQuantityInCart(id));
  const quantity = ref(0);
  // attaching event listeners on product quantity number
  const unsubscribe = attachEventOnProdQuantity(id.toString(), quantity);
  // Removing event on unmounting of component
  onBeforeUnmount(() => {
    unsubscribe();
  });

  const isPresentInWishlist = ref(wishlistStore.productInWishlist(id));

  function handleCartProduct(action: string) {
    switch (action) {
      case "add":
        cartStore.productInCart(id)
          ? cartStore.addQuantityToCart(id)
          : cartStore.addItemToCart(product);
        break;
      case "remove":
        cartStore.removeQuantityFromCart(id);
        break;
    }
  }
  function handleWishlistProduct() {
    if (isPresentInWishlist.value) {
      removeFromWishlist(id);
      wishlistStore.removeItemFromWishlist(id);
      isPresentInWishlist.value = false;
    } else {
      addToWishlist(product);
      wishlistStore.addItemToWishlist(product);
      isPresentInWishlist.value = true;
    }
  }
  function addQuantity() {
    productCount.value++;
    // updating Data to RealTime Database
    updateProductQuantity(id.toString(), quantity.value - 1);
    // updating Data in local store and user Cart collection in db
    handleCartProduct("add");
  }
  function removeQuantity() {
    productCount.value--;
    // updating Data to RealTime Database
    updateProductQuantity(id.toString(), quantity.value + 1);
    // updating Data in local store and user Cart Collection in db
    handleCartProduct("remove");
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
          <span>{{ product.rating.rate }} ({{ product.rating.count }})</span>
        </div>
        <div class="buttons">
          <button
            v-if="quantity === 0"
            class="btn btn-secondary"
            @click="notifyUser"
          >
            Notify Me
          </button>
          <div class="quantBtn" v-else-if="productCount !== 0">
            <button
              @click="removeQuantity"
              class="btn btn-danger"
              :disabled="productCount == 0"
            >
              <span class="pi pi-minus"></span>
            </button>
            <p>
              <b>{{ productCount }}</b>
            </p>
            <button
              @click="addQuantity"
              class="btn btn-success"
              :disabled="quantity == 0"
            >
              <span class="pi pi-plus"></span>
            </button>
          </div>
          <button @click="addQuantity" class="btn btn-cart" v-else>
            <span class="pi pi-plus"></span> Add to cart
          </button>
          <button @click="handleWishlistProduct" class="btn btn-wishlist">
            <span
              :class="{
                'pi pi-times': isPresentInWishlist,
                'pi pi-plus': !isPresentInWishlist,
              }"
            ></span>
            Wishlist
          </button>
        </div>
        <div id="item-quantity">
          <p>
            <b>({{ quantity }})Stock left</b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #item-quantity {
    padding-top: 10px;
    padding-left: 25px;
  }
  .quantBtn {
    display: flex;
    gap: 10px;
    align-items: center;
  }
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
