import { defineStore } from "pinia";
import { request } from "@/service/http";
import { baseStore } from "@/store/base";

export const hongkongApplyStore = defineStore({
  id: "hongkongApplyState",
  state: () => {
    return {
      merchantType: 3,
      publicSettleInfo: {
        settleType: 2,
      } as any,
      privateSettleInfo: {
        settleType: 1,
      } as any,
    };
  },
  persist: {
    enabled: true,
    strategies: [
      //使用插件自定义存储
      {
        storage: sessionStorage,
        paths: [],
      },
    ],
  },
  actions: {
    /**
     * @param {string} method: put or post
     * @param {*} hkLicenseInfo
     * @param {*} baseInfo
     */
    async applyInfoAtFirstStep(
      method: string,
      hkLicenseInfo: any,
      baseInfo: any
    ) {
      const res: any = await request(
        method,
        "/abroad-merchant/front/merchant/apply",
        {
          baseInfo,
          hkLicenseInfo,

          //必填项
          step: 1,
          merchantType: this.merchantType,
          accountOpenFormImage: null,
        }
      );
      return res?.code ?? 404;
    },

    /**
     * @param {string} method: put or post
     * @param {*} legalInfo
     * @param {*} settleInfo
     */
    async applyInfoAtSecondStep(
      method: string,
      legalInfo: any,
      settleInfo: any
    ) {
      const res: any = await request(
        method,
        "/abroad-merchant/front/merchant/apply",
        {
          settleInfo,
          legalInfo,

          //必填项
          step: 2,
          merchantType: this.merchantType,
          accountOpenFormImage: null,
        }
      );
      return res?.code ?? 404;
    },

    /**
     * @param {string} method
     * @param {*} shareholderInfos
     * @param {*} receiveUse
     * @param {*} shopInfo
     * @param {*} accountOpenFormImage
     */
    async applyInfoAtThirdStep(
      method: string,
      shareholderInfos: any,
      receiveUse: any,
      shopInfo: any,
      accountOpenFormImage: any
    ) {
      const res: any = await request(
        method,
        "/abroad-merchant/front/merchant/apply",
        {
          shareholderInfos,
          shopInfo,
          receiveUse,

          //必填项
          step: 3,
          merchantType: this.merchantType,
          accountOpenFormImage,
        }
      );
      return res?.code ?? 404;
    },

    updatePrivateSettleInfo(data: any) {
      this.privateSettleInfo.cardholder = data.name;
    },

    updatePublicSettleInfo(data: any) {},

    initSettleInfo(data: any) {
      this.publicSettleInfo.cardholder = data?.hkLicenseInfo?.companyCnName;
      this.privateSettleInfo.cardholder = data?.legalInfo?.name;
      this.privateSettleInfo.accountMobile = data?.legalInfo?.mobile;
    },

    setSettle(data: any) {
      this.privateSettleInfo.cardholder = data?.name;
      this.privateSettleInfo.accountMobile = data?.mobile;
    },

    setSettleInfo(data: any) {
      const baseInfo = baseStore();
      this.publicSettleInfo.cardholder = data?.companyCnName;
    },

    setPrivateSettle(data: any) {
      this.privateSettleInfo.cardholder = data?.name ?? "";
      this.privateSettleInfo.accountMobile = data?.mobile ?? "";
    },
  },
});
