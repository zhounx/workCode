<template>
  <div class="home-page">
    <!-- 顶部文字滚动横幅 -->
    <div class="marquee">
      <img src="../../assets/images/notice.png" alt="" />
      <marquee
        behavior="scroll"
        direction="up"
        height="40"
        loop="-1"
        scrollamount="10"
        scrolldelay="500"
        onMouseOut="this.start()"
        onMouseOver="this.stop()"
      >
        <ul>
          <li v-for="(item, index) in 2" :key="index">
            GlobalPay全新UI改版上线！
            <!-- <span>重要提醒：</span>
            尊敬的客户，受美国假期影响，11月11日、11月24日银行及金融机构暂不受理相关业务，外汇收款等业务均延期处理。请您及时安排收款相关事宜，如有任何疑问请联系客服400-998-9930。 
            特别提示，提现/转账绑卡无需在收款之后，您可以事先提交绑卡申请以提高效率。 -->
          </li>
        </ul>
      </marquee>
    </div>
    <div class="content" v-if="merchantCheckStatus === 2">
      <!-- 已认证情况下 -->
      <yk-card title="资产管理">
        <ul class="capital-account">
          <li v-for="item in accountList" :key="item.currency">
            <div class="currency-img">
              <p class="currency-name">
                <img :src="getImageUrl(item.currency)" alt="" />
                {{ item.currency === "USD" ? "美元" : "人民币" }}
              </p>
              <h3>
                {{ item.totalAccount }}<span>{{ item.currency }}</span>
              </h3>
            </div>
            <div class="money-data">
              <div class="money">
                <label>可汇兑金额</label>
                <p>
                  {{ item.availableAccount }}<span> {{ item.currency }}</span>
                </p>
              </div>
              <div class="money">
                <label>待入账金额</label>
                <p>
                  {{ item.waitInAccount }}<span> {{ item.currency }}</span>
                </p>
              </div>
              <div class="money">
                <label>换汇中金额</label>
                <p>
                  {{ item.exchangingAmount }}<span> {{ item.currency }}</span>
                </p>
              </div>
            </div>
          </li>
          <li class="apply-card">
            <img src="../../assets/images/card.png" alt="">
            <div>
              <p class="p1" :style="{fontSize:clientWidth<1700?'16px':'18px'}" @click="router.push({path:'/withdraw/way'})">立即提现</p>
              <p class="p2" :style="{fontSize:clientWidth<1700?'16px':'18px'}" @click="router.push({path:'/principal/accountWithdraw'})">申请境外收款账户</p>
            </div>
          </li>
        </ul>
      </yk-card>
      <div class="handle-function">
        <div class="function-card">
          <yk-card title="常用功能">
            <ul class="function-list">
              <li v-for="item in functionList" :style="{fontSize:clientWidth<1700?'18px':'20px'}" :key="item.icon" @click="router.push({path:item.path})">
                <label><img :src="getImageUrl(item.icon)" alt="" /></label>
                <span :style="{marginLeft:clientWidth<1700?'70px':'90px'}">{{item.title}}</span>
              </li>
            </ul>
          </yk-card>
        </div>
        <div class="carousel">
          <div class="carousel-img">
              <img src="../../assets/images/home/banner.png" alt="">
             </div>
          <!-- <el-carousel :interval="5000" arrow="hover">
            <el-carousel-item v-for="item in 1" :key="item">
             <div class="carousel-img">
              <img src="../../assets/images/home/banner.png" alt="">
             </div>
            </el-carousel-item>
          </el-carousel> -->
        </div>
      </div>
      <div class="tendency-card">
        <yk-card title="汇率走势">
          <div class="tendency-top">
            <div>
              <el-select style="width:80px" v-model="selectValue.value1" placeholder="Select" size="small">
                <el-option label="USD" value="USD"/>
              </el-select>
              ~
              <el-select style="width:80px" v-model="selectValue.value2" placeholder="Select" size="small">
                <el-option label="CNY" value="CNY"/>
              </el-select>
              <label class="rate">当前参考汇率：<span>{{currentRate}}</span></label>
            </div>
            <div class="time">
              <p v-for="item in times" :key="item.value" @click="getRateLine(item.value)" :class="activeTime===item.value?'active':''">{{item.label}}</p>
            </div>
          </div>
          <yk-echart :xvalues="xvalues" :yvalues="yvalues" :active="activeTime"></yk-echart>
        </yk-card>
      </div>
      <div class="withdraw-card">
        <yk-card title="最近收款">
          <yk-table
            size="small"
            :showPagination="false"
            :columns="abroadColumns"
            :tableData="abroadListData"
            >
            <template v-slot:operation>
          <el-table-column label="操作" fixed="right" width="90px" align="center">
            <template #default="scope">
              <el-button @click="orderId=scope.row.id" v-if="scope.row.associateStatus == '审核不通过'||scope.row.associateStatus == '待关联'"
                type="text" size="small">关联订单 <el-icon><CaretRight /></el-icon></el-button>
            </template>
          </el-table-column>
        </template>
          </yk-table>
        </yk-card>
      </div>
      <!-- 先不展示 -->
      <!-- <footer>
        <div>
          <p></p>
          <div>
            <label>关于globalpay</label><label>服务协议</label><label>隐私政策</label><label>联系我们</label>
          </div>
        </div>
        <p>
          <label><span>工信部备案号:浙B2-20080148-2</span><span>浙公网安备33010802004661号</span></label>
          <label>@globalpay版权所有</label>
        </p>
      </footer> -->
    </div>
    <div class="content" v-if="(merchantCheckStatus&&merchantCheckStatus !== 2)">
       <!-- 未认证情况下 -->
       <div class="none-account">
        <img src="../../assets/images/home-none.png" alt="" />
        <p v-html="apply_tip_msg"></p>
        <el-button v-if="apply_button_text" class="button" type="primary" @click.stop="nextStep">{{ apply_button_text }}</el-button>
      </div>
    </div>
    <order-dialog :orderId="orderId" @close="orderId=0" @freshen="getAbroadList"></order-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted, reactive } from "vue";
