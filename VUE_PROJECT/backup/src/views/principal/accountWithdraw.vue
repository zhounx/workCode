<template>
  <div class="account-page">
    <div class="content">
      <div class="account-title">
        <h3>我的收款账户</h3>
        <el-button
          class="withdraw-button"
          @click="merchantTypeHandle()"
          type="primary"
          v-if="
            channelStatus == 5 && checkStatus == 2 && merchantCheckStatus == 2
          "
          >申请收款账户</el-button
        >
      </div>
      <ul class="account-list">
        <li
          v-for="item in accountList"
          :key="item.foreignReceiveAccount"
          v-if="channelStatus == 5 && checkStatus == 2 && merchantCheckStatus == 2">
          <div class="total">
            <p class="currency-name">
              <img :src="getImageUrl('default')" alt="" />
            </p>
            <span class="totalBankName">
              {{ item.bankName }}
            </span>
          </div>
          <div class="AccountNumber">
            {{ item.foreignReceiveAccount }}
          </div>
          <div
            class="money"
            style="color: #ff5d37"
            v-if="item.openApplyStatus == 3"
          >
            <span>开户申请状态：</span>
            <span>
              {{ findLabel(accountStatusList, item.openApplyStatus) }}
            </span>
          </div>
          <div
            class="money"
            v-if="
              item.openApplyStatus == -1 ||
              item.openApplyStatus == 2 ||
              item.openApplyStatus == 6
            "
          >
            <span>开户申请状态：</span>
            <span>
              {{ findLabel(accountStatusList, item.openApplyStatus) }}
            </span>
          </div>
          <div class="money">
            <span>账户类型：</span>
            <span>
              {{ item.receiveUse }}
            </span>
          </div>
          <div class="money">
            <span>账户名称：</span>
            <span>
              {{ item.nameEn }}
            </span>
          </div>
          <div class="mask" v-if="item.id !== 0">
            <el-button class="detail-buttonRed" type="primary" size="small" @click="fixAccount(item.id)"
              v-if="item.openApplyStatus != 5 && item.openApplyStatus != -1 && item.openApplyStatus != 6 && item.openApplyStatus != 2">
              修改申请
            </el-button>
            <el-button class="detail-button" v-if="item.openApplyStatus == 5" type="primary" size="small" @click="getAccountDetail(item.id)">查看详情</el-button>
          </div>
        </li>
        <!-- space-between最后一行占位 -->
      </ul>
      <el-dialog
        v-model="addAccountVisible"
        title="申请收款账户"
        width="600px"
        :custom-class="{ deleteDialog: true, short: !isElectriShop }"
        :align-center="true"
        :destroy-on-close="true"
      >
      <div style="height:20px;"></div>
        <yk-form
          size="large"
          ref="addAccountFormRef"
          :inline="true"
          :formItems="isElectriShop ? addAccountformItems1 : addAccountformItems"
          :formParams="addAccountformParam"
          label-width="120px"
          class="fuck-ui"
        >
          <template #receiveUse>
            <el-radio-group v-model="addAccountformParam.receiveUse" @change="changeType">
              <el-radio :label="1" v-if="merchantType !== '1'">贸易收款</el-radio>
              <el-radio :label="2">电商收款</el-radio>
            </el-radio-group>
          </template>
          <!-- 店铺经营类别选择 -->
          <template #categoryType>
            <div class="double-select">
              <el-select
                v-model="addAccountformParam.categoryOne"
                placeholder="请选择大类"
                @change="getShopCategoryTwoAdd($event, 'change')"
                class="select"
              >
                <template v-for="item in categoryLsit" :key="item.id">
                  <el-option :label="item.label" :value="item?.key" />
                </template>
              </el-select>
              <el-select
                v-model="addAccountformParam.categoryTwo"
                placeholder="请选择细类"
                class="select"
              >
                <template v-for="item in categoryTwoLsitAdd" :key="item.id">
                  <el-option :label="item.label" :value="item?.key" />
                </template>
              </el-select>
            </div>
          </template>

          <template #bankId>
            <el-select
              v-model="addAccountformParam.bankId"
              placeholder="请选择收款所属银行"
              style="width: 100%"
            >
              <template v-for="item in accountBankDataList" :key="item.id">
                <el-option :label="item.label" :value="item?.key" />
              </template>
            </el-select>
          </template>
          <template #settleAccount>
            <el-select
              v-model="addAccountformParam.settleAccount"
              placeholder="请选择提现账户"
              style="width: 100%"
            >
              <template v-for="item in settleAccountDataList" :key="item.id">
                <el-option :label="item.label" :value="item?.key" />
              </template>
            </el-select>
          </template>
        </yk-form>
        <!-- 申请账户店铺信息 -->
        <div v-if="isElectriShop">
          <div class="electriShopTitle">电商店铺信息</div>
          <div v-if="!isNewShop && shopApplyList.length > 0" class="shopSelect">
            <div class="promptSelect">请选择用于收款的店铺</div>
            <el-select
              placeholder="店铺账户名称"
              @change="getShopDetail"
              :model-value="shopName"
            >
              <el-option
                v-for="item in shopApplyList"
                :label="item?.label"
                :value="item?.key?.id"
                :key="item?.key?.id"
              ></el-option>
            </el-select>
            <div class="addNewshop" @click="changeShop('1')">添加新的店铺</div>
          </div>
          <div
            class="addOldshop"
            @click="changeShop('0')"
            v-if="isNewShop && shopApplyList.length > 0"
          >
            使用已有店铺
          </div>
          <div class="shopSelect">
            <div class="promptSelect" v-if="shopApplyList.length == 0">
              请填写用于收款的电商店铺信息：
            </div>
          </div>
          <!-- 店铺信息填写 -->
          <div class="shopBack">
            <yk-form
              size="large"
              ref="addShopRef"
              :inline="true"
              :formItems="addshopItems"
              :formParams="shopInfo"
              label-width="120px"
              v-if="isNewShop || shopApplyList.length == 0"
            >
              <template #shopCategoryType>
                <div class="double-select">
                  <el-select
                    v-model="shopInfo.shopCategoryOne"
                    placeholder="请选择大类"
                    @change="getShopCategoryTwoAddShop($event, 'change')"
                    style="width: 175px; margin-right: 10px"
                    :disabled="
                      isNewShop || shopApplyList.length == 0 ? false : true
                    "
                    class="select"
                  >
                    <template v-for="item in categoryLsit" :key="item.id">
                      <el-option :label="item.label" :value="item?.key" />
                    </template>
                  </el-select>
                  <el-select
                    v-model="shopInfo.shopCategoryTwo"
                    placeholder="请选择细类"
                    style="width: 175px"
                    :disabled="
                      isNewShop || shopApplyList.length == 0 ? false : true
                    "
                    class="select"
                  >
                    <template
                      v-for="item in categoryTwoLsitAddShop"
                      :key="item.id"
                    >
                      <el-option :label="item.label" :value="item?.key" />
                    </template>
                  </el-select>
                </div>
              </template>
              <template #shopRegion>
                <el-select
                  v-model="shopInfo.shopRegion"
                  placeholder="请选择店铺所在地区"
                  style="width: 100%"
                  :disabled="
                    isNewShop || shopApplyList.length == 0 ? false : true
                  "
                >
                  <template v-for="item in shopRegionList" :key="item.id">
                    <el-option :label="item.label" :value="item?.key" />
                  </template>
                </el-select>
              </template>
            </yk-form>
            <yk-form
              size="large"
              ref="addShopRef"
              :inline="true"
              :formItems="addshopItems1"
              :formParams="shopInfo"
              label-width="120px"
              v-if="!(isNewShop || shopApplyList.length == 0)"
            >
              <template #shopCategoryType>
                <div class="double-select">
                  <el-select
                    v-model="shopInfo.shopCategoryOne"
                    placeholder="请选择大类"
                    @change="getShopCategoryTwoAddShop($event, 'change')"
                    style="width: 175px; margin-right: 10px"
                    :disabled="
                      isNewShop || shopApplyList.length == 0 ? false : true
                    "
                    class="select"
                  >
                    <template v-for="item in categoryLsit" :key="item.id">
                      <el-option :label="item.label" :value="item?.key" />
                    </template>
                  </el-select>
                  <el-select
                    v-model="shopInfo.shopCategoryTwo"
                    placeholder="请选择细类"
                    style="width: 175px"
                    :disabled="
                      isNewShop || shopApplyList.length == 0 ? false : true
                    "
                    class="select"
                  >
                    <template
                      v-for="item in categoryTwoLsitAddShop"
                      :key="item.id"
                    >
                      <el-option :label="item.label" :value="item?.key" />
                    </template>
                  </el-select>
                </div>
              </template>
              <template #shopRegion>
                <el-select
                  v-model="shopInfo.shopRegion"
                  placeholder="请选择店铺所在地区"
                  style="width: 100%"
                  :disabled="
                    isNewShop || shopApplyList.length == 0 ? false : true
                  "
                >
                  <template v-for="item in shopRegionList" :key="item.id">
                    <el-option :label="item.label" :value="item.key" />
                  </template>
                </el-select>
              </template>
            </yk-form>
          </div>
        </div>

        <template #footer>
          <span class="addAccount-footer">
            <el-button class="cancel-button" type="primary" plain @click="addAccountVisible = false">取消</el-button>
            <el-button type="primary"
              class="delete-button"
              @click="accountApply"
              :loading="loadingAdd"
              >确定
            </el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog v-model="fixAccountVisible" title="修改开户申请" width="600px"
        :custom-class="{ deleteDialog: true, short: !isShowShop, change: true,}"
        :align-center="true"
        :destroy-on-close="true"
      >
        <div class="checkMessageContainer" style="padding-top:20px;">
          <div>申请不通过原因:</div>
          <div class="checkMessage">{{ fixAccountformParam.checkMessage }}</div>
        </div>
        <div class="checkMessageContainer">
          <div>收款类型:</div>
          <div class="receiveUse">{{ fixAccountformParam.receiveUse }}</div>
        </div>
        
          <yk-form
          size="large"
          ref="fixAccountFormRef"
          :inline="true"
          :formItems="!isShowShop ? fixAccountformItems : fixAccountformItems1"
          :formParams="fixAccountformParam"
          label-width="120px"
        >
          <template #categoryType>
            <div class="double-select">
              <el-select
                v-model="fixAccountformParam.categoryOne"
                placeholder="请选择大类"
                @change="getShopCategoryTwoFix($event, 'change')"
                style="width: 150px; margin-right: 10px"
                class="select"
              >
                <template v-for="item in categoryLsit" :key="item.id">
                  <el-option :label="item.label" :value="item.key" />
                </template>
              </el-select>
              <el-select
                v-model="fixAccountformParam.categoryTwo"
                placeholder="请选择细类"
                style="width: 150px"
                class="select"
              >
                <template v-for="item in categoryTwoLsitFix" :key="item.id">
                  <el-option :label="item.label" :value="item.key" />
                </template>
              </el-select>
            </div>
          </template>
          <template #bankId>
            <el-select
              v-model="fixAccountformParam.bankId"
              placeholder="请选择收款所属银行"
              style="width: 100%"
            >
              <template v-for="item in accountBankDataList" :key="item.id">
                <el-option :label="item.label" :value="item.key" />
              </template>
            </el-select>
          </template>
          <template #settleAccount>
            <el-select
              v-model="fixAccountformParam.settleAccount"
              placeholder="请选择提现账户"
              style="width: 100%"
            >
              <template v-for="item in settleAccountDataList" :key="item.id">
                <el-option :label="item.label" :value="item.key" />
              </template>
            </el-select>
          </template>
        </yk-form>
      
        <!-- 修改申请店铺信息 -->
        <div v-if="isShowShop">
          <div class="electriShopTitle">电商店铺信息</div>
          <div class="shopBack">
            <yk-form
              size="large"
              ref="fixShopRef"
              :inline="true"
              :formItems="isAllowEditShop ? fixshopItems : fixShopItemsNotEdit"
              :formParams="fixShopInfo"
              label-width="120px"
            >
              <template #shopCategoryType>
                <div class="double-select">
                  <el-select
                    v-model="fixShopInfo.shopCategoryOne"
                    placeholder="请选择大类"
                    @change="getShopCategoryTwoFixShop($event, 'change')"
                    style="width: 150px; margin-right: 10px"
                    :disabled="isAllowEditShop ? false : true"
                    class="select"
                  >
                    <template v-for="item in categoryLsit" :key="item.id">
                      <el-option :label="item.label" :value="item.key" />
                    </template>
                  </el-select>
                  <el-select
                    v-model="fixShopInfo.shopCategoryTwo"
                    placeholder="请选择细类"
                    style="width: 150px"
                    :disabled="isAllowEditShop ? false : true"
                    class="select"
                  >
                    <template
                      v-for="item in categoryTwoLsitFixShop"
                      :key="item.id"
                    >
                      <el-option :label="item.label" :value="item.key" />
                    </template>
                  </el-select>
                </div>
              </template>
              <template #shopRegion>
                <el-select
                  v-model="fixShopInfo.shopRegion"
                  placeholder="请选择店铺所在地区"
                  style="width: 100%"
                  :disabled="isAllowEditShop ? false : true"
                >
                  <template v-for="item in shopRegionList" :key="item.id">
                    <el-option :label="item.label" :value="item.key" />
                  </template>
                </el-select>
              </template>
            </yk-form>
          </div>
        </div>
        <template #footer>
          <span class="addAccount-footer">
            <el-button type="primary" plain @click="fixAccountVisible = false">取消</el-button>
            <el-button type="primary" @click="accountUpdate" :loading="loadingAdd">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <el-dialog
      v-model="detailVisible"
      :show-close="false"
      custom-class="deleteDialog"
      width="830px"
      center="true"
      :align-center="true"
      :destroy-on-close="true"
    >
      <div class="body">
        <div class="body-top">收款账户详情</div>
        <div class="info-block">
          <p class="category">账户信息：</p>
          <div class="list-warp">
            <div class="warn">此账户仅接受通过SWIFT(电汇/TT)网络的付款</div>
            <div class="list-item">
              <div>银行名称（Bank Name）</div>
              <div>{{ accountInfo.bankName }}</div>
            </div>
            <div class="list-item">
              <div>银行国际代码（SWIFT Code）</div>
              <div>{{ accountInfo.bankSwiftCode }}</div>
            </div>
            <div class="list-item">
              <div>银行所在地（Country/Region）</div>
              <div>{{ accountInfo.bankCountry }}</div>
            </div>
            <div class="list-item">
              <div>银行地址（Bank Address）</div>
              <div>{{ accountInfo.bankAddress }}</div>
            </div>
            <div class="list-item">
              <div>电报名称（Fedwire Telegraph Name）</div>
              <div>{{ accountInfo.telegraphName }}</div>
            </div>
            <div class="list-item">
              <div>美国联邦清算号（ABA Routing Numbe）</div>
              <div>{{ accountInfo.abaRoutingNumber }}</div>
            </div>
            <div class="list-item">
              <div>银行邮政编码（Zip Code）</div>
              <div>{{ accountInfo.zipCode }}</div>
            </div>
            <div class="list-item">
              <div>银行账户（Account Number）</div>
              <div>{{ accountInfo.bankAccountNo }}</div>
            </div>
            <div class="list-item">
              <div>账户名称（Account Name）</div>
              <div>{{ accountInfo.bankAccountName }}</div>
            </div>
            <div class="list-item">
              <div>账户用途（Type of Account）</div>
              <div>{{ accountInfo.bankAccountType }}</div>
            </div>
          </div>
        </div>
        <div class="info-block">
          <p class="category">支持收款的币种：</p>
          <div class="list-warp">
            <div class="list-item">
              <div>
                {{ Currency[accountInfo.currency] }}/{{ accountInfo.currency }}
              </div>
              <div>
                <img
                  v-if="accountInfo.currency"
                  :src="getImageUrl(accountInfo.currency)"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="info-block">
          <p class="category">账户动态：</p>
          <div class="list-warp">
            <div class="list-item">
              <div>{{ accountInfo.useTime.replace("T", " ") }}</div>
              <div v-if="accountInfo.useTime">开通账户</div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { request } from "@/service/http";
