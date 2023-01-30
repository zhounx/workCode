<template>
  <div class="form-submit-page">
    <div class="message-top">
      <h2>收款管理</h2>
      <div class="apply-content">
        <h3 class="title">{{ orderId ? "修改" : "创建" }}订单</h3>

        <div class="no-pass" v-if="orderId">
          <img src="../../assets/images/warn.png" alt="" />审核不通过原因：{{
            orderDetail.comment
          }}
        </div>

        <div class="order-type">
          <p v-if="!orderId">
            请选择您要创建的订单类型：<span
              >（不同类型的订单，所需要填写的信息有所不同）</span
            >
          </p>
          <div class="header-container">
            <el-radio-group v-model="orderType" v-if="!orderId">
              <el-radio :label="1">外贸订单</el-radio>
              <el-radio :label="2">电商订单</el-radio>
            </el-radio-group>

            <div v-if="!orderId && orderType === 2" class="shopType">
              <p>店铺类型：</p>
              <el-select
                v-model="shopType"
                placeholder="Select"
                size="small"
                class="shopTypeSelect"
              >
                <el-option
                  v-for="item in shopTypes"
                  :key="`${item.key}shopTypes`"
                  :label="item.label"
                  :value="item.key"
                />
              </el-select>
            </div>
          </div>
        </div>

        <div class="apply-form">
          <div v-if="shopType !== 3">
            <!-- 一、订单基本信息 -->
            <div>
              <h3>一、订单基本信息：</h3>
              <div class="orderInfos" v-if="orderId">
                <p class="form-order-type">
                  <label>订单类型：</label>
                  {{ orderDetail.orderType === 1 ? "外贸订单" : "电商订单" }}
                </p>
                <p class="form-shop-type" v-if="orderDetail.orderType === 2">
                  <label>店铺类型：</label>
                  {{ shopType === 1 ? "亚马逊店铺" : "eBay店铺" }}
                </p>
              </div>
              <div :class="{ 'amont-error-tip': true, change: !!orderId }">
                输入换算为美元后的PI或CI对应的总金额，精确至小数点后两位
              </div>
              <yk-form
                ref="orderBaseInfoFormRule"
                style="max-width: 1100px"
                size="large"
                :inline="true"
                :formItems="orderBaseFormItems"
                :formParams="orderBaseInfo"
              >
                <template #tradeCountry>
                  <el-select
                    v-model="orderBaseInfo.tradeCountry"
                    placeholder="请选择贸易国家"
                    style="width: 390px; margin-right: 10px"
                  >
                    <template v-for="item in tradeCountryList" :key="item.key">
                      <el-option :label="item.label" :value="item.key" />
                    </template>
                  </el-select>
                </template>

                <template #tradeDocuments>
                  <yk-upload
                    :showFileList="true"
                    :limit="10"
                    :files="orderBaseInfo.tradeDocuments"
                    listType="picture-card"
                    placeholder="上传凭证"
                    @on-remove="(imgs) => (orderBaseInfo.tradeDocuments = imgs)"
                    @on-success="getTradeDocuments"
                  >
                  </yk-upload>
                </template>

                <template #otherDocuments>
                  <yk-upload
                    listType="picture-card"
                    :limit="10"
                    :files="orderBaseInfo.otherDocuments"
                    :showFileList="true"
                    placeholder="上传凭证"
                    @on-remove="(imgs) => (orderBaseInfo.otherDocuments = imgs)"
                    @on-success="getOtherDocuments"
                  ></yk-upload>
                  <div class="error-tip">
                    请上传其他与本次贸易有关的凭证，这将有助于订单快速审核通过
                  </div>
                </template>
              </yk-form>
            </div>

            <!-- 二、订单商品信息 -->
            <div>
              <h3 class="h3Title">二、订单商品信息：</h3>
              <div class="shareholderInfo-list">
                <div
                  class="shareholderInfo-item"
                  v-for="(goods, index) in goodsListInfo"
                  :key="index"
                >
                  <yk-form
                    :ref="(e) => setGoodsListFormRule(e, index)"
                    style="max-width: 1100px"
                    size="large"
                    :inline="true"
                    :formItems="
                      orderType === 1 ? goodsListItemInput : goodsListFormItems2
                    "
                    :formParams="goods"
                  >
                    <template #unit>
                      <el-select
                        v-model="goods.unit"
                        placeholder="请选择单位"
                        style="width: 390px; margin-right: 10px"
                      >
                        <template v-for="item in goodsUnitList" :key="item.key">
                          <el-option :label="item.label" :value="item.key" />
                        </template>
                      </el-select>
                    </template>
                  </yk-form>
                  <p
                    v-if="index > 0"
                    @click="removeGoodsListInfo(index)"
                    class="remove-shareholderInfo"
                  >
                    <el-icon><Remove /></el-icon>删除
                  </p>
                </div>
                <p class="add-shareholderInfo" @click="addGoodsListInfo">
                  <el-icon><CirclePlusFilled /></el-icon>添加信息
                </p>
              </div>
            </div>

            <!-- 三、订单发货、物流信息 -->
            <div>
              <h3>三、订单发货、物流信息</h3>
              <div class="shareholderInfo-list">
                <div
                  class="shareholderInfo-item"
                  v-for="(logistics, index) in logisticsListInfo"
                  :key="`logistics${index}`"
                >
                  <yk-form
                    :ref="(e) => setLogisticsListFormRule(e, index)"
                    style="max-width: 1100px"
                    size="large"
                    :inline="true"
                    :formItems="
                    logisticsListFormItems(
                      orderBaseInfo.buyerType,
                      logistics.status,
                      orderType as number,
                      exchangeType
                    )
                  "
                    :formParams="logistics"
                  >
                    <template #status>
                      <el-select
                        v-model="logistics.status"
                        @change="resetLogistic(index, logistics)"
                      >
                        <el-option
                          key="notShip"
                          :value="0"
                          label="未发货"
                        ></el-option>
                        <el-option
                          key="ship"
                          :value="1"
                          label="已发货"
                        ></el-option>
                      </el-select>
                    </template>

                    <template #logisticsMode>
                      <el-select
                        v-model="logistics.logisticsMode"
                        placeholder="请选择物流方式"
                        style="width: 390px; margin-right: 10px"
                      >
                        <template
                          v-for="item in logisticsModeList"
                          :key="item.key"
                        >
                          <el-option :label="item.label" :value="item.key" />
                        </template>
                      </el-select>
                    </template>

                    <template #transactionMethodCode>
                      <el-select
                        v-model="logistics.transactionMethodCode"
                        placeholder="请选择成交方式"
                        style="width: 390px; margin-right: 10px"
                      >
                        <template
                          v-for="item in transactionMethodCodeList"
                          :key="item.key"
                        >
                          <el-option :label="item.label" :value="item.key" />
                        </template>
                      </el-select>
                    </template>

                    <template #fileList>
                      <yk-upload
                        :limit="10"
                        listType="picture-card"
                        :showFileList="true"
                        :files="logistics.fileList"
                        placeholder="上传凭证"
                        @on-remove="(imgs) => (logistics.fileList = imgs)"
                        @on-success="fileListSuccess('fileList', $event, index)"
                      ></yk-upload>
                    </template>

                    <template #transComFileList>
                      <yk-upload
                        :limit="10"
                        listType="picture-card"
                        :showFileList="true"
                        :files="logistics.transComFileList"
                        placeholder="上传凭证"
                        @on-remove="
                          (imgs) => (logistics.transComFileList = imgs)
                        "
                        @on-success="
                          fileListSuccess('transComFileList', $event, index)
                        "
                      ></yk-upload>
                    </template>

                    <template #orderComFileList>
                      <yk-upload
                        :limit="10"
                        listType="picture-card"
                        :showFileList="true"
                        :files="logistics.orderComFileList"
                        placeholder="上传凭证"
                        @on-remove="
                          (imgs) => (logistics.orderComFileList = imgs)
                        "
                        @on-success="
                          fileListSuccess('orderComFileList', $event, index)
                        "
                      ></yk-upload>
                    </template>

                    <template #outboundLogisticsOrderFileList>
                      <yk-upload
                        :limit="10"
                        listType="picture-card"
                        :showFileList="true"
                        :files="logistics.outboundLogisticsOrderFileList"
                        placeholder="上传凭证"
                        @on-remove="
                          (imgs) =>
                            (logistics.outboundLogisticsOrderFileList = imgs)
                        "
                        @on-success="
                          fileListSuccess(
                            'outboundLogisticsOrderFileList',
                            $event,
                            index
                          )
                        "
                      ></yk-upload>
                    </template>

                    <template #empty>
                      <div style="display: flex"></div>
                    </template>
                  </yk-form>
                  <p
                    v-if="index > 0"
                    @click="removeLogisticsList(index)"
                    class="remove-shareholderInfo"
                  >
                    <el-icon><Remove /></el-icon>删除
                  </p>
                </div>
                <p class="add-shareholderInfo" @click="addLogisticsList">
                  <el-icon><CirclePlusFilled /></el-icon>添加信息
                </p>
              </div>
            </div>

            <!-- 四、备注 -->
            <h3>四、备注</h3>
            <div class="shareholderInfo-list">
              <div class="shareholderInfo-item textarea">
                <label>备注信息</label>
                <el-input
                  :input-style="{ height: '80px' }"
                  v-model="orderBaseInfo.remark"
                  placeholder="请输入备注信息"
                  type="textarea"
                />
              </div>
            </div>
          </div>

          <div v-if="shopType === 3" class="tiktokShop">
            <!-- 一、订单基本信息 -->
            <h3>一、订单基本信息：</h3>
            <div class="orderInfos" v-if="orderId">
              <p class="form-order-type">
                <label>订单类型：</label>
                电商订单
              </p>
              <p class="form-shop-type" v-if="orderDetail.orderType === 2">
                <label>店铺类型：</label>
                TIKTOK
              </p>
            </div>
            <div :class="{ 'amont-error-tip2': true, change: !!orderId }">
              输入换算为美元后的PI或CI对应的总金额，精确至小数点后两位
            </div>
            <yk-form
              ref="tiktokInfoFormRule"
              style="max-width: 1100px"
              size="large"
              :inline="true"
              :formItems="tiktokShopItems"
              :formParams="orderBaseInfo"
            >
              <template #tiktokTransactionFileList>
                <yk-upload
                  :showFileList="true"
                  :limit="10"
                  :files="orderBaseInfo?.tiktokTransactionFileList"
                  listType="picture-card"
                  placeholder="上传凭证"
                  @on-remove="
                    (imgs) => (orderBaseInfo.tiktokTransactionFileList = imgs)
                  "
                  @on-success="getTiktokTradeImages($event)"
                >
                </yk-upload
              ></template>
            </yk-form>

            <!-- 二、备注 -->
            <h3>二、备注</h3>
            <div class="shareholderInfo-list">
              <div class="shareholderInfo-item textarea">
                <label>备注信息</label>
                <el-input
                  :input-style="{ height: '80px' }"
                  v-model="orderBaseInfo.remark"
                  placeholder="请输入备注信息"
                  type="textarea"
                />
              </div>
            </div>
          </div>

          <div class="step-button">
            <div style="max-width: 800px">
              <el-button
                class="next-button"
                type="primary"
                @click.stop="submitApplyInfo"
                >{{ orderId ? "确认修改" : "创建" }}</el-button
              >
              <!-- <el-button class="next-button" type="primary" @click.stop="() => router.back()">返回</el-button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, Ref, watch, nextTick, onMounted } from "vue";
