<script setup lang="ts">
  import { useToast } from "vue-toastification";
  import { VSpinner } from "vue3-spinners";
  import * as yup from "yup";

  const regex_Password = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  const toast = useToast();
  const isLoading = ref(false);

  const { values, errors, defineField, meta } = useForm({
    validationSchema: yup.object({
      email: yup.string().email("must be a valid email").required(),
      password: yup
        .string()
        .matches(regex_Password, "Password is not Valid Format")
        .required(),
    }),
  });

  const [email] = defineField("email");
  const [password] = defineField("password");

  async function handleSignIn() {
    isLoading.value = true;
    const { signInUser } = useUtils();
    const success = await signInUser(values.email, values.password);
    if (success) {
      toast("Login Successful");
      const uid = useUserUId();
      sessionStorage.setItem("token", uid.value);
      navigateTo("/dashboard");
    } else {
      toast("User Credentials are Wrong");
      isLoading.value = false;
    }
  }
</script>
<template>
  <div v-if="!isLoading" id="main">
    <div class="signup-container">
      <div @click="$emit('close')" class="closeBtn">
        <span class="pi pi-times"></span>
      </div>
      <h2 class="text-center">SignIn</h2>
      <div id="form-div">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            v-model="email"
          />
          <Error v-show="errors.email">{{ errors.email }}</Error>
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
          <Error v-show="errors.password">{{ errors.password }}</Error>
        </div>
        <button
          @click="handleSignIn"
          class="btn btn-dark btn-block"
          :disabled="!meta.valid"
        >
          SignIn
        </button>
      </div>
    </div>
  </div>
  <div v-else id="loader">
    <VSpinner size="50" color="red" />
  </div>
</template>

<style scoped>
  #main {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  #closeBtn {
    cursor: pointer;
  }

  #loader {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #form-div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
