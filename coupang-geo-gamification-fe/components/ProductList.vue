<template>
  <div class="grid grid-cols-4 mt-4">
    <div class="pr-2" :key="product.id" v-for="(product, index) in products">
      <ProductCard :product="product" :index="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import type { Product } from "@/models/product";

const props = defineProps<{
  products: Product[];
}>();
</script>

<style scoped></style>
