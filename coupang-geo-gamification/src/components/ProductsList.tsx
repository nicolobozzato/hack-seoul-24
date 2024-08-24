import React from "react";
import { ProductGeoLocation } from "@/models/product-geo-location";
import MainProductCard from "@/components/MainProductCard";
import { Product } from "@/models/product";
import { generateFakeData } from "@/utilities/generate-fake-data";

const ProductsList = ({ dongList }: ProductGeoLocation[]) => {
  const dongData = generateFakeData();
  const products: Product[] = dongData[0].mostPopularProducts;
  return (
    <div className="flex flex-col">
      {products.map((product, index) => (
        <MainProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};
export default ProductsList;
