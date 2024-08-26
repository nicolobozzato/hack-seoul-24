<script setup lang="ts">
import * as d3 from "d3";
import { ref, onMounted, watch } from "vue";
import { initializeMap } from "@/utilities/initialize-map";
import { generateFakeData } from "@/utilities/generate-fake-data";
import { ElProgress } from "element-plus";
import type { InventoryShortageSituation } from "~/models/inventory-shortage-situation";
const svgRef = ref<SVGSVGElement | null>(null);
const loading = ref<boolean>(false);
const loadingStatus = ref<number>(0);
const dongList = ref<{
  [key: string]: string;
}>({});

const mapStore = useMapStore();

function handleClick(event: any) {
  const path = d3.select(event.target);
  mapStore.showShortageSelected(path.attr("id").replace("dong-", ""));
}

function handleMouseOver(event: any) {
  const path = d3.select(event.target);
}

function handleMouseOut(event: any) {}

function paintMap() {
  loadingStatus.value = 0;
  const svg = initializeMap(svgRef.value!);
  loadingStatus.value = 40;
  if (!svg) {
    console.error("initializeMap did not return a valid SVG element");
    return;
  }

  const zoom = d3
    .zoom()
    .scaleExtent([1, 8]) // Set the zoom scale limits
    .on("zoom", (event) => {
      svg.selectAll("g").attr("transform", event.transform);
    });
  loadingStatus.value = 60;
  svg.call(zoom as any);

  const list = generateFakeData();
  svg
    .selectAll("path")
    .on("click", handleClick)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
  loadingStatus.value = 100;
  loading.value = false;
}

watch(
  () => mapStore.inventoryProductSelected,
  (newValue) => {
    d3.selectAll("path").attr("fill", "gray");
    if (!newValue) {
      return;
    }
    newValue.shortageSituations.forEach(
      (shortageSituation: InventoryShortageSituation) => {
        colorDongById(
          shortageSituation.dong.dongCode ?? shortageSituation.dong.dongcode,
          shortageSituation.shortageCount,
          newValue.product.id,
        );
      },
    );
  },
);

const colorDongById = (
  id: string,
  shortageCount: number,
  productId: string,
) => {
  const colorScale = d3
    .scaleLinear<string>()
    .domain([-25000, 0]) // Adjust the domain based on the range of shortageCount values
    .range(["#ff0000", "#ffcccc"]); // Shades of red from dark to light

  const color = colorScale(shortageCount);
  dongList.value[productId] = color;
  d3.selectAll(`#dong-${id}`)
    .attr("fill", color)
    .attr("class", "product-" + productId.toString());
};

onMounted(() => {
  if (!svgRef.value) {
    console.error("svgRef is not defined");
    return;
  }
  paintMap();
});
</script>

<template>
  <div
    class="h-[60vh] border-black border-2 rounded-3xl overflow-hidden bg-amber-50 mt-4"
  >
    <svg v-if="!loading" ref="svgRef" class="smooth-transition"></svg>
    <el-progress
      v-else
      type="circle"
      :percentage="loadingStatus"
      status="success"
    />
  </div>
</template>

<style scoped>
.smooth-transition {
  transition: fill 0.5s ease;
}
</style>
