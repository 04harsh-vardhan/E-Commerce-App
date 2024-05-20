<script setup lang="ts">
  const productData = useProductData();
  const displayProducts = reactive(productData);
  const pages = ref(1);

  const totalPages = computed(() => {
    return Math.ceil(displayProducts.value.length / 4);
  });
  function handleSearch(query: string) {
    displayProducts.value = productData.value.filter((item) => {
      return item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
  }
  function comparatorHigh(itemA: ProductData, itemB: ProductData) {
    return itemB.price - itemA.price;
  }
  function comparatorLow(itemA: ProductData, itemB: ProductData) {
    return itemA.price - itemB.price;
  }

  function handleSort(sortBy: string) {
    displayProducts.value =
      sortBy === "high"
        ? displayProducts.value.sort(comparatorHigh)
        : displayProducts.value.sort(comparatorLow);
  }
</script>
<template>
  <div id="main">
    <Header @search-event="handleSearch" @sort-event="handleSort"></Header>
    <Category></Category>
    <div id="card-div">
      <div
        v-for="item in displayProducts.slice(pages * 4 - 4, pages * 4)"
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
    justify-content: space-evenly;
  }
  #main {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
