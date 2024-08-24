import type { Product } from "@/models/product";

export interface ProductGeoLocation {
  dongCode: string;
  mostPopularProducts: Product[];
  trendingProducts: Product[];
}
