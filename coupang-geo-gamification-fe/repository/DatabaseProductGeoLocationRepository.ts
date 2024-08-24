import { IProductGeoLocationRepository } from "@/interfaces/IProductGeoLocationRepository";
import type { InventoryProductSituation } from "@/models/inventory-product-situation";
import type { ProductGeoLocation } from "@/models/product-geo-location";
import { pool } from "~/services/db";
import type { Product } from "~/models/product";
import type { Dong } from "~/models/dong";
import type { InventoryShortageSituation } from "~/models/inventory-shortage-situation";

class DatabaseProductGeoLocationRepository
  implements IProductGeoLocationRepository
{
  private static instance: DatabaseProductGeoLocationRepository;

  get instance(): DatabaseProductGeoLocationRepository {
    if (!DatabaseProductGeoLocationRepository.instance) {
      DatabaseProductGeoLocationRepository.instance =
        new DatabaseProductGeoLocationRepository();
    }
    return DatabaseProductGeoLocationRepository.instance;
  }

  async getInventoryShortageSituation(): Promise<InventoryProductSituation[]> {
    const products = await pool.query<Product>(
      "SELECT * FROM products LIMIT 10",
    );
    const dong = await pool.query<Dong>("SELECT * FROM dongs LIMIT 10");
    let result: InventoryProductSituation[] = [];
    products.rows.forEach((product) => {
      let shortageSituation: InventoryProductSituation = {
        product: product,
        shortageSituations: [],
      };
      dong.rows.forEach((dong) => {
        const random = Math.floor(Math.random() * 10000);
        const shortage: InventoryShortageSituation = {
          dongCode: dong.dongCode,
          shortageCount: -random,
        };
        shortageSituation.shortageSituations.push(shortage);
      });
    });
    return result;
  }

  async getNeighbourhoodProducts(
    productId: number,
    dongCode: string,
  ): Promise<ProductGeoLocation[]> {
    return Promise.resolve([]);
  }
}