import {
  Currency,
  addAccountform1,
  addAccountforms1,
  addAccountform2,
  addAccountforms2,
  fixAccountform1,
  fixAccountforms1,
  fixAccountform2,
  fixAccountforms3NotEdit,
} from "./data";
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { baseStore } from "@/store/base";
import { useEnumStore } from "@/store/enum";
import { ElMessage } from "element-plus";
const ENUM = useEnumStore();
const tradeCountryList = ref(ENUM.COUNTEY);
const shopRegionList = ref([
  {
    key: "01",
    label: "美国",
  },
]);
const shopTypeList = ref(ENUM.SHOP_TYPE);
const router = useRouter();
const baseInfoStore = baseStore();

const accountBankDataList = computed(() => {
  return baseInfoStore.accountBankData;
});
const settleAccountDataList = computed(() => {
  return baseInfoStore.settleAccounts;
});
const shopApplyList = computed(() => {
  return baseInfoStore.shopApplyInfos;
});
const accountStatusList = computed(() => {
  return baseInfoStore.accountStatus;
});
const merchantType = computed(() => {
  return baseInfoStore.applyInfo.merchantType;
});

const merchantCheckStatus = computed(() => {
  return baseInfoStore.applyInfo?.merchantCheckStatus;
});
const checkStatus = computed(() => {
  return baseInfoStore.applyInfo?.checkStatus;
});
const channelStatus = computed(() => {
  return baseInfoStore.applyInfo?.channelStatus;
});
const getApplyViewHandle = () => {
  if (
    channelStatus.value == 5 &&
    checkStatus.value == 2 &&
    merchantCheckStatus.value == 2
  ) {
    baseInfoStore.getApplyView();
  }
};

