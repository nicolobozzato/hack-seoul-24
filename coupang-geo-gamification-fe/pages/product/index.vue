<template>
  <section class="flex flex-col p-4 w-full">
    <h1 class="text-4xl font-bold py-4">What your neighbours are buying</h1>
    <div class="flex flex-row h-full">
      <ProductsList :dongList="dongData" />
      <SeoulMap :dongList="dongData" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ProductsList from "@/components/ProductList.vue";
import SeoulMap from "@/components/SeoulMap.vue";
import dongData from "@/assets/data/seoulDongNow.json";

onMounted(() => {
  console.log(dongData);
});
</script>

<style scoped></style>