import { CirclePlusFilled, Remove, Warning } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { baseStore } from "@/store/base";
import { useRouter, useRoute } from "vue-router";
import { request } from "@/service/http";
import YkForm from "@/components/yk-form.vue";
import YkUpload from "@/components/upload.vue";
import {
  orderBaseFormItems1, //外贸订单
  orderBaseFormItems2, //电商订单
  goodsListFormItems,
  goodsListFormItems2,
  logisticsListFormItems,
  shopTypes,
  tiktokShopItems,
} from "./formData";
import { checkOrderIdRepeated } from "@/api/order";
import { selectOption } from "@/types/interface/enums";
import { useEnumStore } from "@/store/enum";

const router = useRouter();
const route = useRoute();

const baseInfoStore = baseStore();
const ENUM = useEnumStore();

const transactionMethodCodeList = ref(ENUM.TRANSACTION_METHOD); //交货方式选项
const logisticsModeList = ref(ENUM.LOGISTICS_MODE); //物流方式选项
const tradeCountryList = ref(ENUM.COUNTEY);
const goodsUnitList = ref(ENUM.GOODS_UNIT);
const shopTypeEnum = ref(ENUM.SHOP_TYPE);

//#region refs
const orderBaseInfoFormRule: any = ref(null);
const tiktokInfoFormRule: any = ref(null);

