<template>
  <div class="convert-record-page">
    <div class="content">
      <div class="account-title">
        <h3>换汇记录</h3>
      </div>
      <yk-form ref="convertSearch" labelWidth="auto" size="large" :inline="true" :formItems="formSearchItems"
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
          换汇记录列表&nbsp;&nbsp;
          <!-- <span>美元换人民币实时汇率&nbsp;<span style="color:#FF8400">1:{{ listRate }}</span></span> -->
        </h3>
        <el-button type="primary" style="font-size: 16px;" plain @click="send">发起换汇</el-button>
      </div>
      <ykTable size="small" :columns="columns" :pageCount="pageCount"  :tableData="tableData" @size-change="sizeChange"
        @current-change="currentChange" :pageSize="pageSize" :total="tableTotal" :currentPage="currentPage">
        <template v-slot:createTime>
          <el-table-column align="center" label="申请时间">
            <template #default="scope">
              <span>{{ scope.row.createTime.replace('T', ' ') }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-slot:exchangeStatus>
          <el-table-column align="center" label="换汇状态">
            <template #default="scope">
              <span :class="`exchangeStatus${scope.row.exchangeStatus}`">{{ exchangeStatus[scope.row.exchangeStatus]
              }}</span>
            </template>
          </el-table-column>
        </template>
      </ykTable>
    </div>
    <el-dialog v-model="convertVisible" title="发起换汇" width="600px">
      <div style="padding:0 20px">
        <el-form ref="convertRulesForm" :model="convertForm" :rules="checkInput" label-position="left" label-width="160px">
        <el-form-item prop="fromCurrency" label="请选择要卖出的币种">
          <el-select v-model="convertForm.fromCurrency" style="width: 100%;" placeholder="请选择要卖出的币种" size="large">
            <el-option v-for="item in fromCurrencyOptions" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="accountAmount" label="卖出币种的可换汇金额">
          <el-input v-model="convertForm.accountAmount" placeholder="Please input" disabled />
        </el-form-item>
        <el-form-item prop="toCurrency" label="请选择要买入的币种">
          <el-select v-model="convertForm.toCurrency" style="width: 100%;" placeholder="请选择要买入的币种" size="large">
              <el-option v-for="item in toCurrencyOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <!-- <el-form-item prop="exchangeRate">
          <div class="row">
            <div class="tips">
              <div>实时参考汇率：</div>
              <div class="tip1">{{ lastRefreshTime ? lastRefreshTime : '' }}</div>
            </div>
            <el-input v-model="convertForm.exchangeRate" placeholder="Please input" disabled />
          </div>
        </el-form-item> -->
        <el-form-item prop="amount" label="请输入卖出金额">
          <el-input v-model="convertForm.amount" v-limit-input-number="{}" placeholder="该金额需大于0，且不可超过换汇余额" />
        </el-form-item>
      </el-form>
      </div>
      <template #footer>
          <el-button type="primary" style="width:168px;height: 58px;" plain @click="convertVisible = false">取消</el-button>
          <el-button type="primary" style="width:168px;height: 58px;" @click="convert(convertRulesForm)" :loading="loadingConvert">立即换汇</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { request } from "@/service/http";
import YkForm from "@/components/yk-form.vue";
import YkTable from "@/components/yk-table.vue";
import { columns, formSearchItems } from "./data";
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const convertRulesForm = ref<FormInstance>();
const fromCurrency = ref('')
const toCurrency = ref('')
const amount = ref('')
const listRate = ref('')
const accountAmount = ref('')
const exchangeRate = ref('')
const lastRefreshTime = ref('')
const loadingConvert = ref(false)
const checkInput = reactive<FormRules>({
  fromCurrency: [
    {
      required: true,
      message: '请选择要卖出的币种',
      trigger: 'blur',
    },
  ],
  toCurrency: [
    {
      required: true,
      message: '请选择要买入的币种',
      trigger: 'blur',
    },
  ],
  amount: [
    { required: true, message: '请输入卖出金额', trigger: 'blur' },
  ]
})

const fromCurrencyOptions = [
  {
    value: 'USD',
    label: 'USD(美元)',
  }
]

const toCurrencyOptions = [
  {
    value: 'CNY',
    label: 'CNY(人民币)',
  }
]

const convertSearch: any = ref(null);
const convertVisible = ref(false);
const formSearchParams = reactive({ applyTime: '', fromCurrency: '', toCurrency: '', exchangeOrderNo: '', exchangeStatus: '' });

let dialogType = ref("edit");
let tableFormItems = ref<any>([]);
let tableTotal = ref<number>(0);
let pageSize = ref<number>(10);
let currentPage = ref<number>(1);
let pageCount = ref<number>(1);
enum exchangeStatus { '', '换汇处理中', '换汇成功', '换汇失败' }
const formHandel = (type: string) => {
  let validate = convertSearch.value.submitForm();
  getAccountWalletRecord(formSearchParams)
};

const convertForm = reactive({
  fromCurrency: "",
  accountAmount: "",
  toCurrency: "",
  exchangeRate: "",
  amount: ""
});

async function getAccountWalletRecord(formSearchParams: object) {
  formSearchParams.applyTime = formSearchParams.applyTime || ''
  let res: any = await request('POST', '/abroad-merchant/front/accountExchange/recordList', {
    ...formSearchParams,
    applyStartTime: formSearchParams && formSearchParams.applyTime[0],
    applyEndTime:formSearchParams && formSearchParams.applyTime[1],
    pageSize: pageSize.value,
    pageNo: currentPage.value
  })
  if (res.code === 200) {
    tableData.value = res.data.records
    tableTotal.value = res.data.total
    pageCount.value = res.data.pages
  }
  
}

getAccountWalletRecord(formSearchParams)

const sizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  formHandel("scarch");
};

