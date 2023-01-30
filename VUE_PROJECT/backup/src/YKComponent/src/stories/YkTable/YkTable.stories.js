import { reactive } from "vue"
import YkTable from '@/components/YkTable.vue';
import markdown from './YkTable.md.js'

export default {
  title: '公共组件/YkTable',
  component: YkTable,
  parameters: {
    notes: markdown,
  },
  argTypes: {
  },
};

const Template = (args) => ({
  components: { YkTable },
  setup() {
    // handleCurrentChange
    const handleCurrentChange = (val) => {
      console.log("current change", val);
    };
    // handleSelectionChange
    const handleSelectionChange = (val) => {
      console.log("handleSelectionChange", val);
    };
    // 排序
    const handleSortChange = (column, prop, order) => {
      console.log(column, prop, order);
    };
    const handleExpandChange = (row, expanded) => {
      console.log("handleExpandChange", row, expanded);
    };
    const handleSelect = (selection, row) => {
      console.log("handleSelect", selection, row);
    };
    const handleSelectAll = (selection) => {
      console.log("handleSelectAll", selection);
    };
    const handleRowClick = (row, column, event) => {
      console.log("row-click", row, column, event);
    };
    /**
     * pageSize 改变时触发
     */
    const handleSizeChange = (val) => {
      console.log("size-change", val);
    };

    const handlePageCurrentChange = (val) => {
      console.log("page-current-change", val);
    };
    const handleClick = () => {
      console.log("click");
    };
    return { args,handleCurrentChange,handleSelectionChange,handleSortChange,handleExpandChange,handleSelect,handleSelectAll,handleRowClick,handleSizeChange,handlePageCurrentChange,handleClick };
  },
  template: `<yk-table v-bind="args">
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
  </yk-table>`,
});

export const Primary = Template.bind({});
Primary.storyName = '基础用法';
Primary.args = reactive({
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
    loading: false,
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
            name: "wangxiaohu",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "wangxiaohu",
          },
        ],
      },
      {
        id: 4,
        date: "2016-05-03",
        age: 32,
        name: "wangxiaohu1",
      },
    ],
    columns: [
      {
        type: "selection",
        width: 50,
        align: "center",
        selectable: (row, index) => {
          return true;
        },
      },
      {
        type: "index",
        width: 80,
        align: "center",
        title: "序号",
        fixed: "left",
        indexMethod: (index) => {
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
})