getApplyViewHandle();
function findLabel(arr: any[], key: any) {
  //开户申请状态枚举转换
  if (arr !== undefined && arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key == key) {
        let accountStatusLabel = ref("");
        accountStatusLabel.value = arr[i].label;
        return accountStatusLabel.value;
      }
    }
  }
}

baseInfoStore.getCategory();
let categoryTwoLsit = ref<any>([]);
let categoryTwoLsitAdd = ref<any>([]);
let categoryTwoLsitAddShop = ref<any>([]);
let categoryTwoLsitFix = ref<any>([]);
let categoryTwoLsitFixShop = ref<any>([]);
const shopName = ref("");
const categoryLsit = computed(() => {
  return baseInfoStore.categoryData;
});
const detailVisible = ref(false);
const addAccountVisible = ref(false);

const fixAccountVisible = ref(false);
const loadingAdd = ref(false);
const addAccountFormRef: any = ref();
const fixAccountFormRef: any = ref();
const addShopRef: any = ref();
const fixShopRef: any = ref();

const isElectriShop = ref(false);
const isNewShop = ref(false);
const isShowShop = ref(false);
const isAllowEditShop = ref(false);

let addAccountformItems = ref<any>(addAccountform1);
let addAccountformItems1 = ref<any>(addAccountforms1);
let addshopItems = ref<any>(addAccountform2);
let fixAccountformItems = ref<any>(fixAccountform1);
let fixAccountformItems1 = ref<any>(fixAccountforms1);
let fixShopItemsNotEdit = ref<any>(fixAccountforms3NotEdit);
let fixshopItems = ref<any>(fixAccountform2);
let addshopItems1 = ref<any>(addAccountforms2);
let addAccountformParam = ref<any>({
  receiveUse: 1,
  bankId: "",
  settleAccount: "",
  textarea: "",
  categoryOne: "",
  categoryTwo: "",
  categoryType: 0,
});
let fixAccountformParam = ref<any>({
  receiveUse: 1,
  bankId: "",
  settleAccount: "",
  textarea: "",
  categoryOne: "",
  categoryTwo: "",
  categoryType: 0,
  allowEdit: "",
  checkMessage: "",
  shopInfo: [],
});
let shopInfo = ref<any>({
  id: "",
  referenceNo: "",
  shopAccount: "",
  shopAccountName: "",
  shopCategoryOne: "",
  shopCategoryTwo: "",
  shopId: "",
  shopName: "",
  shopRegion: "",
  shopType: "",
  shopWebUrl: "",
  shopCategoryType: 0,
});
let fixShopInfo = ref<any>({
  id: "",
  referenceNo: "",
  shopAccount: "",
  shopAccountName: "",
  shopCategoryOne: "",
  shopCategoryTwo: "",
  shopId: "",
  shopName: "",
  shopRegion: "",
  shopType: "",
  shopWebUrl: "",
  shopCategoryType: 0,
});
const shopDetail = ref();
const getShopDetailElect = () => {
  shopDetail.value = shopApplyList.value[0]?.key;
  shopName.value = shopApplyList.value[0]?.label;
  getShopDetail(shopApplyList.value[0]?.key?.id);
};

