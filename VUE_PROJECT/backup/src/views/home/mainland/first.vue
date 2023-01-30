<template>
  <div class="form-submit-page">
    <div class="message-top">
      <h2>提交开户资料</h2>
      <home-step
        :step-list="stepList.mainlandStep"
        :step-active="1"
      ></home-step>
      <div class="no-pass" v-if="applyInfo.merchantCheckStatus === 3">
        <img src="../../../assets/images/warn.png" alt="" /> 审核不通过原因：{{
          applyInfo.comment
        }}
      </div>
      <div class="apply-form">
        <!-- 一、营业执照信息 -->
        <h3>一、营业执照信息</h3>
        <yk-form
          ref="licenseInfoFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="licenseInfoFormItems"
          :formParams="licenseInfo"
        >
          <template #imageUrl>
            <yk-upload
              :prop="licenseInfo.imageUrl"
              :show="licenseInfo.imageUrlShow"
              ocrType="10"
              valueName="licenseInfo.imageUrl"
              @on-success="(event:any)=>{licenseInfo.imageUrl=event.data;licenseInfoFormRule?.validateField('imageUrl')}"
              @submit="getOCRResult"
            ></yk-upload>
          </template>
          <template #legalHolderImage>
            <yk-upload
              :prop="licenseInfo.legalHolderImage"
              :show="licenseInfo.legalHolderImageShow"
              @on-success="(event:any)=>{licenseInfo.legalHolderImage=event.data;licenseInfoFormRule?.validateField('legalHolderImage')}"
            ></yk-upload>
          </template>
          <template #validateTime>
            <div style="display: flex; align-items: flex-start">
              <el-date-picker
                v-model="licenseInfo.issueDate"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择开始时间"
              />
              <span style="margin: 0 3px; color: #dcdfe6">-</span>
              <el-date-picker
                v-model="licenseInfo.expiryDate"
                @change="licEDateLong = false"
                :disabled="licEDateLong"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择结束时间"
              />
              <el-checkbox
                v-model="licEDateLong"
                label="长期"
                @change="changeLicEDateLong"
                style="margin-left: 8px"
                size="small"
              />
            </div>
          </template>
        </yk-form>
        <!-- 二、企业基础信息 -->
        <h3>二、企业基础信息</h3>
        <yk-form
          ref="baseInfoFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="baseInfoFormItems"
          :formParams="baseInfo"
        >
          <template #structureImage>
            <div style="display: flex">
              <yk-upload
                placeholder="上传照片"
                style="margin-right: 10px"
                :prop="baseInfo.structureImage"
                :show="baseInfo.structureImageShow"
                @on-success="(event:any)=>{baseInfo.structureImage=event.data;baseInfoFormRule?.validateField('structureImage')}"
              ></yk-upload>
            </div>
          </template>
          <template #receptionImage>
            <div style="display: flex">
              <yk-upload
                placeholder="上传照片"
                style="margin-right: 10px"
                :prop="baseInfo.receptionImage"
                :show="baseInfo.receptionImageShow"
                @on-success="(event:any)=>{baseInfo.receptionImage=event.data;baseInfoFormRule?.validateField('receptionImage')}"
              ></yk-upload>
            </div>
          </template>
          <template #officeEnvImage>
            <div style="display: flex">
              <yk-upload
                placeholder="上传照片"
                style="margin-right: 10px"
                :prop="baseInfo.officeEnvImage"
                :show="baseInfo.officeEnvImageShow"
                @on-success="(event:any)=>{baseInfo.officeEnvImage=event.data;baseInfoFormRule?.validateField('officeEnvImage')}"
              ></yk-upload>
            </div>
          </template>
          <template #storehouseImage>
            <div style="display: flex">
              <yk-upload
                placeholder="上传照片"
                style="margin-right: 10px"
                :prop="baseInfo.storehouseImage"
                :show="baseInfo.storehouseImageShow"
                @on-success="(event:any)=>{baseInfo.storehouseImage=event.data;baseInfoFormRule?.validateField('storehouseImage')}"
              ></yk-upload>
            </div>
          </template>
          <template #empty>
            <div style="display: flex"></div>
          </template>
        </yk-form>
        <!-- 按钮 -->
        <div class="step-button">
          <div style="max-width: 800px">
            <el-button class="pre-button" type="primary" @click="goBack(router)"
              >上一步</el-button
            >
            <el-button
              class="next-button"
              type="primary"
              @click.stop="goSecondStep"
              >下一步</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { baseStore } from "@/store/base";
import { request } from "@/service/http";
import HomeStep from "@/components/home/step.vue";
import YkForm from "@/components/yk-form.vue";
import YkUpload from "@/components/upload.vue";
import { licenseInfoFormItems, baseInfoFormItems } from "./data";
import { stepStore } from "@/store/stepStore";
import { mainlandApplyStore } from "@/store/mainlandApplyStore";
import { goBack } from "@/utils/pageControlFuncs";
import { ElMessage } from "element-plus";

