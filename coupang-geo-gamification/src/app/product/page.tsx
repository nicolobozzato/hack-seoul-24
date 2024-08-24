"use client";

import React, { useEffect } from "react";
import ProductsList from "@/components/ProductsList";
import dongData from "@/assets/data/seoulDongNow.json";
import SeoulMap from "@/components/SeoulMap";

const Page = () => {
  useEffect(() => {}, []);

  return (
    <section className="flex flex-col p-4">
      <h1 className="text-4xl font-bold py-4">
        What your neighbours are buying
      </h1>
      <div className="flex flex-row h-full">
        <ProductsList dongList={dongData} />
        <SeoulMap dongList={dongData} />
      </div>
    </section>
  );
};
export default Page;
