<template>
  <div v-if="!isLoading" class="flex flex-row gap-2">
    <el-table
      ref="singleTableRef"
      :data="tableData"
      highlight-current-row
      border
      @row-click="handleRowClick"
      class="cursor-pointer w-full flex-1 styled-table"
    >
      <el-table-column type="index" label="Id" width="70" align="center">
        <template #default="scope">
          <div
            :class="{
              'selected-row': selectedRow === scope.row,
            }"
            class="cell-content"
          >
            <span>{{ scope.row.product.id }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="name" label="Name" width="180" align="center">
        <template #default="scope">
          <div
            :class="{
              'selected-row': selectedRow === scope.row,
            }"
            class="cell-content"
          >
            <span>{{ scope.row.product.name }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="selectedRow" :key="selectedRow.product.id" class="flex-1">
      <el-table :data="selectedRow?.shortageSituations ?? []" border>
        <el-table-column type="index" label="Dong" width="100" align="center">
          <template #default="scope">
            <div class="cell-content">
              <span>{{ scope.row.dong.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          property="name"
          label="Shortage"
          width="180"
          align="center"
        >
          <template #default="scope">
            <div class="cell-content">
              <span>{{ scope.row.shortageCount }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div
    v-else
    class="flex flex-row justify-center items-center h[100vh] w-[100vw]"
  >
    <el-progress type="circle" :percentage="loadingStatus" status="success" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElProgress, ElTable } from "element-plus";
import type { InventoryProductSituation } from "~/models/inventory-product-situation";
import { ProductGeoLocationRepository } from "~/repository-fe/ProductGeoLocationRepository";
import type { InventoryShortageSituation } from "~/models/inventory-shortage-situation";

const mapStore = useMapStore();

const isLoading = ref<boolean>(true);
const loadingStatus = ref<number>(40);
const tableData = ref<InventoryProductSituation[]>([]);

const currentRow = ref();
const singleTableRef = ref<InstanceType<typeof ElTable>>();
const selectedRow = ref<InventoryProductSituation | null>(null);

const handleRowClick = (row: InventoryProductSituation) => {
  selectedRow.value = row;
  mapStore.inventoryProductSelected = row;
};

const fetchTableData = async () => {
  isLoading.value = true;
  loadingStatus.value = 40;
  try {
    const response = await fetch("/api/product-geo-location");
    loadingStatus.value = 70;
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    tableData.value =
      await ProductGeoLocationRepository.Instance.getInventoryShortageSituation();
  } catch (error) {
    console.error("Error fetching table data:", error);
  } finally {
    loadingStatus.value = 90;
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchTableData();
});
</script>

<style scoped>
.styled-table {
  border-collapse: collapse;
  width: 100%;
}

.cell-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.selected-row {
  background-color: #e0f7fa;
}
</style>
