"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ProductGeoLocation } from "@/models/product-geo-location";
import { generateFakeData } from "@/utilities/generate-fake-data";
import { initializeMap } from "@/utilities/initialize-map";
import { Spinner } from "@chakra-ui/react";
const SeoulMap = ({ dongList }: ProductGeoLocation[]) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [loading, setLoading] = React.useState(true);

  function handleClick(event: any, d: any) {
    const clickedPath = d3.select(this);
    const classOfPathClicked = clickedPath.attr("class");
    d3.selectAll(`.product-${classOfPathClicked}`).attr("fill", "red");
  }

  useEffect(() => {
    setLoading(true);
    const svg = initializeMap(svgRef);

    const zoom = d3
      .zoom()
      .scaleExtent([1, 8]) // Set the zoom scale limits
      .on("zoom", (event) => {
        svg.selectAll("g").attr("transform", event.transform);
      });

    svg.call(zoom as any);

    const list = generateFakeData();
    list.forEach((dong) => {
      const randomNumber = Math.floor(Math.random() * 3);
      colorDongById(
        dong.dongCode,
        dong.mostPopularProducts[randomNumber].color,
        dong.mostPopularProducts[randomNumber].id,
      );
    });
    svg.selectAll("path").on("click", handleClick).on("mouseover", handleClick);
    setLoading(false);
  }, []);

  const colorDongById = (id: string, color: string, productId: string) => {
    d3.selectAll(`#dong-${id}`)
      .attr("fill", color)
      .attr("class", "product-" + productId.toString());
  };

  if (loading) {
    return <div className="w-full flex flex-row justify-center"></div>;
  } else {
    return (
      <div className="h-[100vh] border-black border-2 block">
        <svg ref={svgRef}></svg>
      </div>
    );
  }
};

export default SeoulMap;