const initBank = () => {
  addAccountformParam.value.bankId = accountBankDataList.value[0]?.key;
  addAccountformParam.value.settleAccount = settleAccountDataList.value[0]?.key;
};

function changeShop(type: string) {
  isNewShop.value = !isNewShop.value;
  if (type == "1") {
    shopInfo.value.shopType = "";
    shopInfo.value.shopAccountName = "";
    shopInfo.value.shopCategoryType = 0;
    shopInfo.value.shopCategoryOne = "";
    shopInfo.value.shopCategoryTwo = "";
    shopInfo.value.shopId = "";
    shopInfo.value.shopWebUrl = "";
    shopInfo.value.shopName = "";
    shopInfo.value.shopRegion = "";
  } else {
    getShopDetailElect();
  }
}

async function accountApply() {
  const result = (await addShopRef?.value?.submitForm()) ?? true;
  const resultTop = await addAccountFormRef?.value?.submitForm();

  if (result && resultTop) {
    if (resultTop == true) {
      let { code, data }: any = await request(
        "POST",
        "/abroad-merchant/front/account/apply",
        {
          ...addAccountformParam.value,
          shopInfo: {
            ...shopInfo.value,
            id: isNewShop.value ? null : shopInfo.value.id,
          },
        }
      );
      if (code == 200) {
        addAccountVisible.value = false;
        ElMessage({
          type: "success",
          message: "提交成功",
        });
      } else {
        ElMessage({
          type: "warning",
          message: "提交失败, 请重试",
        });
      }
      getAccountList();
    }
  }
}
async function accountUpdate() {
  const result1 = await fixAccountFormRef.value.submitForm();
  const result2 = (await fixShopRef?.value?.submitForm()) ?? true;

  if (result1 && result2) {
    if (fixShopInfo.value) {
      fixAccountformParam.value.shopInfo = fixShopInfo.value;
    }
    let { code, data }: any = await request(
      "POST",
      "/abroad-merchant/front/account/update",
      {
        bankId: fixAccountformParam.value.bankId,
        categoryOne: fixAccountformParam.value.categoryOne,
        categoryTwo: fixAccountformParam.value.categoryTwo,
        id: fixAccountformParam.value.id,
        receiveDescription: fixAccountformParam.value.receiveDescription,
        settleAccount: fixAccountformParam.value.settleAccount,
        shopInfo: fixAccountformParam.value.shopInfo,
      }
    );

    if (code == 200) {
      fixAccountVisible.value = false;
      ElMessage({
        type: "success",
        message: "提交成功",
      });
    }
    getAccountList();
  }
}

