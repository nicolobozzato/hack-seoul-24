"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "@/assets/maps/seoul-dong.json";
import { ProductGeoLocation } from "@/models/product-geo-location";
import { generateFakeData } from "@/utilities/generate-fake-data";
import { initializeMap } from "@/utilities/initialize-map";

const SeoulMap = ({ dongList }: ProductGeoLocation[]) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    initializeMap(svgRef);
    const list = generateFakeData();
    list.forEach((dong) => {
      const randomNumber = Math.floor(Math.random() * 3);
      colorDongById(
        dong.dongCode,
        dong.mostPopularProducts[randomNumber].color,
      );
    });
  }, []);

  const colorDongById = (id: string, color: string) => {
    d3.selectAll(`#dong-${id}`).attr("fill", color);
  };

  return (
    <div className=" border-black border-2 block">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default SeoulMap;
