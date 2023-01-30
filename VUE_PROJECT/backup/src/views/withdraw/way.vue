<template>
  <div class="withdraw-way-page">
    <div class="content">
      <div class="account-title">
        <h3>选择提现方式</h3>
      </div>
      <div class="index">
        <div class="left">
          <div class="title">结汇提现</div>
          <div class="line"></div>
          <div class="word">
            我们将代您向中国境内银行完成结汇申报，<span class="blue"
              >资金入账后无需再向银行申报，且不占用个人5万美元/年的结汇额度</span
            >
          </div>
          <div class="note">注意事项:</div>
          <div class="note-content">
            1、仅支持提现至大陆企业对公及法人代表银行账户。<br />2、已在本平台提交的结汇申报订单资料不能重复用于其他平台。<br />3、该笔提现资金不能申报退税
          </div>
          <div class="support-cash">支持币种：</div>
          <div class="cash">1、境外人民币</div>
          <div class="service-fee">服务费用：</div>
          <div class="fee">每次提现手续费分为<br />1、跨境入账费：
            <span v-if="crossBorderServiceFee?.chargeType == '1'">收取规则为提现金额 * {{crossBorderServiceFee?.percent}}%。</span>
            <span v-else-if="crossBorderServiceFee?.chargeType == '2'">收取规则为每笔{{crossBorderServiceFee?.amount}}元。</span>
            <span v-else>未设置跨境入账费，请联系代理商。</span>
            <br /> 2、提现服务费：
            <span v-if="helpPayServiceFee?.chargeType == '1'">收取规则为提现金额 * {{helpPayServiceFee?.percent}}%。</span>
            <sapn v-else-if="helpPayServiceFee?.chargeType == '2'">收取规则为每笔{{helpPayServiceFee?.amount}}元。</sapn>
            <span v-else>未设置提现服务费，请联系代理商。</span>
            <br /> 3、每次提现收取的手续费总额为跨境入账费+提现服务费。</div>
          <div class="button" @click="fetchDialog(2)">立即提现</div>
        </div>
        <div class="right">
          <div class="title">普通提现</div>
          <div class="line"></div>
          <div class="word">
            我们将按照您的指令向合作银行发起一笔TT/电汇到您指定的银行账户。
          </div>
          <div class="notes">注意事项:</div>
          <div class="note-contents">
            1、仅支持提现至大陆企业对公及法人代表银行账户。暂不支持境外人民币提现至境内个人银行账户。<br />2、如提现美元至中国境内银行账户，需向银行结汇申报方能入账，具体申报材料请在提现
            前与您的银行确认。
          </div>
          <div class="support-cash">支持币种：</div>
          <div class="cash">1、境外人民币、美元、欧元。</div>
          <div class="service-fee">服务费用：</div>
          <div class="fee">每次提现手续费分为<br />1、跨境入账费：
            <span v-if="crossBorderServiceFee?.chargeType == '1'">收取规则为提现金额 * {{crossBorderServiceFee?.percent}}%。</span>
            <span v-else-if="crossBorderServiceFee?.chargeType == '2'">收取规则为每笔{{crossBorderServiceFee?.amount}}元。</span>
            <span v-else>未设置跨境入账费，请联系代理商。</span>
            <br /> 2、提现服务费：
            <span v-if="helpPayServiceFee?.chargeType == '1'">收取规则为提现金额 * {{helpPayServiceFee?.percent}}%。</span>
            <sapn v-else-if="helpPayServiceFee?.chargeType == '2'">收取规则为每笔{{helpPayServiceFee?.amount}}元。</sapn>
            <span v-else>未设置提现服务费，请联系代理商。</span>
            <br /> 3、每次提现收取的手续费总额为跨境入账费+提现服务费。</div>
          <div class="button" @click="fetchDialog(1)">立即提现</div>
        </div>
      </div>
    </div>
    <!-- {{accountList}} -->
    <el-dialog v-model="fetchVisible" title="发起提现" width="30%">
      <div style="margin:0 20px;">
        <yk-form size="large" ref="fetchFormRule" :inline="true" :formItems="fetchForm" :formParams="fetchFormParam"
        labelWidth="100">
        <template #wallet>
          <el-select
            v-model="fetchFormParam.wallet"
            placeholder="请选择资产账户"
            style="width: 100%"
            @change="getFetchAccount"
          >
            <template v-for="item in accountList" :key="item.key">
              <el-option :label="item.data + ' ' + item.label" :value="item.key + ' ' + item.label" v-if="item.key == 'CNY'" />
            </template>
          </el-select>
        </template>
        <template #receiveAccount>
          <el-select
            v-model="fetchFormParam.receiveAccount"
            placeholder="请选择到账账户"
            style="width: 100%"
            @change="getAccount"
          >
            <template v-for="item in arriveList" :key="item.key">
              <el-option :label="item.label" :value="item.key" />
            </template>
          </el-select>
        </template>
        <template #verificationCode>
          <div class="messcode">
            <el-input
              v-model="fetchFormParam.verificationCode"
              placeholder="请输入短信验证码"
              style="margin-right: 10px"
            />
            <el-button
              type="primary"
              class="codeImg"
              :style="{ color: smsBtnTime !== 60 ? '#dcdfe6' : '' }"
              @click="getSmsCode"
              :disabled="clickable"
              >{{ smsBtnTime === 60 ? "获取验证码" : smsBtnTime + "秒后获取" }}
            </el-button>
          </div>
          <div class="tip">
            为保证您的资金安全，请短信验证，验证码将发送至企业法人手机上，
            手机号为：{{ legalMobile }}
          </div>
        </template>
      </yk-form>
      </div>
      
      <template #footer>
          <!-- <el-button type="primary" style="width:168px;height: 58px;" plain @click="fetchVisible = false">取消</el-button> -->
          <el-button type="primary" style="width:168px;height: 58px;" @click="fetch" :loading="loadingFetch">立即提现</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { request } from "@/service/http";
