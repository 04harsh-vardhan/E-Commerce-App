<script setup lang="ts">
  import { useToast } from "vue-toastification";
  import { VSpinner } from "vue3-spinners";
  const { addUserToDB, SignUpUser, createUser } = useUtils();
  const toast = useToast();
  const userData = reactive(new SignUpUser());
  const isLoading = ref(false);
  const stopSubmit = ref(true);
  const regex_Email = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const regex_Password = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  const regex_number = /^\d{10}$/;

  type ErrorMsg<T> = {
    name: T;
    email: T;
    mobile_number: T;
    password: T;
    address: T;
    confirmPassword: T;
  };

  const errorMsg = reactive<ErrorMsg<string>>({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    address: "",
    confirmPassword: "",
  });
  watch(errorMsg, () => {
    if (
      errorMsg.name === "" &&
      errorMsg.email === "" &&
      errorMsg.mobile_number === "" &&
      errorMsg.password === "" &&
      errorMsg.address === "" &&
      errorMsg.confirmPassword === ""
    ) {
      stopSubmit.value = false;
    } else {
      stopSubmit.value = true;
    }
  });

  watch(
    () => userData.name,
    () => {
      errorMsg.name =
        userData.name.length < 3 ? "Name cannot be less than 3 characters" : "";
    }
  );
  watch(
    () => userData.email,
    () => {
      errorMsg.email = !regex_Email.test(userData.email)
        ? "Email is not Valid Format"
        : "";
    }
  );
  watch(
    () => userData.mobile_number,
    () => {
      errorMsg.mobile_number = !regex_number.test(userData.mobile_number)
        ? "Mobile Number is not Valid Format"
        : "";
    }
  );
  watch(
    () => userData.password,
    () => {
      errorMsg.password = !regex_Password.test(userData.password)
        ? "Password is not Valid Format"
        : "";
    }
  );
  watch(
    () => userData.confirmPassword,
    () => {
      errorMsg.confirmPassword =
        userData.password !== userData.confirmPassword
          ? "Password and Confirm Password doesn't match"
          : "";
    }
  );
  watch(
    () => userData.address,
    () => {
      errorMsg.address =
        userData.address.length < 6
          ? "address cannot be less than 6 characters"
          : "";
    }
  );

  async function signupUser() {
    isLoading.value = true;
    const isSet = await createUser(userData.email, userData.password);
    const isAdded = await addUserToDB(userData);
    if (isSet && isAdded) {
      toast("Account Created Successfully");
      navigateTo("/signin");
    } else {
      toast("Something went wrong");
      isLoading.value = false;
    }
  }
</script>
<template>
  <div id="main">
    <div v-if="!isLoading" class="signup-container">
      <h2 class="text-center">Welcome</h2>
      <div id="form-div">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="name"
            class="form-control"
            id="name"
            placeholder="Enter Name"
            v-model="userData.name"
          />
          <Error v-show="errorMsg.name">{{ errorMsg.name }}</Error>
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
          <Error v-show="errorMsg.email">{{ errorMsg.email }}</Error>
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
          <Error v-show="errorMsg.mobile_number">{{
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
          <Error v-show="errorMsg.address">{{ errorMsg.address }}</Error>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="minimum 6 char & 1 special symbol"
            v-model="userData.password"
          />
          <Error v-show="errorMsg.password">{{ errorMsg.password }}</Error>
        </div>
        <div class="form-group">
          <label for="Confirm-password">Confirm Password</label>
          <input
            type="Confirm-password"
            class="form-control"
            id="Confirm-password"
            placeholder="minimum 6 char & 1 special symbol"
            v-model="userData.confirmPassword"
          />
          <Error v-show="errorMsg.confirmPassword">{{
            errorMsg.confirmPassword
          }}</Error>
        </div>
        <button
          @click="signupUser"
          class="btn btn-dark btn-block"
          :disabled="stopSubmit"
        >
          Signup
        </button>
      </div>
    </div>
    <div v-else><VSpinner size="20" color="red" /></div>
  </div>
</template>

<style scoped>
  #form-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }
  button {
    width: 150px;
  }
  #main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("../assets/Sign-upBgimg.jpg");
  }
  .signup-container {
    background-color: lightgray;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 580px;
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
  input {
    width: 300px;
    height: 45px;
  }
</style>
