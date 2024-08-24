import { Product } from "@/models/product";

export interface ProductGeoLocation {
  dongCode: string;
  mostPopularProducts: Product[3];
  trendingProducts: Product[3];
}
