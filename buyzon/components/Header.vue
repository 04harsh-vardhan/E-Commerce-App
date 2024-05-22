<script setup lang="ts">
  const { signoutUser } = useUtils();
  const searchString = ref("");
  const toggle = ref(false);
  const emit = defineEmits(["searchEvent"]);

  function handleSignout() {
    sessionStorage.removeItem("token");
    signoutUser();
    navigateTo("/");
  }
  function handleSearch() {
    emit("searchEvent", searchString.value);
  }
  function moveToCart() {
    navigateTo("/cart");
  }
</script>
<template>
  <div id="header">
    <div id="first">
      <div id="icon"><img src="../assets/Buyzon-logo.jpg" /></div>
      <div id="searchBar" class="input-group mb-3">
        <button
          class="btn btn-outline-secondary"
          id="button-addon1"
          @click="handleSearch"
        >
          <span class="pi pi-search"></span>
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
    </div>
    <div id="second">
      <div id="cart">
        <button type="button" class="btn btn-success" @click="moveToCart">
          <span class="pi pi-cart-arrow-down"></span>
        </button>
      </div>
      <div @mouseenter="toggle = true" @mouseleave="toggle = false">
        <div id="user">
          <span class="pi pi-user"></span>
          <p>profile</p>
        </div>
        <div v-show="toggle" id="profileList">
          <div class="item"><p>user detail</p></div>
          <div class="item" @click="handleSignout"><p>signout</p></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  #profileList {
    width: 100px;
    height: auto;
    background-color: #fff;
    position: absolute;
    z-index: 9;
  }
  #user {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
  #header {
    background-color: aliceblue;
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
