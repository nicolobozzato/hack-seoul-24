import type { Product } from "@/models/product";
import type { InventoryShortageSituation } from "~/models/inventory-shortage-situation";

export interface InventoryProductSituation {
  product: Product;
  shortageSituations: InventoryShortageSituation[];
}
