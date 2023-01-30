<template>
    <div class="account-detail-page">
        <div class="content">
            <div class="account-title">
                <h3>国外收款银行账户详情</h3>
            </div>
            <div class="info-block">
                <p class="category">账户信息：</p>
                <div class="list-warp">
                    <div class="warn">此账户仅接受通过SWIFT(电汇/TT)网络的付款</div>
                    <div class="list-item">
                        <div> 银行名称（Bank Name）</div>
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
                        <div>INTL BK CHICAGO</div>
                    </div>
                    <div class="list-item">
                        <div>美国联邦清算号（ABA Routing Numbe）</div>
                        <div>071006651</div>
                    </div>
                    <div class="list-item">
                        <div>银行邮政编码（Zip Code）</div>
                        <div>60640</div>
                    </div>
                    <div class="list-item">
                        <div>银行账户（Account Number）</div>
                        <div>{{ accountInfo.bankAccountNo }}</div>
                    </div>
                    <div class="list-item">
                        <div>账户名称（Account Name）</div>
                        <div>{{accountInfo.bankAccountName}}</div>
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
                        <div> {{ Currency[accountInfo.currency] }}/{{ accountInfo.currency }}</div>
                        <div><img v-if="accountInfo.currency" :src="getImageUrl(accountInfo.currency)" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="info-block">
                <p class="category">账户动态：</p>
                <div class="list-warp">
                    <div class="list-item">
                        <div>{{ accountInfo.useTime }}</div>
                        <div v-if="accountInfo.useTime">开通账户</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { request } from "@/service/http";
import { reactive, ref } from "vue";
import { columns, formSearchItems, Currency } from "./data";

const accoutType = ref(["","电商","贸易"])
let accountInfo = ref({
    bankName: '',
    bankSwiftCode: '',
    bankCountry: '',
    bankAddress: '',
    bankAccountNo: '',
    bankAccountType: '',
    bankAccountName:'',
    currency: '',
    useTime: '',
})
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/${name}-small.png`, import.meta.url).href;
};
async function getAccountWalletDetail() {
    let { data }: any = await request('GET', '/abroad-merchant/front/accountWallet/bankAccountDetail', {})
      accountInfo.value = data
      accountInfo.value.useTime = accountInfo.value.useTime.split('.')[0].replace('T',' ')
}
getAccountWalletDetail()
</script>

<style lang="scss" scoped>
.account-detail-page {
    width: 100%;
    height: 100%;
    .content {
        width: 100%;
        box-sizing: border-box;
        height: 100%;
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
            margin-bottom: 20px;

            >h3 {
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
            margin-bottom: 40px;

            .category {
                font-size: 16px;
                color: #25343C;
                font-weight: bold;
                line-height: 30px;
            }

            .list-warp {
                border: 1px solid #E1E8ED;
                border-radius: 8px;
                font-size: 14px;

                .warn {
                    background-color: #FFF2EF;
                    color: #F13729;
                    padding: 15px 30px;
                    border-bottom: 1px solid #E1E8ED;
                }

                .list-item {
                    display: flex;
                    align-items: center;
                    height: 50px;
                    border-bottom: 1px solid #E1E8ED;
                    img {
                        width:30px;
                        height: 30px;
                        vertical-align: middle;
                    }
                    &:last-child {
                        border: none;
                    }
                    div:first-child {
                        height: 50px;
                        line-height: 50px;
                        padding-left: 30px;
                        min-width: 400px;
                        background-color: #F4F8FB;
                        border-right: 1px solid #E1E8ED;
                        color: #919BA4;

                    }

                    div:last-child {
                        height: 50px;
                        line-height: 50px;
                        padding-left: 30px;
                    }

                }
            }
        }
    }
}
</style>
