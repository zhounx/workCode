const md = `

### YkTable列表组件
常用的列表组件。

### 基础用法
\`\`\`vue
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
    // 自定义列内容
    <template #age="scope">
      <div>{{ scope.row.date }}</div>
    </template>
    // 操作
    <template #action>
      <el-button link type="primary" size="small" @click="handleClick"
        >Detail</el-button
      >
      <el-button link type="primary" size="small">Edit</el-button>
    </template>
    // 多级表头
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
\`\`\`
### Attributes属性（参考ElementUI）
\`\`\`vue
interface TableProps {
  size?: string;
  border?: boolean;
  stripe?: boolean;
  pagination: Pagination;
  emptyText?: string;
  loading?: boolean;
  data: any[];
  columns?: Column[];
  maxHeight?: number;
  rowKey?: string;
  defaultExpandAll?: boolean;
  style?: Object;
}

interface Column {
  type?: string;
  width?: number;
  align?: string;
  title?: string;
  fixed?: string;
  prop?: string;
  sortable?: string | boolean;
  // 自定义列内容，需要和template一起使用
  slot?: string;
  // 自定义header头，如多级表头，和template对应
  headerSlot?: string;
  // 是否显示隐藏的列内容
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
\`\`\`
### 事件（参考ElementUI）
\`\`\`vue
  @current-change="handleCurrentChange"
  @selection-change="handleSelectionChange"
  @sort-change="handleSortChange"
  @expand-change="handleExpandChange"
  @select="handleSelect"
  @select-all="handleSelectAll"
  @row-click="handleRowClick"
\`\`\`
`
export default md