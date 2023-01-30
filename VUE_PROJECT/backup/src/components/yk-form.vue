<template>
  <el-form
    class="form-demo"
    ref="ruleForm"
    :model="formParams"
    :size="size"
    :inline="inline"
    :label-width="labelWidth==='auto'?'labelWidth':labelWidth + 'px'"
    :label-position="labelPosition"
  >
    <template v-for="(item, index) in formItems" :key="index">
      <el-form-item
        v-if="item.prop && item.label"
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
        :style="{ width: item.width }"
        :label-width="item.labelWidth || ''"
      >
        <slot :name="item.slot"></slot>
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'input'"
          v-limit-input-number="{
            isImplement: item.isImplement || false,
            limitNumber: item.limitNumber,
          }"
          :autocomplete="autocomplete"
          :maxlength="item.maxlength"
          v-model="formParams[item.prop]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        >
          <template v-if="item.append" #append>{{ item.append }}</template>
        </el-input>
        <!--文本域-->
        <el-input
          v-if="item.type === 'textarea'"
          :autocomplete="autocomplete"
          :type="item.type"
          v-model="formParams[item.prop]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        ></el-input>
        <!--日期范围 daterange-没有时分秒 datetimerange-有时分秒  -->
        <el-date-picker
          v-if="
            ['daterange', 'datetimerange', 'monthrange'].includes(item.type)
          "
          v-model="formParams[item.prop]"
          :type="item.type"
          :format="item.format"
          :value-format="item.valueFormat"
          :disabledDateFun="item.disabledDateFun"
          :range-separator="item.rangeSeparator || '-'"
          :start-placeholder="item.startPlaceholder || '请选择'"
          :end-placeholder="item.endPlaceholder || '请选择'"
          :default-time="defaultTime"
        />
        <!--日期-->
        <el-date-picker
          v-if="
            ['week', 'month', 'year', 'dates', 'datetime'].includes(item.type)
          "
          v-model="formParams[item.prop]"
          :type="item.type"
          :placeholder="item.placeholder || '请选择'"
        />
        <!--日期-->
        <el-date-picker
          v-if="item.type == 'date'"
          v-model="formParams[item.prop]"
          :type="item.type"
          :placeholder="item.placeholder || '请选择'"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
        <!-- 下拉框 -->
        <el-select
          v-if="item.type === 'select'"
          style="width: 100%"
          v-model="formParams[item.prop]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        >
          <el-option
            :label="opItem[item.optionLabel || 'label']"
            :value="opItem[item.optionValue || 'value']"
            v-for="opItem in item.options"
            :key="opItem.value"
          ></el-option>
        </el-select>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type === 'checkbox'"
          v-model="formParams[item.prop]"
        >
          <el-checkbox
            v-for="chItem in item.options"
            :label="chItem.value"
            :key="chItem.value"
            >{{ chItem.label }}</el-checkbox
          >
        </el-checkbox-group>
        <!-- 单选 -->
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="formParams[item.prop]"
        >
          <el-radio
            v-for="ra in item.radios"
            :label="ra.value"
            :key="ra.value"
            >{{ ra.label }}</el-radio
          >
        </el-radio-group>
        <el-upload
          class="avatar-uploader"
          v-if="item.type === 'upload'"
          :action="baseURL[mode] + item.action"
          :headers="{ Authorization: 'Bearer ' + user.token }"
          :show-file-list="false"
          :on-success="item.success"
          :on-remove="item.remove"
        >
          <img
            v-if="formParams[item.prop]"
            :src="formParams[item.prop]"
            class="avatar"
            alt=""
          />
          <div class="upload-logo" v-else>
            <img
              src="../assets/images/upload.png"
              width="46"
              height="46"
              alt=""
            />
            <span>{{ item.placeholder || "上传照片" }}</span>
          </div>
        </el-upload>
      </el-form-item>
      <slot v-else :name="item.slot"> </slot>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { resolve } from "path";
import { ref } from "vue";
import baseURL from "../service/env";
import { useStore } from "@/store/user";

const mode = import.meta.env.MODE;
const user = useStore();
defineProps({
  labelWidth: {
    type: [String, Number],
    default: 120,
  },
  labelPosition: {
    type: String,
    default: "left",
  },
  size: {
    type: String,
    default: "default",
  },
  inline: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: "off",
  },
  formItems: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
  formParams: {
    type: Object,
    required: true,
    default: () => {
      return {};
    },
  },
});
const ruleForm = ref();
const defaultTime = ref([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
]);
//触发校验
let i=0;
const submitForm = () => {
  return new Promise((resolve, reject) => {
    ruleForm.value
      .validate((valid: boolean) => {
        console.log(i++,valid);
        
        resolve(valid);
      })
      .catch(() => {
        reject(false);
      });
  });
};
//重置校验
const resetForm = () => {
  ruleForm.value?.resetFields();
};

const validateField = (field: string) => {
  return ruleForm?.value?.validateField(field, (err: any) => {
    if (!err) {
      return true;
    } else {
      return false;
    }
  });
};
defineExpose({ submitForm, resetForm, validateField });
</script>

<style scoped lang="scss">
.form-demo {
  position: relative;
  .avatar-uploader {
    &::v-deep(.el-upload) {
      width: 160px;
      height: 90px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      background: #f5f9fb;
      border: 1px solid #195eff;
      border-radius: 10px;
      &:hover {
        border-color: var(--el-color-primary);
      }
      .avatar {
        width: 160px;
        height: 90px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .upload-logo {
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        span {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #195eff;
        }
      }
    }
  }
}
</style>