async function getShopDetail(val: string) {
  for (const shop of shopApplyList.value) {
    if (shop.key.id === val) {
      shopDetail.value = shop.key;
      shopName.value = shop.label;
      break;
    }
  }

  shopInfo.value.id = shopDetail.value?.id;
  shopInfo.value.referenceNo = shopDetail.value?.referenceNo;
  shopInfo.value.shopAccount = shopDetail.value?.shopAccount;
  shopInfo.value.shopAccountName = shopDetail.value?.shopAccountName;
  shopInfo.value.shopCategoryOne = shopDetail.value?.shopCategoryOne;
  await getShopCategoryTwoAddShop(shopInfo.value.shopCategoryOne, "");
  shopInfo.value.shopCategoryTwo = shopDetail.value?.shopCategoryTwo;
  shopInfo.value.shopId = shopDetail.value?.shopId;
  shopInfo.value.shopName = shopDetail.value?.shopName;
  shopInfo.value.shopRegion = shopDetail.value?.shopRegion;
  shopInfo.value.shopType = String(shopDetail.value?.shopType ?? "");
  shopInfo.value.shopWebUrl = shopDetail.value?.shopWebUrl;
}

const changeType = (index: number) => {
  // getDataShow()
  if (index === 1) {
    isElectriShop.value = false;
  } else {
    isElectriShop.value = true;
  }
};
const merchantTypeHandle = () => {
  if (merchantType.value == 1) {
    addAccountformParam.value.receiveUse = 2;
    isElectriShop.value = true;
  }
  addAccountVisible.value = true;
};

