import { defineStore } from "pinia";

export const useMapStore = defineStore("map", () => {
  const productSelectedId = ref<string | undefined>(undefined);

  return {
    productSelectedId,
  };
});
