<template>
  <div class="form-submit-page">
    <div class="message-top">
      <h2>提交开户资料</h2>
      <home-step :stepActive="2" :stepList="stepList.personStep"></home-step>
      <div class="no-pass" v-if="applyInfo.merchantCheckStatus === 3">
        <img src="../../../assets/images/warn.png" alt="" />审核不通过原因：{{
          applyInfo.comment
        }}
      </div>
      <div class="apply-form">
        <!-- 一、结算账户信息 -->
        <h3>一、结算账户信息</h3>
        <yk-form
          ref="settleInfoFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="settleInfoFormItems"
          :formParams="settleInfo"
        >
          <template #settleType>
            <el-radio-group v-model="settleInfo.settleType">
              <el-radio :label="1">对私结算</el-radio>
            </el-radio-group>
          </template>
          <template #cardImage>
            <yk-upload
              :prop="settleInfo.cardImage"
              :show="settleInfo.cardImageShow"
              v-if="settleInfo.settleType == 1"
              ocrType="9"
              valueName="settleInfo.cardImage"
              @submit="getOCRResult"
              @on-success="(event: any) => { settleInfo.cardImage = event.data }"
            >
            </yk-upload>
          </template>
          <template #bankCode>
            <el-select
              v-model="settleInfo.bankCode"
              placeholder="请选择开户银行"
              style="width: 910px"
            >
              <template v-for="item in bankDataList" :key="item.id">
                <el-option :label="item.label" :value="item.key" />
              </template>
            </el-select>
          </template>

          <template #bankAddress>
            <div>
              <el-select
                v-model="settleInfo.bankProvince"
                placeholder="请选择省"
                @change="getCity($event, 'change')"
                style="width: 296px; margin-right: 10px"
              >
                <template v-for="item in provinceList" :key="item.id">
                  <el-option :label="item.areaName" :value="item.areaCode" />
                </template>
              </el-select>
              <el-select
                v-model="settleInfo.bankCity"
                placeholder="请选择市"
                @change="getCountyList($event, 'change')"
                style="width: 296px; margin-right: 10px"
              >
                <template v-for="item in cityList" :key="item.id">
                  <el-option :label="item.areaName" :value="item.areaCode" />
                </template>
              </el-select>
              <el-select
                v-model="settleInfo.bankArea"
                placeholder="请选择区"
                style="width: 296px"
              >
                <template v-for="item in countyList" :key="item.id">
                  <el-option :label="item.areaName" :value="item.areaCode" />
                </template>
              </el-select>
            </div>
          </template>
        </yk-form>
        <div class="step-button">
          <div style="max-width: 800px">
            <!-- @click.stop="router.push({path:'first'})" -->
            <el-button class="pre-button" type="primary" @click="goBack"
              >上一步</el-button
            >
            <el-button
              class="next-button"
              type="primary"
              @click.stop="goThirdStep"
              >下一步</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox, ElMessage } from "element-plus";
