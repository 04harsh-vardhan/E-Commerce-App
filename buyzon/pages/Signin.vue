<script setup lang="ts">
  const { signInUser } = useUtils();
  const email = ref("");
  const password = ref("");
  const isLoading = ref(false);
  const isAuthenticated = useAuth();
  async function handleSignIn() {
    isAuthenticated.value = true;
    const success = await signInUser(email.value, password.value);
    if (success) {
      navigateTo("/dashboard");
    }
  }
</script>
<template>
  <div v-if="!isLoading" id="main">
    <div class="signup-container">
      <h2 class="text-center">SignIn</h2>
      <div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <button @click="handleSignIn" class="btn btn-primary btn-block">
          Sign In
        </button>
      </div>
    </div>
  </div>
  <div v-else>Loading....</div>
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
