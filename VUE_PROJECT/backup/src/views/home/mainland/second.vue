<template>
  <div class="form-submit-page">
    <div class="message-top">
      <h2>提交开户资料</h2>
      <home-step :stepActive="2" :step-list="stepList.mainlandStep"></home-step>
      <div class="no-pass" v-if="applyInfo.merchantCheckStatus === 3">
        <img src="../../../assets/images/warn.png" alt="" />审核不通过原因：{{
          applyInfo.comment
        }}
      </div>
      <div class="apply-form">
        <!-- 一、企业董事信息 -->
        <h3>一、企业法人信息</h3>
        <yk-form
          ref="legalInfoFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="legalInfoFormItems"
          :formParams="legalInfo"
        >
          <template #legalInfoImageUrl>
            <div style="display: flex">
              <yk-upload
                v-if="['03', '08'].includes(legalInfo.idType)"
                placeholder="证件反面照"
                style="margin-right: 10px"
                :prop="legalInfo.idCardFront"
                :show="legalInfo.idCardFrontShow"
                @on-success="(event: any) => {
                    legalInfo.idCardFront = event.data;
                    legalInfo.idCardFrontShow = event.showUrl;
                    legalInfoFormRule?.validateField('legalInfoImageUrl');}"
              >
              </yk-upload>
              <yk-upload
                v-if="legalInfo.idType == '01'"
                placeholder="身份证人像面照"
                style="margin-right: 10px"
                tip="或上传其他证件反面照"
                :prop="legalInfo.idCardFront"
                :show="legalInfo.idCardFrontShow"
                ocrType="8"
                valueName="legalInfo.idCardFront"
                @submit="getOCRResult"
                @on-success="(event: any) => {
                    legalInfo.idCardFront = event.data;
                    legalInfo.idCardFrontShow = event.showUrl;
                    legalInfoFormRule?.validateField('legalInfoImageUrl');}"
              ></yk-upload>
              <yk-upload
                v-if="['03', '08'].includes(legalInfo.idType)"
                placeholder="证件正面照"
                :prop="legalInfo.idCardEnd"
                :show="legalInfo.idCardEndShow"
                @on-success="(event: any) => { 
                  legalInfo.idCardEnd = event.data;
                  legalInfo.idCardEndShow = event.showUrl;
                  legalInfoFormRule?.validateField('legalInfoImageUrl')
                }"
              ></yk-upload>
              <yk-upload
                v-if="legalInfo.idType == '01'"
                placeholder="身份证国徽面照"
                tip="或上传其他证件正面照"
                :prop="legalInfo.idCardEnd"
                :show="legalInfo.idCardEndShow"
                valueName="legalInfo.idCardEnd"
                @on-success="(event: any) => { 
                  legalInfo.idCardEnd = event.data;
                  legalInfo.idCardEndShow = event.showUrl;
                  legalInfoFormRule?.validateField('legalInfoImageUrl') 
                }"
              ></yk-upload>
            </div>
          </template>
          <template #validateTime>
            <div style="display: flex">
              <el-date-picker
                v-model="legalInfo.issueDate"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择开始时间"
              />
              <span style="margin: 0 3px; color: #dcdfe6">-</span>
              <el-date-picker
                v-model="legalInfo.expiryDate"
                @change="legEDateLong = false"
                :disabled="legEDateLong"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择结束时间"
              />
              <el-checkbox
                v-model="legEDateLong"
                label="长期"
                @change="changeLegEDateLong"
                style="margin-left: 8px"
                size="small"
              />
            </div>
          </template>
        </yk-form>
        <!-- 二、结算账户信息 -->
        <h3>二、结算账户信息</h3>
        <yk-form
          ref="settleInfoFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="settleInfoFormItems"
          :formParams="settleInfo"
        >
          <template #settleType>
            <el-radio-group
              v-model="settleInfo.settleType"
              @change="changeSettleType"
            >
              <el-radio :label="2">对公结算</el-radio>
              <el-radio :label="1">对私结算</el-radio>
            </el-radio-group>
          </template>
          <template #cardImage>
            <yk-upload
              :prop="settleInfo.cardImage"
              :show="settleInfo.cardImageShow"
              valueName="settleInfo.cardImage"
              v-if="settleInfo.settleType == 2"
              @on-success="(event: any) => { settleInfo.cardImage = event.data;settleInfoFormRule?.validateField('cardImage') }"
            >
            </yk-upload>
            <yk-upload
              :prop="settleInfo.cardImage"
              :show="settleInfo.cardImageShow"
              v-if="settleInfo.settleType == 1"
              ocrType="9"
              valueName="settleInfo.cardImage"
              @submit="getOCRResult"
              @on-success="(event: any) => { settleInfo.cardImage = event.data;settleInfoFormRule?.validateField('cardImage') }"
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
        <!-- 按钮 -->
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
import {
  settleInfoFormItems1,
  settleInfoFormItems2,
  legalInfoFormItems,
} from "./data";
import { stepStore } from "@/store/stepStore";
import { mainlandApplyStore } from "@/store/mainlandApplyStore";
const mainlandApply = mainlandApplyStore();

