<template>
  <div class="form-submit-page">
    <div class="message-top">
      <h2>提交开户资料</h2>
      <home-step :stepActive="3" :step-list="stepList.hongkongStep"></home-step>
      <div class="no-pass" v-if="applyInfo.merchantCheckStatus === 3">
        <img src="../../../assets/images/warn.png" alt="" /> 审核不通过原因：{{
          applyInfo.comment
        }}
      </div>
      <div class="apply-form">
        <!-- 一、企业股东信息 -->
        <h3>
          一、企业股东信息
          <p class="des">
            （请填写企业占股25%及以上的股东、实际控制人的相关信息；若企业的股东也是企业，请填写对应企业的最终受益人信息）
          </p>
        </h3>
        <div class="shareholderInfo-list">
          <div
            class="shareholderInfo-item"
            v-for="(shareholderInfo, index) in shareholderInfos"
            :key="index"
          >
            <yk-form
              :ref="shareholderInfosFormRule[index]"
              style="max-width: 1100px"
              size="large"
              :inline="true"
              :formItems="shareholderInfosFormItems"
              :formParams="shareholderInfo"
            >
              <template #idCardImageUrl>
                <div style="display: flex">
                  <yk-upload
                    placeholder="身份证人像面照"
                    :prop="shareholderInfo.idCardFront"
                    :show="shareholderInfo.idCardFrontShow"
                    v-if="shareholderInfo.idType == '01'"
                    @on-success="(event: any) => { 
                      shareholderInfo.idCardFront = event.data;
                      shareholderInfo.idCardFrontShow = event.showUrl;
                    }"
                    tip="或上传其他证件反面照"
                    style="margin-right: 10px"
                    ocrType="8"
                    valueName="shareholderInfo.idCardFront"
                    @submit="getOCRResult"
                    @click="getIndex(index)"
                  ></yk-upload>
                  <yk-upload
                    placeholder="证件反面照"
                    :prop="shareholderInfo.idCardFront"
                    :show="shareholderInfo.idCardFrontShow"
                    v-if="['03', '08'].includes(shareholderInfo.idType)"
                    @on-success="(event: any) => { 
                      shareholderInfo.idCardFront = event.data;
                      shareholderInfo.idCardFrontShow = event.showUrl;
                    }"
                    style="margin-right: 10px"
                  >
                  </yk-upload>
                  <yk-upload
                    placeholder="身份证国徽面照"
                    :prop="shareholderInfo.idCardEnd"
                    :show="shareholderInfo.idCardEndShow"
                    tip="或上传其他证件正面照"
                    v-if="shareholderInfo.idType == '01'"
                    @on-success="(event: any) => { 
                      shareholderInfo.idCardEnd = event.data;
                      shareholderInfo.idCardEndShow = event.showUrl;
                    }"
                  ></yk-upload>
                  <yk-upload
                    placeholder="证件正面照"
                    :prop="shareholderInfo.idCardEnd"
                    :show="shareholderInfo.idCardEndShow"
                    v-if="['03', '08'].includes(shareholderInfo.idType)"
                    @on-success="(event: any) => { 
                      shareholderInfo.idCardEnd = event.data;
                      shareholderInfo.idCardEndShow = event.showUrl;
                    }"
                  ></yk-upload>
                </div>
              </template>
            </yk-form>
            <p
              v-if="index > 0"
              @click="removeShareholderInfo(index)"
              class="remove-shareholderInfo"
            >
              <el-icon><Remove /></el-icon>删除
            </p>
          </div>
          <p
            v-if="shareholderInfosFormRule.length < 4"
            class="add-shareholderInfo"
            @click="addShareholderInfo"
          >
            <el-icon><CirclePlusFilled /></el-icon>添加信息
          </p>
        </div>
        <!-- 二、店铺信息 -->
        <h3>
          二、店铺信息
          <p class="des">
            （若为收款用途为贸易收款，则不需要填写店铺信息；若为收款用途为电商收款，则必须要填写相关店铺信息）
          </p>
        </h3>
        <yk-form
          ref="receiveUseFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="receiveUseFormItems"
          :formParams="receiveUse"
        >
        </yk-form>
        <yk-form
          v-show="receiveUse.receiveUse === 2"
          ref="shopInfoFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="shopInfoItems"
          :formParams="shopInfo"
        >
          <template #categoryType>
            <div>
              <el-select
                v-model="shopInfo.shopCategoryOne"
                placeholder="请选择大类"
                @change="getShopCategoryTwo($event, 'change')"
                style="width: 450px; margin-right: 10px"
              >
                <template v-for="item in categoryLsit" :key="item.id">
                  <el-option :label="item.label" :value="item.key" />
                </template>
              </el-select>
              <el-select
                v-model="shopInfo.shopCategoryTwo"
                placeholder="请选择细类"
                style="width: 450px"
              >
                <template v-for="item in categoryTwoLsit" :key="item.id">
                  <el-option :label="item.label" :value="item.key" />
                </template>
              </el-select>
            </div>
          </template>
          <template #shopType>
            <div>
              <el-select
                style="width: 510px"
                v-model="shopInfo.shopType"
                placeholder="请选择店铺类型"
              >
                <el-option
                  v-for="opItem in shopInfoItems[0].options"
                  :label="opItem['label']"
                  :value="opItem['value']"
                  :key="opItem.value"
                ></el-option>
              </el-select>
            </div>
          </template>
        </yk-form>
        <!-- 三、开户申请表 -->
        <h3>三、开户申请表</h3>
        <div class="third">
          <yk-form
            ref="applyFormInfoFormRule"
            style="max-width: 1100px"
            size="large"
            :inline="true"
            :formItems="applyFormInfoItems"
            :formParams="applyFormInfo"
          >
            <template #accountOpenFormImage>
              <div style="display: flex">
                <yk-upload
                  placeholder="请上传开户申请表"
                  :prop="applyFormInfo.accountOpenFormImage"
                  :show="applyFormInfo.accountOpenFormImageShow"
                  @on-success="(event:any)=>{applyFormInfo.accountOpenFormImage=event.data;
                applyFormInfoFormRule?.validateField('accountOpenFormImage')}"
                ></yk-upload>
              </div>
            </template>
          </yk-form>
          <download-application-form
            class="formFile"
          ></download-application-form>
        </div>

        <!-- 底部按钮 -->
        <div class="step-button">
          <div style="max-width: 800px">
            <el-button class="pre-button" type="primary" @click.stop="goBack"
              >上一步</el-button
            >
            <el-button
              class="next-button"
              type="primary"
              @click.stop="submitApplyInfo"
              >提交</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox, ElMessage } from "element-plus";
