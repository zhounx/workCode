<template>
  <div class="abroad-order-page">
    <div class="content">
      <div class="abroad-title">
        <h3>订单管理</h3>
      </div>
      <yk-form
        ref="orderSearch"
        size="large"
        labelWidth="auto"
        :inline="true"
        :formItems="orderSearchItems"
        :formParams="orderSearchParams"
      >
        <template v-slot:search>
          <el-form-item>
            <el-button
              class="search-button"
              type="primary"
              @click="getOrderList"
              >搜索</el-button
            >
          </el-form-item>
        </template>
      </yk-form>

      <div class="line"></div>
      <div class="abroad-title" style="border: none; margin: 0">
        <h3>记录列表</h3>
        <el-button type="primary" style="font-size: 16px;" plain @click.stop="router.push({ path: '/abroad/order/apply' })">创建订单</el-button>
      </div>
      <yk-table
        size="small"
        :columns="orderColumns"
        :tableData="tableData"
        @size-change="sizeChange"
        @current-change="currentChange"
        :pageSize="pageSize"
        :total="tableTotal"
        :currentPage="currentPage"
      >
        <template v-slot:shopType>
          <el-table-column label="店铺类型" width="90px" align="center">
            <template #default="scope">
              <span>{{ shopTypeEnum[scope.row?.shopType - 1]?.label }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-slot:goodsName>
          <el-table-column label="商品名称" width="90px" align="center">
            <template #default="scope">
              <span>{{ scope.row.goodsList[0]?.goodsName}}{{ scope.row.goodsList?.length > 1 ? "..." : "" }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-slot:amount>
          <el-table-column label="商品总价" width="90px" align="center">
            <template #default="scope">
              <span v-if="scope?.row?.shopType != 3">
                {{ scope.row.goodsList[0]?.amount }}
                {{ scope.row.currency }}
                {{ scope.row.goodsList?.length > 1 ? "..." : "" }}</span
              >
            </template>
          </el-table-column>
        </template>
        <template v-slot:logisticsOrderNo>
          <el-table-column label="出境物流单号" width="90px" align="center">
            <template #default="scope">
              <span
                >{{ scope.row.logisticsList[0]?.logisticsOrderNo
                }}{{ scope.row.logisticsList?.length > 1 ? "..." : "" }}</span
              >
            </template>
          </el-table-column>
        </template>
        <template v-slot:logisticsMode>
          <el-table-column label="物流方式" width="90px" align="center">
            <template #default="scope">
              <span
                >{{
                  LogisticsModeList.get(
                    scope.row.logisticsList[0]?.logisticsMode
                  )
                }}{{ scope.row.logisticsList?.length > 1 ? "..." : "" }}</span
              >
            </template>
          </el-table-column>
        </template>
        <template v-slot:logisticsCompany>
          <el-table-column label="物流承运商" width="90px" align="center">
            <template #default="scope">
              <span
                >{{ scope.row.logisticsList[0]?.logisticsCompany
                }}{{ scope.row.logisticsList?.length > 1 ? "..." : "" }}</span
              >
            </template>
          </el-table-column>
        </template>
        <template v-slot:payerName>
          <el-table-column label="关联付款方" width="90px" align="center">
            <template #default="scope">
              <span>{{ scope.row.payerName.join(",") }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-slot:status>
          <el-table-column label="订单审核状态" width="90px" align="center">
            <template #default="scope">
              <div :class="scope.row.status">
                {{
                  scope.row.status === "SUCCESS"
                    ? "审核通过"
                    : scope.row.status === "FAIL"
                    ? "审核不通过"
                    : "审核中"
                }}
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-slot:operation>
          <el-table-column
            label="操作"
            fixed="right"
            width="90px"
            align="center"
          >
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click="editHandel(scope.row)"
                >{{ scope.row.status === "FAIL" ? "修改" : "详情" }}</el-button
              >
            </template>
          </el-table-column>
        </template>
      </yk-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from "vue";
import { request } from "@/service/http";
import { baseStore } from "@/store/base";
import YkForm from "@/components/yk-form.vue";
import YkTable from "@/components/yk-table.vue";
import { useRouter } from "vue-router";
import { orderColumns, orderSearchItems } from "./data";
import { getShopTypeEnumAPI } from "@/api/enum";
import { useEnumStore } from "@/store/enum";

const router = useRouter();
const baseInfoStore = baseStore();
const orderSearchParams = reactive({
  dateRange: [],
  customOrderId: "",
  logisticsOrderNo: "",
  status: "",
});
const shopTypeEnum = ref();
const ENUM = useEnumStore();

const LogisticsModeMap = ref(new Map());

const LogisticsModeList = computed(() => LogisticsModeMap.value);

let tableTotal = ref<number>(0);
let pageSize = ref<number>(10);
let currentPage = ref<number>(1);
const editHandel = async (row: any) => {
  let res: any = await request(
    "get",
    `/abroad-merchant/front/order/${
      row.status === "FAIL" ? "updateView" : "detail"
    }`,
    { orderId: row.orderId }
  );
  if (res && res.code === 200) {
    baseInfoStore.$state.orderDetail = res.data;
    if (row.status === "FAIL") {
      //进入修改页面
      router.push({
        path: "/abroad/order/apply",
        query: {
          orderId: row.orderId,
        },
      });
    } else {
      //进入详情页面
      router.push({
        path: "/abroad/order/details",
        query: { orderNo: row.orderId },
      });
    }
  }
};
//初始化获取表格数据
const tableData = ref([]);
async function getOrderList() {
  orderSearchParams.dateRange = orderSearchParams.dateRange || [];
  let res: any = await request("POST", "/abroad-merchant/front/order/list", {
    ...orderSearchParams,
    dateRange:
      orderSearchParams.dateRange && orderSearchParams.dateRange.length
        ? `${orderSearchParams.dateRange[0]} ~ ${orderSearchParams.dateRange[1]}`
        : "",
    pageSize: pageSize.value,
    pageNumber: currentPage.value,
  });
  tableData.value = res && res.data.records;
  tableTotal.value = res && res.data.total;
}
getOrderList();

const sizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  getOrderList();
};

const currentChange = (page: number) => {
  currentPage.value = page;
  getOrderList();
};

onMounted(async () => {
  shopTypeEnum.value = await getShopTypeEnumAPI();

  for (const logistic of ENUM.LOGISTICS_MODE) {
    LogisticsModeMap.value.set(logistic.key, logistic.label);
  }
});
</script>

<style lang="scss" scoped>
.abroad-order-page {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    box-sizing: border-box;
    min-height: 100%;
    background: #ffffff;
    box-shadow: 0px 10px 12px 0px rgba(167, 210, 243, 0.08);
    border-radius: 20px;
    padding: 20px 40px;
    overflow-x: auto;
    .search-button {
      width: 108px;font-size: 16px;
    }
    .abroad-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #ecf2f5;
      margin-bottom: 20px;
      > h3 {
        font-size: 20px;
        font-weight: bold;
        padding: 0;
        color: #25343c;
        span {
          font-size: 14px;
          color: #97a7b2;
        }
      }
      .export-button {
        background: #c2e3ff;
        color: #1085e8;
        border: none;
      }
    }
    .line {
      height: 1px;
      background-color: #ecf2f5;
    }
  }
  .WAIT {
    color: #a7b4bd;
  }
  .SUCCESS {
    color: #65b734;
  }
  .FAIL {
    color: #ff5d37;
  }
}
</style>
