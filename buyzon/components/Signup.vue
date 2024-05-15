<template>
  <div id="main">
    <div class="signup-container">
      <h2 class="text-center">Signup</h2>
      <form>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Sign Up</button>
      </form>
    </div>
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
  }
  .signup-container h2 {
    margin-bottom: 20px;
  }
  .form-control {
    background-color: #e9ecef; /* Light gray background for input fields */
    border: 1px solid #ced4da; /* Border color */
  }
  .form-control:focus {
    background-color: #fff; /* White background when focused */
    border-color: #80bdff; /* Blue border when focused */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Blue shadow when focused */
  }
</style>
