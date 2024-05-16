<script setup lang="ts">
  enum ImageURL {
    menclothing = "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    jewelery = "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    electronics = "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    womenClothing = "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  }
  const productData = useProductData();
  const category = new Set<string>();
  productData.value.forEach((product) => {
    category.add(product.category);
  });
  function getUrl(category: string) {
    switch (category) {
      case "men's clothing":
        return ImageURL.menclothing;
      case "jewelery":
        return ImageURL.jewelery;
      case "electronics":
        return ImageURL.electronics;
      case "women's clothing":
        return ImageURL.womenClothing;
    }
  }
</script>
<template>
  <div id="category">
    <div v-for="item in category" :key="item" id="item">
      <div id="item-detail">
        <div id="item-img"><img :src="getUrl(item)" alt="" /></div>
        <div id="item-name">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #category {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    color: #111112;
    min-height: 126px;
    background-color: aliceblue;
  }
  #item {
    min-width: 90px;
    padding: 16px;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    box-sizing: content-box;
    padding-left: 24px;
  }
  #item-detail {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 10px;
  }
  img {
    width: 60px;
    height: 60px;
  }
</style>
