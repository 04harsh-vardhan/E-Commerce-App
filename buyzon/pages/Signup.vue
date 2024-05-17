<script setup lang="ts">
  const { addUserToDB, SignUpUser, createUser } = useUtils();
  const userData = reactive(new SignUpUser());
  const isLoading = ref(false);
  const regex_Email = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const regex_Password = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  const regex_number = /^\d{10}$/;

  const errorMsg = {
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    address: "",
  };

  watch(userData, () => {
    errorMsg.name =
      userData.name.length < 3 ? "Name cannot be less than 3 characters" : "";

    errorMsg.email = !regex_Email.test(userData.email)
      ? "Email is not Valid Format"
      : "";

    errorMsg.password = !regex_Password.test(userData.password)
      ? "Password is not Valid Format"
      : "";

    errorMsg.mobile_number = !regex_number.test(userData.mobile_number)
      ? "Mobile Number is not Valid Format"
      : "";
    errorMsg.address =
      userData.address.length < 6
        ? "address cannot be less than 6 characters"
        : "";
  });

  async function signupUser() {
    if (
      !errorMsg.name &&
      !errorMsg.email &&
      !errorMsg.password &&
      !errorMsg.mobile_number
    ) {
      return;
    }
    isLoading.value = true;
    const isSet = await createUser(userData.email, userData.password);
    const isAdded = await addUserToDB(userData);
    if (isSet && isAdded) {
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
          <Error v-if="errorMsg.name">{{ errorMsg.name }}</Error>
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
          <Error v-if="errorMsg.email">{{ errorMsg.email }}</Error>
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
          <Error v-if="errorMsg.mobile_number">{{
            errorMsg.mobile_number
          }}</Error>
        </div>
        <div class="form-group">
          <label for="address">Your address</label>
          <input
            type="email"
            class="form-control"
            id="address"
            placeholder="Enter your address"
            v-model="userData.address"
          />
          <Error v-if="errorMsg.address">{{ errorMsg.address }}</Error>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="minimum 6 char long and 1 special symbol"
            v-model="userData.password"
          />
          <Error v-if="errorMsg.password">{{ errorMsg.password }}</Error>
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
