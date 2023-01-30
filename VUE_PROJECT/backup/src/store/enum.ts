import { defineStore } from "pinia";
import {
  getCounteyAPI,
  getGoodsUnitAPI,
  getLogisticsModeAPI,
  getOrderTypeAPI,
  getShopTypeEnumAPI,
  getTransactionMethodAPI,
} from "@/api/enum";
import { selectOption, StringEnum } from "@/types/interface/enums";
const map = new Map<string, StringEnum>();
export const useEnumStore = defineStore({
  id: "ENUMS",
  state: () => {
    return {
      COUNTEY: [] as selectOption[], //贸易国家枚举
      GOODS_UNIT: [] as selectOption[], //商品单位枚举
      LOGISTICS_MODE: [] as selectOption[], //物流方式枚举
      ORDER_TYPE: [] as selectOption[], //订单类型枚举
      SHOP_TYPE: [] as selectOption[], //店铺类型枚举
      TRANSACTION_METHOD: [] as selectOption[], //交易方式枚举
    };
  },

  persist: {
    enabled: true,
    strategies: [
      //使用插件自定义存储
      {
        storage: sessionStorage,
        paths: [
          "COUNTEY",
          "GOODS_UNIT",
          "LOGISTICS_MODE",
          "ORDER_TYPE",
          "SHOP_TYPE",
          "TRANSACTION_METHOD",
        ],
      },
    ],
  },

  actions: {
    async initEnums() {
      this.COUNTEY = await getCounteyAPI();
      this.GOODS_UNIT = await getGoodsUnitAPI();
      this.ORDER_TYPE = await getOrderTypeAPI();
      this.SHOP_TYPE = await getShopTypeEnumAPI();
      this.TRANSACTION_METHOD = await getTransactionMethodAPI();
      this.LOGISTICS_MODE = await getLogisticsModeAPI();
    },
  },
});
