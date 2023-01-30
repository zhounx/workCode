<template>
  <!-- 列表 -->
  <YkTable
    v-bind="ykTableProps"
    ref="ykTableRef"
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
    @expand-change="handleExpandChange"
    @select="handleSelect"
    @select-all="handleSelectAll"
    @row-click="handleRowClick"
    @size-change="handleSizeChange"
    @page-current-change="handlePageCurrentChange"
  >
    <!-- 自定义列内容 -->
    <template #age="scope">
      <div>{{ scope.row.date }}</div>
    </template>
    <!-- 操作 -->
    <template #action>
      <el-button link type="primary" size="small" @click="handleClick"
        >Detail</el-button
      >
      <el-button link type="primary" size="small">Edit</el-button>
    </template>
    <template #address>
      <el-table-column
        prop="date"
        label="date"
        sortable
        width="180"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="date"
        sortable
        width="180"
      ></el-table-column>
    </template>
  </YkTable>
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(ykTableProps.data[1])"
      >Select second row</el-button
    >
    <el-button @click="setCurrent()">Clear selection</el-button>
  </div>
  <div style="margin-top: 20px">
    <el-button
      @click="toggleSelection([ykTableProps.data[1], ykTableProps.data[2]])"
      >Toggle selection status of second and third rows</el-button
    >
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import YkTable from "../components/YkTable.vue";
/**
 * tabel 组件使用示例
 */
interface User {
  id: number;
  date: string;
  name: string;
  address?: string;
  children?: User[];
}
// table 组件实例
const ykTableRef = ref();
// table 组件的 props 参数
const ykTableProps = reactive({
  // table 组件的属性
  size: "default",
  border: true,
  stripe: true,
  maxHeight: 450,
  emptyText: "暂无数据",
  rowKey: "id",
  defaultExpandAll: true,
  style: { width: "100%" },
  pagination: {
    pageSize: 20,
    pageSizes: [10, 20, 30, 40],
    layout: "total, sizes, prev, pager, next, jumper",
    total: 50,
    currentPage: 2,
  },
  loading: true,
  data: [
    {
      id: 1,
      date: "2016-05-02",
      name: "wangxiaohu",
    },
    {
      id: 2,
      date: "2016-05-04",
      name: "wangxiaohu",
    },
    {
      id: 3,
      date: "2016-05-01",
      name: "wangxiaohu",
      children: [
        {
          id: 31,
          date: "2016-05-01",
          name: "wa2ngxiaohu",
        },
        {
          id: 32,
          date: "2016-05-01",
          name: "wa3ngxiaohu",
        },
      ],
    },
    {
      id: 4,
      date: "2016-05-03",
      name: "wangxiaohu",
    },
  ],
  columns: [
    {
      type: "selection",
      width: 50,
      align: "center",
      selectable: (row: User, index: number) => {
        return false;
      },
    },
    {
      type: "index",
      width: 80,
      align: "center",
      title: "序号",
      fixed: "left",
      indexMethod: (index: number) => {
        return index * 2;
      },
    },
    {
      prop: "name",
      align: "center",
      title: "姓名",
      fixed: "left",
      sortable: true,
      showOverflowTooltip: true,
    },
    {
      prop: "age",
      align: "center",
      title: "年龄",
      fixed: "left",
      slot: "age",
    },
    {
      prop: "address",
      align: "center",
      title: "地址",
      fixed: "left",
      headerSlot: "address",
    },
    {
      prop: "date",
      align: "center",
      title: "日期",
      fixed: "left",
    },
    {
      prop: "action",
      align: "center",
      title: "操作",
      fixed: "right",
      slot: "action",
    },
  ],
});
// handleCurrentChange
const handleCurrentChange = (val: User | undefined) => {
  console.log("current change", val);
};
// handleSelectionChange
const handleSelectionChange = (val: User[]) => {
  console.log("handleSelectionChange", val);
};
// 排序
const handleSortChange = (column: any, prop: any, order: any) => {
  console.log(column, prop, order);
};
const handleExpandChange = (row: any, expanded: any) => {
  console.log("handleExpandChange", row, expanded);
};
const handleSelect = (selection: any, row: any) => {
  console.log("handleSelect", selection, row);
};
const handleSelectAll = (selection: any) => {
  console.log("handleSelectAll", selection);
};
const handleRowClick = (row: any, column: any, event: any) => {
  console.log("row-click", row, column, event);
};
/**
 * pageSize 改变时触发
 */
const handleSizeChange = (val: number) => {
  console.log("size-change", val);
};

const handlePageCurrentChange = (val: number) => {
  console.log("page-current-change", val);
};
const handleClick = () => {
  console.log("click");
};
const setCurrent = (row?: User) => {
  const tableRef = ykTableRef.value.ykTableRef;
  tableRef.setCurrentRow(row);
};
const toggleSelection = (rows?: User[]) => {
  const tableRef = ykTableRef.value.ykTableRef;
  if (rows) {
    rows.forEach((row) => {
      tableRef.toggleRowSelection(row, undefined);
    });
  } else {
    tableRef.clearSelection();
  }
};

setTimeout(() => {
  ykTableProps.loading = false;
}, 2000);
</script>
<style lang="scss" scoped>
</style>