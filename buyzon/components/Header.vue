<template>
  <div id="header">
    <div id="first">
      <div id="icon">Icon</div>
      <div id="searchBar" class="input-group mb-3">
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon1"
        >
          Button
        </button>
        <input
          type="text"
          class="form-control"
          placeholder=""
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
        />
      </div>
    </div>
    <div id="second">
      <div id="loginDiv"><button class="btn btn-primary">Login</button></div>
      <div id="cart">
        <button type="button" class="btn btn-success">Cart</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import url("bootstrap/dist/css/bootstrap.min.css");
  #header {
    background-color: #fff;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    justify-content: space-between;
    box-sizing: border-box;
  }
  #first,
  #second {
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: space-evenly;
  }
  #icon {
    margin-right: 36px;
    display: block;
  }
  #searchBar {
    width: 100%;
    min-width: 200px;
  }
  #button-addon1 {
    height: 40px;
    border-radius: 2px;
    cursor: pointer;
    padding: 8px 8px 8px 12px;
    background-color: skyblue;
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
