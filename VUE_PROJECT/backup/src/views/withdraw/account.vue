<template>
  <div class="withdraw-account-page">
    <div class="content">
      <div class="account-title">
        <h3>我的提现账户</h3>
        <el-button
          style="font-size: 16px;"
          type="primary"
          @click="addAccountData"
          v-if="checkSuccess"
          >添加提现账户</el-button
        >
      </div>
      <ul class="account-list" v-if="accountList && accountList.length > 0">
        <li v-for="item in accountList" :key="item.currency">
          <div class="total">
            <p class="currency-name">
              <img :src="getImageUrl(item.bankCode)" alt="" />
            </p>
            <h3>{{ item.bankName }}</h3>
          </div>
          <div class="type">{{ item.bankAccount }}
          </div>
          <div class="money"><label>账户类型：</label><p>{{ item.accountType }}</p></div>
          <div class="money"><label>账户名称：</label><p>{{ item.accountName }}</p></div>
          <div class="mask">
            <div class="inner">
              <el-button
                class="detail-button"
                type="primary"
                size="small"
                @click="deleteAccount(item)"
                v-if="item.type == 2"
                ><span class="delete">删除账户</span></el-button
              >
              <el-button type="primary" size="small" @click="detail(item)"
                >查看详情
              </el-button>
            </div>
          </div>
        </li>
        <!-- space-between最后一行占位 -->
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </ul>
      <el-dialog v-model="detailVisible" title="提现账户详情" width="500px">
        <div class="detail">
          <div class="index">
            <div class="left">账户类型</div>
            <div class="right">{{ detailformParams.accountType }}</div>
          </div>
          <div class="index">
            <div class="left">账户币种</div>
            <div class="right">{{ detailformParams.currency }}</div>
          </div>
          <div class="index">
            <div class="left">开户银行</div>
            <div class="right">{{ detailformParams.bankName }}</div>
          </div>
          <div class="index">
            <div class="left">开户银行网点</div>
            <div class="right">{{ detailformParams.bankOutlets }}</div>
          </div>
          <div class="index">
            <div class="left">银行账户</div>
            <div class="right">{{ detailformParams.bankAccount }}</div>
          </div>
          <div class="index">
            <div class="left">账户名称</div>
            <div class="right">{{ detailformParams.accountName }}</div>
          </div>
          <div class="index">
            <div class="left">银行预留联系方式</div>
            <div class="right">{{ detailformParams.mobile }}</div>
          </div>
      
        </div>
        <template #footer>
          <el-button type="primary" style="width:168px;height: 58px;" @click="detailVisible = false">关闭</el-button>
        </template>
      </el-dialog>
      <el-dialog v-model="addAccountVisible" title="添加提现账户" width="600px">
        <div style="width:100%;padding:0 20px;box-sizing:border-box;">
        <yk-form
          size="large"
          ref="addAccountFormRef"
          :inline="true"
          :formItems="addAccountformItems"
          :formParams="addAccountformParam"
          label-width="135"
        >
          <template #accountType>
            <el-radio-group
              v-model="addAccountformParam.accountType"
              @change="changeAccountType"
            >
              <el-radio v-if="merchantType !== 1" :label="2">对公结算</el-radio>
              <el-radio :label="1">对私结算</el-radio>
            </el-radio-group>
          </template>
          <template #bankCode>
            <el-select
              v-model="addAccountformParam.bankCode"
              placeholder="请选择开户银行"
              style="width: 100%"
            >
              <template v-for="item in bankDataList" :key="item.id">
                <el-option :label="item.label" :value="item.key" />
              </template>
            </el-select>
          </template>
          <template #bankCardImage>
            <yk-upload
              :placeholder="
                addAccountformParam.accountType === 2
                  ? '上传对公账户照片'
                  : '上传银行卡照片'
              "
              :prop="addAccountformParam.bankCardImage"
              :show="addAccountformParam.bankCardImageShow"
              @on-success="(event: any) => { 
                  addAccountformParam.bankCardImage = event.data;
                  addAccountformParam.bankCardImageShow = event.showUrl;
                }"
            ></yk-upload>
          </template>
          <template #bankAddress>
            <div>
              <el-select
                v-model="addAccountformParam.bankProvince"
                placeholder="请选择省"
                @change="getCity"
                style="width: 103px; margin-right: 3px"
              >
                <template v-for="item in provinceList" :key="item.id">
                  <el-option :label="item.areaName" :value="item.areaCode" />
                </template>
              </el-select>
              <el-select
                v-model="addAccountformParam.bankCity"
                placeholder="请选择市"
                @change="getCountyList"
                style="width: 103px; margin-right: 3px"
              >
                <template v-for="item in cityList" :key="item.id">
                  <el-option :label="item.areaName" :value="item.areaCode" />
                </template>
              </el-select>
              <el-select
                v-model="addAccountformParam.bankArea"
                placeholder="请选择区"
                style="width: 103px"
              >
                <template v-for="item in countyList" :key="item.id">
                  <el-option :label="item.areaName" :value="item.areaCode" />
                </template>
              </el-select>
              <!-- <el-form-item prop=“bankAddress”>
                <el-input v-model="addAccountformParam.bankOutlets" placeholder="请输入开户支行"></el-input>
              </el-form-item> -->
            </div>
          </template>
        </yk-form>
      </div>
        <template #footer>
          <el-button type="primary" style="width:168px;height: 58px;" plain @click="addAccountVisible = false">取消</el-button>
          <el-button type="primary" style="width:168px;height: 58px;" @click="addAccount" :loading="loadingAdd">添加</el-button>
        </template>
      </el-dialog>
    </div>
    <el-dialog
      v-model="deleteVisible"
      width="23%"
      :show-close="false"
      custom-class="deleteDialog"
      center="true"
    >
      <div class="body">
        <img src="../../assets/images/delete.png" alt="" class="delete-icon" />
        <div class="tip">删除提现账户</div>
        <div class="sure">您确定要删除该提现账户吗？</div>
        <span class="dialog-footer">
          <el-button class="cancel-button" @click="deleteVisible = false"
            ><span class="cancel">取消</span></el-button
          >
          <el-button class="delete-button" @click="deleteAccountId"
            ><span class="delete">删除</span></el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { request } from "@/service/http";
