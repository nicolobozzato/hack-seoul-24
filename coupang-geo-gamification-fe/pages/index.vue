<script setup lang="ts"></script>

<template>
  <section class="flex flex-row h-full">
    <NuxtLink
      href="/product"
      class="absolute left-[68vw] top-[13vh] lg:top-[21vh] lg:left-[58vw] text-blue-500 text-[.7rem]"
    >
      Look on the map
    </NuxtLink>

    <img
      class="hidden lg:block"
      src="../assets/coffee-product-screenshot.png"
    />
    <img class="lg:hidden" src="../assets/mobile-screenshot.png" />
  </section>
</template>

<style scoped></style>
