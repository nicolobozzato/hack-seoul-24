<template>
  <div class="flex flex-col">
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
              'selected-row': mapStore.inventoryProductSelected === scope.row,
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
              'selected-row': mapStore.inventoryProductSelected === scope.row,
            }"
            class="cell-content"
          >
            <span>{{ scope.row.product.name }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="mapStore.inventoryProductSelected" class="flex-1 mt-5">
      <el-table
        :data="mapStore.inventoryProductSelected.shortageSituations"
        border
      >
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElTable } from "element-plus";
import type { InventoryProductSituation } from "~/models/inventory-product-situation";
import { ProductGeoLocationRepository } from "~/repository-fe/ProductGeoLocationRepository";

const mapStore = useMapStore();
const tableData = ref<InventoryProductSituation[]>([]);

const currentRow = ref();
const singleTableRef = ref<InstanceType<typeof ElTable>>();
const selectedRow = ref<InventoryProductSituation | null>(null);

const handleRowClick = (row: InventoryProductSituation) => {
  selectedRow.value = row;
  mapStore.inventoryProductSelected =
    mapStore.inventoryProductSelected &&
    mapStore.inventoryProductSelected === row
      ? undefined
      : row;
  if (
    mapStore.inventoryProductSelected &&
    mapStore.inventoryProductSelected !== row
  ) {
    mapStore.inventoryShortageSituationSelected = undefined;
  }
};

const fetchTableData = async () => {
  try {
    const response = await fetch("/api/product-geo-location");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    tableData.value =
      await ProductGeoLocationRepository.Instance.getInventoryShortageSituation();
  } catch (error) {
    console.error("Error fetching table data:", error);
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
