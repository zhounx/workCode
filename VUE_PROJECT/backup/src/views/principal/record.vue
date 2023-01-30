<template>
  <div class="account-record-page">
    <div class="content">
      <div class="account-title">
        <h3>账户变动记录</h3>
      </div>
      <yk-form
        ref="accountSearch"
        size="large"
        labelWidth="auto"
        :inline="true"
        :formItems="formSearchItems"
        :formParams="formSearchParams"
      >
        <template v-slot:search>
          <el-form-item>
            <el-button
              class="search-button"
              type="primary"
              @click="getAccountWalletRecord(1)"
              >搜索</el-button
            >
          </el-form-item>
        </template>
      </yk-form>
      <div class="line"></div>
      <div class="account-title" style="border: none; margin: 0">
        <h3>
          收款账户变动记录列表<span
            >（展示您的收款账户内的资金变动记录，包括：收款、付款、换汇、提现以及平台收取账户费用等相关记录）</span
          >
        </h3>
        <el-button type="primary" size="large" style="font-size:16px;width: 138px;height: 44px;" plain @click="walletChangeExport">导出记录</el-button>
      </div>
      <ykTable
        size="small"
        :columns="columns"
        :tableData="tableData"
        @size-change="sizeChange"
        @current-change="currentChange"
        :pageSize="pageSize"
        :total="tableTotal"
        :currentPage="currentPage"
      >
        <template v-slot:state>
          <el-table-column align="center" label="状态">
            <template #default="scope">
              <span :class="`state${state[scope.row.state]}`">{{
                scope.row.state
              }}</span>
            </template>
          </el-table-column>
        </template>
        <!-- <template v-slot:operation>
          <el-table-column label="操作" fixed="right" width="90px">
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click="editHandel(scope.row, 'details')"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </template> -->
      </ykTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { request } from "@/service/http";
import { createDownLink } from '@/utils'
import YkForm from "@/components/yk-form.vue";
import YkTable from "@/components/yk-table.vue";
import { columns, formSearchItems, Currency } from "./data";
const accountSearch: any = ref(null);
const formSearchParams = reactive({
  startChangeTime: [],
  currency: "",
  businessType: "",
  state: "",
  receiveSourceAccountNo: "",
  accountFlow: "",
});
let dialogType = ref("edit");
let tableTotal = ref<number>(0);
let pageSize = ref<number>(10);
let currentPage = ref<number>(1);
enum state {
  "",
  "处理中"='1',
  "成功"='2',
  "失败"='3',
}

async function getAccountWalletRecord(page?:number) {
  if(page){
    currentPage.value=page
  }
  formSearchParams.startChangeTime = formSearchParams.startChangeTime||[]
  let { data }: any = await request(
    "POST",
    "/abroad-merchant/front/accountWallet/walletChangeList",
    {
      ...formSearchParams,
      startChangeTime: formSearchParams.startChangeTime[0],
      endChangeTime: formSearchParams.startChangeTime[1],
      pageSize: pageSize.value,
      pageNo: currentPage.value,
    }
  );
  tableData.value = data.records;
  tableTotal.value = data.total
}

async function walletChangeExport() {
  formSearchParams.startChangeTime = formSearchParams.startChangeTime||[]
  await request(
    "POST",
    "/abroad-merchant/front/accountWallet/walletChangeExport",
    {
      ...formSearchParams,
      startChangeTime: formSearchParams.startChangeTime[0],
      endChangeTime: formSearchParams.startChangeTime[1],
      pageSize: pageSize.value,
      pageNo: currentPage.value,
    },'blob'
  ).then((res) => {
    const content = res
    const fileName = '收款账户变动记录'
    createDownLink(content,fileName)
  })
}
getAccountWalletRecord();

const sizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  getAccountWalletRecord();
};
const currentChange = (page: number) => {
  currentPage.value = page;
  getAccountWalletRecord();
};
//初始化获取表格数据
const tableData = ref([]);
</script>

<style lang="scss" scoped>
.account-record-page {
  width: 100%;height: 100%;
  .content {
    width: 100%;
    box-sizing: border-box;
    min-height: 100%;
    background: #ffffff;
    box-shadow: 0px 10px 12px 0px rgba(167, 210, 243, 0.08);
    border-radius: 20px;
    padding: 20px 40px;
    .search-button {
      width: 108px;font-size: 16px;
    }
    .account-title {
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
          font-weight: normal;
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
}
</style>