import YkForm from "@/components/yk-form.vue";
import YkTable from "@/components/yk-table.vue";
import { fetchForm } from "./data";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import router from "@/router";
let smsBtnTime = ref(60); //'获取验证码'
const fetchVisible = ref(false);
const fetchFormRule: any = ref(null);
const fetchFormParam = reactive({ type: 0, types: '', wallet: '', walletAccount: '', receiveAccount: '', remainAmount: '', withdrawId: '', withdrawAmount: '', verificationCode: '' })
let accountList = ref<any>([])
let arriveList = ref<any>([])
let legalMobile = ref()
let interval = ref<any>(null)
let clickable = ref(false)
let temp = ref(0)
let crossBorderServiceFee = ref({amount:'',chargeType:'',maxAmount:'',minAmount:'',percent:''})
let helpPayServiceFee = ref({amount:'',chargeType:'',maxAmount:'',minAmount:'',percent:''})
const loadingFetch =ref(false)
const getWithdrawFeeRuleInfo = async () => {
  let res: any = await request('POST', '/abroad-merchant/front/withdraw/withdrawFeeRuleInfo', {})
  if (res.code === 200) {
    crossBorderServiceFee.value= res.data.crossBorderServiceFee
    helpPayServiceFee.value = res.data.helpPayServiceFee
    }
}
getWithdrawFeeRuleInfo();
const fetchDialog = async (type: any) => {
  //  if (type !==temp.value ) {
  //     fetchFormParam.wallet = '';
  //     fetchFormParam.receiveAccount = '';
  //     fetchFormParam.withdrawAmount = '';
  //     fetchFormParam.verificationCode = '';
  //   }
  //   temp.value = type
  fetchFormRule.value?.resetForm();
  if (type == 1) {
    fetchFormParam.types = "普通提现";
  } else if (type == 2) {
    fetchFormParam.types = "结汇提现";
  }
  fetchVisible.value = true;
  let res: any = await request(
    "GET",
    "/abroad-merchant/front/withdraw/showData",
    {}
  );
  if (res.code === 200) {
    if (fetchFormParam.types == "普通提现") {
      accountList.value = res.data.wallet;
    } else if (fetchFormParam.types == "结汇提现") {
      res.data.wallet.map((val: { key: string }) => {
        if (val.key == "CNY") {
          let payList = [];
          payList.push(val);
          accountList.value = payList;
        }
      });
    }
    arriveList.value = res.data.receiveAccount;
    legalMobile.value = res.data.legalMobile;
  }
};
async function getSmsCode() {
  if (
    fetchFormParam.withdrawAmount &&
    fetchFormParam.wallet &&
    fetchFormParam.withdrawId
  ) {
    let res: any = await request(
      "POST",
      "/abroad-merchant/front/withdraw/sendVerificationCode",
      {
        amount: fetchFormParam.withdrawAmount,
        currency: fetchFormParam.wallet.split(" ")[0],
        id: fetchFormParam.withdrawId,
        remainAmount: fetchFormParam.remainAmount,
      }
    );
    if (res.code === 200) {
      ElMessage({
        type: "success",
        message: "发送验证码成功！",
      });
      clickable.value = true;
      countdown();
    }
  } else {
    ElMessage({
      type: "warning",
      message: "请填写上述信息，再获取验证码！",
    });
  }
}
function countdown() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (smsBtnTime.value > 1) {
      smsBtnTime.value--;
    } else {
      clearInterval(interval);
      smsBtnTime.value = 60;
      clickable.value = false;
    }
  }, 1000);
}
const getAccount = () => {
  fetchFormParam.withdrawId = fetchFormParam.receiveAccount;
};
const getFetchAccount = () => {
  fetchFormParam.walletAccount = fetchFormParam.wallet.split(" ")[0];
  fetchFormParam.remainAmount = fetchFormParam.wallet.split(" ")[1];
};
const fetch = async () => {
  if (fetchFormParam.types == "普通提现") {
    fetchFormParam.type = 1;
  } else if (fetchFormParam.types == "结汇提现") {
    fetchFormParam.type = 2;
  }
  let validate = await fetchFormRule.value.submitForm();
  if (validate) {
    if (
      Number(fetchFormParam.remainAmount) <
      Number(fetchFormParam.withdrawAmount)
    ) {
      ElMessage({
        type: "warning",
        message: "您提现的金额已大于资产账户余额，请重新输入！",
      });
    } else if (Number(fetchFormParam.withdrawAmount) == 0) {
      ElMessage({
        type: "warning",
        message: "您提现的金额需大于0，请重新输入！",
      });
    } else {
      loadingFetch.value = true;
      let res: any = await request(
        "POST",
        "/abroad-merchant/front/withdraw/withdraw",
        { ...fetchFormParam }
      );
      loadingFetch.value = false;
      if (res.code === 200) {
        ElMessage({
          type: "success",
          message: "发起提现成功！",
        });
        fetchVisible.value = false;
        router.push('/withdraw/record')
      }

    }
  }
}



