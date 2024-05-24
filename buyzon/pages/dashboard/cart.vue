<script setup lang="ts">
  const userCart = useUserCart();
  const { removeFromCart } = useUtils();
  function handleRemove(id: number) {
    userCart.value = userCart.value.filter((item) => item.id !== id);
    removeFromCart(id);
  }
</script>
<template>
  <div id="main">
    <div id="header">
      <Header></Header>
    </div>
    <div id="card-div">
      <div v-for="{ price, title, id, image } in userCart" :key="id">
        <Card :image="image" :id="id">
          <template #price>{{ price }}</template>
          <template #title>{{ title }}</template>
          <template #button="buttonProps">
            <button class="add-to-cart" @click="handleRemove(buttonProps.id)">
              <span class="pi pi-times"></span> Remove
            </button>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
