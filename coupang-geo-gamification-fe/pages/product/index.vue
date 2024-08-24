<template>
  <section class="flex flex-col p-4 w-full">
    <h1 class="text-4xl font-bold py-4">What your neighbours are buying</h1>
    <div class="flex flex-row h-full">
      <ProductsList :products="dataTopThreeProducts" />
      <SeoulMap :dongList="dataDongs" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ProductsList from "@/components/ProductList.vue";
import SeoulMap from "@/components/SeoulMap.vue";
import dongData from "@/assets/data/seoulDongNow.json";
import type { ProductGeoLocation } from "@/models/product-geo-location";
import { generateFakeData } from "~/utilities/generate-fake-data";
import type { Product } from "~/models/product";

const dataDongs = ref<ProductGeoLocation[]>([]);
const dataTopThreeProducts = ref<Product[]>([]);

onMounted(() => {
  dataDongs.value = generateFakeData();
  if (dataDongs.value.length > 0) {
    dataTopThreeProducts.value = dataDongs.value[0].mostPopularProducts;
  }
});
</script>

<style scoped></style>
