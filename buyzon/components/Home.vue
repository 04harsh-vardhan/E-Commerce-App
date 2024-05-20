<style scoped>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  header,
  footer {
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
  }
  nav {
    display: flex;
    justify-content: space-around;
    padding: 10px;
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
  img {
    width: 100px;
    height: 100px;
  }
  .logo {
    border-radius: 50%;
  }
  #intro {
    display: flex;
    justify-content: center;
  }
</style>
<template>
  <header>
    <div id="intro">
      <h1>Welcome To BuyZone</h1>
      <img class="logo" src="../assets/Buyzon-logo.jpg" />
    </div>
    <nav>
      <NuxtLink class="btn btn-warning" to="/signin">Signin</NuxtLink>
      <div></div>
      <div></div>
      <NuxtLink class="btn btn-success" to="/signup">Signup</NuxtLink>
    </nav>
  </header>

  <section class="hero">
    <h1>Welcome to Our Store</h1>
    <p>Your one-stop shop for all things amazing</p>
    <NuxtLink class="cta" to="/signin">Shop now</NuxtLink>
  </section>

  <section class="products">
    <h2>Featured Products</h2>
    <div class="product"><img src="../assets/products/watches2.jpg" /></div>
    <div class="product"><img src="../assets/products/shoes2.jpg" /></div>
    <div class="product"><img src="../assets/products/fans1.jpg" /></div>
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

  <footer>
    <div>© 2024 My E-Commerce Store</div>
    <div class="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Contact</a>
    </div>
  </footer>
</template>
