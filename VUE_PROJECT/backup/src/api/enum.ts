import { request } from "@/service/http";

import { selectOption, StringEnum } from "@/types/interface/enums";

/**
 * 获取物流方式枚举
 */
export async function getLogisticsModeAPI(): Promise<selectOption[]> {
  try {
    let res = await request(
      "GET",
      "/abroad-merchant/front/select/logisticsMode",
      {}
    );
    if (res?.status === 200) return res?.data;
    else return Promise.resolve([]);
  } catch (error) {
    console.log(error);
    return Promise.resolve([]);
  }
}

/**
 * 获取交易方式枚举
 */
export async function getTransactionMethodAPI(): Promise<selectOption[]> {
  try {
    const res = await request(
      "GET",
      "/abroad-merchant/front/select/transactionMethod",
      {}
    );
    if (res?.status === 200) return res?.data!;
    else return Promise.resolve([]);
  } catch (error) {
    console.log(error);
    return Promise.resolve([]);
  }
}

/**
 * 获取贸易地区/国家枚举
 */
export async function getCounteyAPI(): Promise<selectOption[]> {
  try {
    const res = await request(
      "GET",
      "/abroad-merchant/front/select/tradeCountry",
      {}
    );
    if (res?.status === 200) return res?.data!;
    else return Promise.resolve([]);
  } catch (error) {
    console.log(error);
    return Promise.resolve([]);
  }
}

/**
 * 获取商品单位枚举
 */
export async function getGoodsUnitAPI(): Promise<selectOption[]> {
  try {
    const res = await request(
      "GET",
      "/abroad-merchant/front/select/goodsUnit",
      {}
    );
    if (res?.status === 200) return res?.data!;
    else return Promise.resolve([]);
  } catch (error) {
    console.log(error);
    return Promise.resolve([]);
  }
}

/**
 * 获取店铺类型枚举
 */
export async function getShopTypeEnumAPI(): Promise<selectOption[]> {
  try {
    const res = await request(
      "GET",
      "/abroad-merchant/front/select/shopType",
      {}
    );
    if (res?.status === 200) return res?.data!;
    else return Promise.resolve([]);
  } catch (error) {
    console.log(error);
    return Promise.resolve([]);
  }
}
/**
 * 获取店铺类型枚举
 */
export async function getOrderTypeAPI(): Promise<selectOption[]> {
  try {
    const res = await request(
      "GET",
      "/abroad-merchant/front/select/orderType",
      {}
    );
    if (res?.status === 200) return res?.data!;
    else return Promise.resolve([]);
  } catch (error) {
    console.log(error);
    return Promise.resolve([]);
  }
}
