import { Product } from "@/models/product";

export interface InventoryProductSituation {
  product: Product;
  shortageSituation: InventoryProductSituation[];
}