import { reactive, ref, computed, Ref, watch, markRaw } from "vue";
import { CirclePlusFilled, Remove } from "@element-plus/icons-vue";
import { baseStore } from "@/store/base";
import { useRouter } from "vue-router";
import { request } from "@/service/http";
import HomeStep from "@/components/home/step.vue";
import YkForm from "@/components/yk-form.vue";
import YkUpload from "@/components/upload.vue";
import {
  shareholderInfosFormItems,
  receiveUseFormItems,
  normalShopInfoItems,
  TiktokInfoFormItems,
  applyFormInfoItems,
} from "./data";
import { stepStore } from "@/store/stepStore";
import { hongkongApplyStore } from "@/store/hongkongApplyStore";
import { nextTick } from "process";
import { Delete } from "@element-plus/icons-vue";
import DownloadApplicationForm from "../components/download-application-form/index.vue";

const stepList = stepStore();
const router = useRouter();
const baseInfoStore = baseStore();
const applyInfo: any = computed(() => {
  return baseInfoStore.applyInfo;
});

//#region 企业股东部分
let shareholderInfos = ref(
  baseInfoStore.applyInfo.shareholderInfos &&
    baseInfoStore.applyInfo.shareholderInfos.length
    ? baseInfoStore.applyInfo.shareholderInfos
    : [
        {
          idCardEnd: "",
          idCardFront: "",
          idCardNo: "",
          idType: "01",
          mobile: "",
          name: "",
          region: "CN",
          shares: "",
          type: "04",

          idCardImageUrl: 0,
          referenceNo: "",
        },
      ]
);

watch(shareholderInfos.value, (newVal, oldValue) => {
  initIdCardImageUrl();
});

initIdCardImageUrl();
function initIdCardImageUrl() {
  for (let item of shareholderInfos.value) {
    if (item.idCardFront && item.idCardEnd) {
      item.idCardImageUrl = 3;
    } else {
      item.idCardImageUrl = 0;
    }
  }
}