import YkForm from "@/components/yk-form.vue";
import YkUpload from "@/components/upload.vue";
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { baseStore } from "@/store/base";
import { detailform, addAccountform1, addAccountform2 } from "./data";
const baseInfoStore = baseStore();

const bankDataList = computed(() => {
  return baseInfoStore.bankData;
});

const merchantType = baseInfoStore.applyInfo.merchantType;
let provinceList = ref<any>([]);
let cityList = ref<any>([]);
let countyList = ref<any>([]);
const detailformParams = reactive({
  accountType: "",
  currency: "",
  bankName: "",
  bankOutlets: "",
  bankAccount: "",
  accountName: "",
  mobile: "",
  bankCardImage: "",
});
const router = useRouter();
const detailVisible = ref(false);
const deleteVisible = ref(false);
const detailData: any = ref(null);
const addAccountVisible = ref(false);
let addAccountformItems = ref<any>(
  merchantType === 1 ? addAccountform2 : addAccountform1
);
const addAccountformParams1 = reactive({
  accountType: 2,
  currency: "",
  bankCardImage: "",
  bankCode: "",
  bankProvince: "",
  bankCity: "",
  bankArea: "",
  bankOutlets: "",
  accountName: "",
  accountNo: "",
  mobile: "",
});
const addAccountformParams2 = reactive({
  accountType: 1,
  currency: "",
  bankCardImage: "",
  bankCode: "",
  bankProvince: "",
  bankCity: "",
  bankArea: "",
  bankOutlets: "",
  accountName: "",
  accountNo: "",
  mobile: "",
});
let addAccountformParam = reactive<any>(
  merchantType === 1 ? addAccountformParams2 : addAccountformParams1
);
const deleteId = ref();
const addAccountFormRef: any = ref();
const loadingAdd = ref(false);
watch(addAccountformParam, (newVal, oldValue) => {
  if (newVal.bankProvince && newVal.bankCity && newVal.bankArea) {
    addAccountformParam.bankAddress = 4;
  }
});
const addAccountData = () => {
  addAccountVisible.value = true;
  getDataShow();
};

