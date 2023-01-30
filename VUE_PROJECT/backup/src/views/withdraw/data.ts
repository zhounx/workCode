//校验开户行所在地
const validateBankAddress = (rule: any, value: any, callback: any) => {
  if (value !== 4) {
    callback(new Error("请选择开户行所在地"));
  } else {
    callback();
  }
};
export const formSearchItems = [
  {
    type: "daterange",
    label: "发起时间",
    prop: "createTime",
    format: "YYYY-MM-DD",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
  },
  {
    type: "input",
    label: "提现银行账户",
    prop: "withdrawBankAccount",
    placeholder: "请输入提现银行账户",
  },
  {
    type: "select",
    label: "提现状态",
    prop: "status",
    options: [
      { label: "全部", value: "" },
      { label: "审核中", value: "1" },
      { label: "审核通过", value: "2" },
      { label: "审核不通过", value: "3" },
    ],
    placeholder: "",
  },
  {
    type: "select",
    label: "提现方式",
    prop: "withdrawType",
    options: [
      { label: "全部", value: "" },
      { label: "普通提现", value: "1" },
      { label: "结汇提现", value: "2" },
    ],
    placeholder: "",
  },
  { slot: "search" },
];

export const columns = [
  { label: "发起时间", slot: "createTime", width: "100px" },
  { label: "提现单号", prop: "withdrawNo", width: "100px" },
  { label: "提现银行", prop: "withdrawBank", width: "100px" },
  { label: "提现银行账户", prop: "withdrawBankAccount", width: "100px" },
  { label: "提现的资产账户", prop: "withdrawWalletAccount", width: "100px" },
  { label: "提现金额", slot: "withdrawAmount", width: "100px" },
  { label: "提现方式", slot: "withdrawType", width: "100px" },
  { label: "提现状态", slot: "status", width: "100px" },
  { label: "提现手续费", slot: "withdrawFee", width: "100px" },
];

