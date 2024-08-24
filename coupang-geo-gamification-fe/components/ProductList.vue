<template>
  <div class="flex flex-col">
    <ProductCard
      v-for="(product, index) in products"
      :key="product.id"
      :product="product"
      :index="index"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import type { Product } from "@/models/product";
import { generateFakeData } from "@/utilities/generate-fake-data";

const products = ref<Product[]>([]);

onMounted(() => {
  const dongData = generateFakeData();
  products.value = dongData[0].mostPopularProducts;
});
</script>

<style scoped></style>