const goodsMap = reactive(new Map());
const logisticsMap = reactive(new Map());

function setLogisticsListFormRule(el: any, i: number) {
  logisticsMap.set(i, el);
}
function setGoodsListFormRule(el: any, i: number) {
  goodsMap.set(i, el);
}

//#endregion

//#region 订单基本信息部分
const orderId = ref<string | any>(route.query.orderId);
if (!orderId.value) {
  baseInfoStore.orderDetail = {};
}
const orderDetail = computed(() => {
  return baseInfoStore.orderDetail;
});
let orderType = ref<Number>(orderDetail.value?.orderType ?? 1);
let orderBaseFormItems = ref<any[]>(
  orderType.value === 1 ? orderBaseFormItems1 : orderBaseFormItems2
);

const orderBaseInfo = ref({
  //订单通用
  customOrderId: orderDetail.value?.customOrderId ?? null, //自定义订单号
  amount: orderDetail.value?.amount ?? "", //订单总额
  buyerName: orderDetail.value?.buyerName ?? "", //买家英文名
  tradeCountry: orderDetail.value?.tradeCountry ?? "", //贸易国家/地区
  shopName: orderDetail.value?.shopName ?? "", //店铺名称
  website: orderDetail.value?.website ?? "", //店铺网址或地址
  tradeDocuments: orderDetail.value?.tradeDocuments ?? [], //贸易凭证
  otherDocuments: orderDetail.value?.otherDocuments ?? [], //其他凭证

  //外贸订单
  exchangeType: orderDetail.value?.exchangeType ?? 1, //是否结汇, 1:结汇, 2:不结汇
  buyerType: orderDetail.value?.buyerType ?? 1, //新老买家，1：新买家，2：老买家

  //电商订单
  paymentCompany: orderDetail.value?.paymentCompany ?? "", //支付公司
  paymentOrderId: orderDetail.value?.paymentOrderId ?? "", //支付订单号
  shopType: orderDetail.value?.shopType ?? 1, //店铺类型, 1:亚马逊, 2:eBay, 3:TikTok
  tiktokTransactionFileList: orderDetail.value?.tiktokTransactionFileList ?? [], //TikTok交易记录

  currency: orderDetail.value?.currency ?? "USD", //币种，USD：美元
  remark: orderDetail.value?.remark ?? "", //备注
});

