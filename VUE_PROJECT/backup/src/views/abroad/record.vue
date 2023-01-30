<template>
  <div class="abroad-record-page">
    <div class="content">
      <div class="abroad-title">
        <h3>收款记录</h3>
      </div>
      <yk-form
        size="large"
        :inline="true"
        labelWidth="auto" 
        :formItems="abroadSearchItems"
        :formParams="formSearchParams"
      >
        <template v-slot:search>
          <el-form-item>
            <el-button
              class="search-button"
              type="primary"
              @click="searchData()"
              >搜索</el-button
            >
          </el-form-item>
        </template>
      </yk-form>
      <div class="line"></div>
      <div class="abroad-title" style="border: none; margin: 0">
        <h3>记录列表</h3>
      </div>
      <ykTable
        size="small"
        :columns="abroadColumns"
        :tableData="tableData"
        @size-change="sizeChange"
        @current-change="currentChange"
        :pageSize="pageSize"
        :total="tableTotal"
        :currentPage="currentPage"
      >
        <template v-slot:status>
          <el-table-column label="收款状态" width="90px" align="center">
            <template #default="scope">
              <span class="state1">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-slot:serviceFee>
          <el-table-column label="银行手续费" width="120px" align="center">
            <template #header>
                <div>银行手续费<el-tooltip class="box-item" effect="dark" content="银行手续费为汇款过程中，银行收取的手续费" placement="top"><img src = "@/assets/images/icon/question.png" style="width:15px;height:15px;" alt="" /></el-tooltip></div>
            </template>
            <template #default="scope">
              <span class="state1">{{ scope.row.serviceFee }}{{ scope.row.currency }}</span>
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
              <el-button v-if="scope.row.associateStatus == '审核不通过'||scope.row.associateStatus == '待关联'"
                type="text" size="small" @click="orderId=scope.row.id">关联订单 <el-icon><CaretRight /></el-icon></el-button>
            </template>
          </el-table-column>
        </template>
      </ykTable>
    </div>
    <order-dialog :orderId="orderId" @close="orderId=0" @freshen="getRecordList"></order-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { request } from "@/service/http";
import {CaretRight} from '@element-plus/icons-vue'
import YkForm from "@/components/yk-form.vue";
import YkTable from "@/components/yk-table.vue";
import OrderDialog from "../home/components/orderDialog.vue";
import {abroadColumns,abroadSearchItems} from "./data";
const formSearchParams = reactive({
  depositsStartTime: [],
  payerName: "",
  status: "",
  associateOrderNo: "",
  associateOrderStatus: "",
});
let tableTotal = ref<number>(0);
let pageSize = ref<number>(10);
let currentPage = ref<number>(1);
//初始化获取表格数据
const tableData = ref([]);
//获取关联订单单号
let orderId = ref<number>(0)
// 收款记录列表
async function getRecordList() {
  formSearchParams.depositsStartTime = formSearchParams.depositsStartTime || [];
  let { data }: any = await request(
    "POST",
    "/abroad-merchant/front/accountDeposits/recordList",
    {
      ...formSearchParams,
      depositsStartTime: formSearchParams.depositsStartTime[0],
      depositsEndTime: formSearchParams.depositsStartTime[1],
      pageSize: pageSize.value,
      pageNo: currentPage.value,
    }
  );
  tableData.value = data.records;
  tableTotal.value = data.total;
}
getRecordList();

const sizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  getRecordList();
};
const currentChange = (page: number) => {
  currentPage.value = page;
  getRecordList();
};
</script>

<style lang="scss" scoped>
.abroad-record-page {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    min-height: 100%;
    background: #ffffff;
    box-shadow: 0px 10px 12px 0px rgba(167, 210, 243, 0.08);
    border-radius: 20px;
    padding: 20px 40px;
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
    }
    .line {
      height: 1px;
      background-color: #ecf2f5;
    }
  }
  .state1 {
    color: #a7b4bd;
  }
  .state2 {
    color: #65b734;
  }
  .state3 {
    color: #ff5d37;
  }
  .grey {
    color: #666 !important;
  }
}
</style>
