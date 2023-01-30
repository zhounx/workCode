import { defineStore } from "pinia";
import { request } from "@/service/http";
import { useStore } from "@/store/user";
import { mainlandApplyStore } from "@/store/mainlandApplyStore";
import { hongkongApplyStore } from "@/store/hongkongApplyStore";
import { personApplyStore } from "@/store/personApplyStore";
import { individualApplyStore } from "@/store/individualApplyStore";
import { ElMessageBox, ElMessage } from "element-plus";

export const baseStore = defineStore({
  id: "baseState",
  state: () => {
    return {
      bankData: <any>[],
      accountBankData: <any>[], //收款账户所属银行枚举数据
      settleAccounts:<any>[], //收款账户提现账户枚举数据
      shopApplyInfos:<any>[], //收款账户店铺数据
      shopRegion:<any>[],//地区
      accountStatus:<any>[],//状态枚举数据
      categoryData: <any>[],
      applyInfo: <any>{}, //:{baseInfo:{},legalInfo:{},licenseInfo:{},settleInfo:{},shareholderInfos:{},shopInfo:{},receiveUse:''}
      orderDetail: <any>{},
      merchantType:<any>{},
    };
  },
  persist: {
    enabled: true,
    strategies: [
      //使用插件自定义存储
      {
        storage: sessionStorage,
        paths: ["categoryData", "bankData", "applyInfo", "orderDetail","accountBankData","settleAccounts","shopApplyInfos","shopRegion","accountStatus","merchantType"],
      },
    ],
  },
  actions: {
    async getMerchantApplyInfo() {
      let { data }: any = await request(
        "get",
        "/abroad-merchant/front/merchant/apply",
        {}
      );
      this.applyInfo = data;

      const mApply = mainlandApplyStore();
      const pApply = personApplyStore();
      const iApply = individualApplyStore();
      const hApply = hongkongApplyStore();

      if (this.applyInfo.merchantType === 1) pApply.initSettleInfo(data);
      else if (this.applyInfo.merchantType === 2) iApply.initSettleInfo(data);
      else if (this.applyInfo.merchantType === 4) mApply.initSettleInfo(data);
      else hApply.initSettleInfo(data);
    },

    async getBankData() {
      if (this.bankData.length) return;
      let { data }: any = await request(
        "post",
        "/abroad-merchant/front/select/bank",
        {}
      );
      this.bankData = data;
    },
    async getAccountBankData() {
      if (this.accountBankData.length) return;
      let { data }: any = await request(
        "get",
        "/abroad-merchant/front/select/accountBank",
        {}
      );
      this.accountBankData = data;
    },
    async  getApplyView() {
      let { data }: any = await request('GET', '/abroad-merchant/front/account/applyView', {})
      this.settleAccounts = data.settleAccounts
      this.shopRegion=data.shopApplyInfos.shopRegion
      this.shopApplyInfos = data.shopApplyInfos
      this.merchantType = data.merchantType
    },
    async  getAccountStatus() {
      let { data }: any = await request('GET', '/abroad-merchant/front/select/openApplyStatus', {})
      this.accountStatus = data
  },
 
    async getCategory() {
      if (this.categoryData.length) return;
      let { data }: any = await request(
        "post",
        "/abroad-merchant/front/select/category",
        { level: 1 }
      );
      this.categoryData = data;
    },

    async clearApplyInfo(router: any, path: string, type: number) {
      const user = useStore();
      const baseStoreInfo = baseStore();

      await request(
        "get",
        "/abroad-merchant/front/merchant/changeMerchantType",
        {
          merchantType: type,
          Authorization: "Bearer " + user.token,
        }
      );

      //获得新数据
      await baseStoreInfo.getMerchantApplyInfo();
      router.push({
        path,
      });
    },

    changeSettleInfo(settleInfo: any) {
      this.applyInfo.settleInfo = {
        ...(this.applyInfo?.settleInfo ?? {}),
        ...settleInfo,
      };
    },

    changeLegalInfo(legalInfo: any) {
      this.applyInfo.legalInfo = legalInfo;
    },

    changeLicenseInfo(licenseInfo: any) {
      this.applyInfo.licenseInfo = licenseInfo;
    },
  },
});
