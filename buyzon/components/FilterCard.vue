<script setup lang="ts">

  const { category, priceRange } = constants();
  const emit = defineEmits(["sortPrice", "sortCategory"]);
  const priceCheck = ref("");
  const categoryCheck = ref<string[]>([]);
  watch(categoryCheck, (newValue) => {
    emit("sortCategory", newValue);
  });
  watch(priceCheck, (newValue) => {
    emit("sortPrice", newValue);
  });
</script>
<template>
  <div id="main">
    <div class="filter-container">
      <div class="filter-header">Filters</div>
      <div class="filter-content">
        <div class="filter-section">
          <h4>Price</h4>
          <div v-for="item in priceRange">
            <label>
              <input
                type="radio"
                name="price"
                :value="item"
                v-model="priceCheck"
              />
              {{ item }}
            </label>
          </div>
        </div>
        <div class="filter-section">
          <h4>Category</h4>
          <div v-for="item in category">
            <label>
              <input
                type="checkbox"
                name="category"
                :value="item"
                v-model="categoryCheck"
              />
              {{ item }}
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
    height: 400px;
    background: #fff;
    border-radius: 10px;
  }
  .filter-header {
    background: #3498db;
    color: #fff;
    text-align: center;
    padding: 10px;
    font-size: 18px;
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
