import { MerchantType } from "@/utils/enum";
import { defineStore } from "pinia";

export const stepStore = defineStore({
  id: "stepInfomation",
  state: () => {
    return {
      first: [
        { title: "1.填写注册信息及法人信息", img: "first" },
        { title: "1.填写注册信息及法人信息", img: "first" },
        { title: "1.填写营业执照与企业基础信息", img: "first" },
        { title: "1.填写营业执照与企业基础信息", img: "first" },
      ],
      second: [
        { title: "2.填写结算账户信息", img: "second" },
        { title: "2.填写结算账户信息", img: "second" },
        { title: "2.填写企业法人信息和结算账户信息", img: "second" },
        { title: "2.填写企业法人信息和结算账户信息", img: "second" },
      ],
      third: [
        { title: "3.填写店铺信息", img: "third" },
        { title: "3.填写店铺信息", img: "third" },
        { title: "3.填写股东信息与店铺信息", img: "third" },
        { title: "3.填写股东信息与店铺信息", img: "third" },
      ],
    };
  },

  getters: {
    personStep: (state) => {
      return [
        state.first[MerchantType.PERSONAL],
        state.second[MerchantType.PERSONAL],
        state.third[MerchantType.PERSONAL],
      ];
    },

    individualStep: (state) => {
      return [
        state.first[MerchantType.INDIVIDUAL],
        state.second[MerchantType.INDIVIDUAL],
        state.third[MerchantType.INDIVIDUAL],
      ];
    },

    mainlandStep: (state) => {
      return [
        state.first[MerchantType.MAINLAND],
        state.second[MerchantType.MAINLAND],
        state.third[MerchantType.MAINLAND],
      ];
    },

    hongkongStep: (state) => {
      return [
        state.first[MerchantType.HONGKONG],
        state.second[MerchantType.HONGKONG],
        state.third[MerchantType.HONGKONG],
      ];
    },
  },
});
