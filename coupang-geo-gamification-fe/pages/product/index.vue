<template>
  <section class="flex flex-col p-4 w-full">
    <h1 class="text-4xl font-bold py-4">What your neighbours are buying</h1>
    <div v-if="!isLoading" class="flex lg:flex-row flex-col h-full">
      <ProductsList :products="dataTopThreeProducts" />
      <SeoulMap :dongList="dataDongs" />
    </div>
    <div v-else class="flex flex-row justify-center items-center">
      <el-progress
        type="circle"
        :percentage="loadingProgress"
        status="success"
      />
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
const isLoading = ref<boolean>(true);
const loadingProgress = ref<number>(40);

onMounted(() => {
  loadingProgress.value = 40;
  isLoading.value = true;
  dataDongs.value = generateFakeData();
  loadingProgress.value = 80;
  if (dataDongs.value.length > 0) {
    dataTopThreeProducts.value = dataDongs.value[0].mostPopularProducts;
  }
  loadingProgress.value = 95;
  isLoading.value = false;
});
</script>

<style scoped></style>
