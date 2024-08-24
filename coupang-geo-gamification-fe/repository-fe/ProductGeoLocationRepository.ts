import type { InventoryProductSituation } from "~/models/inventory-product-situation";

export class ProductGeoLocationRepository {
  private static instance: ProductGeoLocationRepository;
  public static get Instance(): ProductGeoLocationRepository {
    if (!ProductGeoLocationRepository.instance) {
      ProductGeoLocationRepository.instance =
        new ProductGeoLocationRepository();
    }
    return ProductGeoLocationRepository.instance;
  }
  async getInventoryShortageSituation(): Promise<InventoryProductSituation[]> {
    try {
      const response = await fetch("/api/product-geo-location");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: InventoryProductSituation[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching table data:", error);
      return [];
    }
  }
}
