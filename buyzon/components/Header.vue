<script setup lang="ts">
  const isAuthenticated = useAuth();
  const searchString = ref("");
  const sortBy = ref("");
  const emit = defineEmits(["searchEvent", "sortEvent"]);

  watch(sortBy, (newValue) => {
    emit("sortEvent", newValue);
  });

  function handleSignout() {
    isAuthenticated.value = false;
    navigateTo("/");
  }
  function handleSearch() {
    sortBy.value = "";
    emit("searchEvent", searchString.value);
  }
</script>
<template>
  <div id="header">
    <div id="first">
      <div id="icon">Buyzon</div>
      <div id="searchBar" class="input-group mb-3">
        <button
          class="btn btn-outline-secondary"
          id="button-addon1"
          @click="handleSearch"
        >
          Search
        </button>
        <input
          type="text"
          class="form-control"
          placeholder="Search for products ,brands and more"
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
          v-model="searchString"
        />
      </div>
      <div id="dropDown">
        <select v-model="sortBy">
          <option disabled value="">sortBy</option>
          <option value="high">Price: High to Low</option>
          <option value="low">Price: Low to High</option>
        </select>
      </div>
    </div>
    <div id="second">
      <div id="cart">
        <button type="button" class="btn btn-success">Cart</button>
      </div>
      <div id="loginDiv" @click="handleSignout">
        <button class="btn btn-danger">Signout</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #header {
    background-color: #fff;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    justify-content: space-between;
    box-sizing: border-box;
  }
  #first,
  #second {
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: space-evenly;
  }
  #icon {
    margin-right: 36px;
    display: block;
  }
  #searchBar {
    width: 100%;
    min-width: 200px;
  }
  #button-addon1 {
    height: 40px;
    border-radius: 2px;
    cursor: pointer;
    padding: 8px 8px 8px 12px;
    background-color: skyblue;
  }
  .form-control {
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    max-width: 350px;
  }
  .form-control:focus {
    background-color: #fff;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
</style>
