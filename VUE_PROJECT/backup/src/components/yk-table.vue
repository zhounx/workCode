<template>
  <div class="table">
    <el-table
      ref="multipleTableRef"
      @selection-change="selectionChange"
      lazy
      :size="size"
      :border="border"
      :data="tableData"
      :fit="fit"
      :highlight-current-row="true"
      style="width: 100%"
      :row-key="rowKey"
    >
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="item.prop"
          :key="index"
          :type="item.prop"
          :align="item.align || 'center'"
          :show-overflow-tooltip="true"
          :prop="item[dataKey.prop]"
          :label="item[dataKey.label]"
          :formatter="item.formatter"
          :min-width="item.width"
          :reserve-selection="true"
        >
        </el-table-column>
        <slot :name="item.slot"></slot>
      </template>
    </el-table>

    <el-pagination
      v-if="showPagination"
      background
      :hide-on-single-page="false"
      class="pagination"
      :size="size"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
      :current-page="currentPage"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
      <el-button key="1" size="small" color="#C2E3FF">GO</el-button>
      <span key="2" class="total-page"
        >共{{ Math.ceil(total / pageSize) }}页{{ total }}条数据</span
      >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRaw } from "vue";
import type { ElTable } from "element-plus";

defineProps({
  border: {
    type: Boolean,
    default: true,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  tableData: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
  columns: {
    type: Array,
    default: () => [], //表格列
  },
  dataKey: {
    type: Object,
    default: () => {
      return { label: "label", prop: "prop" };
    },
  },
  rowKey: {
    type: String,
    default: () => {
      return "id";
    },
  },
  pageIsShow: {
    type: Boolean,
    default: false, //是否显示分页
  },
  pageSizes: {
    type: Array,
    default: () => [10, 15, 20, 30, 50, 100], //智能分页选项
  },
  pageSize: {
    type: Number,
    default: () => 10, //默认每页条数
  },
  layout: {
    type: String,
    default: () => "prev, pager, next, sizes, jumper, slot",
  },
  total: {
    type: Number,
    default: () => 0, //总条数
  },
  fit: {
    type: Boolean,
    default: true, //默认自动撑开
  },
  size: {
    type: String,
    default: () => "default",
  },
  currentPage: {
    type: Number,
    default: () => 1, //当前页码
  },
});

const emits = defineEmits([
  "size-change",
  "current-change",
  "selection-change",
]);
function sizeChange(val: any) {
  emits("size-change", toRaw(val));
}
function currentChange(val: any) {
  emits("current-change", toRaw(val));
}
function selectionChange(val: any) {
  emits("selection-change", val);
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
function resetSelection() {
  multipleTableRef.value!.clearSelection();
}
defineExpose({ resetSelection });
</script>

<style scoped lang="scss">
.table {
  overflow-y: hidden;
  &::v-deep(.el-table--fit) {
    border-radius: 8px;
  }
  &::v-deep(.el-table__body .cell) {
    font-size: 14px;
    color: #25343c;
  }
  &::v-deep(.el-table th.el-table__cell) {
    font-size: 14px;
    background-color: #f4f8fb;
    color: #6a767d;
  }
  .pagination {
    margin-top: 10px;
    text-align: right;
    padding-left: 20px;
    &::v-deep(.el-pager li:not(.disabled).active) {
      border: 1px solid #195eff;
      &:hover {
        background-color: #0d89f2;
      }
    }
    &::v-deep(.el-pager li) {
      border-radius: 4px;
      border: 1px solid #e1e8ed;
      background-color: #fff;
      color: #6a767d;
      font-weight: normal;
      &.number:hover {
        border: 1px solid #1085e8;
        background-color: #fff;
      }
    }
    &::v-deep(.btn-next),
    &::v-deep(.btn-prev) {
      &:hover {
        background-color: #ebf4fa;
        border: 1px solid #cbd6de;
      }
    }

    &::v-deep(.el-select .el-input) {
      width: 90px;
      .el-input__inner {
        height: 30px;
        border-radius: 4px;
      }
    }
    &::v-deep(.el-pagination__jump) {
      margin: 0;
      .el-input__inner {
        border-radius: 4px;
      }
    }
    &::v-deep(.el-button--default.el-button--small) {
      background-color: #c2e3ff;
      color: #195eff;
      font-weight: bold;
      margin: 0 5px;
      width: 50px;
      min-height: 30px;
      border-radius: 4px;
      &:hover {
        background-color: #aad8ff;
      }
    }
  }
  .total-page {
    color: #6A767D;
    opacity: 0.5;
    margin-left: 5px;
    font-weight: normal;
  }
}
</style>
