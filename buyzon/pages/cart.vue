<script setup lang="ts">
  const { getCart } = useUtils();
  const userCart = useUserCart();
  userCart.value = await getCart();
</script>
<template>
  <div id="main">
    <div v-for="item in userCart" :key="item.id">
      <Card :product="item"></Card>
    </div>
  </div>
</template>
<style scoped>
  #main {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 40px 40px;
    justify-content: space-evenly;
    padding-top: 1rem;
  }
</style>