async function getShopCategoryTwo(parentCode: string, type: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/category",
    { level: 2, parentCode: parentCode }
  );
  categoryTwoLsit.value = data;
  if (type === "change") {
    addAccountformParam.value.categoryTwo = "";
    fixAccountformParam.value.categoryTwo = "";
    shopInfo.value.shopCategoryTwo = "";
    fixShopInfo.value.shopCategoryTwo = "";
  }
}
async function getShopCategoryTwoAdd(parentCode: string, type: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/category",
    { level: 2, parentCode: parentCode }
  );
  categoryTwoLsitAdd.value = data;
  if (type === "change") {
    addAccountformParam.value.categoryTwo = "";
  }
}
async function getShopCategoryTwoFix(parentCode: string, type: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/category",
    { level: 2, parentCode: parentCode }
  );
  categoryTwoLsitFix.value = data;
  if (type === "change") {
    fixAccountformParam.value.categoryTwo = "";
  }
}
async function getShopCategoryTwoAddShop(parentCode: string, type: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/category",
    { level: 2, parentCode: parentCode }
  );
  categoryTwoLsitAddShop.value = data;
  if (type === "change") {
    shopInfo.value.shopCategoryTwo = "";
  }
}
async function getShopCategoryTwoFixShop(parentCode: string, type: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/category",
    { level: 2, parentCode: parentCode }
  );
  categoryTwoLsitFixShop.value = data;
  if (type === "change") {
    fixShopInfo.value.shopCategoryTwo = "";
  }
}

watch(addAccountformParam.value, (newVal, oldValue) => {
  initCategoryType();
});
// initCategoryType();
function initCategoryType() {
  if (
    addAccountformParam.value.categoryOne &&
    addAccountformParam.value.categoryTwo
  ) {
    addAccountformParam.value.categoryType = 2;
  } else {
    if (!addAccountformParam.value.categoryTwo) {
      addAccountformParam.value.categoryType = 1;
    } else {
      addAccountformParam.value.categoryType = 0;
    }
  }
}
watch(shopInfo.value, (newVal, oldValue) => {
  initCategoryShopType();
});
// initCategoryShopType();
function initCategoryShopType() {
  if (shopInfo.value.shopCategoryOne && shopInfo.value.shopCategoryTwo) {
    shopInfo.value.shopCategoryType = 2;
  } else {
    if (!shopInfo.value.shopCategoryTwo) {
      shopInfo.value.shopCategoryType = 1;
    } else {
      shopInfo.value.shopCategoryType = 0;
    }
  }
}
watch(fixAccountformParam.value, (newVal, oldValue) => {
  initFixCategoryType();
});
// initFixCategoryType();
function initFixCategoryType() {
  if (
    fixAccountformParam.value.categoryOne &&
    fixAccountformParam.value.categoryTwo
  ) {
    fixAccountformParam.value.categoryType = 2;
  } else {
    if (!fixAccountformParam.value.categoryTwo) {
      fixAccountformParam.value.categoryType = 1;
    } else {
      fixAccountformParam.value.categoryType = 0;
    }
  }
}
watch(fixShopInfo.value, (newVal, oldValue) => {
  initCategoryFixShopType();
});
// initCategoryFixShopType();
function initCategoryFixShopType() {
  if (fixShopInfo.value.shopCategoryOne && fixShopInfo.value.shopCategoryTwo) {
    fixShopInfo.value.shopCategoryType = 2;
  } else {
    if (!fixShopInfo.value.shopCategoryTwo) {
      fixShopInfo.value.shopCategoryType = 1;
    } else {
      fixShopInfo.value.shopCategoryType = 0;
    }
  }
}

let accountInfo = ref({
  //账户详情
  bankName: "",
  bankSwiftCode: "",
  bankCountry: "",
  bankAddress: "",
  bankAccountNo: "",
  bankAccountType: "",
  bankAccountName: "",
  currency: "",
  useTime: "",
  telegraphName: "",
  zipCode: "",
  abaRoutingNumber: "",
});
async function getAccountList() {
  let { data }: any = await request(
    "POST",
    "/abroad-merchant/front/account/list",
    {}
  );
  accountList.value = data;
}

