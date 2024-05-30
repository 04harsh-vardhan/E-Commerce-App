<script setup lang="ts">
  const wishlistStore = useWishlistStore();
  const { removeFromWishlist } = useUtils();
  function handleRemove(id: number) {
    wishlistStore.removeItemFromWishlist(id);
    removeFromWishlist(id);
  }
</script>
<template>
  <div id="main">
    <div id="header">
      <Header></Header>
    </div>
    <div id="card-div" v-if="wishlistStore.wishlistSize > 0">
      <div
        v-for="{ price, title, id, image } in wishlistStore.wishlistData.data"
        :key="id"
      >
        <Card :image="image" :id="id">
          <template #price>{{ price }}</template>
          <template #title>{{ title }}</template>
          <template #button="buttonProps">
            <button class="add-to-cart" @click="handleRemove(buttonProps.id)">
              <span class="pi pi-heart-fill"></span> Remove
            </button>
          </template></Card
        >
      </div>
    </div>
    <div v-else id="notFound">
      <img src="../../assets/wishlist_empty.png" />
    </div>
  </div>
</template>
<style scoped>
  #notFound {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
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
