<template>
  <section class="flex flex-col w-full h-full">
    <div
      v-if="!isLoading"
      class="flex lg:flex-col justify-between flex-col p-4"
    >
      <div class="grid grid-cols-4 gap-1 w-full">
        <ProductCard class="pr-4" :product="dataTopThreeProducts[0]" />
        <SeoulMap class="col-start-2 col-span-3" :dongList="dataDongs" />
      </div>
      <ProductsList :products="otherProducts" />
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
const otherProducts = ref<Product[]>([]);
const isLoading = ref<boolean>(true);
const loadingProgress = ref<number>(40);

onMounted(() => {
  loadingProgress.value = 40;
  isLoading.value = true;
  dataDongs.value = generateFakeData();
  loadingProgress.value = 80;
  if (dataDongs.value.length > 0) {
    dataTopThreeProducts.value = dataDongs.value[0].mostPopularProducts;
    otherProducts.value = dataTopThreeProducts.value.slice(1);
  }
  loadingProgress.value = 95;
  isLoading.value = false;
});
</script>

<style scoped></style>
