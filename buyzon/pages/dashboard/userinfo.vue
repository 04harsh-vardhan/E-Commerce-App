<script setup lang="ts">
  const { getUserData } = useUtils();

  const { name, address, mobileNumber, email } = (await getUserData()) as any;
</script>
<template>
  <div id="main">
    <div class="container">
      <div class="card">
        <div class="user-info">
          <img alt="User image" class="avatar" />
          <h1 class="name">{{ name }}</h1>
          <p class="email">{{ email }}</p>
          <p class="mobile">{{ mobileNumber }}</p>
          <p class="address">{{ address }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #main {
    background-color: #f0f8ff;
    font-family: "Arial", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    margin: 0;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px;
    padding: 20px;
  }

  .card {
    background-color: #ffffff; /* White background */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    width: 100%;
  }

  .avatar {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 20px;
  }

  .name {
    font-size: 24px;
    color: #333333;
    margin: 0;
  }

  .email,
  .mobile,
  .address {
    font-size: 16px;
    color: #666666;
    margin: 5px 0;
  }
</style>
