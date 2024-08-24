<template>
  <section class="flex flex-col p-4 w-full">
    <h1 class="text-4xl font-bold py-4">Shortages situation</h1>
    <div class="flex flex-row h-full">
      <ConsoleTables class="w-1/3" />
      <InventoryMap :dongList="dongData" />
    </div>
  </section>
</template>

<script setup lang="ts">
import dongData from "assets/data/seoulDongNow.json";
import ConsoleTables from "~/components/ConsoleTables.vue";
import InventoryMap from "~/components/InventoryMap.vue";
</script>

<style scoped></style>