async function getProvince() {
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/area",
    { areaLevel: 1 }
  );
  provinceList.value = data;
}
getCity(addAccountformParam.bankProvince);
async function getCity(parentCode: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/area",
    { parentCode: parentCode }
  );
  cityList.value = data;
}
getCountyList(addAccountformParam.bankCity);
async function getCountyList(parentCode: string) {
  if (!parentCode) return;
  let { data }: any = await request(
    "post",
    "/abroad-merchant/front/select/area",
    { parentCode: parentCode }
  );
  countyList.value = data;
}
async function getAccountWallet() {
  let res: any = await request(
    "GET",
    "/abroad-merchant/front/withdraw/account",
    {}
  );
  if (res.code === 200) {
    accountList.value = res.data;
  }
}
const changeAccountType = (index: number) => {
  getDataShow();
  if (index === 1) {
    addAccountformItems.value = addAccountform2;
    // addAccountformParam.value = addAccountformParams2
    addAccountFormRef.value.resetForm();
    addAccountformParam.accountType = 1;
    addAccountformParam.bankProvince = "";
    addAccountformParam.bankCity = "";
    addAccountformParam.bankArea = "";
  } else {
    addAccountformItems.value = addAccountform1;
    // addAccountformParam.value = addAccountformParams1
    addAccountFormRef.value.resetForm();
    addAccountformParam.accountType = 2;
    addAccountformParam.bankProvince = "";
    addAccountformParam.bankCity = "";
    addAccountformParam.bankArea = "";
  }
};
async function getDataShow() {
  let res: any = await request(
    "GET",
    "/abroad-merchant/front/withdraw/initData",
    { type: addAccountformParam.accountType }
  );
  if (res.code === 200) {
    addAccountformParam.accountName = res.data.accountNo;
    addAccountformParam.legalIdCardType = res.data.legalIdCardType;
    addAccountformParam.legalIdCardNo = res.data.legalIdCardNo;
  }
}

const deleteAccount = (item: any) => {
  if (item.type == 2) {
    deleteVisible.value = true;
    deleteId.value = item.id;
  } else {
    ElMessage({
      type: "warning",
      message: "该提现账户不能删除！",
    });
  }
};
async function deleteAccountId() {
  let res: any = await request(
    "DELETE",
    `/abroad-merchant/front/withdraw/account/${deleteId.value}`,
    {}
  );
  if (res.code === 200) {
    deleteVisible.value = false;
    getAccountWallet();
    ElMessage({
      type: "success",
      message: "删除成功！",
    });
  }
}

const detail = (item: any) => {
  detailVisible.value = true;
  // Object.assign({}, {accountType:item.accountType,currency:item.currency,
  // bankName:item.bankName,bankOutlets:item.bankOutlets,bankAccount:item.bankAccount,accountName:item.accountName,mobile:item.mobile})
  detailformParams.accountType = item.accountType;
  detailformParams.currency = item.currency;
  detailformParams.bankName = item.bankName;
  detailformParams.bankOutlets = item.bankOutlets;
  detailformParams.bankAccount = item.bankAccount;
  detailformParams.accountName = item.accountName;
  detailformParams.mobile = item.mobile;
  detailformParams.bankCardImage = item.bankCardImage;
};
const addAccount = async () => {
  let validate = await addAccountFormRef.value.submitForm();
  // console.log(addAccountformParam)
  if (validate) {
    loadingAdd.value = true;
    let res: any = await request(
      "POST",
      "/abroad-merchant/front/withdraw/account",
      {
        ...addAccountformParam,
      }
    );
    loadingAdd.value = false;
    if (res.code === 200) {
      addAccountVisible.value = false;
      getAccountWallet();
      ElMessage({
        type: "success",
        message: "添加成功！",
      });
      addAccountFormRef.value.resetForm();
      addAccountformItems.value = addAccountform1;
      addAccountformParam.bankProvince = "";
      addAccountformParam.bankCity = "";
      addAccountformParam.bankArea = "";
      addAccountformParam.accountType = 1;
    } else if (res.code === 500) {
      //  ElMessage({
      //   type: 'error',
      //   message: res.message
      // })
    }
  }
};

const accountList = ref([]);
const getImageUrl = (name: string) => {
  const ImgUrl = `https://h5-front.leshuazf.com/web/common/img/banklogo-color/${name}.png`;
  let xmlHttp;
  if (window.ActiveXObject) {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }
  xmlHttp.open("Get", ImgUrl, false);
  xmlHttp.send();
  if (xmlHttp.status == 404)
    return new URL(
      `https://h5-front.leshuazf.com/web/common/img/banklogo-color/defaults.png`
    );
  else
    return new URL(
      `https://h5-front.leshuazf.com/web/common/img/banklogo-color/${name}.png`
    );
};

const checkSuccess = computed(() => {
  return (
    baseInfoStore.applyInfo?.merchantCheckStatus === 2 &&
    baseInfoStore.applyInfo?.checkStatus == 2 &&
    baseInfoStore.applyInfo?.channelStatus == 5
  );
});

onMounted(async () => {
  await baseInfoStore.getMerchantApplyInfo();
  if (checkSuccess.value) {
    getProvince();
    getAccountWallet();
    baseInfoStore.getBankData();
  }
});
</script>

