import { defineStore } from "pinia";
import { request } from "@/service/http";
import { useStore } from "@/store/user";
import { baseStore } from "@/store/base";

export const individualApplyStore = defineStore({
  id: "individualApplyState",
  state: () => {
    return {
      merchantType: 2,
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
     * @param {*} licenseInfo
     * @param {*} baseInfo
     */
    async applyInfoAtFirstStep(
      method: string,
      licenseInfo: any,
      baseInfo: any
    ) {
      const res: any = await request(
        method,
        "/abroad-merchant/front/merchant/apply",
        {
          baseInfo,
          licenseInfo,

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

    licenseOCR(data: any) {
      const baseInfo = baseStore();

      baseInfo.changeSettleInfo({ cardholder: data.name, settleType: 2 });
      baseInfo.changeLicenseInfo({ legalName: data.legalName });
      baseInfo.changeLegalInfo({ name: data.legalName });

      this.publicSettleInfo.cardholder = data.name;
    },

    setSettleInfo(data: any) {
      this.publicSettleInfo.cardholder = data?.licenseInfo?.licenseName;
    },

    initSettleInfo(data: any) {
      this.privateSettleInfo.accountMobile = data?.legalInfo?.mobile;
      this.privateSettleInfo.cardholder = data?.legalInfo?.name;

      this.publicSettleInfo.cardholder = data?.licenseInfo?.licenseName;
    },

    changeSettleInfo(data: any) {
      this.privateSettleInfo.accountMobile = data?.mobile;
      this.privateSettleInfo.cardholder = data?.name;
    },
  },
});
