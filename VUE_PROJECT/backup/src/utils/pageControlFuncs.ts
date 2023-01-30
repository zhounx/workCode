import { ElMessageBox, ElMessage } from "element-plus";

/**
 * 用于从开户页面的第一步返回选择开户类型页面
 *
 * @export
 */
export function goBack(router: any) {
  ElMessageBox.confirm(
    "是否确认返回上一步, 返回后将清空已录入资料?",
    "温馨提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(() => {
    router.push({ path: "choseType" });
  });
}
