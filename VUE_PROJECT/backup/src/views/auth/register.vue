<template>
  <div class="login-page">
    <h3>注册账号</h3>
    <el-form class="auth-form" ref="forgetRulesForm" :model="forgetForm" :rules="loginRuleAccount">
      <el-form-item prop="mobile">
        <el-input v-model.trim="forgetForm.mobile" placeholder="请输入11位手机号码，建议使用企业法人手机号" maxlength="11">
          <!-- <template #prepend>
            <img src="/src/assets/images/login/account.png" alt="" />
          </template> -->
        </el-input>
        <p v-show="forgetForm.mobile.length>0" style="width: 60px;height: 48px;line-height: 48px;text-align: center;position: absolute;right: 0;top:3px" @click="forgetForm.mobile=''">
        <img style="width:18px;height:18px" src="/src/assets/images/login/clear.png" alt="" />
      </p>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model.trim="forgetForm.password" placeholder="请输入密码" minlength="8" maxlength="16">
          <!-- <template #prepend>
            <img src="/src/assets/images/login/psd.png" alt="" />
          </template> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input type="password" v-model.trim="forgetForm.confirmPassword" placeholder="请再次确认密码" minlength="8" maxlength="16">
          <!-- <template #prepend>
            <img src="/src/assets/images/login/psd.png" alt="" />
          </template> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="channelAgentNo">
        <el-input v-model.trim="forgetForm.channelAgentNo" :placeholder="AgentNoPlaceholder">
          <!-- <template #prepend>
            <img src="/src/assets/images/login/account.png" alt="" />
          </template> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input style="width: calc(100% - 120px)" v-model.trim="forgetForm.verifyCode" placeholder="请输入验证码" maxlength="4">
          <!-- <template #prepend><img src="/src/assets/images/login/code.png" alt="" /></template> -->
        </el-input>
        <p class="codeImg" :class="smsBtnTime === 60?'':'countdown'" @click="getSmsCode">
          {{ smsBtnTime === 60 ? "获取验证码" : smsBtnTime + "秒后获取" }}
        </p>
      </el-form-item>
      <div class="login-forget">
        <el-checkbox v-model="checked" label="我已阅读并同意" size="small" />
        <span @click.stop="hrefSkip('kjskAgreement')">《用户服务协议》</span>、
        <span @click.stop="hrefSkip('kjskPrivacy')">《隐私政策》</span>
      </div>
      <el-button class="auth-button" type="primary" @click="submitForm(forgetRulesForm)">注册</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStore } from "@/store/user";
import md5 from "js-md5";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import type { FormInstance } from "element-plus";
import { request } from "@/service/http";

const router = useRouter();
const route = useRoute();
const forgetRulesForm = ref<FormInstance>();
let smsBtnTime = ref(60); //'获取验证码'
let interval = ref<any>(null);
let checked = ref<boolean>(false);
//账号登录
const forgetForm = reactive({
  mobile: "",
  password: "",
  verifyCode: "",
  confirmPassword: "",
  channelAgentNo:''
});
const AgentNoPlaceholder = route.query.fromOfficial ? '请输入渠道商号（选填）' : '请输入渠道商号'
const validatePass = (rule: any, value: any, callback: any) => {
  if (value !== forgetForm.password) {
    callback(new Error("两次密码输入不一致，请重新输入"));
  } else {
    callback();
  }
};
const validateChannelAgentNo = (rule: any, value: any, callback: any) => {
  if (!route.query.fromOfficial && value === '') {
    callback(new Error("请输入渠道商号"));
  } else {
    callback();
  }
};
const loginRuleAccount = reactive({
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern:/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      pattern:/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/,
      message: "密码需同时包含数字、大小写字母，8-16位字符",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    { required: true, message: "请再次确认密码", trigger: "blur" },
    { validator: validatePass, trigger: "blur" },
  ],
  channelAgentNo: [{ validator: validateChannelAgentNo, message: "请输入渠道商号", trigger: "blur" }],
  verifyCode: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
});
const store = useStore();
async function getSmsCode() {
  if (smsBtnTime.value !== 60) return;
  if (!forgetForm.mobile)
    return ElMessage({
      type: "warning",
      message: "请输入手机号！",
    });
  let data: any = await store.getSessCode({
    mobile: forgetForm.mobile,
  });
  countdown();
}
function countdown() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (smsBtnTime.value > 1) {
      smsBtnTime.value--;
    } else {
      clearInterval(interval);
      smsBtnTime.value = 60;
    }
  }, 1000);
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      if(!checked.value) return ElMessage({
        type: "warning",
        message: "请阅读并同意用户协议",
      });
      let par = {
        ...forgetForm,
        password: md5(forgetForm.password),
      };
      // 官网跳转过来给默认渠道商号
      if(!par.channelAgentNo && route.query.fromOfficial){
        par.channelAgentNo = '123456'
      }
      setForgetPsd(par);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
async function setForgetPsd(par: object) {
  let data: any = await request("POST", "/abroad-merchant/front/user/register", par);
  if (data) {
    router.replace({ path: "/login" });
  }
}
function hrefSkip(type: string) {
 window.open(`https://h5.leshuazf.com/lepos/help/${type}.html`)
}
</script>

<style lang="scss" scoped>
@import "./components/form.scss";
.login-page {
  width: 100%;
  h3 {
    font-size: 32px;
    font-weight: bold;
    color: #2c333f;
    line-height: 44px;
    margin-bottom:20px;
  }
  .codeImg{
    text-align: center;
    background: #195EFF;
    border-radius: 8px;
    color: #fff;
    &.countdown{
      background: #C8CFD5;
      color: #fff;
    }
  }
  .login-forget {
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    span {
      color: var(--main-color);
    }
    &::v-deep(.el-checkbox__label) {
      color: #646A73;
    }
  }
}
</style>
