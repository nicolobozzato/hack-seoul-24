import { defineStore } from "pinia";
import type { InventoryProductSituation } from "~/models/inventory-product-situation";

export const useMapStore = defineStore("map", () => {
  const productSelectedId = ref<string | undefined>(undefined);
  const inventoryProductSelected = ref<InventoryProductSituation | undefined>(
    undefined,
  );

  return {
    productSelectedId,
    inventoryProductSelected,
  };
});