async function getAccountDetail(id) {
  //获取账户详情
  detailVisible.value = true;
  let { data }: any = await request(
    "GET",
    "/abroad-merchant/front/account/detail",
    { id: id }
  );
  accountInfo.value.abaRoutingNumber = data.abaRoutingNumber;
  accountInfo.value.bankName = data.bankName;
  accountInfo.value.bankSwiftCode = data.bankSwiftCode;
  accountInfo.value.bankCountry = data.bankCountry;
  accountInfo.value.bankAddress = data.bankAddress;
  accountInfo.value.bankAccountNo = data.bankAccountNo;
  accountInfo.value.bankAccountType = data.bankAccountType;
  accountInfo.value.bankAccountName = data.bankAccountName;
  accountInfo.value.currency = data.currency;
  accountInfo.value.useTime = data.useTime;
  accountInfo.value.telegraphName = data.telegraphName;
  accountInfo.value.zipCode = data.zipCode;
}
async function fixAccount(id: any) {
  //获取更新页面信息
  fixAccountVisible.value = true;
  let { data }: any = await request(
    "GET",
    "/abroad-merchant/front/account/updateView",
    { id: id }
  );
  await getShopCategoryTwoFix(data.categoryOne, "");
  if (data.shopInfo) {
    await getShopCategoryTwoFixShop(data.shopInfo.shopCategoryOne, "");
    fixShopInfo.value.shopType = String(data.shopInfo?.shopType);
    fixShopInfo.value = { ...fixShopInfo.value, ...data.shopInfo };
  }
  Object.assign(fixAccountformParam.value, { ...data });
  isShowShop.value = data.receiveUse == "电商收款";
  isAllowEditShop.value = data.allowEdit;
}

const accountList = ref([]);

//#region 初始化
onMounted(async () => {
  await baseInfoStore.getAccountBankData();
  await baseInfoStore.getAccountStatus();
  await baseInfoStore.getMerchantApplyInfo();
  await getAccountList();
  getShopDetailElect();
  initBank();
});
//#endregion

