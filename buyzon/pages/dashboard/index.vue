<script setup lang="ts">
  const { getProducts, getCart } = useUtils();
  const userCart = useUserCart();
  const productData = await getProducts();
  userCart.value = await getCart();
  const displayProducts = ref(productData);
  const pages = ref(1);
  const totalPages = computed(() => {
    return Math.ceil(displayProducts.value.length / 8);
  });

  function handleSearch(query: string) {
    displayProducts.value = displayProducts.value.filter((item) => {
      return item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
  }

  function handleCategoryFilter(category: string) {
    pages.value = 1;
    displayProducts.value = productData.filter((item) =>
      item.category.toLocaleLowerCase().includes(category.toLocaleLowerCase())
    );
  }
  type FilterObject<T> = {
    todo: string;
    value: T;
  };
  function handleFilterPrice(filterItem: FilterObject<number>) {
    pages.value = 1;
    const minRange = filterItem.value / 10;
    if (filterItem.todo === "add") {
      const myItem = productData.filter(
        (item) => item.price > minRange && item.price < 10 * minRange
      );
      if (displayProducts.value.length === productData.length) {
        displayProducts.value = [...myItem];
      } else {
        displayProducts.value = [...displayProducts.value, ...myItem];
      }
    } else {
      displayProducts.value = displayProducts.value.filter(
        (item) => !(item.price > minRange && item.price < 10 * minRange)
      );
    }
  }

  function handleFilterBrand(filterItem: FilterObject<string>) {
    console.log("inside");
    pages.value = 1;
    if (filterItem.todo === "add") {
      const myItem = productData.filter(
        (item) => item.brand === filterItem.value
      );
      if (displayProducts.value.length === productData.length) {
        displayProducts.value = [...myItem];
      } else {
        displayProducts.value = [...displayProducts.value, ...myItem];
      }
    } else {
      displayProducts.value = displayProducts.value.filter(
        (item) => item.brand !== filterItem.value
      );
    }
  }

  function handleFilterRating(filterItem: FilterObject<number>) {
    pages.value = 1;
    if (filterItem.todo === "add") {
      const myItem = productData.filter(
        (item) => item.rating.rate >= filterItem.value
      );
      if (displayProducts.value.length === productData.length) {
        displayProducts.value = [...myItem];
      } else {
        displayProducts.value = [...displayProducts.value, ...myItem];
      }
    } else {
      displayProducts.value = displayProducts.value.filter(
        (item) => !(item.rating.rate >= filterItem.value)
      );
    }
  }
</script>
<template>
  <div id="main">
    <div id="header">
      <Header
        @search-event="handleSearch"
        @filter-category="handleCategoryFilter"
      ></Header>
    </div>
    <div id="footer">
      <div id="sort">
        <FilterCard
          @filter-price="handleFilterPrice"
          @filter-brand="handleFilterBrand"
          @filter-rating="handleFilterRating"
        />
      </div>
      <div id="display">
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
            class="btn btn-dark"
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