const stepList = stepStore();
const baseInfoStore = baseStore();
const applyInfo: any = computed(() => {
  return baseInfoStore.applyInfo;
});

//#region OCR识别
function formatDate(str: any) {
  if (!str || str === "无") {
    return "";
  }
  if (str.length >= 8) {
    const year = str.substr(0, 4);
    const month = str.substr(4, 2);
    const day = str.substr(6, 2);
    return year + "-" + month + "-" + day;
  }
}
function getOCRResult(data: any) {
  if (data.success) {
    switch (data.valueName) {
      case "legalInfo.idCardFront": {
        legalInfo.value.name = data.name;
        legalInfo.value.idCardNo = data.idcard;
        break;
      }
      case "settleInfo.cardImage": {
        settleInfo.value.accountNo = data.bankcardNo;
        break;
      }
    }
  }
}

//#endregion

//#region 企业法人信息部分
let legalInfo = ref(
  !baseInfoStore.applyInfo.legalInfo
    ? {
        expiryDate: "",
        idCardEnd: "",
        idCardFront: "",
        idCardNo: "",
        idType: "01",
        issueDate: "",
        mobile: "",
        name: "",
        region: "CN",

        shares: "",
        //作为校验字段
        legalInfoImageUrl: 0,
        validateTime2: 0,
        referenceNo: "",
      }
    : {
        ...baseInfoStore.applyInfo.legalInfo,
        legalInfoImageUrl: 3,
        validateTime2: 2,
      }
);
let legEDateLong = ref(false);
const changeLegEDateLong = (value: boolean) => {
  legalInfo.value.expiryDate = ""; //value?'':''
  validateLegDate();
};

const mobile = ref("");
const name = ref("");
watch(legalInfo.value, (newVal, oldValue) => {
  if (newVal.idCardEnd && newVal.idCardFront) {
    legalInfo.value.legalInfoImageUrl = 3;
  } else if (newVal.idCardFront) {
    legalInfo.value.legalInfoImageUrl = 4;
  } else if (newVal.idCardEnd) {
    legalInfo.value.legalInfoImageUrl = 5;
  }
  mainlandApply.changeSettleInfo(legalInfo.value);
  if (settleInfo.value.settleType === 1) {
    if (newVal.name !== name.value) {
      settleInfo.value.cardholder = newVal.name;
      name.value = newVal.name;
    }
    if (newVal.mobile !== mobile.value) {
      settleInfo.value.accountMobile = newVal.mobile;
      mobile.value = newVal.mobile;
    }
  }
  legalInfoFormRule?.value?.validateField("legalInfoImageUrl");
  validateLegDate();
});
if (applyInfo.value.legalInfo && applyInfo.value.legalInfo.expiryDate === "") {
  legEDateLong.value = true;
}
function validateLegDate() {
  if (legalInfo.value.issueDate) {
    if (legEDateLong.value || legalInfo.value.expiryDate) {
      legalInfo.value.validateTime2 = 2;
    } else {
      legalInfo.value.validateTime2 = 1;
    }
  } else {
    legalInfo.value.validateTime2 = 0;
  }
}
watch(legEDateLong, (newVal, oldVal) => {
  validateLegDate();
});
//#endregion

//#region 结算账户部分
const defaultInfo =
  applyInfo.value?.settleInfo?.settleType === 1
    ? { ...mainlandApply.privateSettleInfo }
    : { ...mainlandApply.publicSettleInfo };
const settleInfo = ref(
  !baseInfoStore.applyInfo.settleInfo
    ? {
        accountMobile: "",
        accountNo: "",
        bankArea: "",
        bankCity: "",
        bankCode: "",
        bankOutlets: "",
        bankProvince: "",
        cardImage: "",
        cardholder: "",
        settleType: 2,

        bankAddress: 0,
        ...defaultInfo,
      }
    : {
        bankAddress: 0,
        ...applyInfo.value.settleInfo,
      }
);

