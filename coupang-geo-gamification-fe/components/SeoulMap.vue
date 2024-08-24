<script setup lang="ts">
import * as d3 from "d3";
import { ref } from "vue";
import { initializeMap } from "~/utilities/initialize-map";
import { generateFakeData } from "~/utilities/generate-fake-data";

const svgRef = ref<SVGSVGElement | null>(null);
const loading = ref<boolean>(false);

function handleClick(event: any, d: any) {
  const clickedPath = d3.select(this);
  const classOfPathClicked = clickedPath.attr("class");
  d3.selectAll(`.product-${classOfPathClicked}`).attr("fill", "red");
}

const paintMap = () => {
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
  loading.value = false;
};

const colorDongById = (id: string, color: string, productId: string) => {
  d3.selectAll(`#dong-${id}`)
    .attr("fill", color)
    .attr("class", "product-" + productId.toString());
};
</script>

<template>
  <div class="h-[100vh] border-black border-2 block">
    <svg ref="svgRef"></svg>
  </div>
</template>

<style scoped></style>
