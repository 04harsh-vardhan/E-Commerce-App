<script setup lang="ts">
  import type { ProductData } from "../composables/types";
  let indexInCart: number;
  const props = defineProps<{
    product: ProductData;
  }>();
  const userCart = useUserCart();
  const isInCart = ref(checkPresence());

  const { image, title, price } = props.product;
  const msg = computed(() => (isInCart.value ? "Remove" : "Add to Cart"));
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
  <div id="main">
    <div><img :src="image" /></div>
    <div>
      <p>
        <b>{{ title }}</b>
      </p>
    </div>
    <div id="price-div">
      <b>Rs. {{ price }}</b>
      <button
        @click="handleProduct"
        :class="{ 'btn btn-danger': isInCart, 'btn btn-info': !isInCart }"
      >
        {{ msg }}
      </button>
    </div>
  </div>
</template>
<style scoped>
  #price-div {
    display: flex;
    column-gap: 5px;
  }
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
