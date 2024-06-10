<script setup lang="ts">
  import { useToast } from "vue-toastification";
  import { VSpinner } from "vue3-spinners";
  import * as yup from "yup";

  const { addUserToDB, SignUpUser, createUser, imageToBase64 } = useUtils();
  const toast = useToast();
  const isLoading = ref(false);
  const regex_Password = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  const regex_number = /^\d{10}$/;
  const emit = defineEmits(["close", "success"]);

  const { values, errors, defineField, meta } = useForm({
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, "Name cannot be less than 3 characters")
        .required(),
      email: yup.string().email("must be a valid email").required(),
      mobileNumber: yup
        .string()
        .matches(regex_number, "Mobile Number is not Valid Format")
        .required(),
      address: yup
        .string()
        .min(6, "address cannot be less than 6 characters")
        .required(),
      password: yup
        .string()
        .matches(regex_Password, "Password is not Valid Format")
        .required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required(),
    }),
  });
  const [name] = defineField("name");
  const [email] = defineField("email");
  const [mobileNumber] = defineField("mobileNumber");
  const [address] = defineField("address");
  const [password] = defineField("password");
  const [confirmPassword] = defineField("confirmPassword");
  const [image] = defineField("image");
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  const showPassMsg = computed(() =>
    showPassword.value ? "text" : "password"
  );
  const showConfPassMsg = computed(() =>
    showConfirmPassword.value ? "text" : "password"
  );

  async function signupUser() {
    isLoading.value = true;
    const isSet = await createUser(values.email, values.password);
    const isAdded = await addUserToDB(
      new SignUpUser(
        values.name,
        values.email,
        values.mobileNumber,
        values.address,
        values.image
      )
    );
    if (isSet && isAdded) {
      toast("Account Created Successfully");
      emit("success");
    } else {
      toast("Something went wrong");
      isLoading.value = false;
    }
  }
</script>
<template>
  <div id="main">
    <div v-if="!isLoading" class="signup-container">
      <div @click="$emit('close')" class="closeBtn">
        <span class="pi pi-times"></span>
      </div>
      <h2 class="text-center">Welcome</h2>
      <div id="form-div">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="name"
            class="form-control"
            id="name"
            placeholder="Enter Name"
            v-model="name"
          />
          <Error v-show="errors.name">{{ errors.name }}</Error>
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
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
          <label for="number">Mobile Number</label>
          <input
            type="tel"
            class="form-control"
            id="number"
            maxlength="10"
            pattern="[0-9]{10}"
            placeholder="123-456-7890"
            v-model="mobileNumber"
          />
          <Error v-show="errors.mobileNumber">{{ errors.mobileNumber }}</Error>
        </div>
        <div class="form-group">
          <label for="address">Your Address</label>
          <input
            type="email"
            class="form-control"
            id="address"
            placeholder="Enter your address"
            v-model="address"
          />
          <Error v-show="errors.address">{{ errors.address }}</Error>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div id="passDiv">
            <input
              :type="showPassMsg"
              class="form-control"
              id="password"
              placeholder="minimum 6 char & 1 special symbol"
              v-model="password"
            />
            <i
              :class="{
                'pi pi-eye-slash show-icon': showPassword,
                'pi pi-eye show-icon': !showPassword,
              }"
              @click="showPassword = !showPassword"
            ></i>
          </div>
          <Error v-show="errors.password">{{ errors.password }}</Error>
        </div>
        <div class="form-group">
          <label for="Confirm-password">Confirm Password</label>
          <div id="passDiv">
            <input
              :type="showConfPassMsg"
              class="form-control"
              id="Confirm-password"
              placeholder="minimum 6 char & 1 special symbol"
              v-model="confirmPassword"
            />
            <i
              :class="{
                'pi pi-eye-slash show-icon': showConfirmPassword,
                'pi pi-eye show-icon': !showConfirmPassword,
              }"
              @click="showConfirmPassword = !showConfirmPassword"
            ></i>
          </div>
          <Error v-show="errors.confirmPassword">{{
            errors.confirmPassword
          }}</Error>
        </div>
        <div class="form-group">
          <label for="Confirm-password">Upload Image</label>
          <input
            type="file"
            class="form-control"
            id="image-upload"
            @change="
              async (e) => {
                const target = e.target as HTMLInputElement;
                if (target.files) {
                  image = await imageToBase64(target.files[0]);
                }
              }
            "
          />
        </div>
      </div>
      <div id="signupBtn">
        <button
          @click="signupUser"
          class="btn btn-dark btn-block"
          :disabled="!meta.valid"
        >
          Signup
        </button>
      </div>
    </div>
    <div v-else><VSpinner size="50" color="red" /></div>
  </div>
</template>

<style scoped>
  .show-icon {
    position: relative;
    top: 13px;
    left: -20px;
  }
  #passDiv {
    display: flex;
  }
  #signupBtn {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #closeBtn {
    cursor: pointer;
  }

  #form-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    max-height: 500px;
    overflow-y: scroll;
  }
  button {
    width: 150px;
  }
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
  .signup-container {
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fff;
    max-height: 585px;
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
