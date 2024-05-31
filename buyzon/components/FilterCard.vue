<script setup lang="ts">
  const { priceRange, rating, brand } = constants();

  const brandFilter = defineModel("brand");
  const priceFilter = defineModel("price");
  const ratingFilter = defineModel("rating");
</script>
<template>
  <div id="main">
    <div class="filter-container">
      <div class="filter-header">Filters <slot name="crossIcon"></slot></div>
      <div class="filter-content">
        <div class="filter-section">
          <h4>Brand</h4>
          <div v-for="item in brand" :key="item">
            <label>
              <input
                type="checkbox"
                name="brand"
                :value="item"
                v-model="brandFilter"
              />
              {{ item }}
            </label>
          </div>
        </div>
        <div class="filter-section">
          <h4>Price</h4>
          <div v-for="item in priceRange" :key="item">
            <label>
              <input
                type="checkbox"
                name="price"
                :value="item"
                v-model="priceFilter"
              />
              Under Rs {{ item }}
            </label>
          </div>
        </div>
        <div class="filter-section">
          <h4>Rating</h4>
          <div v-for="item in rating" :key="item">
            <label>
              <input
                type="checkbox"
                name="rating"
                :value="item"
                v-model="ratingFilter"
              />
              above {{ item }}<span class="pi pi-star"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .filter-container {
    width: 200px;
    height: fit-content;
    background: #fff;
    border-radius: 10px;
    background: #0dcaf0;
  }
  @media (max-width: 700px) {
    .filter-container {
      width: 100px;
    }
  }
  .filter-header {
    color: #fff;
    text-align: center;
    padding: 10px;
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .filter-content {
    padding: 20px;
  }
  .filter-section {
    margin-bottom: 20px;
  }
  .filter-section h4 {
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  .filter-section label {
    display: block;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 14px;
    color: #555;
  }
  .filter-section input[type="radio"] {
    margin-right: 10px;
  }
  .filter-button {
    width: 100%;
    padding: 10px;
    background: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  .filter-button:hover {
    background: #2980b9;
  }
</style>
