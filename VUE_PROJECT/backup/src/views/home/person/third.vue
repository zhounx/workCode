<template>
  <div class="form-submit-page">
    <div class="message-top">
      <h2>提交开户资料</h2>
      <home-step :stepActive="3" :stepList="stepList.personStep"></home-step>
      <div class="no-pass" v-if="applyInfo.merchantCheckStatus === 3">
        <img src="../../../assets/images/warn.png" alt="" /> 审核不通过原因：{{
          applyInfo.comment
        }}
      </div>
      <div class="apply-form">
        <!-- 一、店铺信息 -->
        <h3>
          一、店铺信息
          <p class="des">
            （若为收款用途为贸易收款，则不需要填写店铺信息；若为收款用途为电商收款，则必须要填写相关店铺信息）
          </p>
        </h3>
        <!-- 收款用途 -->
        <yk-form
          ref="receiveUseFormRule"
          style="max-width: 1100px"
          size="large"
          :inline="true"
          :formItems="receiveUseFormItems"
          :formParams="receiveUse"
        >
        </yk-form>
        <!-- 店铺 -->
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
        <!-- 二、开户申请表 -->
        <h3>二、开户申请表</h3>
        <div class="second">
          <yk-form
            ref="applyFormInfoRule"
            size="large"
            style="max-width: 1100px"
            :inline="true"
            :form-items="applyFormInfoItems"
            :formParams="applyFormInfo"
          >
            <template #accountOpenFormImage>
              <yk-upload
                valueName="applyFormInfo.accountOpenFormImage"
                :prop="applyFormInfo.accountOpenFormImage"
                :show="applyFormInfo.accountOpenFormImageShow"
                @on-success="(event:any)=>{
                applyFormInfo.accountOpenFormImage=event.data; 
                applyFormInfoRule?.validateField('accountOpenFormImage')
              }"
              ></yk-upload>
            </template>
          </yk-form>
          <download-application-form
            class="formFile"
          ></download-application-form>
        </div>

        <!-- 底部按钮部分 -->
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
import { ElMessageBox } from "element-plus";
import { ref, computed, watch } from "vue";
import { baseStore } from "@/store/base";
import { useRouter } from "vue-router";
import { request } from "@/service/http";
import HomeStep from "@/components/home/step.vue";
import YkForm from "@/components/yk-form.vue";
import YkUpload from "@/components/upload.vue";
import {
  receiveUseFormItems,
  applyFormInfoItems,
  normalShopInfoItems,
  TiktokInfoFormItems,
} from "./data";
import { stepStore } from "@/store/stepStore";
import { personApplyStore } from "@/store/personApplyStore";
import DownloadApplicationForm from "../components/download-application-form/index.vue";

const stepList = stepStore();
const baseInfoStore = baseStore();

const applyInfo: any = computed(() => {
  return baseInfoStore.applyInfo;
});

//#region 店铺信息
//收款用途信息
let receiveUse = ref({
  receiveUse:
    baseInfoStore.applyInfo.receiveUse > 0
      ? baseInfoStore.applyInfo.receiveUse
      : 2,
});

//店铺信息
let shopInfo = ref(
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
watch(shopInfo.value, (newVal, oldValue) => {
  initCategoryType();
});
watch(receiveUse.value, (newVal, oldValue) => {
  if (newVal.receiveUse === 1) {
    shopInfoFormRule.value.resetForm();
  }
});

baseInfoStore.getCategory();
let categoryTwoLsit = ref<any>([]);
const categoryLsit = computed(() => {
  return baseInfoStore.categoryData;
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

//#region 个人申请表信息
//申请表信息
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

const applyFormInfoRule: any = ref(null);
//#endregion

//#region 页面跳转和接口调用
const router = useRouter();
const applyPerson = personApplyStore();

function goBack() {
  ElMessageBox.confirm("当前填写的内容未保存，确定返回上一步吗?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    baseInfoStore.applyInfo.receiveUse = receiveUse.value.receiveUse;
    baseInfoStore.applyInfo.shopInfo = shopInfo.value;
    baseInfoStore.applyInfo.applyFormInfo = applyFormInfo.value;
    router.push({ path: "personSecond" });
  });
}

const receiveUseFormRule: any = ref(null);
const shopInfoFormRule: any = ref(null);
async function submitApplyInfo() {
  const receiveUseValidate = await receiveUseFormRule.value.submitForm();
  const applyFormInfoValidate = await applyFormInfoRule.value.submitForm();

  let shopInfoValidate = true;
  if (receiveUse.value.receiveUse === 2) {
    shopInfoValidate = await shopInfoFormRule.value.submitForm();
  } else {
    shopInfoFormRule.value.resetForm();
  }

  if (receiveUseValidate && shopInfoValidate && applyFormInfoValidate) {
    let res: any = await applyPerson.applyInfoAtThirdStep(
      applyInfo.value.merchantCheckStatus === 3 ? "put" : "post",
      receiveUse.value.receiveUse,
      receiveUse.value.receiveUse === 1 ? null : shopInfo.value,
      applyFormInfo.value.accountOpenFormImage
    );

    if (res === 200) {
      baseInfoStore.getMerchantApplyInfo();
      router.push({ path: "index" });
    }
  }
}
//#endregion
</script>

<style scoped lang="scss">
@import "@/assets/css/apply_from.scss";
.shareholderInfo-list {
  max-width: 1050px;
  width: 100%;
  .shareholderInfo-item {
    width: 100%;
    background: #f5f9fb;
    border-radius: 12px;
    padding-top: 20px;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 20px;

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

.second {
  position: relative;

  .formFile {
    position: absolute;
    top: 20px;
    left: 320px;
  }
}
</style>
