<script setup lang="ts">
  const { priceRange, rating, brand } = constants();
  const emit = defineEmits(["filterPrice", "filterRating", "filterBrand"]);
  const priceCheck = ref<number[]>([]);
  const ratingCheck = ref<number[]>([]);
  const brandCheck = ref<string[]>([]);

  function setPriceMsg(price: number) {
    if (price === 99) {
      return "Rs 1 to Rs 99";
    } else if (price === 999) {
      return "Rs 100 to Rs 999";
    }
    return "Rs 1000 to Rs 99999";
  }
  function setRatingMsg(rating: number) {
    if (rating === 2) {
      return "2 and above";
    } else if (rating === 3) {
      return "3 and above";
    }
    return "4 and above";
  }
  function findUniqueElement(list1: number[], list2: number[]) {
    const sum1 = list1.reduce((acu, elem) => {
      return (acu += elem);
    }, 0);
    const sum2 = list2.reduce((acu, elem) => {
      return (acu += elem);
    }, 0);
    return sum1 - sum2;
  }

  watch(priceCheck, (newValue, oldValue) => {
    if (oldValue.length > newValue.length) {
      const price = findUniqueElement(oldValue, newValue);
      emit("filterPrice", { todo: "remove", value: price });
    } else {
      const price = newValue[newValue.length - 1];
      emit("filterPrice", { todo: "add", value: price });
    }
  });
  watch(ratingCheck, (newValue, oldValue) => {
    if (oldValue.length > newValue.length) {
      const rating = findUniqueElement(oldValue, newValue);
      emit("filterRating", { todo: "add", value: rating });
    } else {
      const rating = newValue[newValue.length - 1];
      emit("filterRating", { todo: "remove", value: rating });
    }
  });
  watch(brandCheck, (newValue, oldValue) => {
    emit("filterBrand", { todo: "add", value: newValue[0] });
  });
  
</script>
<template>
  <div id="main">
    <div class="filter-container">
      <div class="filter-header">Filters</div>
      <div class="filter-content">
        <div class="filter-section">
          <h4>Price</h4>
          <div v-for="item in priceRange" :key="item">
            <label>
              <input
                type="checkbox"
                name="price"
                :value="item"
                v-model="priceCheck"
              />
              {{ setPriceMsg(item) }}
            </label>
          </div>
        </div>
        <div class="filter-section">
          <h4>Rating</h4>
          <div v-for="item in rating" :key="item">
            <label>
              <input
                type="checkbox"
                name="price"
                :value="item"
                v-model="ratingCheck"
              />
              {{ setRatingMsg(item) }} <span class="pi pi-star"></span>
            </label>
          </div>
        </div>
        <div class="filter-section">
          <h4>Brand</h4>
          <div v-for="item in brand" :key="item">
            <label>
              <input
                type="checkbox"
                name="price"
                :value="item"
                v-model="brandCheck"
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
