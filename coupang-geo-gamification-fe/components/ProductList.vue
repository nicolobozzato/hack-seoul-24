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
import ProductCard from "@/components/ProductCard.vue";
import type { Product } from "@/models/product";

const props = defineProps<{
  products: Product[];
}>();
</script>

<style scoped></style>
