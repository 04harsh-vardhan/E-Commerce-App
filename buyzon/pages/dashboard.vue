<script setup lang="ts">
  const { getProducts } = useUtils();
  const productData = await getProducts();
  const displayProducts = ref(productData);
  const pages = ref(1);

  const totalPages = computed(() => {
    return Math.ceil(displayProducts.value.length / 4);
  });
  function handleSearch(query: string) {
    displayProducts.value = productData.filter((item) => {
      return item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
  }
  function comparatorHigh(itemA: ProductData, itemB: ProductData) {
    return itemB.price - itemA.price;
  }
  function comparatorLow(itemA: ProductData, itemB: ProductData) {
    return itemA.price - itemB.price;
  }

  function handlePriceSort(sortBy: string) {
    pages.value = 1;
    displayProducts.value =
      sortBy === "High"
        ? displayProducts.value.sort(comparatorHigh)
        : displayProducts.value.sort(comparatorLow);
  }
  function handleCategorySort(sortList: string[]) {
    pages.value = 1;
    displayProducts.value =
      sortList.length > 0
        ? productData.filter((item) => sortList.includes(item.category))
        : productData;
  }
</script>
<template>
  <div id="main">
    <div id="header">
      <Header @search-event="handleSearch"></Header>
    </div>
    <div id="footer">
      <div id="sort">
        <FilterCard
          @sort-price="handlePriceSort"
          @sort-category="handleCategorySort"
        />
      </div>
      <div>
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
    </div>
  </div>
</template>
<style scoped>
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
  }
  #card-div {
    width: 80vw;
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
