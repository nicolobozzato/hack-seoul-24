import {Product} from "@/models/product";

export interface ProductGeoLocation {
    dongId: string;
    mostPopularProductId: Product;
    trendingProductId: Product;
}