function addShareholderInfo() {
  if (shareholderInfosFormRule.value.length < 4) {
    shareholderInfos.value.push({
      idCardEnd: "",
      idCardFront: "",
      idCardNo: "",
      idType: "01",
      mobile: "",
      name: "",
      referenceNo: "",
      region: "CN",
      shares: "",
      type: "04",
      idCardImageUrl: 0,
    });
    shareholderInfosFormRule.value.push(
      ref(`shareholderInfosFormRule${shareholderInfos.length - 1}`)
    );
  }
}

const shareholderIndex = ref(0);
function removeShareholderInfo(index: number) {
  ElMessageBox.confirm(
    "删除后已输入的股东信息不可恢复",
    "确认删除该股东信息?",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "error",
      icon: markRaw(Delete),
    }
  ).then(() => {
    shareholderIndex.value = index;
    shareholderInfos.value.splice(shareholderIndex.value, 1);
    shareholderInfosFormRule.value.splice(shareholderIndex.value, 1);
  });
}

let ocrIndex = "";
function getOCRResult(data: any) {
  if (data.success) {
    switch (data.valueName) {
      case "shareholderInfo.idCardFront": {
        shareholderInfos.value[ocrIndex].name = data.name;
        shareholderInfos.value[ocrIndex].idCardNo = data.idcard;
        break;
      }
    }
  }
}
function getIndex(index: any) {
  ocrIndex = index;
}

//#endregion

//#region 店铺信息部分
const receiveUse = ref({
  receiveUse:
    baseInfoStore.applyInfo.receiveUse > 0
      ? baseInfoStore.applyInfo.receiveUse
      : 2,
});

const shopInfo = ref(
  !baseInfoStore.applyInfo.shopInfo
    ? {
        shopAccount: "",
        shopAccountName: "",
        shopCategoryOne: "",
        shopCategoryTwo: "",
        shopId: "",
        shopName: "",
        shopRegion: "01",
        shopType: 1,
        shopWebUrl: "",

        referenceNo: "",
        categoryType: 0,
      }
    : { ...baseInfoStore.applyInfo.shopInfo, categoryType: 0 }
);

const shopInfoItems = ref<any[]>(
  shopInfo.value.shopType === 3 ? TiktokInfoFormItems : normalShopInfoItems
);

watch(
  () => shopInfo.value.shopType,
  () => {
    if (shopInfo.value.shopType === 3) {
      shopInfoItems.value = TiktokInfoFormItems;
    } else {
      shopInfoItems.value = normalShopInfoItems;
    }
  }
);
watch(shopInfo.value, (newVal, oldValue) => {
  initCategoryType();
});

baseInfoStore.getCategory();
let categoryTwoLsit = ref<any>([]);
const categoryLsit = computed(() => {
  return baseInfoStore.categoryData;
});
initCategoryType();
function initCategoryType() {
  if (shopInfo.value.shopCategoryOne && shopInfo.value.shopCategoryTwo) {
    shopInfo.value.categoryType = 2;
  } else {
    if (!shopInfo.value.shopCategoryTwo) {
      shopInfo.value.categoryType = 1;
    } else {
      shopInfo.value.categoryType = 0;
    }
  }
}

watch(receiveUse.value, (newVal, oldValue) => {
  if (newVal.receiveUse === 1) {
    shopInfoFormRule.value.resetForm();
  }
});

getShopCategoryTwo(shopInfo.value.shopCategoryOne, "");
async function getShopCategoryTwo(parentCode: string, type: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/category",
    { level: 2, parentCode: parentCode }
  );
  categoryTwoLsit.value = data;
  if (type === "change") {
    shopInfo.value.shopCategoryTwo = "";
  }
}
//#endregion

//#region 开户申请表部分
let applyFormInfo = ref(
  !baseInfoStore.applyInfo.accountOpenFormImage
    ? {
        accountOpenFormImage: "",
      }
    : {
        accountOpenFormImage: baseInfoStore.applyInfo.accountOpenFormImage,
        accountOpenFormImageShow:
          baseInfoStore.applyInfo.accountOpenFormImageShow,
      }
);
//#endregion

