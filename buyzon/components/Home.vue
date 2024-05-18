<template>
  <div id="container">
    <div>
      <h1>Welcome To Buyzon</h1>
    </div>
    <div id="buttons">
      <NuxtLink class="btn btn-warning" to="/signin">Signin</NuxtLink>
      <NuxtLink class="btn btn-success" to="/signup">Signup</NuxtLink>
    </div>
  </div>
</template>
<style setup>
  #container {
    display: flex;
    flex-direction: column;
  }
  #buttons {
    display: flex;
    justify-content: space-evenly;
  }
</style>
