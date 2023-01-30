<!-- 
  选择开户类型的组件
  @props {type} 注册的类型 同{MerchantType}
 -->
<template>
  <div class="container">
    <div class="typeIcon">
      <img
        v-if="iconType === 'hongkong'"
        src="@/assets/images/home/hongkong.png"
        alt="商户类型"
      />
      <img
        v-else-if="iconType === 'individual'"
        src="@/assets/images/home/individual.png"
        alt="商户类型"
      />
      <img
        v-else-if="iconType === 'personal'"
        src="@/assets/images/home/personal.png"
        alt="商户类型"
      />
      <img
        v-else-if="iconType === 'mainland'"
        src="@/assets/images/home/mainland.png"
        alt="商户类型"
      />
    </div>
    <div class="typeTitle">
      <p>
        {{ titles[type] }}
      </p>
    </div>
    <div class="button">
      <el-button
        type="primary"
        round
        size="large"
        class="el-button"
        @click.stop="toAccountCreatement(type)"
        >开户</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import { MerchantType } from "@/utils/enum";
import { useRouter } from "vue-router";
import { baseStore } from "@/store/base";
import { ElMessageBox, ElMessage } from "element-plus";
import { request } from "@/service/http";
import { useStore } from "@/store/user";

const props = defineProps({
  type: {
    //开户类型
    type: Number,
    default: 0,
  },
});

// 根据类型的不同，设定不同的icon，标题和路由路径
const titles = reactive(["个人", "个体", "大陆企业", "香港企业"]);
const paths = reactive([
  "personFirst",
  "individualFirst",
  "mainlandFirst",
  "hongkongFirst",
]);

const iconType = ref("");
if (props.type === MerchantType.HONGKONG) iconType.value = "hongkong";
else if (props.type === MerchantType.INDIVIDUAL) iconType.value = "individual";
else if (props.type === MerchantType.PERSONAL) iconType.value = "personal";
else if (props.type === MerchantType.MAINLAND) iconType.value = "mainland";

// 进入开户页面
const router = useRouter();
const toAccountCreatement = async (type: number) => {
  const baseStoreInfo = baseStore();

  ///前端显示顺序为 0:个人, 1:个体 2:大陆 3:香港
  ///后端接口要求为 1:个人, 2:个体 3:香港 4:大陆
  ///为适配后端接口进行修改
  let etype = type + 1;
  if (etype === 3) etype = 4;
  else if (etype === 4) etype = 3;
  ///

  const types = ["", "个人", "个体", "香港", "大陆"];
  if ((baseStoreInfo?.applyInfo?.merchantType ?? etype) !== etype) {
    ElMessageBox.confirm(
      `你已有${
        types[baseStoreInfo.applyInfo.merchantType]
      }类型的开户数据, 如果执行该步骤将清空数据, 确认要执行吗?`,
      "温馨提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    ).then(async () => {
      await baseStoreInfo.clearApplyInfo(router, `${paths[type]}`, etype);
    });
  } else {
    await baseStoreInfo.getMerchantApplyInfo();
    //确定类型
    let prefix = "";
    switch (etype) {
      case 1:
        prefix = "person";
        break;
      case 2:
        prefix = "individual";
        break;
      case 3:
        prefix = "hongkong";
        break;
      case 4:
        prefix = "mainland";
        break;
      default:
        break;
    }
    //确定步骤
    let steps = "First";
    switch (baseStoreInfo.applyInfo.step) {
      case 1:
        steps = "Second";
        break;
      case 2:
        steps = "Third";
        break;
      default:
        break;
    }

    router.push({
      path: `${prefix}${steps}`,
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  * {
    margin-top: 1rem;
  }
}

.typeIcon {
  display: flex;
  flex-direction: row;
  justify-content: center;

  img {
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
  }
}
.typeTitle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 900;
}

.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .el-button {
    width: 7rem;
    font-weight: 900;
  }
}
</style>