const settleInfoFormItems = ref<any[]>(
  applyInfo.value?.settleInfo?.settleType === 1
    ? settleInfoFormItems1
    : settleInfoFormItems2
);
baseInfoStore.getBankData();
const bankDataList = computed(() => {
  return baseInfoStore.bankData;
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
watch(settleInfo.value, (newVal, oldValue) => {
  initBankAddress();
});
const changeSettleType = (index: number) => {
  let settleInfoIs =
    applyInfo.value.settleInfo &&
    applyInfo.value.settleInfo.settleType === index;

  settleInfo.value.cardImage = settleInfoIs
    ? applyInfo.value.settleInfo.cardImage
    : "";
  settleInfo.value.cardholder = settleInfoIs
    ? applyInfo.value.settleInfo.cardholder
    : "";
  settleInfo.value.accountNo = settleInfoIs
    ? applyInfo.value.settleInfo.accountNo
    : "";
  settleInfo.value.accountMobile = settleInfoIs
    ? applyInfo.value.settleInfo.accountMobile
    : "";
  settleInfo.value.bankProvince = settleInfoIs
    ? applyInfo.value.settleInfo.bankProvince
    : "";
  settleInfo.value.bankCity = settleInfoIs
    ? applyInfo.value.settleInfo.bankCity
    : "";
  settleInfo.value.bankArea = settleInfoIs
    ? applyInfo.value.settleInfo.bankArea
    : "";
  settleInfo.value.bankOutlets = settleInfoIs
    ? applyInfo.value.settleInfo.bankOutlets
    : "";
  settleInfo.value.bankCode = settleInfoIs
    ? applyInfo.value.settleInfo.bankCode
    : "";

  if (index === 1) {
    settleInfo.value.accountMobile =
      mainlandApply.privateSettleInfo.accountMobile;
    settleInfo.value.cardholder = mainlandApply.privateSettleInfo.cardholder;

    settleInfo.value.settleType = 1;
    settleInfoFormItems.value = settleInfoFormItems1;
  } else {
    settleInfo.value.cardholder = mainlandApply.publicSettleInfo.cardholder;

    settleInfo.value.settleType = 2;
    settleInfoFormItems.value = settleInfoFormItems2;
  }
};
let provinceList = ref<any>([]);
let cityList = ref<any>([]);
let countyList = ref<any>([]);
getProvince();
async function getProvince() {
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/area",
    {
      areaLevel: 1,
    }
  );
  provinceList.value = data;
}
getCity(settleInfo.value.bankProvince, "");
async function getCity(parentCode: string, type: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/area",
    {
      parentCode: parentCode,
    }
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
    {
      parentCode: parentCode,
    }
  );
  countyList.value = data;
  if (type === "change") {
    settleInfo.value.bankArea = "";
  }
}
//#endregion

//#region 页面跳转部分
//校验信息->发送请求->页面跳转
const router = useRouter();
const settleInfoFormRule: any = ref(null);
const legalInfoFormRule: any = ref(null);
const goThirdStep = async () => {
  let settleInfoValidate = await settleInfoFormRule.value.submitForm(); //true;
  let legalInfoValidate = await legalInfoFormRule.value.submitForm();
  if (settleInfoValidate && legalInfoValidate) {
    let checkRes: any = await request(
      "GET",
      "/abroad-merchant/front/baseweb/thirdpart/company/get",
      { creditCode: baseInfoStore.applyInfo.licenseInfo.licenseNumber }
    );

    if (checkRes?.code === 200) {
      if (legalInfo.value.name === checkRes.data.frName) {
        //法人姓名一致
        if (legalInfo.value.idType !== "01") {
          //非身份证不鉴权
          await twoSubmit();
          return;
        } else if (settleInfo.value.settleType === 2) {
          //对公账户3要素鉴权
          let checkThreeRes: any = await request(
            "GET",
            "/abroad-merchant/front/baseweb/thirdpart/auth/mobile/F3",
            {
              idcard: legalInfo.value.idCardNo,
              mobile: legalInfo.value.mobile,
              name: legalInfo.value.name,
            }
          );
          if (checkThreeRes?.code === 200) {
            await twoSubmit();
          } else {
            ElMessage({
              type: "warning",
              message:
                "法人姓名、手机号或身份证号有误，鉴权不通过,请检查后再试！",
            });
          }
        } else {
          //对私4要素鉴权
          let checkFourRes: any = await request(
            "GET",
            "/abroad-merchant/front/baseweb/thirdpart/auth/bankcard/F4",
            {
              bankcard: settleInfo.value.accountNo,
              idcard: legalInfo.value.idCardNo,
              mobile: settleInfo.value.accountMobile,
              name: legalInfo.value.name,
            }
          );
          if (checkFourRes?.code === 200) {
            await twoSubmit();
          } else {
            ElMessage({
              type: "warning",
              message: "法人信息与银行预留信息不一致，请检查后再试！",
            });
          }
        }
      } else {
        ElMessage({
          type: "warning",
          message: "企业法人与营业执照法人不一致，请检查后再试！",
        });
      }
    }
  }
};

async function twoSubmit() {
  let res: any = await mainlandApply.applyInfoAtSecondStep(
    applyInfo.value.merchantCheckStatus === 3 ? "put" : "post",
    legalInfo.value,
    settleInfo.value
  );

  if (res === 200) {
    baseInfoStore.getMerchantApplyInfo();
    router.push({ path: "mainlandThird" });
  }
}
function goBack() {
  ElMessageBox.confirm("当前填写的内容未保存，确定返回上一步吗?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    baseInfoStore.applyInfo.legalInfo = legalInfo.value;
    baseInfoStore.applyInfo.settleInfo = settleInfo.value;
    router.push({ path: "mainlandFirst" });
  });
}

function uploadSuccess(e: any) {
  (event: any) => {
    legalInfo.idCardFront = event.data;
    legalInfo.idCardFrontShow = event.data;
    legalInfoFormRule?.validateField("legalInfoImageUrl");
  };
}
//#endregion
</script>

<style scoped lang="scss">
@import "@/assets/css/apply_from.scss";
</style>
