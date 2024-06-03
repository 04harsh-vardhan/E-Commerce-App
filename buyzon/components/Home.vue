<template>
  <div id="main">
    <div id="header">
      <div id="intro">
        <div id="welcome">
          <h1>Welcome To BuyZone</h1>
          <img class="logo" src="../assets/Buyzon-logo.jpg" />
        </div>
        <nav>
          <div v-if="!authenticated" class="sign-in-up-btns">
            <button class="btn btn-warning" @click="toggleSignIn = true">
              <span v-if="!toggleIcon">Log in</span>
              <span v-if="toggleIcon" class="pi pi-sign-in"></span>
            </button>
            <button class="btn btn-success" @click="toggleSignUp = true">
              <span v-if="!toggleIcon">Sign Up</span>
              <span v-if="toggleIcon" class="pi pi-sign-out"></span>
            </button>
          </div>
          <div v-else>
            <button @click="navigateTo('/dashboard')" class="btn btn-info">
              Dashboard
            </button>
          </div>
        </nav>
      </div>
    </div>
    <div id="content">
      <div class="hero">
        <h1 class="anime">Welcome to Our Store</h1>
        <p class="anime">Your one-stop shop for all things amazing</p>
        <button class="cta" @click="toggleSignIn = true">Shop now</button>
      </div>

      <section class="products">
        <h2>Featured Products</h2>
        <div class="product">
          <img class="demo" src="../assets/products/watches2.jpg" />
        </div>
        <div class="product">
          <img class="demo" src="../assets/products/shoes2.jpg" />
        </div>
        <div class="product">
          <img class="demo" src="../assets/products/fans1.jpg" />
        </div>
      </section>

      <section class="testimonials">
        <h2>Customer Testimonials</h2>
        <div class="testimonial">"Great products!" - Jane</div>
        <div class="testimonial">"Excellent service!" - John</div>
        <div class="testimonial">"Fast shipping!" - Sarah</div>
      </section>

      <section class="offers">
        <h2>Special Offers</h2>
        <div class="offer">20% off on all items</div>
        <div class="offer">Buy one, get one free</div>
      </section>
    </div>
    <footer>
      <div>© 2024 My E-Commerce Store</div>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  </div>
  <Transition>
    <Signin v-if="toggleSignIn" @close="toggleSignIn = false" />
  </Transition>
  <Transition>
    <Signup
      v-if="toggleSignUp"
      @close="toggleSignUp = false"
      @success="handleSignupSuccess"
    />
  </Transition>
</template>
<script setup lang="ts">
  const toggleSignIn = ref(false);
  const toggleSignUp = ref(false);
  const authenticated = useAuth();

  const toggleIcon = ref(checkWindowWidth());
  window.addEventListener("resize", () => {
    toggleIcon.value = checkWindowWidth();
  });

  function checkWindowWidth() {
    return window.outerWidth < 480 ? true : false;
  }

  function handleSignupSuccess() {
    toggleSignUp.value = false;
    toggleSignIn.value = true;
  }
</script>
<style scoped>
  .sign-in-up-btns {
    display: flex;
    gap: 10px;
  }
  @keyframes changeColor {
    0% {
      color: red;
    }
    25% {
      color: blue;
    }
    50% {
      color: green;
    }
    75% {
      color: black;
    }
    100% {
      color: orange;
    }
  }

  .anime {
    animation: changeColor 2s infinite;
  }

  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #header,
  footer {
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
  }
  #header {
    height: 20%;
  }
  footer {
    height: 10%;
  }
  nav {
    display: flex;
    justify-content: end;
    padding: 10px;
    max-height: 60px;
    width: 20vw;
    gap: 10px;
  }
  .hero {
    background: linear-gradient(to bottom, #e0b3ff, #4b0082);
    color: white;
    text-align: center;
    padding: 100px 20px;
  }
  .hero h1 {
    margin: 0;
    font-size: 3em;
  }
  .hero p {
    font-size: 1.2em;
  }
  .hero .cta {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ffcc00;
    color: #333;
    text-decoration: none;
    font-weight: bold;
  }
  .cta {
    margin-right: 40px;
  }
  .products,
  .testimonials,
  .offers {
    padding: 20px;
    text-align: center;
  }
  .products h2,
  .testimonials h2,
  .offers h2 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  .products .product,
  .testimonials .testimonial,
  .offers .offer {
    display: inline-block;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
  }
  footer .footer-links a {
    color: white;
    margin: 0 10px;
  }
  .demo {
    width: 100px;
    height: 100px;
  }
  .logo {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
  #intro {
    display: flex;
    justify-content: center;
  }
  #main {
    width: 100%;
    height: 100vh;
    padding-left: 10px;
    padding-right: 10px;
  }
  #content {
    height: 70%;
    overflow-y: scroll;
  }
  #content::-webkit-scrollbar {
    display: none;
  }
  #welcome {
    display: flex;
    width: 80vw;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .hero {
    width: 100%;
    background-image: url("../assets/welcome_page.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  @media (max-width: 1078px) {
    button {
      font-size: 12px;
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 20px;
    }
    .logo {
      width: 50px;
      height: 50px;
    }
    .hero h1 {
      font-size: 15px;
    }
  }
  @media (max-width: 480px) {
    nav {
      flex-direction: column;
      gap: 1px;
    }
    .products .product,
    .testimonials .testimonial,
    .offers .offer {
      width: 100%;
    }
  }
</style>
