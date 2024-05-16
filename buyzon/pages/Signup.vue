<script setup lang="ts">

  const { addUserToDB, SignUpUser, createUser } = useUtils();
  const userData = ref(new SignUpUser());
  const isLoading = ref(false);

  async function signupUser() {
    isLoading.value = true;
    const isSet = await createUser(
      userData.value.email,
      userData.value.password
    );
    const isAdded = await addUserToDB(userData.value);
    if (isSet) {
      navigateTo("/signin");
    } else {
      isLoading.value = false;
    }
  }
  
</script>
<template>
  <div id="main">
    <div v-if="!isLoading" class="signup-container">
      <h2 class="text-center">Create Account</h2>
      <div>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="name"
            class="form-control"
            id="name"
            placeholder="Enter Name"
            v-model="userData.name"
          />
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            v-model="userData.email"
          />
        </div>
        <div class="form-group">
          <label for="number">Mobile Number</label>
          <input
            type="tel"
            class="form-control"
            id="number"
            maxlength="10"
            pattern="[0-9]{10}"
            placeholder="123-456-7890"
            v-model="userData.mobile_number"
          />
        </div>
        <div class="form-group">
          <label for="addrss">Your address</label>
          <input
            type="email"
            class="form-control"
            id="address"
            placeholder="Enter your address"
            v-model="userData.address"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="userData.password"
          />
        </div>
        <button @click="signupUser" class="btn btn-primary btn-block">
          Sign Up
        </button>
      </div>
    </div>
    <div v-else>Loading....</div>
  </div>
</template>

<style scoped>
  @import url("bootstrap/dist/css/bootstrap.min.css");
  #main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  .signup-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .signup-container h2 {
    margin-bottom: 20px;
  }
  .form-control {
    background-color: #e9ecef;
    border: 1px solid #ced4da;
  }
  .form-control:focus {
    background-color: #fff;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
</style>
