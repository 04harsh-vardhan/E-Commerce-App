<script setup lang="ts">
  const { getWishlist } = useUtils();
  const userWishlist = useUserWishlist();
  userWishlist.value = await getWishlist();
</script>
<template>
  <div id="main">
    <div id="header">
      <Header></Header>
    </div>
    <div id="card-div">
      <div v-for="item in userWishlist" :key="item.id">
        <Card :product="item"></Card>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
