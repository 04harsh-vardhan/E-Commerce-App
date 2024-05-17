<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
  import "vue3-spinners/spinners.css";
  import { db } from "./assets/firebase";
  import { collection, getDocs } from "firebase/firestore";
  const productData = useProductData();
  await callOnce(async () => {
    const response: any = await getDocs(collection(db, "products"));
    response.forEach((doc: any) => {
      productData.value = doc.data().data;
    });
  });
</script>
