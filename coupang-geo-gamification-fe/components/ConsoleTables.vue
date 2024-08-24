<template>
  <el-table
    ref="singleTableRef"
    :data="tableData"
    highlight-current-row
    @row-click="handleRowClick"
    class="cursor-pointer w-full"
  >
    <el-table-column type="index" label="Id" width="70" align="center">
      <template #default="scope">
        <div
          :class="{
            'selected-row': mapStore.inventoryProductSelected === scope.row,
          }"
          style="display: flex; align-items: center"
        >
          <span style="margin-left: 10px">{{ scope.row.product.id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column property="name" label="Name" width="180">
      <template #default="scope">
        <div
          :class="{
            'selected-row': mapStore.inventoryProductSelected === scope.row,
          }"
          style="display: flex; align-items: center"
        >
          <span style="margin-left: 10px">{{ scope.row.product.name }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElTable } from "element-plus";
import type { InventoryProductSituation } from "~/models/inventory-product-situation";

const mapStore = useMapStore();

const currentRow = ref();
const singleTableRef = ref<InstanceType<typeof ElTable>>();
const selectedRow = ref<InventoryProductSituation | null>(null);

const handleRowClick = (row: InventoryProductSituation) => {
  selectedRow.value = row;
  mapStore.inventoryProductSelected = mapStore.inventoryProductSelected
    ? undefined
    : row;
};

const tableData: InventoryProductSituation[] = [
  {
    product: {
      id: "1",
      name: "Fresh onion",
      price: 3000,
      imageUrl: "placeholder",
      description: "description",
      discountForWow: 0.2,
      color: "#b5b5b5",
      rating: 4,
    },
    shortageSituations: [
      {
        dongCode: "11110550",
        shortageCount: -25000,
      },
      {
        dongCode: "11110560",
        shortageCount: -2000,
      },
      {
        dongCode: "11110580",
        shortageCount: -5000,
      },
      {
        dongCode: "11110600",
        shortageCount: -1000,
      },
      {
        dongCode: "11110700",
        shortageCount: -15000,
      },
    ],
  },
];
</script>

<style scoped>
.selected-row {
  @apply bg-gray-200;
}
</style>