const exchangeType = ref(orderDetail.value?.exchangeType ?? 1);
const buyerType = ref(orderBaseInfo.value.buyerType);

watch(orderBaseInfo.value, (newVal, oldVal) => {
  exchangeType.value = newVal.exchangeType;
  buyerType.value = newVal.buyerType;
});

watch(buyerType, (newVal, oldVal) => {
  for (const e of logisticsMap.values()) {
    e?.resetForm();
  }
});

watch(exchangeType, (newVal, oldVal) => {
  for (const e of logisticsMap.values()) {
    e?.resetForm();
  }
});

// 贸易凭证图片上传
function getTradeDocuments(res: any) {
  orderBaseInfo.value.tradeDocuments.push({
    fileAddress: res?.data,
    fileName: res?.name,
    url: res?.data,
    name: res?.name,
  });

  orderBaseInfoFormRule.value?.validateField("tradeDocuments");
}
// 其他凭证上传
function getOtherDocuments(res: any) {
  orderBaseInfo.value.otherDocuments.push({
    fileAddress: res?.data,
    fileName: res?.name,
    url: res?.data,
    name: res?.name,
  });
}

//上传tiktok交易记录图片
function getTiktokTradeImages(res: any) {
  orderBaseInfo.value.tiktokTransactionFileList.push({
    fileAddress: res.data,
    fileName: res.name,
    url: res.data,
    name: res.name,
  });
  tiktokInfoFormRule.value?.validateField("tiktokTransactionFileList");
}
//#endregion

//#region 商品信息部分
//订单商品信息
const goodsListItemInput = ref(goodsListFormItems);

