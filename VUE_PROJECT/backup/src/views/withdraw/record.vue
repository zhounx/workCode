<template>
  <div class="withdraw-record-page">
    <div class="content">
      <div class="account-title">
        <h3>提现记录</h3>
      </div>
      <yk-form ref="fetchSearch" size="large" labelWidth="auto" :inline="true" :formItems="formSearchItems"
        :formParams="formSearchParams">
        <template v-slot:search>
          <el-form-item>
            <el-button class="search-button" type="primary" @click="formHandel('search')">搜索</el-button>
          </el-form-item>
        </template>
      </yk-form>
      <div class="line"></div>
      <div class="account-title" style="border: none;margin:0;">
        <h3>
          提现记录列表
        </h3>
        <el-button plain type="primary" @click="router.push({ path: '/withdraw/way' })">发起提现</el-button>
      </div>
      <ykTable size="small" :columns="columns" :tableData="tableData" @size-change="sizeChange"
        @current-change="currentChange" :pageSize="pageSize" :total="tableTotal" :currentPage="currentPage">
        <template v-slot:createTime>
          <el-table-column align="center" label="发起时间">
            <template #default="scope">
              <span>{{ scope.row.createTime.replace('T', ' ') }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-slot:withdrawAmount>
          <el-table-column align="center" label="提现金额">
            <template #default="scope">
              <span>{{ scope.row.withdrawAmount }}{{ scope.row.currency }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-slot:withdrawFee>
          <el-table-column align="center" label="提现手续费">
            <template #header>
                <div>提现手续费<el-tooltip class="box-item" effect="dark" content="提现手续费=跨境入账费+提现服务费" placement="top"><img src = "@/assets/images/icon/question.png" style="width:15px;height:15px;" alt="" /></el-tooltip></div>
            </template>
            <template #default="scope">
              <span>{{ scope.row.withdrawFee }}{{ scope.row.currency }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-slot:withdrawType>
          <el-table-column align="center" label="提现方式">
            <template #default="scope">
              <span>{{ withdrawType[scope.row.withdrawType]
              }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-slot:status>
          <el-table-column align="center" label="提现状态">
            <template #default="scope">
              <span>{{ status[scope.row.status]
              }}</span>
            </template>
          </el-table-column>
        </template>
      </ykTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { request } from "@/service/http";
import YkForm from "@/components/yk-form.vue";
import YkTable from "@/components/yk-table.vue";
import { columns, formSearchItems } from "./data";
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
const router = useRouter();
const fetchSearch: any = ref(null);
const formSearchParams = reactive({ createTime: [], withdrawBankAccount: '', withdrawType: '', status: '' })
let tableTotal = ref<number>(0);
let pageSize = ref<number>(10);
let currentPage = ref<number>(1);
enum withdrawType { '', '普通提现', '结汇提现' }
enum status { '', '审核中', '审核通过', '审核不通过' }
const formHandel = async (type: string) => {
  let validate = await fetchSearch.value.submitForm();
  if (validate) {
    getFetchRecord()
  }
};
async function getFetchRecord() {
  formSearchParams.createTime = formSearchParams.createTime || ''
  let res: any = await request('POST', '/abroad-merchant/front/withdraw/list', {
    ...formSearchParams,
    createTime: [formSearchParams.createTime[0], formSearchParams.createTime[1]],
    pageSize: pageSize.value,
    pageNumber: currentPage.value
  })
  if (res.code === 200) {
    tableData.value = res.data.records
    tableTotal.value = res.data.total
  }

}
const tableData = ref([
  {
    createTime: '',
    withdrawNo: '',
    withdrawBank: '',
    withdrawBankAccount: '',
    withdrawWalletAccount: '',
    withdrawAmount: '',
    withdrawType: '',
    status: '',
    withdrawFee: ''
  },
]);
getFetchRecord()
const sizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  formHandel("scarch");
};
const currentChange = (page: number) => {
  currentPage.value = page;
  formHandel("scarch");
};
</script>

<style lang="scss" scoped>
.withdraw-record-page {
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

      >h3 {
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

}
</style>
