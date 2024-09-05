<template>
  <div
    class="ml-4 w-full border-2 border-gray-300 rounded-3xl h-[50vh] overflow-auto flex flex-col py-2 justify-start items-center"
    :style="selectedProductStyle"
  >
    <div class="flex-1 h-[20vh]">
      <img v-if="index == 0" src="@/assets/coffee-1.jpg" />
      <img v-else-if="index == 1" src="@/assets/coffee-2.jpg" />
      <img v-else src="@/assets/coffee-3.jpg" />
    </div>

    <div class="flex flex-col flex-2 h-[30vh]">
      <h1 class="text-xl text-black">{{ product.name }}</h1>
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
        <p>140000 개 상품평</p>
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
        <h1 class="text-red-600 font-semibold text-xl">
          {{ (product.price * (1 - product.discountForWow)).toFixed(2) }}
        </h1>
        <img class="w-[2rem]" src="@/assets/rocket_logo.png" />
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
  padding: mapStore.productSelectedId === props.product.id ? 2 : 4,
  borderLeft: `solid 1rem ${props.product.color}`,
}));

const fullStars = computed(() => Math.floor(props.product.rating));
const emptyStars = computed(() => 5 - fullStars.value);
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
</style>
