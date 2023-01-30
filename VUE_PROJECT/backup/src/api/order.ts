import { request } from "@/service/http";

/**
 * 校验订单编号是否重复
 * @param customOrderId
 */
export async function checkOrderIdRepeated(
  customOrderId: string
): Promise<boolean> {
  try {
    const res = await request(
      "post",
      `/abroad-merchant/front/order/checkCustomOrderId?customOrderId=${customOrderId}`,
      {}
    );

    if (res?.status < 300 && res.status >= 200) return false;
    else return true;
  } catch (error) {
    console.log(error);
    return true;
  }
}
