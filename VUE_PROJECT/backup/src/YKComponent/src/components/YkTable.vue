<template>
  <el-table
    ref="ykTableRef"
    v-loading="loading"
    :data="data"
    :border="border"
    :highlight-current-row="true"
    :max-height="maxHeight"
    :default-expand-all="defaultExpandAll"
    :row-key="rowKey"
    :show-header="true"
    :stripe="stripe"
    :empty-text="emptyText"
    :size="size"
    :style="style"
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
    @expand-change="handleExpandChange"
    @select="handleSelect"
    @select-all="handleSelectAll"
    @row-click="handleRowClick"
  >
    <el-table-column
      v-for="item in columns"
      :key="item.prop"
      :type="item.type"
      :label="item.title"
      :prop="item.prop"
      :align="item.align"
      :sortable="item.sortable"
      :width="item.width"
      :fixed="item.fixed"
      :show-overflow-tooltip="item.showOverflowTooltip"
      :selectable="item.selectable"
      :render-header="item.renderHeader"
      :index="item.indexMethod"
    >
      <!-- 自定义列内容 -->
      <template v-if="item.slot && !item.headerSlot" #default="scope">
        <slot :name="item.slot" :row="scope.row"></slot>
      </template>
      <!-- header头嵌套显示 -->
      <slot v-if="item.headerSlot" :name="item.headerSlot"></slot>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      background
      v-model:page-size="pagination.pageSize"
      v-model:current-page="pagination.currentPage"
      :layout="pagination.layout"
      :total="pagination.total"
      :page-sizes="pagination.pageSizes"
      @size-change="handleSizeChange"
      @current-change="handlePageCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, PropType } from "vue";
import type { ElTable } from "element-plus";

interface Column {
  type?: string;
  width?: number;
  align?: string;
  title?: string;
  fixed?: string;
  prop?: string;
  sortable?: string | boolean;
  slot?: string;
  headerSlot?: string;
  showOverflowTooltip?: boolean;
  selectable?: (row: any, index: number) => boolean;
  renderHeader?: (val: { column: any; $index: number }) => any;
  indexMethod?: number | ((index: number) => number);
}

interface Pagination {
  pageSize?: number;
  pageSizes?: number[];
  layout?: string;
  total: number;
  currentPage?: number;
}

const emit = defineEmits([
  "current-change",
  "selection-change",
  "sort-change",
  "expand-change",
  "select",
  "select-all",
  "row-click",
  "size-change",
  "page-current-change",
]);

defineProps({
  size: {
    type: String,
    default: "default",
  },
  border: {
    type: Boolean,
    default: false,
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  pagination: {
    type: Object as PropType<Pagination>,
    default: () => ({
      pageSize: 10,
      pageSizes: [10, 20, 30, 40, 50, 100],
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      currentPage: 1,
    }),
  },
  emptyText: {
    type: String,
    default: "暂无数据",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<Column[]>,
    default: () => [],
  },
  maxHeight: {
    type: Number,
    default: 0,
  },
  rowKey: {
    type: String,
    default: "id",
  },
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object,
    default: () => ({}),
  },
});

/**
 * ykTableRef实例
 */
const ykTableRef = ref<InstanceType<typeof ElTable>>();

/**
 * 多选功能下，当前行选中状态改变时，触发的事件
 * @param val 选中的列数据
 */
const handleSelectionChange = (val: Object[]) => {
  emit("selection-change", val);
};

/**
 * 当表格的当前行发生变化的时候会触发该事件
 * @param val 当前行的数据
 */
const handleCurrentChange = (val: Object | undefined) => {
  emit("current-change", val);
};

/**
 * 当表格的排序条件发生变化的时候会触发该事件
 */
const handleSortChange = (column: any, prop: any, order: any) => {
  emit("sort-change", column, prop, order);
};

/**
 * 展开行的时候触发该事件
 */
const handleExpandChange = (row: any, expanded: any) => {
  emit("expand-change", row, expanded);
};

/**
 * 当表格的选择框发生变化的时候会触发该事件
 */
const handleSelect = (selection: any, row: any) => {
  emit("select", selection, row);
};

/**
 * 当表格的全选框发生变化的时候会触发该事件
 */
const handleSelectAll = (selection: any) => {
  emit("select-all", selection);
};

/**
 * 当表格的行被点击的时候会触发该事件
 */
const handleRowClick = (row: any, column: any, event: any) => {
  emit("row-click", row, column, event);
};

/**
 * pageSize 改变时触发
 */
const handleSizeChange = (val: number) => {
  emit("size-change", val);
};

const handlePageCurrentChange = (val: number) => {
  emit("page-current-change", val);
};
defineExpose({
  ykTableRef,
});
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  .el-pagination {
    justify-content: flex-end;
  }
}
</style>