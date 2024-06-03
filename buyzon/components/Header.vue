<script setup lang="ts">
  const emit = defineEmits(["searchEvent", "filterCategory", "resetSearch"]);
  const feature = usefeatureState();
  const { signoutUser } = useUtils();
  const searchString = ref("");
  const toggle = ref(false);
  const searchToggle = ref(false);
  const toggleSideBar = ref(false);
  const showSideBar = ref(false);
  const { category } = constants();
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();
  window.addEventListener("resize", () => {
    window.outerWidth < 700
      ? (showSideBar.value = true)
      : (showSideBar.value = false);
  });
  watch(searchString, (newValue) => {
    searchToggle.value = newValue.length > 0 ? true : false;
    emit("searchEvent", newValue);
  });

  async function handleSignout() {
    await signoutUser();
    navigateTo("/");
  }

  function resetSearch() {
    searchToggle.value = false;
    searchString.value = "";
    emit("resetSearch");
  }
</script>
<template>
  <div id="header">
    <div id="first">
      <div id="icon"><img src="../assets/Buyzon-logo.jpg" /></div>
      <button @click="navigateTo('/')" class="btn btn-info">
        <i class="pi pi-home"></i>
      </button>
      <div v-if="!(feature === 'dashboard')">
        <button class="btn btn-info" @click="navigateTo('/dashboard')">
          Home
        </button>
      </div>
      <div
        v-if="feature === 'dashboard' && !showSideBar"
        class="item"
        v-for="item in category"
        :key="item"
        @click="$emit('filterCategory', item)"
      >
        <p>{{ item }}</p>
      </div>
      <div
        class="sidebar"
        v-if="feature === 'dashboard' && showSideBar"
        @click="toggleSideBar = !toggleSideBar"
      >
        <div class="sidebar-header">
          <button class="btn btn-info" v-show="!toggleSideBar">
            <span class="pi pi-bars"></span>
          </button>
        </div>
        <div class="sidebar-body">
          <div
            v-show="toggleSideBar"
            class="category-item"
            v-for="item in category"
            :key="item"
            @click="$emit('filterCategory', item)"
          >
            <p>{{ item }}</p>
          </div>
        </div>
      </div>
      <div
        id="searchBar"
        class="input-group mb-3"
        v-if="feature === 'dashboard'"
      >
        <input
          type="text"
          class="form-control"
          placeholder="Search for products"
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
          v-model="searchString"
        />
        <i class="pi pi-search icon"></i>
        <button
          v-show="searchToggle"
          class="btn btn-light"
          @click="resetSearch"
        >
          <span class="pi pi-times"></span>
        </button>
      </div>
    </div>
    <div id="second">
      <div
        :class="{ active: feature === 'cart' }"
        id="cart"
        @click="navigateTo('/dashboard/cart')"
      >
        <span class="pi pi-cart-arrow-down"></span>
        <p>Cart({{ cartStore.cartSize }})</p>
      </div>
      <div
        :class="{ active: feature === 'wishlist' }"
        id="wishlist"
        @click="navigateTo('/dashboard/wishlist')"
      >
        <span class="pi pi-heart"></span>
        <p>Wishlist({{ wishlistStore.wishlistSize }})</p>
      </div>
      <div
        @mouseenter="toggle = true"
        @mouseleave="toggle = false"
        :class="{ active: feature === 'userinfo' }"
      >
        <div id="user">
          <span class="pi pi-user"></span>
          <p>Profile</p>
        </div>
        <div v-show="toggle" id="profileList">
          <div
            v-if="feature !== 'userinfo'"
            class="item user-action"
            @click="navigateTo('/dashboard/userinfo')"
          >
            Detail
          </div>
          <div class="item user-action" @click="handleSignout">Sign out</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .active {
    color: #4e54c8;
  }
  .icon {
    position: relative;
    right: 20px;
    top: 10px;
    z-index: 9;
  }
  .sidebar-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin-top: 160px;
    background: linear-gradient(to right, #4e54c8, #8f94fb);
    color: white;
  }
  .sidebar-header {
    margin-top: 150px;
    background: none;
  }
  .sidebar {
    position: absolute;
    margin-top: auto;
    z-index: 9;
    margin-left: 80px;
    width: 150px;
  }
  .user-action {
    border-bottom: 1px solid #e9e9ed;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 5px;
  }
  .item:hover {
    color: #000080;
  }
  #cart,
  #wishlist {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: var(--weight);
  }
  #searchBar {
    max-width: 400px;
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: var(--weight);
  }
  #profileList {
    width: 100px;
    height: auto;
    background-color: #fff;
    position: absolute;
    z-index: 9;
    margin-left: -30px;
    background-color: khaki;
    border-radius: 5px;
  }
  #user {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: var(--weight);
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
    --weight: 500;
  }
  #second {
    width: 20vw;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  #first {
    width: 80vw;
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 1rem;
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
  @media (max-width: 1200px) {
    img {
      width: 50px;
      height: 50px;
    }
    p {
      font-size: 12px;
    }
  }
  @media (max-width: 700px) {
    #searchBar {
      min-width: 100px;
      width: 150px;
    }
    #first {
      width: 20%;
    }
    #second {
      width: 80%;
    }
  }
  @media (max-width: 500px) {
    #first {
      display: flex;
      flex-direction: column;
    }
    .sidebar-header {
      margin-top: 40px;
    }
    .sidebar-body {
      margin-top: auto;
    }
  }
</style>
