<template>
  <div class="form-submit-page">
    <div class="message-top">
      <h2>提交开户资料</h2>
      <home-step :step-list="stepList.hongkongStep"></home-step>
      <div class="no-pass" v-if="applyInfo.merchantCheckStatus === 3">
        <img src="../../../assets/images/warn.png" alt="" /> 审核不通过原因：{{
          applyInfo.comment
        }}
      </div>
      <div class="apply-form">
        <!-- 一、营业执照信息 -->
        <h3>一、营业执照信息</h3>
        <yk-form
          ref="hklicenseInfoFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="hkLicenseInfoFormItems"
          :formParams="licenseInfo"
        >
          <template #registerCrImage>
            <yk-upload
              :prop="licenseInfo.registerCrImage"
              :show="licenseInfo.registerCrImageShow"
              @on-success="(event:any)=>{licenseInfo.registerCrImage=event.data;
                hklicenseInfoFormRule?.validateField('registerCrImage')}"
            ></yk-upload>
          </template>
          <template #businessBrImage>
            <yk-upload
              :prop="licenseInfo.businessBrImage"
              :show="licenseInfo.businessBrImageShow"
              @on-success="(event:any)=>{licenseInfo.businessBrImage=event.data;
                hklicenseInfoFormRule?.validateField('businessBrImage')}"
            ></yk-upload>
          </template>
          <template #legalsTableImage>
            <yk-upload
              :prop="licenseInfo.legalsTableImage"
              :show="licenseInfo.legalsTableImageShow"
              @on-success="(event:any)=>{licenseInfo.legalsTableImage=event.data;
                hklicenseInfoFormRule?.validateField('legalsTableImage')}"
            ></yk-upload>
          </template>
          <template #ceoHolderImage>
            <yk-upload
              :prop="licenseInfo.ceoHolderImage"
              :show="licenseInfo.ceoHolderImageShow"
              @on-success="(event:any)=>{licenseInfo.ceoHolderImage=event.data;
                hklicenseInfoFormRule.validateField('ceoHolderImage')}"
            ></yk-upload>
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
                @on-success="(event:any)=>{baseInfo.structureImage=event.data;
                baseInfoFormRule?.validateField('structureImage')
                }"
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
                @on-success="(event:any)=>{baseInfo.receptionImage=event.data;
                baseInfoFormRule?.validateField('receptionImage')
                }"
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
                @on-success="(event:any)=>{baseInfo.officeEnvImage=event.data;
                baseInfoFormRule?.validateField('officeEnvImage')
                }"
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
                @on-success="(event:any)=>{baseInfo.storehouseImage=event.data;
                baseInfoFormRule?.validateField('storehouseImage')
                }"
              ></yk-upload>
            </div>
          </template>
        </yk-form>
        <!-- 底部按钮 -->
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { baseStore } from "@/store/base";
import HomeStep from "@/components/home/step.vue";
import YkForm from "@/components/yk-form.vue";
import YkUpload from "@/components/upload.vue";
import { hkLicenseInfoFormItems, baseInfoFormItems } from "./data";
import { stepStore } from "@/store/stepStore";
import { hongkongApplyStore } from "@/store/hongkongApplyStore";
import { goBack } from "@/utils/pageControlFuncs";
import { ElMessage } from "element-plus";

const stepList = stepStore();
const baseInfoStore = baseStore();

//#region 营业执照部分
const licenseInfo = ref(
  !baseInfoStore.applyInfo.hkLicenseInfo
    ? {
        businessBrImage: "",
        ceoHolderImage: "",
        companyAddress: "",
        companyBusinessCode: "",
        companyCnName: "",
        companyEnName: "",
        companyRegisterCode: "",
        legalsTableImage: "",
        registerCrImage: "",
      }
    : { ...baseInfoStore.applyInfo.hkLicenseInfo }
);
//#endregion

//#region 企业基础信息部分
const baseInfo = ref(
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
      }
    : { ...baseInfoStore.applyInfo.baseInfo }
);
//#endregion

//#region 页面跳转部分
//验证数据->调用接口->下一页
const hklicenseInfoFormRule: any = ref(null);
const baseInfoFormRule: any = ref(null);

const router = useRouter();

const applyInfo: any = computed(() => {
  return baseInfoStore.applyInfo;
});

const hongkongApply = hongkongApplyStore();

const goSecondStep = async () => {
  const hklicenseInfoValidate = await hklicenseInfoFormRule.value.submitForm();
  const baseInfoValidate = await baseInfoFormRule.value.submitForm();
  if (hklicenseInfoValidate && baseInfoValidate) {
    const res: any = await hongkongApply.applyInfoAtFirstStep(
      applyInfo.value.merchantCheckStatus === 3 ? "put" : "post",
      licenseInfo.value,
      baseInfo.value
    );
    if (res === 200) {
      baseInfoStore.getMerchantApplyInfo();
      hongkongApply.setSettleInfo(licenseInfo.value);
      router.push({ path: "hongkongSecond" });
    } else {
      ElMessage({
        type: "warning",
        message: "网络繁忙, 请重试!",
      });
    }
  }
};
//#endregion
</script>

<style scoped lang="scss">
@import "@/assets/css/apply_from.scss";
</style>
