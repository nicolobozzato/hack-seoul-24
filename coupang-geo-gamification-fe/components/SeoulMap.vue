<script setup lang="ts">
import * as d3 from "d3";
import { ref, onMounted } from "vue";
import { initializeMap } from "~/utilities/initialize-map";
import { generateFakeData } from "~/utilities/generate-fake-data";
import { ElProgress } from "element-plus";
const svgRef = ref<SVGSVGElement | null>(null);
const loading = ref<boolean>(false);
const loadingStatus = ref<number>(0);
const dongList = ref<{
  [key: string]: string;
}>({});

const mapStore = useMapStore();

function handleClick(event: any) {
  const classSelected = d3.selectAll(`#${event.target.id}`).attr("class");
  d3.selectAll(`.${classSelected}`).attr("fill", "red");
  mapStore.productSelectedId.value = classSelected.replace("product-", "");
}

function handleMouseOut(event: any) {
  const path = d3.select(event.target);
  const classDeselected = path.attr("class");
  d3.selectAll(`.${classDeselected}`).attr(
    "fill",
    dongList.value[classDeselected.replace("product-", "")],
  );
}

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
  const progression = (95 - loadingStatus.value) / list.length;
  list.forEach((dong) => {
    loadingStatus.value = loadingStatus.value + progression;
    const randomNumber = Math.floor(Math.random() * 3);
    colorDongById(
      dong.dongCode,
      dong.mostPopularProducts[randomNumber].color,
      dong.mostPopularProducts[randomNumber].id,
    );
  });
  svg
    .selectAll("path")
    .on("click", handleClick)
    .on("mouseover", handleClick)
    .on("mouseout", handleMouseOut);
  loadingStatus.value = 100;
  loading.value = false;
}

const colorDongById = (id: string, color: string, productId: string) => {
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
  <div class="h-[100vh] border-black border-2 block">
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
