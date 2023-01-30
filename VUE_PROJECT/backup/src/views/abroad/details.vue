<!--
 * @Description: 建议该页面使用组件重写
 -->
<template>
  <div class="order-detail-page">
    <div class="content">
      <div class="order-title">
        <h3>订单详情</h3>
      </div>
      <!-- 第一部分 -->
      <div class="info-block">
        <p class="category">一、订单基本信息</p>
        <div class="list-warp" v-if="!showTikTok">
          <div class="list-item">
            <div>订单类型</div>
            <div>{{ orderInfo.orderType === 1 ? "外贸订单" : "电商订单" }}</div>
          </div>

          <div class="list-item" v-if="orderInfo.orderType === 2">
            <div>店铺类型</div>
            <div>
              {{ orderInfo.shopType === 1 ? "亚马逊店铺" : "eBay店铺" }}
            </div>
            <div v-if="orderInfo.orderType === 1"></div>
            <div v-if="orderInfo.orderType === 1"></div>
          </div>

          <div class="list-item">
            <div>订单编号</div>
            <div>{{ orderInfo.customOrderId }}</div>
          </div>

          <div class="list-item">
            <div>订单总额</div>
            <div>{{ orderInfo.amount }} {{ orderInfo.currency }}</div>
          </div>

          <div class="list-item" v-if="orderInfo.orderType == 2">
            <div>支付公司</div>
            <div>{{ orderInfo.paymentCompany }}</div>
          </div>

          <div class="list-item" v-if="orderInfo.orderType == 2">
            <div>支付订单号</div>
            <div>{{ orderInfo.paymentOrderId }}</div>
          </div>

          <div class="list-item">
            <div>买家英文名称</div>
            <div>{{ orderInfo.buyerName }}</div>
          </div>

          <div class="list-item">
            <div>贸易国家</div>
            <div>{{ orderInfo.tradeCountry }}</div>
          </div>

          <div class="list-item">
            <div>店铺名称</div>
            <div>{{ orderInfo.shopName }}</div>
          </div>

          <div class="list-item">
            <div>店铺或商品网址</div>
            <div>{{ orderInfo.website }}</div>
          </div>

          <div class="list-item" v-if="orderInfo.orderType == 1">
            <div>新/老买家</div>
            <div>{{ orderInfo?.buyerType == 1 ? "新买家" : "老买家" }}</div>
          </div>

          <div class="list-item" v-if="orderInfo.orderType == 1">
            <div>订单是否需结汇</div>
            <div>{{ orderInfo?.exchangeType == 1 ? "是" : "否" }}</div>
          </div>

          <div class="list-item" v-if="orderInfo.orderType == 1">
            <div></div>
            <div></div>
          </div>

          <div class="list-item">
            <div>贸易凭证</div>
            <div>
              <div class="img-list">
                <el-image
                  :src="file.fileAddressShow"
                  :alt="file.fileName"
                  v-for="(file, index) in orderInfo.tradeDocuments"
                  :key="file.fileName"
                  :preview-src-list="
                    orderInfo?.tradeDocuments?.map((i:ImageFile) => {
                      return i.fileAddressShow;
                    })
                  "
                  :initial-index="index"
                  :preview-teleported="true"
                />
              </div>
              <span
                v-if="orderInfo.tradeDocuments?.length > 0"
                @click="showPics(orderInfo.tradeDocuments)"
                class="enlarge"
              ></span>
            </div>
          </div>

          <div class="list-item">
            <div>其他凭证</div>
            <div>
              <div class="img-list">
                <el-image
                  :src="file.fileAddressShow"
                  :alt="file.fileName"
                  v-for="(file, index) in orderInfo.otherDocuments"
                  :key="file.fileName"
                  :preview-src-list="
                    orderInfo?.otherDocuments?.map((i:ImageFile) => {
                      return i.fileAddressShow;
                    })
                  "
                  :initial-index="index"
                  :preview-teleported="true"
                />
              </div>
              <span
                v-if="orderInfo?.otherDocuments?.length > 0"
                @click="showPics(orderInfo.otherDocuments)"
                class="enlarge"
              ></span>
            </div>
          </div>
        </div>

        <div class="list-warp" v-if="showTikTok">
          <div class="list-item">
            <div>订单类型</div>
            <div>电商订单</div>
          </div>

          <div class="list-item">
            <div>店铺类型</div>
            <div>TIKTOK</div>
          </div>

          <div class="list-item">
            <div>订单编号</div>
            <div>{{ orderInfo.customOrderId }}</div>
          </div>

          <div class="list-item">
            <div>订单总额</div>
            <div>{{ orderInfo.amount }} {{ orderInfo.currency }}</div>
          </div>

          <div class="list-item">
            <div>TikTok交易记录</div>
            <div>
              <div class="img-list">
                <el-image
                  v-for="(file, index) in orderInfo?.tiktokTransactionFileList"
                  :src="file.fileAddressShow"
                  :alt="file.fileName"
                  :key="file.fileName"
                  :preview-src-list="
                      orderInfo?.tiktokTransactionFileList?.map((i:ImageFile) => {
                        return i.fileAddressShow;
                      })
                    "
                  :initial-index="index"
                  :preview-teleported="true"
                />
              </div>
            </div>
          </div>

          <div class="list-item">
            <div></div>
            <div>
              <div class="img-list-slot"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二部分 -->
      <div class="info-block" v-if="!showTikTok">
        <p class="category">二、订单商品信息</p>
        <div
          class="list-warp"
          v-for="(goods, index) in orderInfo.goodsList"
          :key="goods.goodsName"
        >
          <div class="list-item">
            <div>
              商品{{ orderInfo.goodsList.length > 1 ? index + 1 : "" }}中文名称
            </div>
            <div>{{ goods.goodsName }}</div>
          </div>
          <div class="list-item">
            <div>
              商品{{ orderInfo.goodsList.length > 1 ? index + 1 : "" }}英文名称
            </div>
            <div>{{ goods.goodsNameEn }}</div>
          </div>
          <div class="list-item">
            <div>商品数量</div>
            <div>{{ goods.number }}</div>
          </div>
          <div class="list-item">
            <div>商品单位</div>
            <div>{{ goods.unit }}</div>
          </div>
          <div class="list-item">
            <div>商品单价</div>
            <div>{{ goods.price }} {{ orderInfo.currency }}</div>
          </div>
          <div class="list-item">
            <div>商品总价</div>
            <div>{{ goods.amount }} {{ orderInfo.currency }}</div>
          </div>
        </div>
      </div>

      <!-- 第三部分 -->
      <div class="info-block" v-if="!showTikTok">
        <p class="category">三、订单发货、物流信息</p>
        <div
          class="list-warp"
          v-for="logis in orderInfo.logisticsList"
          :key="logis.logisticsId"
        >
          <div v-if="showETrade" class="if-warp">
            <div class="list-item">
              <div>发货状态</div>
              <div>{{ logis.status == "0" ? "未发货" : "已发货" }}</div>
            </div>

            <div class="list-item">
              <div>物流方式</div>
              <div>
                {{ LogisticsModeList.get(logis.logisticsMode) }}
              </div>
            </div>

            <div class="list-item">
              <div>出境物流单号</div>
              <div>{{ logis.logisticsOrderNo }}</div>
            </div>

            <div class="list-item">
              <div>物流公司</div>
              <div>{{ logis.logisticsCompany }}</div>
            </div>

            <div class="list-item" v-if="logis?.fileList?.length">
              <div>物流单附件</div>
              <div>
                <div class="img-list">
                  <el-image
                    :src="file.fileAddressShow"
                    :alt="file.fileName"
                    v-for="(file, index) in logis.fileList"
                    :key="file.fileName"
                    :preview-src-list="
                      logis?.fileList?.map((i:ImageFile) => {
                        return i.fileAddressShow;
                      })
                    "
                    :initial-index="index"
                    :preview-teleported="true"
                  />
                </div>
                <span
                  v-if="logis?.fileList"
                  class="enlarge"
                  @click="showPics(logis.fileList)"
                ></span>
              </div>
            </div>

            <div class="list-item" v-if="logis?.fileList?.length">
              <div></div>
              <div>
                <div class="img-list-slot"></div>
              </div>
            </div>
          </div>

          <!-- 外贸新买家 -->
          <div v-if="newBuyer" class="if-warp">
            <div v-if="logis.status == 0" class="if-warp2">
              <div class="list-item">
                <div>发货状态</div>
                <div>{{ logis.status == "0" ? "未发货" : "已发货" }}</div>
              </div>

              <div class="list-item">
                <div>成交方式</div>
                <div>
                  {{
                    ENUM.TRANSACTION_METHOD[logis.transactionMethodCode - 1]
                      ?.label
                  }}
                </div>
              </div>

              <div class="list-item">
                <div>预计发货日期</div>
                <div>{{ logis.expectSendGoodsTime?.slice(0, 10) }}</div>
              </div>

              <div class="list-item">
                <div></div>
                <div></div>
              </div>

              <div class="list-item">
                <div>货运沟通记录</div>
                <div>
                  <div class="img-list">
                    <el-image
                      :src="file.fileAddressShow"
                      :alt="file.fileName"
                      v-for="(file, index) in logis.transComFileList"
                      :key="file.fileName"
                      :preview-src-list="
                        logis?.transComFileList?.map((i:ImageFile) => {
                          return i.fileAddressShow;
                        })
                      "
                      :initial-index="index"
                      :preview-teleported="true"
                    />
                    <span
                      v-if="logis?.transComFileList?.length > 0"
                      class="enlarge"
                      @click="showPics(logis.transComFileList)"
                    ></span>
                  </div>
                </div>
              </div>

              <div class="list-item">
                <div>下单沟通记录</div>
                <div>
                  <div class="img-list">
                    <el-image
                      :src="file.fileAddressShow"
                      :alt="file.fileName"
                      v-for="(file, index) in logis.orderComFileList"
                      :key="file.fileName"
                      :preview-src-list="
                        logis?.orderComFileList?.map((i:ImageFile) => {
                          return i.fileAddressShow;
                        })
                      "
                      :initial-index="index"
                      :preview-teleported="true"
                    />
                    <span
                      v-if="logis?.orderComFileList?.length > 0"
                      class="enlarge"
                      @click="showPics(logis.orderComFileList)"
                    ></span>
                    <!-- 占位 -->
                  </div>
                </div>
              </div>
            </div>

            <div v-if="logis.status == 1" class="if-warp2">
              <div class="list-item">
                <div>发货状态</div>
                <div>{{ logis.status == "0" ? "未发货" : "已发货" }}</div>
              </div>

              <div class="list-item">
                <div>物流单号</div>
                <div>
                  {{ logis.logisticsOrderNo }}
                </div>
              </div>

              <div class="list-item">
                <div>物流方式</div>
                <div>
                  {{ LogisticsModeList.get(logis.logisticsMode) }}
                </div>
              </div>

              <div class="list-item">
                <div>预计发货日期</div>
                <div>{{ logis.expectSendGoodsTime?.slice(0, 10) }}</div>
              </div>

              <div class="list-item">
                <div>物流公司</div>
                <div>{{ logis.logisticsCompany }}</div>
              </div>

              <div class="list-item">
                <div>成交方式</div>
                <div>
                  {{
                    ENUM.TRANSACTION_METHOD[logis.transactionMethodCode - 1]
                      ?.label
                  }}
                </div>
              </div>

              <div class="list-item">
                <div>物流单附件</div>
                <div>
                  <div class="img-list">
                    <el-image
                      :src="file.fileAddressShow"
                      :alt="file.fileName"
                      v-for="(file, index) in logis.fileList"
                      :key="file.fileName"
                      :preview-src-list="
                        logis?.fileList?.map((i:ImageFile) => {
                          return i.fileAddressShow;
                        })
                      "
                      :initial-index="index"
                      :preview-teleported="true"
                    />
                  </div>
                  <span
                    v-if="logis.fileList"
                    class="enlarge"
                    @click="showPics(logis.fileList)"
                  ></span>
                </div>
              </div>

              <div class="list-item">
                <div>下单沟通记录</div>
                <div>
                  <div class="img-list">
                    <el-image
                      :src="file.fileAddressShow"
                      :alt="file.fileName"
                      v-for="(file, index) in logis.orderComFileList"
                      :key="file.fileName"
                      :preview-src-list="
                        logis?.orderComFileList?.map((i:ImageFile) => {
                          return i.fileAddressShow;
                        })
                      "
                      :initial-index="index"
                      :preview-teleported="true"
                    />
                    <span
                      v-if="logis?.orderComFileList?.length > 0"
                      class="enlarge"
                      @click="showPics(logis.orderComFileList)"
                    ></span>
                    <!-- 占位 -->
                  </div>
                </div>
              </div>

              <div class="list-item">
                <div>货运沟通记录</div>
                <div>
                  <div class="img-list">
                    <el-image
                      :src="file.fileAddressShow"
                      :alt="file.fileName"
                      v-for="(file, index) in logis.transComFileList"
                      :key="file.fileName"
                      :preview-src-list="
                          logis?.transComFileList?.map((i:ImageFile) => {
                            return i.fileAddressShow;
                          })
                        "
                      :initial-index="index"
                      :preview-teleported="true"
                    />
                    <span
                      v-if="logis?.transComFileList?.length > 0"
                      @click="showPics(logis.transComFileList)"
                      class="enlarge"
                    ></span>
                  </div>
                </div>
              </div>

              <div class="list-item">
                <div></div>
                <div>
                  <div class="img-list-slot"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 外贸老买家 -->
          <div v-if="oldBuyer" class="if-warp">
            <div v-if="logis.status == 0" class="if-warp2">
              <div class="list-item">
                <div>发货状态</div>
                <div>{{ logis.status == "0" ? "未发货" : "已发货" }}</div>
              </div>

              <div class="list-item">
                <div>成交方式</div>
                <div>
                  {{
                    ENUM.TRANSACTION_METHOD[logis.transactionMethodCode - 1]
                      ?.label
                  }}
                </div>
              </div>

              <div class="list-item">
                <div>预计发货日期</div>
                <div>{{ logis.expectSendGoodsTime?.slice(0, 10) }}</div>
              </div>
              <div class="list-item">
                <div></div>
                <div></div>
              </div>

              <div class="list-item">
                <div>近期出境物流单</div>
                <div>
                  <div class="img-list">
                    <el-image
                      :src="file.fileAddressShow"
                      :alt="file.fileName"
                      v-for="(
                        file, index
                      ) in logis.outboundLogisticsOrderFileList"
                      :key="file.fileName"
                      :preview-src-list="
                        logis?.outboundLogisticsOrderFileList?.map((i:ImageFile) => {
                          return i.fileAddressShow;
                        })
                      "
                      :initial-index="index"
                      :preview-teleported="true"
                    />
                    <span
                      v-if="logis?.outboundLogisticsOrderFileList?.length > 0"
                      @click="showPics(logis.outboundLogisticsOrderFileList)"
                      class="enlarge"
                    ></span>
                  </div>
                </div>
              </div>
              <div class="list-item">
                <div></div>
                <div>
                  <div class="img-list-slot"></div>
                </div>
              </div>
            </div>
            <div v-if="logis.status == 1" class="if-warp2">
              <div class="list-item">
                <div>发货状态</div>
                <div>{{ logis.status == "0" ? "未发货" : "已发货" }}</div>
              </div>
              <div class="list-item">
                <div>物流单号</div>
                <div>
                  {{ logis.logisticsOrderNo }}
                </div>
              </div>

              <div class="list-item">
                <div>物流方式</div>
                <div>
                  {{ LogisticsModeList.get(logis.logisticsMode) }}
                </div>
              </div>
              <div class="list-item">
                <div>预计发货日期</div>
                <div>{{ logis.expectSendGoodsTime?.slice(0, 10) }}</div>
              </div>

              <div class="list-item">
                <div>物流公司</div>
                <div>{{ logis.logisticsCompany }}</div>
              </div>
              <div class="list-item">
                <div>成交方式</div>
                <div>
                  {{
                    ENUM.TRANSACTION_METHOD[logis.transactionMethodCode - 1]
                      ?.label
                  }}
                </div>
              </div>

              <div class="list-item">
                <div>物流单附件</div>
                <div>
                  <div class="img-list">
                    <el-image
                      :src="file.fileAddressShow"
                      :alt="file.fileName"
                      v-for="(file, index) in logis.fileList"
                      :key="file.fileName"
                      :preview-src-list="
                        logis?.fileList?.map((i:ImageFile) => {
                          return i.fileAddressShow;
                        })
                      "
                      :initial-index="index"
                      :preview-teleported="true"
                    />
                  </div>
                  <span
                    v-if="logis?.fileList?.length"
                    class="enlarge"
                    @click="showPics(logis.fileList)"
                  ></span>
                </div>
              </div>
              <div class="list-item">
                <div>近期出境物流单</div>
                <div>
                  <div class="img-list">
                    <el-image
                      :src="file.fileAddressShow"
                      :alt="file.fileName"
                      v-for="(
                        file, index
                      ) in logis.outboundLogisticsOrderFileList"
                      :key="file.fileName"
                      :preview-src-list="
                        logis?.outboundLogisticsOrderFileList?.map((i:ImageFile) => {return i.fileAddressShow;})
                      "
                      :initial-index="index"
                      :preview-teleported="true"
                    />
                    <span
                      v-if="logis?.outboundLogisticsOrderFileList?.length > 0"
                      @click="showPics(logis.outboundLogisticsOrderFileList)"
                      class="enlarge"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第四部分 -->
      <div class="info-block">
        <p class="category">{{ showTikTok ? `二` : `四` }}、备注</p>
        <div class="list-warp">
          <div class="list-item">
            <div style="display: none"></div>
            <div class="remark">{{ orderInfo.remark }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <el-button @click="() => router.back()" type="primary" class="btn">返回</el-button>
    </div>

    <el-dialog v-model="dialogVisible" :fullscreen="true" class="dialog">
      <img
        w-full
        v-for="pic in showPicList"
        :src="pic"
        alt="预览图片"
        class="img"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { request } from "@/service/http";
import { ref, onMounted, computed, Ref } from "vue";
import { baseStore } from "@/store/base";
import { useEnumStore } from "@/store/enum";
import { ImageFile } from "@/types/interface/imageFile";
import { getLogisticsModeAPI } from "@/api/enum";
import { useRouter } from "vue-router";
import { ImageType } from "./type";

const router = useRouter();
const ENUM = useEnumStore();
const baseInfoStore = baseStore();
const orderInfo = ref({
  ...baseInfoStore.orderDetail,
});

const LogisticsModeMap = ref(new Map());

const LogisticsModeList = computed(() => LogisticsModeMap.value);

const showTikTok = ref(
  orderInfo.value?.orderType === 2 && orderInfo.value?.shopType === 3
);
const showForeignTrade = ref(orderInfo.value?.orderType === 1);
const showETrade = ref(
  orderInfo.value?.orderType === 2 && orderInfo.value?.shopType !== 3
);
const oldBuyer = ref(
  showForeignTrade.value && orderInfo.value?.buyerType === 2
);
const newBuyer = ref(
  showForeignTrade.value && orderInfo.value?.buyerType === 1
);

const dialogVisible = ref(false);
const showPicList: Ref<string[]> = ref([]);
function showPics(pics: ImageType[]) {
  showPicList.value = [];
  for (const pic of pics) {
    showPicList.value.push(pic.fileAddressShow);
  }
  dialogVisible.value = true;
}

onMounted(async () => {
  await ENUM.initEnums();
  for (const logistic of ENUM.LOGISTICS_MODE) {
    LogisticsModeMap.value.set(logistic.key, logistic.label);
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/normal.scss";
.order-detail-page {
  width: 100%;height: 100%;
  .content {
    width: 100%;
    box-sizing: border-box;
    min-height: 100%;
    background: #ffffff;
    box-shadow: 0px 10px 12px 0px rgba(167, 210, 243, 0.08);
    border-radius: 20px;
    padding: 20px 40px;

    .order-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #ecf2f5;
      margin-bottom: 20px;

      > h3 {
        font-size: 20px;
        font-weight: bold;
        padding: 0;
        color: #25343c;

        span {
          font-size: 14px;
          color: #97a7b2;
        }
      }
    }

    .info-block {
      margin-bottom: 20px;

      .category {
        font-size: 16px;
        color: #25343c;
        font-weight: bold;
        line-height: 30px;
      }

      .list-warp {
        @include flex(row, start);
        flex-wrap: wrap;
        border: 1px solid #e1e8ed;
        border-radius: 8px;
        font-size: 14px;
        margin-bottom: 20px;

        .if-warp {
          width: 100%;
          @include flex(row, start);
          flex-wrap: wrap;
          .if-warp2 {
            @include flex(row, start);
            flex-wrap: wrap;
            width: 100%;
          }
        }

        .warn {
          background-color: #fff2ef;
          color: #f13729;
          padding: 15px 30px;
          border-bottom: 1px solid #e1e8ed;
        }

        .list-item {
          width: 50%;
          display: flex;

          justify-content: space-between;
          align-items: stretch;
          min-height: 50px;
          background-color: #f4f8fb;
          border-bottom: 1px solid #e1e8ed;
          img {
            width: 30px;
            height: 30px;
            vertical-align: middle;
          }
          &:last-child {
            border: none;
          }
          div {
            flex: 1;
            // display:flex;
            min-height: 50px;
            line-height: 50px;
            padding-left: 30px;
            position: relative;

            span {
              position: absolute;
              display: inline-block;
              width: 18px;
              height: 18px;
              bottom: 5px;
              right: 5px;
              background: url(@/assets/images/enlarge-icon.png) no-repeat
                center/100%;
            }
            &:nth-child(odd) {
              width: 240px;
              align-self: center;
              color: #919ba4;
            }

            &:nth-child(even) {
              min-width: 240px;
              background-color: #fff;
              border-left: 1px solid #e1e8ed;
              border-right: 1px solid #e1e8ed;
              .img-list {
                min-width: 240px;
                margin: 25px 0;
                padding: 0;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                &::v-deep(.el-image) {
                  flex: 0;
                  min-width: 100px;
                  height: 55px;
                  border-radius: 8px;
                  padding: 0;
                  margin: 5px 10px 5px 0;
                }
              }
              .img-list-slot {
                min-width: 240px;
                margin: 30px 0;
                padding: 0;
                width: 100%;
                height: 55px;
              }
              &:last-child {
                border-right: none;
              }
              &.remark {
                border: none;
              }
            }
          }
        }
      }
    }
  }

  .footer {
    width: 100%;
    @include flex;
    padding: 20px;

    .btn {
      width: 168px;
      height: 58px;
      font-weight: bold;
      font-size: 18px;
    }
  }

  .dialog {
    ::v-deep(el-dialog__body) {
      img {
        margin: 20px;
      }
    }
  }
}
</style>
