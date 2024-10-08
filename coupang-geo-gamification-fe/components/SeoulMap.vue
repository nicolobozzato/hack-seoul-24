<script setup lang="ts">
import * as d3 from "d3";
import { ref, onMounted } from "vue";
import { initializeMap } from "~/utilities/initialize-map";
import { generateFakeData } from "~/utilities/generate-fake-data";
import { ElProgress } from "element-plus";
import type { ProductGeoLocation } from "~/models/product-geo-location";
const svgRef = ref<SVGSVGElement | null>(null);
const loading = ref<boolean>(false);
const loadingStatus = ref<number>(0);
const dongDictionary = ref<{
  [key: string]: string;
}>({});

const mapStore = useMapStore();

const props = defineProps<{
  dongList: ProductGeoLocation[];
}>();

function handleClick(event: any) {
  const classSelected = handleMouseOver(event);
  mapStore.productSelectedId = classSelected;
}

function handleMouseOver(event: any) {
  const classSelected = d3.selectAll(`#${event.target.id}`).attr("class");
  d3.selectAll(`.${classSelected}`).attr("fill", "red");
  return classSelected.replace("product-", "");
}

function handleMouseOut(event: any) {
  const path = d3.select(event.target);
  const classDeselected = path.attr("class");
  d3.selectAll(`.${classDeselected}`).attr(
    "fill",
    dongDictionary.value[classDeselected.replace("product-", "")],
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

  const progression = (95 - loadingStatus.value) / props.dongList.length;
  props.dongList.forEach((dong) => {
    console.log(dong);
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
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
  loadingStatus.value = 100;
  loading.value = false;
}

const colorDongById = (id: string, color: string, productId: string) => {
  dongDictionary.value[productId] = color;
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
    class="h-[50vh] border-black border-2 rounded-3xl overflow-hidden bg-amber-50"
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
