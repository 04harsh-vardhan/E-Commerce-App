<script setup lang="ts">
  const { productsData, fetchData } = useProductDataStore();
  const { fetchCartData } = useCartStore();
  const { fetchWishlistData } = useWishlistStore();
  const specialOffer = useSpecialOfferFlag();
  // Run these promises in Parallel with Promise.All
   await Promise.all([fetchData(),fetchCartData(),fetchWishlistData()])
  const productData = productsData.data;
  const displayProducts = ref(productData);
  const toggleFilter = ref(false);
  const brandFilter = ref<string[]>([]);
  const priceFilter = ref<number[]>([]);
  const ratingFilter = ref<number[]>([]);
  const searchFilter = ref<string>("");
  const categoryFilter = ref<string>("");
  const pages = ref(1);
  const totalPages = computed(() => {
    return Math.ceil(displayProducts.value.length / 8);
  });

  watch(
    [brandFilter, priceFilter, ratingFilter, searchFilter, categoryFilter],
    () => {
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
            : true) &&
          (searchFilter.value !== ""
            ? item.title
                .toLocaleLowerCase()
                .includes(searchFilter.value.toLocaleLowerCase())
            : true) &&
          (categoryFilter.value !== ""
            ? item.category
                .toLocaleLowerCase()
                .includes(categoryFilter.value.toLocaleLowerCase())
            : true)
      );
    }
  );
</script>
<template>
  <div id="main">
    <div id="header">
      <Header
        v-model:search="searchFilter"
        v-model:category="categoryFilter"
      ></Header>
    </div>
    <div id="footer">
      <div id="sort">
        <button
          v-show="!toggleFilter"
          class="btn btn-info"
          @click="toggleFilter = true"
        >
          <i class="pi pi-bars"></i>
        </button>
        <FilterCard
          v-show="toggleFilter"
          v-model:brand="brandFilter"
          v-model:rating="ratingFilter"
          v-model:price="priceFilter"
        >
          <template #crossIcon
            ><span
              @click="toggleFilter = false"
              class="pi pi-arrow-left crossIcon"
            ></span
          ></template>
        </FilterCard>
      </div>
      <div v-if="displayProducts.length > 0" id="display">
        <div id="card-div">
          <div
            class="item"
            v-for="{
              price,
              title,
              id,
              image,
              quantity,
            } in displayProducts.slice(pages * 8 - 8, pages * 8)"
            :key="id"
          >
            <Card
              :image="image"
              :id="id"
              @click="async () => await navigateTo(`/dashboard/${id}`)"
            >
              <template #price>{{ price }}</template>
              <template #title>{{ title }}</template>
              <template #msg
                ><b v-if="quantity == 0" class="stockOutMsg"
                  >Out of Stock</b
                ></template
              >
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
            Prev
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
            Next
          </button>
        </div>
      </div>
      <div v-else id="notFound">
        <img src="../../assets/products/no-product-found.jpg" />
      </div>
    </div>
  </div>
  <Transition>
    <SpecialOfferCard v-if="specialOffer"></SpecialOfferCard>
  </Transition>
</template>
<style scoped>
  .stockOutMsg {
    color: red;
  }
  #sort {
    background: #0dcaf0;
  }
  #display {
    width: -webkit-fill-available;
  }
  .item {
    flex-basis: 25%;
    margin-bottom: 20px;
  }
  .crossIcon:hover {
    cursor: pointer;
  }
  #notFound {
    width: -webkit-fill-available;
    display: flex;
    align-items: center;
    justify-content: center;
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
  #footer::-webkit-scrollbar {
    display: none;
  }
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding-top: 10px;
  }
  #card-div {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    /* gap: 80px 80px; */
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

  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