//#region 提交和页面跳转部分
const receiveUseFormRule: any = ref(null);
const shopInfoFormRule: any = ref(null);
const applyFormInfoFormRule: any = ref(null);
let shareholderInfosFormRule: any = reactive({});
shareholderInfosFormRule = ref<Array<Ref>>([]);
shareholderInfosFormRule.value.push(ref("shareholderInfosFormRule0"));

async function submitApplyInfo() {
  let receiveUseValidate = await receiveUseFormRule.value.submitForm();
  let shopInfoValidate = true;
  if (receiveUse.value.receiveUse === 2) {
    shopInfoValidate = await shopInfoFormRule.value.submitForm();
  } else {
    shopInfoFormRule.value.resetForm();
  }

  let shareholderInfoValidate = await getValidate(
    shareholderInfosFormRule.value
  );
  const applyFormInfoValidate = await applyFormInfoFormRule.value.submitForm();

  if (
    shareholderInfoValidate &&
    receiveUseValidate &&
    shopInfoValidate &&
    applyFormInfoValidate
  ) {
    let shareholderInfosNew = ref<any>([]);
    let countCheck = ref<any>(0);

    shareholderInfos.value.map(async (item: any) => {
      if (item.idType === "01") {
        shareholderInfosNew.value.push(item);
        nextTick(async () => {
          let result = await new Promise(async (resolve, reject) => {
            let checkThreeRes: any = await request(
              "GET",
              "/abroad-merchant/front/baseweb/thirdpart/auth/mobile/F3",
              { idcard: item.idCardNo, mobile: item.mobile, name: item.name }
            );
            if (checkThreeRes?.code === 200) {
              countCheck.value++;
              resolve(true);
            } else {
              resolve(false);
              ElMessage({
                type: "warning",
                message: `股东/实际控制人${item.name}的信息（姓名、手机号或身份证号）有误，鉴权不通过，请检查后再试！`,
              });
            }
          });
          if (result) {
            if (countCheck.value === shareholderInfosNew.value.length) {
              await thirdSubmit();
            }
          }
        });
      }
    });

    if (shareholderInfosNew.value.length === 0) {
      await thirdSubmit();
    }
  }
}

const hkApply = hongkongApplyStore();
async function thirdSubmit() {
  const res: any = await hkApply.applyInfoAtThirdStep(
    applyInfo.value.merchantCheckStatus === 3 ? "put" : "post",
    shareholderInfos.value,
    receiveUse.value.receiveUse,
    receiveUse.value.receiveUse === 1 ? null : shopInfo.value,
    applyFormInfo.value.accountOpenFormImage
  );

  if (res === 200) {
    baseInfoStore.getMerchantApplyInfo();
    router.push({ path: "index" });
  } else {
    ElMessage({
      type: "warning",
      message: "网络繁忙, 请重试!",
    });
  }
}

function getValidate(validateData: any) {
  return new Promise((resolve, reject) => {
    let result: any = [];
    for (let validate of validateData) {
      validate.value[0]
        .submitForm()
        .then((res: boolean) => {
          result.push(res);
        })
        .catch(() => {
          reject(false);
        });
    }
    setTimeout(() => {
      if (result.includes(false)) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function goBack() {
  ElMessageBox.confirm("当前填写的内容未保存，确定返回上一步吗?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    baseInfoStore.applyInfo.shareholderInfos = shareholderInfos.value;
    baseInfoStore.applyInfo.receiveUse = receiveUse.value.receiveUse;
    baseInfoStore.applyInfo.shopInfo = shopInfo.value;
    router.push({ path: "hongkongSecond" });
  });
}
//#endregion
</script>

<style scoped lang="scss">
@import "@/assets/css/apply_from.scss";
.shareholderInfo-list {
  max-width: 1100px;
  width: 100%;
  .shareholderInfo-item {
    width: 100%;
    background: #f5f9fb;
    border-radius: 12px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    position: relative;
    .remove-shareholderInfo {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 80px;
      height: 35px;
      background: #ffddd7;
      border-radius: 29px 1px 12px 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 14px;
      color: #f15b42;
    }
  }
  .add-shareholderInfo {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #e4f3ff;
    border-radius: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #195eff;
    margin-bottom: 20px;
    &:hover {
      background: #d4ebff;
    }
  }
}
.des {
  font-size: 14px;
  font-weight: 400;
  color: #ef8479;
}

.third {
  position: relative;

  .formFile {
    position: absolute;
    top: 20px;
    left: 320px;
  }
}
</style>
