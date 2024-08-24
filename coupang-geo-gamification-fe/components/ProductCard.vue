<template>
  <div class="ml-4 my-1 w-full" :style="selectedProductStyle">
    <div
      class="flex flex-row py-2 justify-start items-center"
      :style="{ scale: index > 0 ? 0.5 : 0.7 }"
    >
      <img src="@/assets/coffe-image.jpg" alt="Coffee Image" class="h-[30vh]" />
      <div class="flex flex-col">
        <h1 class="text-2xl text-black">{{ product.name }}</h1>
        <h2>{{ product.description }}</h2>
        <div class="flex flex-row gap-3">
          <p>{{ product.rating }}</p>
          <div class="flex flex-row gap-2">
            <font-awesome
              v-for="(_, index) in fullStars"
              :key="'full-' + index"
              :icon="faStar"
              :style="{ color: 'yellow' }"
            />
            <font-awesome
              v-for="(_, index) in emptyStars"
              :key="'empty-' + index"
              :icon="faStar"
              :style="{ color: 'gray' }"
            />
          </div>
          <p>{{ Math.floor(Math.random() * 140000) }}개 상품평</p>
        </div>
        <hr />
        <p class="flex flex-row items-center gap-3">
          {{ product.discountForWow * 100 }}%
          <span class="line-through">
            {{ (product.price * 1.1).toFixed(2) }}
          </span>
        </p>
        <h1>{{ product.price.toFixed(2) }}</h1>
        <div class="flex flex-row items-center">
          <h1 class="text-red-600 font-semibold text-2xl">
            {{ (product.price * (1 - product.discountForWow)).toFixed(2) }}
          </h1>
          <Image class="p-5" src="{rocketLogo}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import type { Product } from "@/models/product";

const mapStore = useMapStore();

const props = defineProps<{
  product: Product;
  index: number;
}>();

const selectedProductStyle = computed(() => ({
  scale: selected ? 1.2 : 1,
  borderLeft: `solid 1rem ${props.product.color}`,
}));

const selected = computed(
  () => mapStore.productSelectedId === props.product.id,
);

const fullStars = computed(() => Math.floor(props.product.rating));
const emptyStars = computed(() => 5 - fullStars.value);
</script>

<style scoped></style>
