import { IProductGeoLocationRepository } from "@/interfaces/IProductGeoLocationRepository";
import type { InventoryProductSituation } from "@/models/inventory-product-situation";
import type { ProductGeoLocation } from "@/models/product-geo-location";
import { pool } from "~/services/db-utilities";
import type { Product } from "~/models/product";
import type { Dong } from "~/models/dong";
import type { InventoryShortageSituation } from "~/models/inventory-shortage-situation";

export class DatabaseProductGeoLocationRepository
  implements IProductGeoLocationRepository
{
  private static instance: DatabaseProductGeoLocationRepository;
  public static get Instance(): DatabaseProductGeoLocationRepository {
    if (!DatabaseProductGeoLocationRepository.instance) {
      DatabaseProductGeoLocationRepository.instance =
        new DatabaseProductGeoLocationRepository();
    }
    return DatabaseProductGeoLocationRepository.instance;
  }

  async getInventoryShortageSituation(): Promise<InventoryProductSituation[]> {
    try {
      const products = await pool.query<Product>(
        "SELECT * FROM products LIMIT 10",
      );
      const dong = await pool.query<Dong>("SELECT * FROM dong");
      let result: InventoryProductSituation[] = [];
      products.rows.forEach((product) => {
        let shortageSituation: InventoryProductSituation = {
          product: product,
          shortageSituations: [],
        };

        for (let i = 0; i < 20; i++) {
          const random = Math.floor(Math.random() * 10000);
          const randomIndex = Math.floor(Math.random() * dong.rows.length);
          const dongRandom = dong.rows[randomIndex];
          const shortage: InventoryShortageSituation = {
            dong: dongRandom,
            shortageCount: -random,
          };

          shortageSituation.shortageSituations.push(shortage);
        }
        result.push(shortageSituation);
      });
      return result;
    } catch (error) {
      console.error("Error fetching table data:", error);
      return [];
    }
  }

  async getNeighbourhoodProducts(
    productId: number,
    dongCode: string,
  ): Promise<ProductGeoLocation[]> {
    return Promise.resolve([]);
  }

  async getDongByCode(dongCode: string): Promise<Dong> {
    const dong = await pool.query<Dong>(
      `SELECT * FROM dong WHERE dongCode = ${dongCode}`,
    );
    return dong.rows[0];
  }
}
