import seoulJson from "../assets/maps/seoul-dong.json";
import productsJson from "../assets/data/products.json";
import type { ProductGeoLocation } from "@/models/product-geo-location";
import { colorsList } from "@/utilities/productColors";

export function generateFakeData() {
  const fakeData: ProductGeoLocation[] = [];
  const products = productsJson.map((product, index) => {
    product.color = colorsList[index];
    return product;
  });
  const dongList: string[] = seoulJson.features.map(
    (feature) => feature.properties["AdministrativeDongCode"],
  );
  const randomNumber = Math.floor(Math.random() * 7);
  dongList.forEach((dongCode) => {
    fakeData.push({
      dongCode: dongCode,
      mostPopularProducts: products.slice(randomNumber, randomNumber + 3),
      trendingProducts: products.slice(3, 6),
    });
  });
  return fakeData;
}
