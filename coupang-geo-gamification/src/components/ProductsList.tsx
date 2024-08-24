import React from "react";
import { ProductGeoLocation } from "@/models/product-geo-location";
import MainProductCard from "@/components/MainProductCard";
import { Product } from "@/models/product";

const ProductsList = ({ dongList }: ProductGeoLocation[]) => {
  const products: Product[] = dongList[0].mostPopularProducts;
  return (
    <div className="flex flex-col">
      {products.map((product, index) => (
        <MainProductCard
          key={product.id}
          className={`${index > 0 ? "scale-75" : ""}`}
          product={product}
        />
      ))}
    </div>
  );
};
export default ProductsList;