const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/${name}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/normal.scss";
.account-page {
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

    .account-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 13px;
      border-bottom: 1px solid #ecf2f5;
      margin-bottom: 20px;

      > h3 {
        font-size: 20px;
        font-weight: bold;
        padding: 0;
        color: #25343c;
      }

      .withdraw-button {
        font-size: 16px;
      }
    }

    .account-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      li {
        box-sizing: border-box;
        margin: 10px 0;
        width:354px;
        padding: 20px;
        background: #F8FBFD;
        border: 1px solid #DEEBF1;
        border-radius: 16px;
        position: relative;
        margin-right: 18px;
        &:hover {
          background: #fcfdfe;

          .mask {
            visibility: visible;
            @include flex;
            box-sizing: border-box;
          }
        }
        &:nth-of-type(4n){
          margin-right: 0;
        }
        .total {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #25343c;
          padding-bottom: 10px;

          .totalBankName {
            font-size: 16px;
            font-weight: bold;
            color: #25343c;
            line-height: 44px;
          }

          .currency-name {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            vertical-align: middle;

            img {
              vertical-align: middle;
              width: 36px;
              height: 36px;
              margin-right: 5px;
            }
          }

          h3 {
            font-size: 22px;
            font-family: Bahnschrift;
            font-weight: bold;
            text-align: center;
            padding: 0;

            span {
              font-size: 14px;
              font-weight: bold;
            }
          }
        }

        .money {
          height: 28px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #9ba4ad;

          label {
            font-size: 14px;
          }

          span {
            font-family: Bahnschrift;
            font-size: 14px;
          }
        }

        .AccountNumber {
          font-size: 24px;
          font-family: Bahnschrift;
          font-weight: 600;
          color: #25343c;
          line-height: 44px;
        }
      }

      .mask {
        visibility: hidden;
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        @include flex;
        bottom: 0;
        left: 0;
        height: 100%;
        padding-top: 120px;
        background: linear-gradient(150deg, transparent, #fff, #fff);
        border-radius: 16px;
        .detail-buttonRed {
          background: #ffe5e2;
          font-size: 14px;
          font-weight: 500;
          color: #f13729;
          border: #ffe5e2;
        }
      }
    }

    &::v-deep(.el-dialog) {
      border-radius: 20px;
    }

    &::v-deep(.el-dialog__header) {
      border-bottom: 1px dashed #deebf1;
      padding-bottom: 15px;
      padding-top: 10px;
    }

    &::v-deep(.el-dialog__title) {
      font-weight: bold;
      color: #25343c;
      margin-left: 20px;
      display: block;
      padding-top:20px;
    }

    &::v-deep(.el-form-item__label) {
      text-align: left;
      width: 135px;
    }

    &::v-deep(.form-demo) {
      padding: 0 20px;
    }
  }

  .deleteDialog {
    background: #ffffff;
    border-radius: 200px !important;
    margin: 0 auto;
    &::v-deep(.el-dialog__header) {
      display: none;padding-top: 10px;
    }

    .electriShopTitle {
      padding: 0 20px;
      font-size: 16px;
      font-weight: bold;
      color: #25343c;
      line-height: 36px;
    }

    .shopSelect {
      display: flex;
      flex-direction: row;
      padding: 0 20px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;

      .promptSelect {
        font-size: 14px;
        font-weight: 400;
        color: #6a767d;
        line-height: 44px;
      }

      .addNewshop {
        width: 110px;
        height: 44px;
        background: #ffffff;
        border: 1px solid #195eff;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 400;
        color: #195eff;
        line-height: 42px;
        text-align: center;
        cursor: pointer;
      }
    }

    .addOldshop {
      margin-bottom: 14px;
      margin-left: 446px;
      width: 110px;
      height: 44px;
      background: #ffffff;
      border: 1px solid #195eff;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 400;
      color: #195eff;
      line-height: 42px;
      text-align: center;
    }

    .shopBack {
      background: #F8FBFD;
      border: 1px solid #DEEBF1;
      border-radius: 10px;
      margin:10px 20px 0;
      padding: 20px 20px 0 0;
    }

    .body {
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      padding:0 15px;
      .body-top {
        font-size: 22px;
        text-align: left;
        font-weight: bold;
        color: #25343c;
        line-height: 36px;
        border-bottom: 1px solid #ecf2f5;
        margin-bottom: 30px;
        padding-bottom: 15px;
      }
      .dialog-footer {
        display: flex;
        justify-content: center;
        margin-bottom:10px;

        .cancel-button {
          border: none;
          width: 150px;
          height: 50px;

          .cancel {
            font-weight: bold;
            color: #195eff;
            font-family: NotoSansHans-Bold;
          }
        }

        .delete-button {
          margin-left: 20px;
          @extend .cancel-button;
          background: #195eff;

          .delete {
            @extend .cancel;
            color: #ffffff;
          }
        }
      }

      .info-block {
        margin-bottom:10px;

        .category {
          font-size: 16px;
          color: #25343c;
          font-weight: bold;
          line-height: 30px;
          text-align: left;
        }

        .list-warp {
          border: 1px solid #e1e8ed;
          border-radius: 8px;
          font-size: 14px;

          .warn {
            background-color: #fff2ef;
            color: #f13729;
            padding: 15px 30px;
            text-align: left;
            border-bottom: 1px solid #e1e8ed;
          }

          .list-item {
            @include flex(row, flex-start);
            height: 40px;
            border-bottom: 1px solid #e1e8ed;

            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }

            &:last-child {
              border: none;
            }

            div:first-child {
              height: 40px;
              line-height: 40px;
              padding-left: 30px;
              min-width: 280px;
              background-color: #f4f8fb;
              border-right: 1px solid #e1e8ed;
              color: #919ba4;
              @include flex(row, flex-start);
            }

            div:last-child {
              height: 40px;
              line-height: 40px;
              padding-left: 30px;
            }
          }
        }
      }
    }

    .dialog-footer {
      display: flex;
      justify-content: center;
      //margin-top: 40px;
      margin-bottom: 10px;

      .cancel-button {
        //background: #c2e3ff;
        border: none;
        width: 150px;
        height: 50px;

        .cancel {
          font-weight: bold;
          color: #195eff;
          font-family: NotoSansHans-Bold;
        }
      }

      .delete-button {
        margin-left: 20px;
        @extend .cancel-button;
        background: #195eff;

        .delete {
          @extend .cancel;
          color: #ffffff;
        }
      }
    }

    .checkMessageContainer {
      display: flex;
      flex-direction: row;
      padding-left: 20px;
      margin-bottom: 15px;
      align-items: center;

      .checkMessage {
        margin-left: 35px;
        font-size: 14px;
        font-weight: 400;
        color: #f13729;
        line-height: 44px;
      }
      .receiveUse {
        margin-left: 75px;
        font-size: 14px;
        font-weight: 400;
        line-height: 44px;
      }
    }
  }
  &::v-deep(.el-dialog__footer) {
     border-top:1px solid #E1E8ED;
     padding-top:20px;
     padding-bottom: 40px;
     text-align: center;
     .el-button {
          width: 168px;
          height: 58px;
          font-size: 18px;
          font-weight: bold;
      }
  }
}


::v-deep {
  .deleteDialog {
    border-radius: 20px !important;
    margin: 0;
    padding: 0;

    .el-dialog__body {
      padding-top: 0;
      overflow-y: scroll;
      position: relative !important;
      max-height: 600px;
    }
  }
  ::-webkit-scrollbar {
    width: 0px;
    background-color: #f5f5f5;
  }
  .el-overlay-dialog {
    @include flex;
  }
}

.double-select {
  width: 100%;
  @include flex(row, space-between);
  .select {
    width: 49% !important;
  }
}
</style>