let goodsListInfo = ref(
  orderDetail.value.goodsList && orderDetail.value.goodsList.length
    ? orderDetail.value.goodsList
    : [
        {
          amount: "",
          goodsNameEn: "",
          goodsName: "",
          number: "",
          price: "",
          unit: "",
        },
      ]
);

const addGoodsListInfo = () => {
  goodsListInfo.value.push({
    amount: "",
    goodsName: "",
    goodsNameEn: "",
    number: "",
    price: "",
    unit: "",
  });
};
const removeGoodsListInfo = (index: number) => {
  goodsListInfo.value.splice(index, 1);
  goodsMap.delete(index);
};
//#endregion

//#region 电商部分
const shopType = ref(
  baseInfoStore.orderDetail.shopType ?? shopTypeEnum.value[0].key
); //店铺类型 01:亚马逊 02:eBay 03:tiktok

//#region 订单和物流信息
// 物流信息
let logisticsListInfo = ref(
  orderDetail.value?.logisticsList?.length ?? 0 > 0
    ? orderDetail.value.logisticsList
    : [
        {
          fileList: [],
          transComFileList: [],
          outboundLogisticsOrderFileList: [],
          orderComFileList: [],
          logisticsCompany: "",
          logisticsId: "",
          logisticsMode: "",
          logisticsOrderNo: "",

          transactionMethodCode: 1,
          status: 1,
        },
      ]
);

const addLogisticsList = () => {
  logisticsListInfo.value.push({
    fileList: [],
    transComFileList: [],
    orderComFileList: [],
    outboundLogisticsOrderFileList: [],
    logisticsCompany: "",
    logisticsId: "",
    logisticsMode: "",
    logisticsOrderNo: "",

    transactionMethodCode: 1,
    status: 1,
  });
};
const removeLogisticsList = (index: number) => {
  logisticsListInfo.value.splice(index, 1);
  logisticsMap.delete(index);
};

function fileListSuccess(fileType: string, res: any, index: number) {
  if (res.data && res.name)
    logisticsListInfo.value[index][fileType].push({
      fileAddress: res.data,
      fileName: res.name,
      url: res.data,
      name: res.name,
    });
  logisticsMap.get(index)?.validateField(fileType);
}
//#endregion

//#region 订单提交部分

//提交订单
async function submitApplyInfo() {
  // 基本信息校验
  let orderBaseInfoValidate = true;
  if (
    (orderType.value === 2 && shopType.value !== 3) ||
    orderType.value === 1
  ) {
    //抖音店铺不校验
    orderBaseInfoValidate = await orderBaseInfoFormRule.value?.submitForm();
  }

  let goodsListValidate = true;
  let logisticsListValidate = true;

  // 商品和物流信息校验
  if (shopType.value !== 3) {
    goodsListValidate = await getValidate(goodsMap.values());
    logisticsListValidate = await getValidate(logisticsMap.values());
  }

  // 抖音校验
  let tiktokvalidate = true;
  if (orderType.value === 2 && shopType.value === 3) {
    tiktokvalidate = await tiktokInfoFormRule.value.submitForm();
  }

  if (
    orderBaseInfoValidate &&
    goodsListValidate &&
    logisticsListValidate &&
    tiktokvalidate
  ) {
    // 订单号重复校验
    const isOrderIdRepeated = await checkOrderIdRepeated(
      orderBaseInfo.value?.customOrderId ?? ""
    );
    if (isOrderIdRepeated) {
      ElMessage({
        type: "warning",
        showClose: true,
        message: "订单编号重复!",
      });
      return;
    }

    // 抖音店铺无物流和商品信息
    if (shopType.value === 3) {
      logisticsListInfo.value = null;
      goodsListInfo.value = null;
    }

    // 电商订单无新老买家和是否结汇选项
    let IexchangeType = orderBaseInfo.value.exchangeType;
    let IbuyerType = orderBaseInfo.value.buyerType;
    if (orderType.value === 2) {
      IexchangeType = null;
      IbuyerType = null;
    }

    let par = {
      ...orderBaseInfo.value,
      goodsList: goodsListInfo.value,
      logisticsList: logisticsListInfo.value,
      orderType: orderType.value,
      orderId: orderId.value,
      shopType: orderType.value === 2 ? shopType.value : null,
      exchangeType: IexchangeType,
      buyerType: IbuyerType,
    };

    applyApiInfo(par);
  }
}