import { watch, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { request } from "@/service/http";
import { baseStore } from "@/store/base";
import HomeStep from "@/components/home/step.vue";
import YkForm from "@/components/yk-form.vue";
import YkUpload from "@/components/upload.vue";
import { settleInfoFormItems } from "./data";
import { stepStore } from "@/store/stepStore";
import { personApplyStore } from "@/store/personApplyStore";

//顶部执行进度条文案设定
const stepList = stepStore();
const personApply = personApplyStore();

const baseInfoStore = baseStore();
baseInfoStore.getBankData();
const bankDataList = computed(() => {
  return baseInfoStore.bankData;
});
const applyInfo: any = computed(() => {
  return baseInfoStore.applyInfo;
});

//#region 结算账户信息
//结算账户信息存储对象
let settleInfo = ref(
  !baseInfoStore.applyInfo.settleInfo
    ? {
        cardholder: "",
        accountMobile: "",
        accountNo: "",
        bankArea: "",
        bankCity: "",
        bankCode: "",
        bankOutlets: "",
        bankProvince: "",
        cardImage: "",
        settleType: 1,

        bankAddress: 0,
        ...personApply.privateSettleInfo,
      }
    : {
        bankAddress: 0,
        ...baseInfoStore.applyInfo.settleInfo,
        ...personApply.privateSettleInfo,
      }
);

function getOCRResult(data: any) {
  if (data.success) {
    switch (data.valueName) {
      case "settleInfo.cardImage": {
        settleInfo.value.accountNo = data.bankcardNo;
        break;
      }
    }
  }
}

//监视并更新地址开户行地址
watch(settleInfo.value, (newVal, oldValue) => {
  initBankAddress();
  settleInfoFormRule?.value?.validateField("cardImage");
});
initBankAddress();
function initBankAddress() {
  if (
    settleInfo.value.bankProvince &&
    settleInfo.value.bankCity &&
    settleInfo.value.bankArea
  ) {
    settleInfo.value.bankAddress = 3;
  } else {
    if (
      settleInfo.value.bankProvince &&
      !settleInfo.value.bankCity &&
      !settleInfo.value.bankArea
    ) {
      settleInfo.value.bankAddress = 1;
    }
    if (
      settleInfo.value.bankProvince &&
      settleInfo.value.bankCity &&
      !settleInfo.value.bankArea
    ) {
      settleInfo.value.bankAddress = 2;
    }
  }
}

//银行地址部分
const provinceList = ref<any>([]);
const cityList = ref<any>([]);
const countyList = ref<any>([]);
getProvince();
async function getProvince() {
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/area",
    { areaLevel: 1 }
  );
  provinceList.value = data;
}
getCity(settleInfo.value.bankProvince, "");
async function getCity(parentCode: string, type: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/area",
    { parentCode: parentCode }
  );
  cityList.value = data;
  if (type === "change") {
    settleInfo.value.bankCity = "";
    settleInfo.value.bankArea = "";
  }
}
getCountyList(settleInfo.value.bankCity, "");
async function getCountyList(parentCode: string, type: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/area",
    { parentCode: parentCode }
  );
  countyList.value = data;
  if (type === "change") {
    settleInfo.value.bankArea = "";
  }
}
//#endregion

//#region 页面跳转和调用接口
const router = useRouter();
//返回第一步
async function goBack() {
  ElMessageBox.confirm("当前填写的内容未保存，确定返回上一步吗?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    // await personApply.applyInfoAtSecondStep("put", {});
    // baseInfoStore.applyInfo.settleInfo = null;
    router.push({ path: "personFirst" });
  });
}

const settleInfoFormRule: any = ref(null);

async function goThirdStep() {
  let settleInfoValidate = await settleInfoFormRule.value.submitForm();
  if (settleInfoValidate) {
    let checkFourRes: any = await request(
      "GET",
      "/abroad-merchant/front/baseweb/thirdpart/auth/bankcard/F4",
      {
        bankcard: settleInfo?.value?.accountNo,
        idcard: baseInfoStore.applyInfo?.legalInfo?.idCardNo,
        mobile: settleInfo?.value?.accountMobile,
        name: baseInfoStore.applyInfo?.legalInfo.name,
      }
    );

    if (checkFourRes?.code === 200) {
      let res: any = await personApply.applyInfoAtSecondStep(
        applyInfo.value.merchantCheckStatus === 3 ? "put" : "post",
        settleInfo.value
      );
      if (res === 200) {
        baseInfoStore.getMerchantApplyInfo();
        router.push({ path: "personThird" });
      }
    } else {
      ElMessage({
        type: "warning",
        message: "法人信息与银行预留信息不一致，请检查后再试！",
      });
    }
  }
}

//#endregion
</script>

<style scoped lang="scss">
@import "@/assets/css/apply_from.scss";
</style>
