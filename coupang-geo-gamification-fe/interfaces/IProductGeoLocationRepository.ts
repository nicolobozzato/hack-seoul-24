import type { InventoryProductSituation } from "~/models/inventory-product-situation";
import type { ProductGeoLocation } from "~/models/product-geo-location";

export abstract class IProductGeoLocationRepository {
  async getInventoryShortageSituation(): Promise<InventoryProductSituation[]> {
    throw new Error("Method not implemented.");
  }

  async getNeighbourhoodProducts(
    productId: number,
    dongCode: string,
  ): Promise<ProductGeoLocation[]> {
    throw new Error("Method not implemented.");
  }
}