function getValidate(validateData: any): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let result: any = [];
    for (let validate of validateData) {
      validate
        ?.submitForm()
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

async function applyApiInfo(par: any) {
  let res: any = await request(
    "post",
    `/abroad-merchant/front/order/${orderId.value ? "update" : "add"}`,
    par
  );
  if (res.code === 200) {
    baseInfoStore.getMerchantApplyInfo();
    router.push({ path: "/abroad/order" });
  }
}

//#endregion

watch(orderType, (newVal, oldValue) => {
  if (newVal === 1) {
    shopType.value = 1;
    orderBaseFormItems.value = orderBaseFormItems1;
  } else {
    exchangeType.value = 1;
    orderBaseFormItems.value = orderBaseFormItems2;
  }
  orderBaseInfo.value.shopName = "";
  orderBaseInfo.value.website = "";

  orderBaseInfo.value.shopName = "";
  orderBaseInfo.value.website = "";
});

function resetLogistic(i: number, logistics: any) {
  const status = logistics.status;
  logisticsMap.get(i)?.resetForm();
  logistics.status = status;

  logistics.orderComFileList = [];
  logistics.transComFileList = [];
}
//#region Hooks
onMounted(() => {
  for (const item of logisticsListInfo.value) {
    if (item.transactionMethodCode == -1) {
      item.transactionMethodCode = null;
    }
  }
});
//#endregion
</script>

<style scoped lang="scss">
@import "@/assets/css/apply_from.scss";
@import "@/assets/css/normal.scss";
.apply-content {
  background-color: #fff;
  box-shadow: 0px 10px 12px 0px rgba(167, 210, 243, 0.08);
  border-radius: 20px;
  padding: 30px 40px;
  .no-pass {
    margin-bottom: 25px;
  }
  .title {
    height: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #25343c;
    border-bottom: 1px solid #ecf2f5;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .order-type {
    p {
      font-size: 14px;
      font-weight: 400;
      color: #6a767d;
      span {
        color: #6a767d;
        opacity: 0.5;
      }
    }
  }
  .apply-form {
    padding: 0;
    box-shadow: none;
    position: relative;
    .error-tip {
      position: absolute;
      font-size: 12px;
      color: #999393;
      line-height: 14px;
      left: 0px;
      bottom: -10px;
      height: 0;
    }
    .amont-error-tip {
      position: absolute;
      font-size: 12px;
      color: #f56c6c;
      line-height: 1;
      top: 20px;
      left: 680px;

      &.change {
        top: 80px;
      }
    }
  }
}
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
  .textarea {
    display: flex;
    padding: 28px 20px 30px 25px;
    box-sizing: border-box;
    label {
      display: block;
      color: rgba(106, 118, 125, 1);
      font-size: 14px;
      width: 80px;
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
.form-order-type {
  @include flex($justContent: start);
}

.changeInfo {
  color: #3c484f;
  font-size: 14px;
  @include flex($justContent: start);
  margin-bottom: 40px;
  margin-left: 30px;
  .shopType-1 {
    margin-left: 20px;
    @include flex($justContent: start);
  }

  .form-order-type {
    @include flex($justContent: start);
  }
}

.header-container {
  @include flex($justContent: start, $direction: column, $alignItem: start);
  width: 100%;

  .shopType {
    @include flex($justContent: start, $alignItem: center);
    margin: 20px 0;
    .shopTypeSelect {
      width: 400px;
      background: #ffffff;
    }
  }
}

.h3Title {
  margin-top: 10px;
}

.orderInfos {
  color: #3c484f;
  font-size: 14px;
  @include flex(column, start, start);

  margin-bottom: 20px;
  margin-left: 30px;

  .form-order-type {
    margin-bottom: 20px;
  }

  .shopType2 {
    margin-left: 20px;
    @include flex($justContent: start);
  }
}

.tiktokShop {
  > .orderInfos {
    margin-bottom: 30px;
  }
}

.amont-error-tip2 {
  position: absolute;
  font-size: 12px;
  color: #f56c6c;
  line-height: 1;
  top: 70px;
  left: 140px;

  &.change {
    top: 110px;
  }
}
</style>
