import seoulJson from "../assets/maps/seoul-dong.json";
import productsJson from "../assets/products.json";
import { ProductGeoLocation } from "@/models/product-geo-location";

export function generateFakeData() {
  const fakeData: ProductGeoLocation[] = [];
  console.log(productsJson);
  const dongList: string[] = seoulJson.features.map(
    (feature) => feature.properties["AdministrativeDongCode"],
  );
  const randomNumber = Math.floor(Math.random() * 7);
  dongList.forEach((dongCode) => {
    fakeData.push({
      dongCode: dongCode,
      mostPopularProducts: productsJson.slice(randomNumber, randomNumber + 3),
      trendingProducts: productsJson.slice(3, 6),
    });
  });
  return fakeData;
}
