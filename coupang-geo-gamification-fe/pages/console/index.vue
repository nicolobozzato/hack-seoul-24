<template>
  <section class="flex flex-col p-4 w-full">
    <h1 class="text-4xl font-bold py-4">Shortages situation</h1>
    <div class="flex lg:flex-row flex-col h-full">
      <ConsoleTables class="w-1/3" />
      <InventoryMap />
    </div>
  </section>
</template>

<script setup lang="ts">
import ConsoleTables from "~/components/ConsoleTables.vue";
import InventoryMap from "~/components/InventoryMap.vue";
</script>

<style scoped></style>
