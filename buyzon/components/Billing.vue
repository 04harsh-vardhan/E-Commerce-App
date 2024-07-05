<script setup lang="ts">
  const cartStore = useCartStore();
  const productList = cartStore.cartData.data;
  const total = computed(() =>
    productList.reduce((accu, item) => {
      accu = accu + item.price * item.quantity;
      return accu;
    }, 0)
  );
</script>
<template>
  <div id="main">
    <table class="table table-info">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productList" :key="item.id">
          <th>{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }}</td>
        </tr>
      </tbody>
    </table>
    <div id="total-amount-div">
      <p>Total amount</p>
      <p id="amount">Rs. {{ Math.round(total * 100) / 100 }}</p>
    </div>
  </div>
</template>
<style scoped>
  #total-amount-div {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  }
  
  #amount {
    padding-right: 10px;
  }
</style>