<style lang="scss" scoped>
.withdraw-account-page {
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
    }

    .account-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      li {
        flex: 0 1 auto;
        box-sizing: border-box;
        margin: 10px 0;
        width: calc(25% - 18px);
        width: 360px;
        height: 230px;
        padding: 10px 20px;
        background: #F8FBFD;
        border: 1px solid #DEEBF1;
        border-radius: 16px;
        position: relative;
        margin-right: 18px;
        &:hover {
          background: #fcfdfe;

          .mask {
            display: block;
          }
        }

        .total {
          display: flex;
          align-items: center;
          color: #25343c;
          margin-bottom: 16px;
          padding-bottom: 10px;

          .currency-name {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            vertical-align: middle;
            width: 50px;
            height: 50px;
            background: #ffffff;
            box-shadow: 0px 2px 6px 0px rgb(167 210 243 / 36%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              vertical-align: middle;
              width: 66px;
              height: 66px;
            }
          }

          h3 {
            font-size: 16px;
            font-family: NotoSansHans-Bold;
            font-weight: bold;
            color: #25343c;
            line-height: 44px;
            text-align: center;
            padding: 0;
            margin-left: 10px;

            span {
              font-size: 14px;
              font-weight: bold;
            }
          }
        }

        .type {
          width: 100%;
          font-size: 24px;
          font-weight: 600;
          color: #25343C;
          line-height: 44px;
        }

        .money {
          height: 32px;
          font-size: 14px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #97A0A5;
          label {
            font-size: 14px;
          }

          p {
            font-family: Bahnschrift;
            font-size: 14px;
          }
        }
      }

      span {
        width: 354px;
      }

      .mask {
        display: none;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 352px;
        height: 40%;
        background: linear-gradient(180deg, transparent, #fff, #fff);
        border-radius: 16px;

        .inner {
          position: inherit;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);

          .detail-button {
            background: #ffeeeb;
            border: none;

            .delete {
              color: #ff5d37;
              font-weight: 500;
              font-family: NotoSansHans-Medium;
            }
          }
        }
      }
    }

    .addAccount-footer {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      margin-bottom: 20px;

      .cancel-button {
        background: #c2e3ff;
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

    .detail {
      .index {
        display: flex;
        margin-bottom: 10px;
        margin-left: 20px;

        .left {
          font-size: 14px;
          font-family: NotoSansHans-Regular;
          font-weight: 400;color: #6A767D;
          line-height: 44px;
          width: 115px;
        }

        .right {
          width: 260px;
          font-size: 14px;
          font-family: NotoSansHans-Medium;
          font-weight: 500;
          color: #2C333F;
          line-height: 42px;
          margin-left: 30px;
        }
      }

      .button {
        width: 158px;
        height: 53px;
        background: #195eff;
        border-radius: 12px;
        font-size: 18px;
        font-family: NotoSansHans-Bold;
        font-weight: bold;
        color: #ffffff;
        line-height: 53px;
        text-align: center;
        margin: 0 auto;
        margin-top: 35px;
        margin-bottom: 30px;
      }
    }

    &::v-deep(.el-dialog__header) {
      border-bottom: 1px dashed #deebf1;
      padding-bottom: 15px;
    }
    &::v-deep(.el-dialog__body) {
      height: 550px;overflow-y: auto;
    }
    &::v-deep(.el-dialog__title) {
      font-weight: bold;
      color: #25343c;
      margin-left: 20px;
    }
  }

  .deleteDialog {
    height: 360px;
    background: #ffffff;
    border-radius: 20px;
    margin: 0 auto;

    &::v-deep(.el-dialog__header) {
      display: none;
    }

    .body {
      width: 100%;
      text-align: center;

      .delete-icon {
        width: 80px;
        height: 80px;
      }

      .tip {
        font-size: 22px;
        font-family: NotoSansHans-Bold;
        font-weight: bold;
        color: #25343c;
        line-height: 36px;
        margin-top: 29px;
        margin-bottom: 16px;
      }

      .sure {
        font-size: 16px;
        font-family: NotoSansHans-Regular;
        font-weight: 400;
        color: #6a767d;
        line-height: 36px;
        margin: 0 auto;
      }

      .dialog-footer {
        display: flex;
        justify-content: center;
        margin-top: 40px;
        margin-bottom: 20px;

        .cancel-button {
          background: #c2e3ff;
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
    }
  }

  &::v-deep(.el-dialog) {
    border-radius: 20px;
  }
  &::v-deep(.el-dialog__footer) {
    border-top:1px solid #E1E8ED;
    text-align: center;
    padding-top: 20px;
    padding-bottom:40px;
    .el-button {
          width: 168px;
          height: 58px;
          font-size: 18px;
          font-weight: bold;
        }
  }
}
</style>
