<!-- 
  个人用户开户第一步校验
 -->
<template>
  <div class="form-submit-page">
    <div class="message-top">
      <h2>提交开户资料</h2>
      <home-step :step-list="stepList.personStep" :stepActive="1"></home-step>
      <!-- 审核不通过原因 -->
      <div class="no-pass" v-if="applyInfo.merchantCheckStatus === 3">
        <img src="../../../assets/images/warn.png" alt="" /> 审核不通过原因：{{
          applyInfo.comment
        }}
      </div>
      <div class="apply-form">
        <!-- 一、注册基本信息 -->
        <h3>一、注册基本信息</h3>
        <yk-form
          ref="baseInfoFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="baseInfoFormItems"
          :formParams="baseInfo"
        >
        </yk-form>
        <!-- 二、企业法人信息 -->
        <h3>二、企业法人信息</h3>
        <yk-form
          ref="legalInfoFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="legalInfoFormItems"
          :formParams="legalInfo"
        >
          <template #legalInfoImageUrl>
            <div style="display: flex; position: relative">
              <yk-upload
                v-if="['03', '08'].includes(legalInfo.idType)"
                placeholder="证件反面照"
                style="margin-right: 10px"
                :prop="legalInfo.idCardFront"
                :show="legalInfo.idCardFrontShow"
                @on-success="(event: any) => {
                    legalInfo.idCardFront = event.data;
                    legalInfo.idCardFrontShow = event.showUrl;}"
              >
              </yk-upload>

              <yk-upload
                v-if="legalInfo.idType == '01'"
                placeholder="身份证人像面照"
                style="margin-right: 10px"
                :prop="legalInfo.idCardFront"
                :show="legalInfo.idCardFrontShow"
                tip="或上传其他证件反面照"
                ocrType="8"
                valueName="legalInfo.idCardFront"
                @submit="getOCRResult"
                @on-success="(event: any) => {
                    legalInfo.idCardFront = event.data;
                    legalInfo.idCardFrontShow = event.showUrl;}"
              ></yk-upload>

              <yk-upload
                v-if="['03', '08'].includes(legalInfo.idType)"
                placeholder="证件正面照"
                :prop="legalInfo.idCardEnd"
                :show="legalInfo.idCardEndShow"
                @on-success="(event: any) => { 
                  legalInfo.idCardEnd = event.data;
                  legalInfo.idCardEndShow = event.showUrl;
                }"
              ></yk-upload>

              <yk-upload
                v-if="legalInfo.idType == '01'"
                placeholder="身份证国徽面照"
                tip="或上传其他证件正面照"
                valueName="legalInfo.idCardEnd"
                :prop="legalInfo.idCardEnd"
                :show="legalInfo.idCardEndShow"
                @on-success="(event: any) => { 
                  legalInfo.idCardEnd = event.data;
                  legalInfo.idCardEndShow = event.showUrl;
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
        <!-- 下一步按钮 -->
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
import HomeStep from "@/components/home/step.vue";
import YkForm from "@/components/yk-form.vue";
import YkUpload from "@/components/upload.vue";
import { legalInfoFormItems, baseInfoFormItems } from "./data";
import { stepStore } from "@/store/stepStore";
import { personApplyStore } from "@/store/personApplyStore";
import { goBack } from "@/utils/pageControlFuncs";
import { ElMessage } from "element-plus";
import { request } from "@/service/http";

//进度条
const stepList = stepStore();

//store中已存储的开户数据
const baseInfoStore = baseStore();
const applyInfo: any = computed(() => {
  return baseInfoStore.applyInfo;
});

//#region 基本信息部分
//基本信息存储对象
const baseInfo = ref(
  !baseInfoStore.applyInfo.baseInfo
    ? {
        address: "",
        contractEmail: "",
        industry: "",
      }
    : { ...baseInfoStore.applyInfo.baseInfo }
);
//#endregion

//#region 企业法人信息部分
//企业法人信息对象
const legalInfo = ref(
  !baseInfoStore.applyInfo.legalInfo
    ? {
        idType: "01",
        idCardFront: "",
        idCardEnd: "",
        name: "",
        mobile: "",
        idCardNo: "",
        issueDate: "",
        expiryDate: "",
        region: "CN",
        //作为校验字段
        validateTime2: 0,
        legalInfoImageUrl: 0,
      }
    : {
        ...baseInfoStore.applyInfo.legalInfo,
        legalInfoImageUrl: 3,
        validateTime2: 2,
      }
);

//法人身份证是否为长期有效
let legEDateLong = ref(false);
if (applyInfo.value.legalInfo && applyInfo.value.legalInfo.expiryDate === "") {
  legEDateLong.value = true;
}

//改变身份证是否为长期有效
function changeLegEDateLong(value: boolean) {
  legalInfo.value.expiryDate = ""; //value?'':''
  validateLegDate();
}

//在法人信息改变时校验信息
watch(legalInfo.value, async (newVal, oldValue) => {
  if (newVal.idCardEnd && newVal.idCardFront) {
    legalInfo.value.legalInfoImageUrl = 3;
  } else if (newVal.idCardFront) {
    legalInfo.value.legalInfoImageUrl = 4;
  } else if (newVal.idCardEnd) {
    legalInfo.value.legalInfoImageUrl = 5;
  }

  legalInfoFormRule?.value?.validateField("legalInfoImageUrl");
  validateLegDate();
});

//验证身份证有效期填写状态
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

//OCR识别
function getOCRResult(data: any) {
  if (data.success) {
    switch (data.valueName) {
      case "legalInfo.idCardFront": {
        legalInfo.value.name = data.name;
        legalInfo.value.idCardNo = data.idcard;
        break;
      }
    }
  }
}

watch(legEDateLong, (newVal, oldVal) => {
  validateLegDate();
});
//#endregion

//#region 页面跳转和接口调用部分
const router = useRouter();

const baseInfoFormRule: any = ref(null);
const legalInfoFormRule: any = ref(null);
const personApply = personApplyStore();

async function goSecondStep() {
  //校验数据
  let baseInfoValidate = await baseInfoFormRule.value.submitForm();
  let legalInfoValidate = await legalInfoFormRule.value.submitForm();

  //如果数据校验成功，调用接口
  if (baseInfoValidate && legalInfoValidate) {
    //非身份证不进行校验
    if (legalInfo.value.idType !== "01") {
      await oneSubmit();
    } else {
      //身份证校验
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
        await oneSubmit();
      } else {
        ElMessage({
          type: "warning",
          message: "法人姓名、手机号或身份证号有误，鉴权不通过,请检查后再试！",
        });
      }
    }
  }
}
async function oneSubmit() {
  const res = await personApply.applyInfoAtFirstStep(
    applyInfo.value.merchantCheckStatus === 3 ? "put" : "post",
    baseInfo.value,
    legalInfo.value
  );
  if (res === 200) {
    personApply.setSettleInfo(legalInfo.value);
    //接口调用成功进入下一步
    // await personApply.applyInfoAtSecondStep("put", {});
    baseInfoStore.getMerchantApplyInfo();

    router.push({ path: "personSecond" });
  }
}
//#endregion

onMounted(() => {
});
</script>

<style scoped lang="scss">
@import "@/assets/css/apply_from.scss";
</style>