onMounted(async () => {
  await baseInfoStore.getMerchantApplyInfo();
});

const stepList = stepStore();

const baseInfoStore = baseStore();
const applyInfo: any = computed(() => {
  return baseInfoStore.applyInfo;
});
const mainlandApply = mainlandApplyStore();

//#region 营业执照部分
let licenseInfo = ref(
  !baseInfoStore.applyInfo.licenseInfo
    ? {
        address: "",
        businessRange: "",
        expiryDate: "",
        imageUrl: "",
        issueDate: "",
        licenseName: "",
        licenseNumber: "",
        legalName: "",
        validateTime1: 0,
      }
    : { ...baseInfoStore.applyInfo.licenseInfo, validateTime1: 2 }
);

let licEDateLong = ref(false);
if (
  applyInfo.value.licenseInfo &&
  applyInfo.value.licenseInfo.expiryDate === ""
) {
  licEDateLong.value = true;
}
function changeLicEDateLong(value: boolean) {
  licenseInfo.value.expiryDate = ""; //value?'':''
  validateLicDate();
}
watch(licenseInfo.value, (newVal, oldValue) => {
  validateLicDate();
});
function validateLicDate() {
  if (licenseInfo.value.issueDate) {
    if (licEDateLong.value || licenseInfo.value.expiryDate) {
      licenseInfo.value.validateTime1 = 2;
    } else {
      licenseInfo.value.validateTime1 = 1;
    }
  } else {
    licenseInfo.value.validateTime1 = 0;
  }
}
watch(licEDateLong, (newVal, oldVal) => {
  validateLicDate();
});
function formatDate(str: any) {
  if (!str || str === "无") {
    return "";
  }
  if (str.length >= 8) {
    const year = str.substr(0, 4);
    const month = str.substr(5, 2);
    const day = str.substr(8, 2);
    return year + "-" + month + "-" + day;
  }
}
function getOCRResult(data: any) {
  if (data.success) {
    switch (data.valueName) {
      case "licenseInfo.imageUrl": {
        licenseInfo.value.licenseName = data.name;
        licenseInfo.value.licenseNumber = data.licenseNo;
        licenseInfo.value.address = data.address;
        licenseInfo.value.issueDate = formatDate(data.startDate);
        licenseInfo.value.expiryDate = formatDate(data.endDate);
        licenseInfo.value.legalName = data.legalName;
        mainlandApply.licenseOCR(data);

        let end;
        if (data.endDate) {
          if (
            data.endDate.includes("长期") ||
            data.endDate.includes("不约定期限") ||
            data.endDate.includes("永久")
          ) {
            end = "2099-12-30";
          } else {
            end = formatDate(data.endDate);
          }
        }
        licenseInfo.value.expiryDate = end === "2099-12-30" ? "" : end;
        licEDateLong.value = end === "2099-12-30";
        break;
      }
    }
  }
}
//#endregion

//#region 企业基本信息
let baseInfo = ref(
  !baseInfoStore.applyInfo.baseInfo
    ? {
        address: "",
        businessScale: 1,
        businessScope: "US",
        businessVolume: 3,
        businessWeb: "",
        category: "",
        contractEmail: "",
        contractNumber: "",
        industry: "",
        officeEnvImage: "",
        receptionImage: "",
        region: "CN",
        storehouseImage: "",
        structureImage: "",
        nameEn: "",
      }
    : { ...baseInfoStore.applyInfo.baseInfo }
);
//#endregion

//#region 页面跳转,调用接口
const licenseInfoFormRule: any = ref(null);
const baseInfoFormRule: any = ref(null);
const router = useRouter();

const goSecondStep = async () => {
  let licenseInfoValidate = await licenseInfoFormRule.value.submitForm();
  let baseInfoValidate = await baseInfoFormRule.value.submitForm();
  if (licenseInfoValidate && baseInfoValidate) {
    let checkRes: any = await request(
      "GET",
      "/abroad-merchant/front/baseweb/thirdpart/company/get",
      { creditCode: licenseInfo.value.licenseNumber }
    );

    if (checkRes?.code === 200) {
      let res: any = await mainlandApply.applyInfoAtFirstStep(
        applyInfo.value.merchantCheckStatus === 3 ? "put" : "post",
        licenseInfo.value,
        baseInfo.value
      );

      if (res === 200) {
        await baseInfoStore.getMerchantApplyInfo();
        mainlandApply.setSettleInfo(baseInfoStore.applyInfo);
        router.push({ path: `mainlandSecond` });
      }
    } else {
      ElMessage({
        type: "error",
        message: "营业执照鉴权不通过, 请重新确认营业执照编号!",
      });
    }
  }
};
//#endregion
</script>

<style scoped lang="scss">
@import "@/assets/css/apply_from.scss";
</style>
