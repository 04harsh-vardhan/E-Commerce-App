<script setup lang="ts">
  import type { ProductData } from "../composables/types";
  let indexInCart: number;
  const props = defineProps<{
    product: ProductData;
  }>();
  const userCart = useUserCart();
  const isInCart = ref(checkPresence());

  const { image, title, price } = props.product;
  const msg = computed(() => (isInCart.value ? "Remove" : "Add"));
  const { addToCart, removeFromCart } = useUtils();

  function handleProduct() {
    if (isInCart.value) {
      removeFromCart(props.product.id);
      userCart.value.splice(indexInCart, 1);
      isInCart.value = false;
    } else {
      addToCart(props.product);
      userCart.value.push(props.product);
      isInCart.value = true;
    }
  }
  function checkPresence() {
    let isPresent = false;
    userCart.value.forEach((item, index) => {
      if (item.id === props.product.id) {
        isPresent = true;
        indexInCart = index;
      }
    });
    return isPresent;
  }
</script>
<template>
  <div class="product-card">
    <img :src="image" />
    <div class="product-info">
      <h3 class="product-title">{{ title }}</h3>
      <p class="product-price">Rs {{ price }}</p>
      <button
        class="add-to-cart"
        @click="handleProduct"
        :class="{ 'btn btn-danger': isInCart, 'btn btn-info': !isInCart }"
      >
        <span
          :class="{ 'pi pi-check': !isInCart, 'pi pi-times': isInCart }"
        ></span>
        {{ msg }}
      </button>
    </div>
  </div>
</template>

<style scoped>
  .product-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 167px; /* Reduced width */
    text-align: center;
    transition: transform 0.3s;
  }

  .product-card:hover {
    transform: translateY(-10px);
  }

  .product-card img {
    width: 100%;
    height: 200px;
  }

  .product-info {
    padding: 15px; /* Reduced padding */
  }

  .product-title {
    font-size: 1.2em; /* Reduced font size */
    margin: 0;
    color: #333;
    height: 60px;
    overflow: hidden;
    /* text-overflow: ellipsis; */
  }

  .product-price {
    font-size: 1em; /* Reduced font size */
    color: #ff7e5f;
    margin: 10px 0;
  }

  .add-to-cart {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    background-color: #ff7e5f;
    color: white;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .add-to-cart:hover {
    background-color: #feb47b;
  }
</style>
