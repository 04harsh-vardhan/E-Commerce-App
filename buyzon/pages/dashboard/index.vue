<script setup lang="ts">
  const { productsData } = useProductDataStore();
  const { fetchCartData } = useCartStore();
  const { fetchWishlistData } = useWishlistStore();

  await callOnce(fetchCartData);
  await callOnce(fetchWishlistData);
  const productData = productsData.data;

  const displayProducts = ref(productData);
  const brandFilter = ref<string[]>([]);
  const priceFilter = ref<number[]>([]);
  const ratingFilter = ref<number[]>([]);
  const pages = ref(1);
  const totalPages = computed(() => {
    return Math.ceil(displayProducts.value.length / 8);
  });

  watch([brandFilter, priceFilter, ratingFilter], () => {
    pages.value = 1;
    displayProducts.value = productData.filter(
      (item) =>
        (brandFilter.value.length > 0
          ? brandFilter.value.includes(item.brand)
          : true) &&
        (priceFilter.value.length > 0
          ? priceFilter.value.find((price) => item.price < price)
          : true) &&
        (ratingFilter.value.length > 0
          ? ratingFilter.value.find((rating) => item.rating.rate >= rating)
          : true)
    );
  });

  function handleSearch(query: string) {
    pages.value = 1;
    displayProducts.value = productData.filter((item) => {
      return item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
  }

  function handleCategoryFilter(category: string) {
    pages.value = 1;
    displayProducts.value = productData.filter((item) =>
      item.category.toLocaleLowerCase().includes(category.toLocaleLowerCase())
    );
  }
  function handleResetSearch() {
    pages.value = 1;
    displayProducts.value = productData;
  }
</script>
<template>
  <div id="main">
    <div id="header">
      <Header
        @search-event="handleSearch"
        @filter-category="handleCategoryFilter"
        @reset-search="handleResetSearch"
      ></Header>
    </div>
    <div id="footer">
      <div id="sort">
        <FilterCard
          v-model:brand="brandFilter"
          v-model:rating="ratingFilter"
          v-model:price="priceFilter"
        />
      </div>
      <div v-if="displayProducts.length > 0" id="display">
        <div id="card-div">
          <div
            v-for="{ price, title, id, image } in displayProducts.slice(
              pages * 8 - 8,
              pages * 8
            )"
            :key="id"
          >
            <Card
              :image="image"
              :id="id"
              @click="navigateTo(`/dashboard/${id}`)"
            >
              <template #price>{{ price }}</template>
              <template #title>{{ title }}</template>
            </Card>
          </div>
        </div>
        <div class="pagination">
          <button
            @click="
              () => {
                pages > 1 ? pages-- : null;
              }
            "
            v-show="pages > 1"
            class="btn btn-info"
          >
            prev
          </button>
          <button
            @click="
              () => {
                pages < totalPages ? pages++ : null;
              }
            "
            v-show="pages < totalPages"
            class="btn btn-info"
          >
            next
          </button>
        </div>
      </div>
      <div v-else id="notFound">
        <img src="../../assets/products/no-product-found.jpg" />
      </div>
    </div>
  </div>
</template>
<style scoped>
  #notFound {
    padding-left: 200px;
  }
  img {
    width: 600px;
    height: 450px;
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
