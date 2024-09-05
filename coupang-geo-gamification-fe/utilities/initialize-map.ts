"use client";

import * as d3 from "d3";
import data from "@/assets/maps/seoul-dong.json";

export function initializeMap(svgRef: SVGSVGElement) {
  const width = 1000;
  const height = 700;

  const svg = d3.select(svgRef).attr("width", width).attr("height", height);

  const projection = d3
    .geoMercator()
    .scale(150000)
    .center([126.97111031571787, 37.59114726984669]);
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
  return svg;
}
