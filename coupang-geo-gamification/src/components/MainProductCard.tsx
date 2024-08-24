"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/models/product";
import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import rocketLogo from "@/assets/rocket_logo.png";
import coffeeImage from "@/assets/coffe-image.jpg";

interface MainProductCardProps {
  product: Product;
  index: number;
}

const MainProductCard = ({ product, index }: MainProductCardProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div></div>;

  return (
    <div
      className="ml-4 my-1 w-full"
      style={{ borderLeft: "solid 1rem " + product.color }}
    >
      <div
        className="flex flex-row py-2 justify-start items-center"
        style={{ scale: index > 0 ? 0.5 : 0.7 }}
      >
        <Image height={300} src={coffeeImage} />
        <div className="flex flex-col">
          <h1 className="text-2xl text-black">{product.name}</h1>
          <h2>{product.description}</h2>
          <div className="flex flex-row">
            <p>{product.rating}</p>
            <div className="flex flex-row gap-2">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} color={"yellow"} />
              ))}
            </div>
            <p>{Math.floor(Math.random() * 140000)}개 상품평</p>
          </div>
          <hr />
          <p className="flex flex-row items-center gap-3">
            {product.discountForWow * 100}%
            <span className="line-through">
              {(product.price * 1.1).toFixed(2)}
            </span>
          </p>
          <h1>{product.price.toFixed(2)}</h1>
          <div className="flex flex-row items-center">
            <h1 className="text-red-600 font-semibold text-2xl">
              {(product.price * (1 - product.discountForWow)).toFixed(2)}
            </h1>
            <Image className="p-5" src={rocketLogo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainProductCard;
