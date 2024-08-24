import { defineStore } from "pinia";
import type { InventoryProductSituation } from "~/models/inventory-product-situation";
import type { InventoryShortageSituation } from "~/models/inventory-shortage-situation";

export const useMapStore = defineStore("map", () => {
  const productSelectedId = ref<string | undefined>(undefined);
  const inventoryProductSelected = ref<InventoryProductSituation | undefined>(
    undefined,
  );
  const inventoryShortageSituationSelected = ref<
    InventoryShortageSituation | undefined
  >(undefined);

  function showShortageSelected(dongCode: string) {
    if (inventoryProductSelected.value) {
      inventoryShortageSituationSelected.value =
        inventoryProductSelected.value.shortageSituations.find(
          (s) => s.dongCode === dongCode,
        );
    }
  }

  return {
    productSelectedId,
    inventoryProductSelected,
    inventoryShortageSituationSelected,
    showShortageSelected,
  };
});
