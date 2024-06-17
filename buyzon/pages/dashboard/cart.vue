<script setup lang="ts">
  const cartStore = useCartStore();
</script>
<template>
  <div id="main">
    <div id="header">
      <Header></Header>
    </div>
    <div id="card-div" v-if="cartStore.cartSize > 0">
      <div
        v-for="{ price, title, id, image ,quantity} in cartStore.cartData.data"
        :key="id"
      >
        <Card
          :image="image"
          :id="id"
          @click="
            async () => {
              await navigateTo(`/dashboard/${id}`);
            }
          "
        >
          <template #price>{{ price }}</template>
          <template #title>{{ title }}</template>
          <template #quantity>Quantity {{ quantity }}</template>
        </Card>
      </div>
    </div>
    <div v-else id="notFound">
      <img src="../../assets/empty_Cart.png" />
    </div>
  </div>
</template>
<style scoped>
  #notFound {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .add-to-cart:hover {
    background-color: #feb47b;
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
  #display {
    border-top: var(--borderAttr);
    border-left: var(--borderAttr);
  }
  #header {
    height: 20vh;
  }
  #footer {
    display: flex;
    height: 80vh;
    overflow-y: scroll;
  }
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding-top: 10px;
  }
  #card-div {
    width: 80vw;
    display: flex;
    flex-wrap: wrap;
    gap: 80px 80px;
    justify-content: space-evenly;
    padding-top: 10px;
    height: fit-content;
    border-bottom: var(--borderAttr);
  }
  #main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    --borderAttr: 1px solid #e9e9ed;
  }
</style>