export enum Currency {
  USD = "美元",
  CNY = "人民币",
  EUR = "欧元",
}
export const detailform = [
  {
    type: "input",
    label: "账户类型",
    prop: "accountType",
    placeholder: "请输入账户类型",
  },
  {
    type: "input",
    label: "账户币种",
    prop: "currency",
    placeholder: "请输入账户币种",
  },
  {
    type: "input",
    label: "开户银行",
    prop: "bankName",
    placeholder: "请输入开户银行",
  },
  {
    type: "input",
    label: "开户银行网点",
    prop: "bankOutlets",
    placeholder: "请输入开户银行网点",
  },
  {
    type: "input",
    label: "银行账户",
    prop: "bankAccount",
    placeholder: "请输入银行账户",
  },
  {
    type: "input",
    label: "账户名称",
    prop: "accountName",
    placeholder: "请输入账户名称",
  },
  {
    type: "input",
    label: "银行预留联系方式",
    prop: "mobile",
    placeholder: "请输入开户时银行预留的手机号",
  }
];
export const addAccountform1 = [
  {
    label: "提现账户类型",
    slot: "accountType",
    prop: "accountType",
    width: "100%",
    rules: [
      { required: true, message: "请选择提现账户类型", trigger: "change" },
    ],
  },
  {
    type: "select",
    label: "账户币种",
    prop: "currency",
    width: "100%",
    options: [{ label: "人民币（CNY）", value: "CNY" }],
    placeholder: "请选择账户币种",
    rules: [{ required: true, message: "请选择账户币种", trigger: "change" }],
  },

  {
    label: "开户银行",
    slot: "bankCode",
    prop: "bankCode",
    width: "100%",
    rules: [{ required: true, message: "请选择开户银行", trigger: "blur" }],
  },
  {
    type: "input",
    label: "账户名称",
    prop: "accountName",
    width: "100%",
    placeholder: "请输入账户名称",
    disabled: "disabled",
  },
  {
    label: "对公账户照片",
    slot: "bankCardImage",
    prop: "bankCardImage",
    width: "100%",
    rules: [{ required: true, message: "请上传对公账户照片", trigger: "blur" }],
  },
  {
    type: "input",
    label: "对公账户账号",
    prop: "accountNo",
    width: "100%",
    placeholder: "注意输入的账号不要有空格",
    rules: [{ required: true, message: "请输入对公账户账号", trigger: "blur" }],
  },
  {
    label: "开户银行网点",
    slot: "bankAddress",
    prop: "bankAddress",
    width: "100%",
    rules: {
      required: true,
      validator: validateBankAddress,
      trigger: "change",
    },
  },
  {
    label: "开户支行",
    type: "input",
    prop: "bankOutlets",
    placeholder: "请输入开户支行",
    width: "100%",
    rules: [{ required: true, message: "请输入开户支行", trigger: "blur" }],
  },
  {
    type: "input",
    label: "银行预留联系方式",
    prop: "mobile",
    width: "100%",
    placeholder: "请输入开户时银行预留的手机号",
    rules: [
      {
        required: true,
        message: "请输入开户时银行预留的手机号",
        trigger: "blur",
      },
    ],
  },
];
export const addAccountform2 = [
  {
    label: "提现账户类型",
    slot: "accountType",
    prop: "accountType",
    width: "100%",
    rules: [
      { required: true, message: "请选择提现账户类型", trigger: "change" },
    ],
  },
  {
    type: "select",
    label: "企业法人证件类型",
    prop: "legalIdCardType",
    options: [
      { label: "身份证", value: "01" },
      { label: "护照", value: "03" },
      { label: "香港身份证", value: "08" },
    ],
    width: "100%",
    placeholder: "请选择企业法人证件类型",
    disabled: "disabled",
  },

  {
    type: "input",
    label: "企业法人证件号码",
    prop: "legalIdCardNo",
    width: "100%",
    placeholder: "请输入企业法人证件号码",
    disabled: "disabled",
  },
  {
    type: "select",
    label: "账户币种",
    prop: "currency",
    width: "100%",
    options: [{ label: "人民币（CNY）", value: "CNY" }],
    placeholder: "请选择账户币种",
    rules: [{ required: true, message: "请选择账户币种", trigger: "change" }],
  },
  {
    label: "开户银行",
    slot: "bankCode",
    prop: "bankCode",
    width: "100%",
    rules: [{ required: true, message: "请选择开户银行", trigger: "blur" }],
  },

  {
    type: "input",
    label: "账户名称",
    prop: "accountName",
    width: "100%",
    placeholder: "请输入账户名称",
    disabled: "disabled",
  },
  {
    label: "银行卡照片",
    slot: "bankCardImage",
    prop: "bankCardImage",
    width: "100%",
    rules: [{ required: true, message: "请上传银行卡照片", trigger: "blur" }],
  },
  {
    type: "input",
    label: "银行卡号",
    prop: "accountNo",
    width: "100%",
    placeholder: "注意输入的账号不要有空格",
    rules: [{ required: true, message: "请输入银行卡号", trigger: "blur" }],
  },
  {
    label: "开户银行网点",
    slot: "bankAddress",
    prop: "bankAddress",
    width: "100%",
    rules: {
      required: true,
      validator: validateBankAddress,
      trigger: "change",
    },
  },
  {
    label: "开户支行",
    type: "input",
    prop: "bankOutlets",
    placeholder: "请输入开户支行",
    width: "100%",
    rules: [{ required: true, message: "请输入开户支行", trigger: "blur" }],
  },
  {
    type: "input",
    label: "银行预留联系方式",
    prop: "mobile",
    width: "100%",
    placeholder: "请输入开户时银行预留的手机号",
    rules: [
      {
        required: true,
        message: "请输入开户时银行预留的手机号",
        trigger: "blur",
      },
    ],
  },
];
export const fetchForm = [
  {
    type: "input",
    label: "提现方式",
    prop: "types",
    width: "100%",
    placeholder: "请输入提现方式",
    disabled: "disabled",
  },
  {
    label: "资产账户",
    slot: "wallet",
    prop: "wallet",
    width: "100%",
    rules: [{ required: true, message: "请选择资产账户", trigger: "blur" }],
  },
  {
    label: "到账账户",
    slot: "receiveAccount",
    prop: "receiveAccount",
    width: "100%",
    rules: [{ required: true, message: "请选择到账账户", trigger: "blur" }],
  },
  {
    type: "input",
    label: "提现金额",
    isImplement: true,
    width: "100%",
    prop: "withdrawAmount",
    placeholder: "请输入提现金额",
    rules: [{ required: true, message: "请输入提现金额", trigger: "blur" }],
  },
  {
    label: "短信验证码",
    slot: "verificationCode",
    prop: "verificationCode",
    width: "100%",
    placeholder: "请输入短信验证码",
    rules: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
  },
];