const currentChange = (page: number) => {
  currentPage.value = page;
  formHandel("scarch");
};

const convert = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid: any) => {
    if (valid) {
      if (Number(convertForm.amount) > Number(convertForm.accountAmount)) {
        ElMessage({
          type: 'warning',
          message: '卖出金额超过可换汇金额 ！'
        })
      }
      else if (!(Number(convertForm.amount) > 0)) {
        ElMessage({
          type: 'warning',
          message: '卖出金额需大于0！'
        })
      }
      else {
        loadingConvert.value = true;
        let res: any = await request('POST', '/abroad-merchant/front/accountExchange/create', {
          fromCurrency: "USD",
          toCurrency: "CNY",
          amount: convertForm.amount,
          // exchangeRate: convertForm.exchangeRate,
          exchangeRate: 1.0000,
        })
        loadingConvert.value = false;
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '发起换汇成功！'
          })
          convertForm.amount = '';
          convertForm.fromCurrency='';
          convertForm.toCurrency='';
        }
        convertVisible.value = false
        getAccountWalletRecord(formSearchParams)
      }
    }
  })
}
// getRate()
async function getRate() {
  window.setInterval(async () => {
    let res1: any = await request('GET', '/abroad-merchant/front/accountExchange/getExchangeRate', {
      currencyFrom: 'USD',
      currencyTo: 'CNY',
    })
    if (res1.code === 200) {
      listRate.value = res1.data.rate
    }
  }, 2000)
}

const rate = async () => {
  let res1: any = await request('GET', '/abroad-merchant/front/accountExchange/getExchangeRate', {
    currencyFrom: 'USD',
    currencyTo: 'CNY',
  })
  if (res1.code === 200) {
    convertForm.exchangeRate = res1.data.rate
    lastRefreshTime.value = res1.data.lastRefreshTime
    listRate.value = res1.data.rate
  }
}

const send = async () => {
  convertVisible.value = true;
  let res: any = await request('GET', '/abroad-merchant/front/accountExchange/getAvailableAmount', {
    currencyFrom: 'USD',
  })
  if (res.code === 200) {
    convertForm.accountAmount = res.data;
  }
}

//初始化获取表格数据
const tableData = ref([
  {
    createTime: '',
    referenceNo: '',
    amount: '',
    fromCurrency: '',
    accountAmount: '',
    toCurrency: '',
    exchangeRate: '',
    exchangeStatus: '',
  },
]);
</script>

<style lang="scss" scoped>
.convert-record-page {
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
  .dialog-footer {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  &::v-deep(.el-dialog) {
    border-radius: 20px;

  }

  &::v-deep(.el-dialog__header) {
    border-bottom: 1px dashed #deebf1;
    padding-bottom: 15px;
  }

  &::v-deep(.el-dialog__title) {
    font-weight: bold;
    color: #25343C;
    margin-left: 20px;
  }

  &::v-deep(.el-button+.el-button) {
    margin-left: 25px;
  }
  &::v-deep(.el-dialog__footer) {
    border-top:1px solid #E1E8ED;
    text-align: center;
    padding-top: 20px;
    padding-bottom:40px;
    .el-button {
      width: 168px;
      height: 58px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
