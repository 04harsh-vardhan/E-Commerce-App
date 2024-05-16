<script setup lang="ts">
  const productData = useProductData();
  const pages = ref(1);
  const totalPages = computed(() => {
    return Math.ceil(productData.value.length / 5);
  });
</script>
<template>
  <Header></Header>
  <Category></Category>
  <div id="card-div">
    <div
      v-for="{ id, title, price, image } in productData.slice(
        pages * 5 - 5,
        pages * 5
      )"
      :key="id"
    >
      <Card :title="title" :price="price" :image="image"></Card>
    </div>
  </div>
  <div class="pagination">
    <button
      @click="
        () => {
          pages > 1 ? pages-- : null;
        }
      "
    >
      prev
    </button>
    <button @click="pages = i" v-for="i in totalPages" :key="i">
      {{ i }}
    </button>
    <button
      @click="
        () => {
          pages < totalPages ? pages++ : null;
        }
      "
    >
      next
    </button>
  </div>
</template>
<style scoped>
@import url("bootstrap/dist/css/bootstrap.min.css");
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
  #card-div {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 40px 40px;
  }
</style>
