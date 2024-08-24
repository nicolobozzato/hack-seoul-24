<template>
  <NavBar />
  <NuxtLink
    class="absolute top-[9vh] left-[88vw] text-white bg-blue-500 p-2 rounded-lg"
    to="/console"
    >Console</NuxtLink
  >
  <main
    class="flex min-h-screen w-full flex-col items-center justify-between relative bg-white"
  >
    <slot />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped></style>
