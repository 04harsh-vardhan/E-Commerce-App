<script setup lang="ts">
  const productData = useProductData();
  const pages = ref(1);
  const totalPages = computed(() => {
    return Math.ceil(productData.value.length / 5);
  });
</script>
<template>
  <div id="main">
    <Header></Header>
    <Category></Category>
    <div id="card-div">
      <div
        v-for="item in productData.slice(pages * 5 - 5, pages * 5)"
        :key="item.id"
      >
        <Card :product="item"></Card>
      </div>
    </div>
    <div class="pagination">
      <button
        @click="
          () => {
            pages > 1 ? pages-- : null;
          }
        "
        class="btn btn-dark"
      >
        prev
      </button>
      <button
        @click="pages = i"
        v-for="i in totalPages"
        :key="i"
        class="btn btn-dark"
      >
        {{ i }}
      </button>
      <button
        @click="
          () => {
            pages < totalPages ? pages++ : null;
          }
        "
        class="btn btn-dark"  
      >
        next
      </button>
    </div>
  </div>
</template>
<style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
  #card-div {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    gap: 40px 40px;
  }
  #main {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