import YkCard from './components/card.vue'
import YkEchart from './components/echart.vue'
import YkTable from "@/components/yk-table.vue";
import OrderDialog from "./components/orderDialog.vue";
import { abroadColumns } from "./data";
import {CaretRight} from '@element-plus/icons-vue'
import { request } from "@/service/http";
import { baseStore } from "@/store/base";
import { useRouter } from "vue-router";
import { useEnumStore } from "@/store/enum";

const router = useRouter();
let selectValue={
  value1:'USD',value2:'CNY'
}
let activeTime=ref<Number>(1)
const enumStore = useEnumStore();
const baseInfoStore = baseStore();
let orderId = ref<number>(0)
onMounted(async () => {
  await baseInfoStore.getMerchantApplyInfo();
  await enumStore.initEnums();
});
let clientWidth = ref<number>(document.documentElement.clientWidth)
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/${name}.png`, import.meta.url).href;
};

/**
 * .marquee 中显示的滚动文字列表
 *
 * title:   标题
 * time:    日期
 * content: 具体内容
 */
const functionList = ref([
  {title: `资产管理`,icon: "f1",path:'/principal/account'},
  {title: `外汇兑换`,icon: "f2",path:'/convert/record'},
  {title: `收款管理`,icon: "f3",path:'/abroad/record'},
  {title: `提现管理`,icon: "f4",path:'/withdraw/record'}
]);
const times=ref([
  {label:'近24小时',value:1}, {label:'近7天',value:2}, {label:'近30天',value:3}
]);
let accountList = ref([]);
const merchantCheckStatus = computed(() => {
  return ((baseInfoStore.applyInfo && baseInfoStore.applyInfo.merchantCheckStatus) ||4);
});
const checkStatus = computed(() => {
  return (
    (baseInfoStore.applyInfo && baseInfoStore.applyInfo.checkStatus)
  );
});
const channelStatus = computed(() => {
  return (
    (baseInfoStore.applyInfo && baseInfoStore.applyInfo.channelStatus)
  );
});
const foreignReceiveAccount = computed(() => {
  return (
    (baseInfoStore.applyInfo && baseInfoStore.applyInfo.foreignReceiveAccount)
  );
});
const apply_tip_msg = computed(() => {
  //商户审核状态 1|审核中 2|审核通过 3|审核不通过 4|待完善资料
  if (merchantCheckStatus.value === 1) {
    if( checkStatus.value === 2 && (channelStatus.value === -1 || channelStatus.value === 1 || channelStatus.value === 2 || channelStatus.value === 4)) {
      if(foreignReceiveAccount.value){
        return "您的收款账户"+ foreignReceiveAccount.value +"已开通成功，银行激活账户中，请耐心等待。"
      }else{
        return "您的资料已审核通过，收款账户开通中，请耐心等待！"
      }
    } else {
      return "您的开户申请正在审核中，请耐心等待";
    }  
  }
  if (merchantCheckStatus.value === 4) {
    if (baseInfoStore.applyInfo.step) {
      return "就差一点就能开通收款户啦，快去继续补充资料吧";
    } else {
      return "您还未开户哦<br>请去提交开户资料，开通境外收款账户";
    }
  }
  if (merchantCheckStatus.value === 3) {
    return "您提交的材料审核未通过，请重新检查后提交 ";
  }
});

const apply_button_text = computed(() => {
  //商户审核状态 1|审核中 2|审核通过 3|审核不通过 4|待完善资料
  if (merchantCheckStatus.value === 1 || merchantCheckStatus.value === 2) {
    return "";
  }
  if (merchantCheckStatus.value === 4) {
    if (baseInfoStore.applyInfo.step) {
      return "继续提交开户资料";
    } else {
      return "提交开户资料";
    }
  }
  if (merchantCheckStatus.value === 3) {
    return "修改开户资料";
  }
});

function nextStep() {
  //修改
  if (baseInfoStore.applyInfo.merchantCheckStatus === 3) {
    if (baseInfoStore.applyInfo.merchantType === 1) {
      router.push({ path: "personFirst" });
      return;
    } else if (baseInfoStore.applyInfo.merchantType === 2) {
      router.push({
        path: "individualFirst",
      });
      return;
    } else if (baseInfoStore.applyInfo.merchantType === 3) {
      router.push({
        path: "hongkongFirst",
      });
      return;
    } else if (baseInfoStore.applyInfo.merchantType === 4) {
      router.push({
        path: "mainlandFirst",
      });
      return;
    }
  }
  const step = baseInfoStore.applyInfo.step;
  const merchantType = baseInfoStore.applyInfo.merchantType;

  if (step == 1) {
    if (merchantType == 1) {
      router.push({ path: "personSecond" });
      return;
    } else if (merchantType == 2) {
      router.push({
        path: "individualSecond",
      });
      return;
    } else if (merchantType == 3) {
      router.push({
        path: "hongkongSecond",
      });
      return;
    } else if (merchantType == 4) {
      router.push({
        path: "mainlandSecond",
      });
      return;
    }
  }

  if (step == 2) {
    if (merchantType == 1) {
      router.push({ path: "personThird" });
      return;
    } else if (merchantType == 2) {
      router.push({
        path: "individualThird",
      });
      return;
    } else if (merchantType == 3) {
      router.push({
        path: "hongkongThird",
      });
      return;
    } else if (merchantType == 4) {
      router.push({
        path: "mainlandThird",
      });
      return;
    }
  }

  router.push({ path: "choseType" });
}
watch(merchantCheckStatus, (newVal, oldValue) => {
  if (newVal === 2) {
    getAssetsList();
  }
});
if (merchantCheckStatus.value === 2) {
  getAssetsList();
}
async function getAssetsList() {
  let res: any = await request("GET","/abroad-merchant/front/homePage/assetsList",{});
  accountList.value = res && res.data;
}
getAbroadList()
let abroadListData = ref([])
async function getAbroadList() {
  let {code,data}: any = await request("POST","/abroad-merchant/front/accountDeposits/recordList",{
      pageNo: 1,
      pageSize: 10
    }
  );
  if(code===200){
    abroadListData.value = data.records.slice(0, 5)
  }
}
getRateLine(1)
let xvalues = ref([])
let yvalues = ref([])
let currentRate = ref<string>('')
async function getRateLine(type:number) {
  activeTime.value=type
  let {code,data}: any = await request("get","/abroad-merchant/front/homePage/rateLine",{
      type:type
    }
  );
  if(code===200){
    xvalues.value=[]
    yvalues.value=[]
    currentRate.value = type===1?data[0].yvalue:currentRate.value||data[0].yvalue
    for(let item of data){

      xvalues.value.unshift(item.xvalue)
      yvalues.value.unshift(item.yvalue)
    }
  }
}
</script>

<style lang="scss" scoped media="screen">
.home-page {
  width: 100%;height: 100%;
  transform-origin: 0 0;
  .marquee {
    width: 100%;
    height: 70px;
    background: #ffffff;
    box-shadow: 0px 10px 12px 0px rgba(167, 210, 243, 0.08);
    border-radius: 10px;
    padding: 15px 40px;
    box-sizing: border-box;
    display: flex;
    justify-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    ul {
      flex: 1;
      margin-left: 20px;
      li {
        width: 100%;
        height: 70px;
        color: #838DA6;
        font-size: 14px;
        span{
          color: #F6814E;
        }
      }
    }
  }
  .content {
    width: 100%;
    margin-top: 15px;
    height: calc(100% - 65px);
    .capital-account {
        width: 100%;
        display: flex;
        li {
          height: 100%;
          margin-left: 10px;
          flex: 1;color:#fff;
          background: linear-gradient(-41deg, #425FF2, #763AEF);
          border: 1px solid #F8EFEA;
          box-shadow: 0px 16px 16px 0px rgba(71,92,242,0.16);
          border-radius: 20px;
          height: 258px;
          &:first-child {
            margin-left: 0;
            background: linear-gradient(-41deg, #22AEFF, #0D7DFC);
            box-shadow: 0px 16px 16px 0px rgba(33,172,255,0.16);
            .money{
              border-top: 1px dashed #8CBCF0!important;
            }
          }
          &:last-child{
            background: linear-gradient(0deg, #E9F6FF 0%, #96C0FF 100%);box-shadow:none;
          }
          .currency-img{
            display: flex;
            justify-content: space-between;
            align-items: center;font-size: 20px;
            padding: 10px 20px 10px 12px;
            .currency-name{
              display: flex; align-items: center;font-weight: bold;
            }
            h3{
              color: #fff;font-size: 44px;
              span{
                font-size: 16px;
              }
            }
          }
          img {
            width: 66px;
            height: 66px;
          }
          .money-data {
            margin: 0 20px 20px 20px;
            width: calc(100% - 40px);
            padding: 0 30px;
            background:rgba($color: #fff, $alpha:0.12);
            border-radius: 12px;
            box-sizing: border-box;
            .money {
              border-top: 1px dashed rgba(255, 208, 195, 0.3);
              height: 48px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              &:first-child {
                border-top:none!important;
              }
              label {
                font-size: 14px;
                font-weight: 500;
              }
              p {
                font-size: 18px;
                font-weight: 400;
                span {
                  font-size: 14px;
                  margin-left: 4px;
                }
              }
            }
          }
        }
        .apply-card{
          text-align: center;
          padding: 25px 30px;
          box-sizing: border-box;
          img{
            width: 173px;height: 134px;
          }
          >div{
            display:flex;
            padding: 0 20px;
            justify-content:center;
            p{
              width: 48%;height: 56px;font-size: 18px;
              display: flex;align-items: center;font-weight: bold;
              justify-content: center;font-weight: bold;
              cursor: pointer;border-radius: 28px;
            }
            .p1{
              background: linear-gradient(-76deg, #195EFF 0%, #38A4FF 100%);margin-right:12px;
              box-shadow: 0px 7px 9px 0px rgba(79,118,245,0.18), 0px -1px 1px 0px rgba(255,255,255,0.78), 0px 1px 1px 0px rgba(255,255,255,0.53), 0px 1px 4px 0px rgba(255,255,255,0.56);
            }
            .p2{
              background: linear-gradient(-90deg, #FFFFFF, #E9F4FF);color: #2A89FE;
              box-shadow: 0px 7px 9px 0px rgba(79,118,245,0.18), 0px -1px 1px 0px rgba(255,255,255,0.78), 0px 1px 1px 0px rgba(255,255,255,0.53), 0px 1px 4px 0px rgba(255,255,255,0.56);
            }
          }
        }
      }
      .handle-function{
        width: 100%;margin-top:15px;display: flex;
        .function-card{
          flex: 1;height: 246px;
          .function-list{
            width: 100%;display: flex;
            >li{
              display: flex;align-items: center;min-width:175px;padding: 55px 10px;
              box-sizing: border-box;background: #F3F6FB;flex: 1;position: relative;
              border-radius:20px;margin-right: 10px;cursor: pointer;
              font-size: 20px;font-weight: bold;color: #1F2A3C;
              &:last-child{
                margin-right:0;
              }
              label{
                position: absolute;top:30px;left: 1.5%;
              }
              span{
                margin-left:90px;
              }
              img{
                width: 86px;height: 86px;
              }
            }
          }
        }
        .carousel{
          width:530px;height: 246px;margin-left: 20px;
          &::v-deep(.el-carousel__container){
            height: 246px!important;
          }
          .carousel-img{
            width: 100%;border-radius:20px;
            img{
              width: 100%;border-radius:20px; height: 246px;
            }
          }
          .el-carousel__item{
            width: 100%;border-radius:20px;
          }
        }
      }
      .tendency-card{
        width: 100%;margin-top: 15px;
        &::v-deep(.card-template) {
          padding-bottom: 15px;
        }
        .tendency-top{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .rate{
            font-size: 14px;font-weight: 400;color: #4B5162;margin-left:20px;
            span{
              font-size: 24px;font-weight: bold;color: #F25A45;margin-left:5px;
            }
          }
          .time{
            display: flex;border-radius:4px;background: #FFFFFF;border: 1px solid #BBC6D4;
            align-items: center;font-size:14px;
            p{
              width: 76px;text-align: center;height: 32px;line-height: 32px;
              border-right:1px solid #BBC6D4;color: #4B5162;
              cursor: pointer;
              &:last-child{
                border-right:none;
              }
            }
            .active{
              background: linear-gradient(90deg, #2858FF, #776DFF);color:#fff;
            }
          }
        }
      }
      .withdraw-card{
        width: 100%;margin-top: 15px;
      }
      footer{
        width: 100%;padding-top:30px; font-size: 14px;font-weight: 400;
        >div{
          display: flex;justify-content: space-between;
          color: #49546C;
          label{
            margin-left:30px;
          }
        }
        >p{
          display: flex;justify-content: space-between;color: #B5C0D1;margin-top:10px;
        }
      }
    .none-account {
      text-align: center;
      padding-top: 80px;
      img {
        width: 420px;
      }
      p {
        font-size: 20px;
        margin-top: 13px;
        font-weight: 500;
        color: #8e999f;
        line-height: 36px;
      }
      .button {
        width: 190px;
        margin-top: 30px;
      }
    }
  }
}
</style>
