<template>
  <div id="main">
    <div class="filter-container">
      <div class="filter-header">Filter By</div>
      <div class="filter-content">
        <div class="filter-section">
          <h4>Price</h4>
          <label>
            <input type="radio" name="price" value="low-to-high" />
            Low to High
          </label>
          <label>
            <input type="radio" name="price" value="high-to-low" />
            High to Low
          </label>
        </div>
        <div class="filter-section">
          <h4>Category</h4>
          <label>
            <input type="radio" name="category" value="electronics" />
            Electronics
          </label>
          <label>
            <input type="radio" name="category" value="fashion" />
            Fashion
          </label>
          <label>
            <input type="radio" name="category" value="home-appliances" />
            Home Appliances
          </label>
        </div>
        <button class="filter-button">Apply Filter</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #main {
    z-index: 999;
  }
  .filter-container {
    width: 200px;
    height: 400px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .filter-header {
    background: #3498db;
    color: #fff;
    text-align: center;
    padding: 10px;
    font-size: 18px;
  }
  .filter-content {
    padding: 20px;
  }
  .filter-section {
    margin-bottom: 20px;
  }
  .filter-section h4 {
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  .filter-section label {
    display: block;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 14px;
    color: #555;
  }
  .filter-section input[type="radio"] {
    margin-right: 10px;
  }
  .filter-button {
    width: 100%;
    padding: 10px;
    background: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  .filter-button:hover {
    background: #2980b9;
  }
</style>
