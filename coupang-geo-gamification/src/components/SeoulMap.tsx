"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "@/assets/maps/seoul-dong.json";
import { ProductGeoLocation } from "@/models/product-geo-location";
import { generateFakeData } from "@/utilities/generate-fake-data";

const SeoulMap = ({ dongList }: ProductGeoLocation[]) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 1000;
    const height = 700;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const projection = d3
      .geoMercator()
      .scale(100000)
      .center([126.97111031571787, 37.59114726984669]);
    debugger;
    const geoPathGenerator = d3.geoPath().projection(projection);

    svg
      .append("g")
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", geoPathGenerator as any)
      .attr("fill", "blue")
      .attr("stroke", "white")
      .attr("id", (d) => `dong-${d.properties["AdministrativeDongCode"]}`);

    const list = generateFakeData();
    console.log(list);
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
    <div className="mt-8">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default SeoulMap;
