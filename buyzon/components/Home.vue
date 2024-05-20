<template>
  <div id="container">
    <div class="topDiv">
      <div id="logo"><img src="../assets/Buyzon-logo.jpg" /></div>
      <h1>Welcome To Buyzon</h1>
    </div>
    <div id="buttons">
      <NuxtLink class="btn btn-warning" to="/signin">Signin</NuxtLink>
      <NuxtLink class="btn btn-success" to="/signup">Signup</NuxtLink>
    </div>
  </div>
</template>
<style scoped>
.topDiv{
  display: flex;
}
  img {
    width: 100px;
    height: 100px;
  }
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #buttons {
    display: flex;
    justify-content: space-evenly;
  }
</style>