</script>

<style lang="scss" scoped>
.withdraw-way-page {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px 10px 12px 0px rgba(167, 210, 243, 0.08);
    border-radius: 20px;
    padding: 20px 40px;

    .account-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #ecf2f5;
      margin-bottom:40px;

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

    .index {
      display: flex;
      justify-content:center;
      padding: 0 6%;
      .left {
        //min-width:400px;
        width: calc(50% - 40px);
        background: #f5f8fa;
        border: 1px solid #e1e8ed;
        border-radius: 10px;
        padding-bottom: 120px;
        flex: 0 1 auto;
        position: relative;
        .title {
          font-size: 22px;
          font-family: NotoSansHans-Bold;
          font-weight: bold;
          color: #25343c;
          line-height: 44px;
          margin-top: 20px;
          margin-left: 30px;
        }

        .line {
          height: 1px;
          border-bottom: 1px dashed #e1e8ed;
          margin-top: 20px;
        }

        .word {
          padding-left: 30px;
          padding-right: 30px;
          font-size: 14px;
          font-family: NotoSansHans-Regular;
          font-weight: 400;
          color: #6a767d;
          line-height: 24px;
          margin-top: 20px;

          .blue {
            color: #195eff;
          }
        }

        .note {
          padding-left: 30px;
          padding-right: 30px;
          font-size: 16px;
          font-family: NotoSansHans-Bold;
          font-weight: bold;
          color: #2c333f;
          line-height: 42px;
          margin: 0 auto;
          margin-top: 25px;
        }
        .notes {
          margin-top: 49px;
          @extend .note;
        }

        .note-content {
          padding-left: 30px;
          padding-right: 30px;
          font-size: 14px;
          font-family: NotoSansHans-Regular;
          font-weight: 400;
          color: #6a767d;
          line-height: 36px;
          margin: 0 auto;
          margin-top: 10px;
        }

        .note-contents {
          @extend .note-content;
          line-height: 27px;
        }

        .support-cash {
          padding-left: 30px;
          padding-right: 30px;
          font-size: 16px;
          font-family: NotoSansHans-Bold;
          font-weight: bold;
          color: #2c333f;
          // line-height: 42px;
          margin: 0 auto;
          margin-top: 25px;
        }

        .cash {
          padding-left: 30px;
          padding-right: 30px;
          font-size: 14px;
          font-family: NotoSansHans-Regular;
          font-weight: 400;
          color: #6a767d;
          line-height: 36px;
          margin: 0 auto;
          margin-top: 15px;
        }

        .service-fee {
          @extend .support-cash;
        }

        .fee {
          @extend .cash;
        }

        .button {
          width: 188px;
          background: #195eff;
          border-radius: 12px;
          font-size: 18px;
          font-family: NotoSansHans-Bold;
          font-weight: bold;
          color: #ffffff;
          line-height: 58px;
          text-align: center;
          margin: 0 auto;
          margin-top: 25px;
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
        }
      }

      .right {
        @extend .left;
        flex: 0 1 auto;
        margin-left:80px;
      }
    }

    .dialog {
      padding: 0 40px !important;
    }
  }

  .messcode {
    display: flex;

    .codeImg {
      text-align: center;
      background: #195eff;
      border-radius: 8px;
      color: #fff;
    }
  }

  .tip {
    // width: 372px;
    height: 35px;
    font-size: 14px;
    font-family: NotoSansHans-Regular;
    font-weight: 400;
    color: #6a767d;
    line-height: 20px;
    margin-top: 10px;
  }

  &::v-deep(.el-dialog) {
    border-radius: 20px;
  }

  &::v-deep(.el-dialog__header) {
    border-bottom: 1px dashed #deebf1;
    padding-bottom: 15px;
  }

  &::v-deep(.el-dialog__title) {
    font-weight: bold;
    color: #25343c;
    margin-left: 20px;
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
