<template>
  <div class="account-page">
    <div class="content">
      <div class="account-title">
        <h3>我的资产账户</h3>
        <el-button
          class="withdraw-button"
          @click="router.push({ path: '/principal/way' })"
          type="primary"
          >发起提现</el-button
        >
      </div>
      <ul class="account-list">
        <li v-for="item in accountList" :key="item.currency">
          <div class="total">
            <p class="currency-name">
              <img :src="getImageUrl(item.currency)" alt="" />{{
                Currency[item.currency]
              }}
            </p>
            <h3>
              {{ item.totalAccount }}<span>{{ item.currency }}</span>
            </h3>
          </div>
          <div class="money">
            <label>可汇兑余额</label>
            <p>
              {{ item.availableAccount }}<span>{{ item.currency }}</span>
            </p>
          </div>
          <div class="money">
            <label>待入账余额</label>
            <p>
              {{ item.waitInAccount }}<span>{{ item.currency }}</span>
            </p>
          </div>
          <div class="money">
            <label>换汇处理中</label>
            <p>
              {{ item.exchangingAmount }}<span>{{ item.currency }}</span>
            </p>
          </div>
          <!-- <div class="mask">
            <el-button
              class="detail-button"
              type="primary"
              size="small"
              @click="router.push({ path: '/principal/detail' })"
              >账户详情</el-button
            >
          </div> -->
        </li>
        <!-- space-between最后一行占位 -->
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { request } from "@/service/http";
import { Currency } from "./data";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
async function getAccountWallet() {
  let { data }: any = await request(
    "GET",
    "/abroad-merchant/front/accountWallet/List",
    {}
  );
  accountList.value = data;
}
getAccountWallet();
const accountList = ref([
  // {
  //   currency: "USD",
  //   totalAccount: "1299.23",
  //   availableAccount: "2133.12",
  //   waitInAccount: "23.2",
  //   exchangingAmount: "31.22",
  // },
]);

const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/${name}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
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
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 0 1 auto;
        box-sizing: border-box;
        margin: 10px 0;
        width: 354px;
        height: 230px;
        padding: 20px;
        border: 1px solid #deebf1;
        border-radius: 16px;
        background: #f8fbfd;
        position: relative;
        margin-right:18px;
        &:hover {
          background: #fcfdfe;
          .mask {
            display: block;
          }
        }
        .total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #25343c;
          border-bottom: 1px dashed #deebf1;
          margin-bottom: 20px;
          padding-bottom: 10px;
          .currency-name {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            vertical-align: middle;
            img {
              vertical-align: middle;
              width: 66px;
              height: 66px;
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
          height: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #9ba4ad;
          label {
            font-size: 14px;
          }
          p {
            font-family: Bahnschrift;
            font-size: 18px;
            span {
              font-size: 14px;
            }
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
        //background-color: #fff;
        background: linear-gradient(180deg, transparent, #fff, #fff);
        border-radius: 16px;
        .detail-button {
          position: inherit;
          background: #c2e3ff;
          color: #1085e8;
          border: none;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
