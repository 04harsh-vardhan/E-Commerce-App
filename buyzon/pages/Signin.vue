<script setup lang="ts">
  const { signInUser } = useUtils();
  const email = ref("");
  const password = ref("");
  const regex_Email = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const regex_Password = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  const isLoading = ref(false);
  const isAuthenticated = useAuth();

  const errorMsg = {
    email: "",
    password: "",
  };

  watch([email, password], () => {
    errorMsg.email = !regex_Email.test(email.value)
      ? "Email is not Valid Format"
      : "";
    errorMsg.password = !regex_Password.test(password.value)
      ? "Password is not Valid Format"
      : "";
  });

  async function handleSignIn() {
    if (!errorMsg.email && !errorMsg.password) {
      return;
    }
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
          <Error v-if="errorMsg.email">{{ errorMsg.email }}</Error>
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
          <Error v-if="errorMsg.password">{{ errorMsg.password }}</Error>
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
