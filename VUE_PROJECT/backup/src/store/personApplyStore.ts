import { defineStore } from "pinia";
import { request } from "@/service/http";

export const personApplyStore = defineStore({
  id: "personApplyState",
  state: () => {
    return {
      merchantType: 1,
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
        paths: ['publicSettleInfo','privateSettleInfo'],
      },
    ],
  },
  actions: {
    /**
     * 个人开户第一步数据上传
     *
     * @param {string} method: post or put
     * @param {*} baseInfo
     * @param {*} legalInfo
     */
    async applyInfoAtFirstStep(method: string, baseInfo: any, legalInfo: any) {
      const res: any = await request(
        method,
        "/abroad-merchant/front/merchant/apply",
        {
          baseInfo,
          legalInfo,

          //必填项
          step: 1,
          merchantType: this.merchantType,
          accountOpenFormImage: null,
        }
      );

      return res?.code ?? 404;
    },

    /**
     * 个人开户第二步数据上传
     *
     * @param {string} method: post or put
     * @param {*} settleInfo
     */
    async applyInfoAtSecondStep(method: string, settleInfo: any) {
      const res: any = await request(
        method,
        "/abroad-merchant/front/merchant/apply",
        {
          settleInfo,

          //必填项
          step: 2,
          merchantType: this.merchantType,
          accountOpenFormImage: null,
        }
      );

      return res?.code ?? 404;
    },

    /**
     * 个人开户第三步数据上传
     *
     * @param {string} method: post or put
     * @param {*} receiveUse
     * @param {*} shopInfo
     * @param {*} accountOpenFormImage
     */
    async applyInfoAtThirdStep(
      method: string,
      receiveUse: any,
      shopInfo: any,
      accountOpenFormImage: any
    ) {
      const res: any = await request(
        method,
        "/abroad-merchant/front/merchant/apply",
        {
          shopInfo,

          //必填项
          step: 3,
          merchantType: this.merchantType,
          receiveUse,
          accountOpenFormImage,
        }
      );

      return res?.code ?? 404;
    },

    setSettleInfo(data: any) {
      this.privateSettleInfo.accountMobile = data?.mobile;
      this.privateSettleInfo.cardholder = data?.name;
    },

    initSettleInfo(data: any) {
      this.privateSettleInfo.accountMobile = data?.legalInfo?.mobile;
      this.privateSettleInfo.cardholder = data?.legalInfo?.name;
    },
  },
});
