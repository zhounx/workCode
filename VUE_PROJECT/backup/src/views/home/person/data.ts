//法人正反身份证验证
const validateImageUrl = (rule: any, value: any, callback: any) => {
  if (value === 4) {
    callback(new Error("请上传证件正面照"));
  } else if (value === 5) {
    callback(new Error("请上传证件反面照"));
  } else if (value === 3) {
    callback();
  } else {
    callback(new Error("请上传证件正反面照"));
  }
};
//校验持股比例数据
const validateShares = (rule: any, value: any, callback: any) => {
  if (value === null || value === "") {
    callback(new Error("请输入持股比例"));
  } else {
    let v = Number(value);
    if (!isNaN(v)) {
      if (Number(value) > 100 || Number(value) < 0) {
        callback(new Error("请正确输入持股比例"));
      } else {
        callback();
      }
    } else {
      callback(new Error("请正确输入持股比例"));
    }
  }
};
//校验开户行所在地
const validateBankAddress = (rule: any, value: any, callback: any) => {
  if (value === 3) {
    callback();
  } else {
    if (value === 0) {
      callback(new Error("请选择开户行所在省市区(县)"));
    }
    if (value === 1) {
      callback(new Error("请选择开户行所在市区(县)"));
    }
    if (value === 2) {
      callback(new Error("请选择开户行所在区(县)"));
    }
  }
};
const validateCategoryType = (rule: any, value: any, callback: any) => {
  if (value !== 2) {
    if (value === 1) return callback(new Error("请选择细类"));
    callback(new Error("请选择店铺经营类别"));
  } else {
    callback();
  }
};
const validatorTime = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(
      new Error(
        rule.field === "validateTime1"
          ? "请选择营业执照期限"
          : "请选择证件有效期时间"
      )
    );
  } else if (value === 1) {
    callback(
      new Error(
        rule.field === "validateTime1"
          ? "请选择营业执照期限结束时间"
          : "请选择证件有效期时间结束时间"
      )
    );
  } else {
    callback();
  }
};

///new data
//注册基本信息
export const baseInfoFormItems = [
  {
    label: "现居地址",
    type: "input",
    prop: "address",
    placeholder: "请输入现居地址（精确到街道）",
    width: "510px",
    labelWidth: "90px",
    rules: [
      {
        required: true,
        message: "请输入现居地址（精确到街道）",
        trigger: "blur",
      },
    ],
  },
  {
    label: "邮箱",
    type: "input",
    prop: "contractEmail",
    placeholder: "请输入邮箱地址",
    width: "510px",
    labelWidth: "60px",

    rules: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
  },
  {
    label: "所属行业",
    type: "input",
    prop: "industry",
    labelWidth: "90px",

    placeholder: "请输入所属行业，如服装产业等",
    width: "510px",
    rules: [
      {
        required: true,
        message: "请输入所属行业，如服装产业等",
        trigger: "blur",
      },
    ],
  },
];

//企业法人信息
export const legalInfoFormItems = [
  {
    label: "证件类型",
    type: "select",
    prop: "idType",
    width: "510px",
    rules: [{ required: true, message: "请选择证件类型", trigger: "change" }],
    options: [
      { label: "身份证", value: "01" },
      { label: "护照", value: "03" },
      { label: "香港身份证", value: "08" },
    ],
    placeholder: "请选择证件类型",
  },
  {
    label: "法人身份证照或其他有效证件",
    slot: "legalInfoImageUrl",
    prop: "legalInfoImageUrl",
    width: "100%",
    rules: [{ required: true, validator: validateImageUrl, trigger: "blur" }],
  },

  {
    label: "法人姓名",
    type: "input",
    prop: "name",
    width: "510px",
    labelWidth: "110px",

    placeholder: "请输入企业法人姓名",
    rules: [
      { required: true, message: "请输入企业法人姓名", trigger: "change" },
    ],
  },
  {
    label: "法人手机号",
    type: "input",
    prop: "mobile",
    width: "510px",
    placeholder: "请输入企业法人手机号",
    maxlength: 11,
    rules: [
      { required: true, message: "请输入企业法人手机号", trigger: "blur" },
      {
        pattern:
          /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
        message: "请输入正确的手机号",
        trigger: "blur",
      },
    ],
  },
  {
    label: "证件号码",
    type: "input",
    prop: "idCardNo",
    labelWidth: "110px",
    width: "510px",
    placeholder: "请输入企业法人证件号码",
    rules: [
      { required: true, message: "请输入证企业法人件号码", trigger: "change" },
    ],
  },
  {
    label: "证件有效期",
    slot: "validateTime",
    prop: "validateTime2",
    width: "510px",
    rules: [{ required: true, validator: validatorTime, trigger: "change" }],
  },
  {
    label: "企业法人国籍",
    type: "select",
    labelWidth: "110px",
    prop: "region",
    width: "510px",
    rules: [
      { required: true, message: "请选择企业法人国籍", trigger: "change" },
    ],
    options: [
      { label: "中国", value: "CN" },
      { label: "中国香港", value: "HK" },
      { label: "中国台北", value: "TPE" },
      { label: "美国", value: "US" },
    ],
    placeholder: "请选择企业法人国籍",
  },
];

//结算信息-对私结算
export const settleInfoFormItems = [
  {
    label: "结算方式",
    slot: "settleType",
    prop: "settleType",
    width: "100%",
    rules: [{ required: true, message: "请选择结算方式", trigger: "change" }],
  },
  {
    label: "银行卡正面照",
    slot: "cardImage",
    prop: "cardImage",
    width: "100%",
    rules: [
      { required: true, message: "请上传银行卡正面照", trigger: "change" },
    ],
  },
  {
    label: "持卡人姓名",
    type: "input",
    prop: "cardholder",
    placeholder: "请输企业法人姓名信息",
    width: "510px",
    disabled: "disabled",
    rules: [
      { required: false, message: "请输企业法人姓名信息", trigger: "blur" },
    ],
  },
  {
    label: "银行卡号",
    type: "input",
    prop: "accountNo",
    placeholder: "请输入银行卡号",
    width: "510px",
    rules: [{ required: true, message: "请输入银行卡号", trigger: "change" }],
  },
  {
    label: "开户银行",
    slot: "bankCode",
    prop: "bankCode",
    width: "100%",
    rules: [{ required: true, message: "请选择开户银行", trigger: "change" }],
  },
  {
    label: "开户行所在地",
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
    label: "开户网点",
    type: "input",
    prop: "bankOutlets",
    placeholder: "请输入开户行网点名称",
    width: "1030px",
    rules: [
      { required: true, message: "请输入开户行网点名称", trigger: "blur" },
    ],
  },
  {
    label: "银行预留手机号",
    type: "input",
    prop: "accountMobile",
    placeholder: "请输入企业法人手机号信息",
    maxlength: 11,
    width: "510px",
    // disabled: "disabled",
    rules: [
      { message: "请输入企业法人手机号信息", required: true, trigger: "blur" },
      {
        pattern:
          /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
        message: "请输入正确的银行预留手机号",
        trigger: "blur",
      },
    ],
  },
];

//收款用途
export const receiveUseFormItems = [
  {
    label: "收款用途",
    type: "select",
    prop: "receiveUse",
    width: "510px",
    rules: [{ required: true, message: "请选择收款用途", trigger: "change" }],
    options: [
      { label: "贸易收款", value: 1 },
      { label: "电商收款", value: 2 },
    ],
    placeholder: "请选择收款用途",
  },
];

const validateApplyPic = (rule: any, value: any, callback: any) => {
  if (value === undefined) {
    callback();
  } else {
    callback(new Error("请上传开户申请表"));
  }
};
//申请表
export const applyFormInfoItems = [
  {
    label: "开户申请表",
    slot: "accountOpenFormImage",
    prop: "accountOpenFormImage",
    width: "100%",
    rules: [{ required: true, message: "请上传开户申请表", trigger: "change" }],
  },
];
//Tiktok
export const TiktokInfoFormItems = [
  {
    label: "店铺类型",
    prop: "shopType",
    slot: "shopType",
    width: "100%",
    options: [
      { label: "亚马逊店铺", value: 1 },
      { label: "ebay店铺", value: 2 },
      { label: "TikTok", value: 3 },
    ],
    placeholder: "请选择店铺类型",
  },
  {
    label: "店铺名称",
    type: "input",
    prop: "shopName",
    placeholder: "请输入您的店铺名称",
    width: "510px",
    rules: [{ required: true, message: "请输入您的店铺名称", trigger: "blur" }],
  },
  {
    label: "店铺账号",
    type: "input",
    prop: "shopAccount",
    labelWidth: "90px",
    placeholder: "请输入店铺账号",
    width: "510px",
    rules: [
      {
        required: true,
        message: "请输入店铺账号",
        trigger: "blur",
      },
    ],
  },
  {
    label: "店铺经营类别",
    slot: "categoryType",
    prop: "categoryType",
    width: "100%",
    rules: [
      { required: true, validator: validateCategoryType, trigger: "change" },
    ],
  },
  {
    label: "店铺所在地区",
    type: "select",
    prop: "shopRegion",
    width: "510px",
    options: [{ label: "美国", value: "01" }],
    placeholder: "请选择店铺所在地区",
    rules: [
      { required: true, message: "请选择店铺所在地区", trigger: "change" },
    ],
  },
];

//店铺信息
export const normalShopInfoItems = [
  {
    label: "店铺类型",
    prop: "shopType",
    slot: "shopType",
    width: "100%",
    options: [
      { label: "亚马逊店铺", value: 1 },
      { label: "ebay店铺", value: 2 },
      { label: "TikTok", value: 3 },
    ],
    placeholder: "请选择店铺类型",
  },
  {
    label: "店铺账户名称",
    type: "input",
    prop: "shopAccountName",
    placeholder: "请输入您的店铺账户名称",
    width: "510px",
    rules: [
      { required: true, message: "请输入您的店铺账户名称", trigger: "blur" },
    ],
  },
  {
    label: "店铺ID",
    type: "input",
    prop: "shopId",
    placeholder: "请输入店铺ID，亚马逊为Seller ID",
    labelWidth: "90px",
    width: "510px",
    rules: [
      {
        required: true,
        message: "请输入店铺ID，亚马逊为Seller ID",
        trigger: "blur",
      },
    ],
  },
  {
    label: "店铺经营类别",
    slot: "categoryType",
    prop: "categoryType",
    width: "100%",
    rules: [
      { required: true, validator: validateCategoryType, trigger: "change" },
    ],
  },
  {
    label: "店铺网址",
    type: "input",
    prop: "shopWebUrl",
    placeholder: "请输入店铺网址",
    width: "510px",
    rules: [{ required: true, message: "请输入店铺网址", trigger: "blur" }],
  },
  {
    label: "店铺名称",
    type: "input",
    prop: "shopName",
    labelWidth: "90px",
    placeholder: "请输入店铺全称",
    width: "510px",
    rules: [{ required: true, message: "请输入店铺全称", trigger: "blur" }],
  },
  {
    label: "店铺所在地区",
    type: "select",
    prop: "shopRegion",
    width: "510px",
    options: [{ label: "美国", value: "01" }],
    placeholder: "请选择店铺所在地区",
    rules: [
      { required: true, message: "请选择店铺所在地区", trigger: "change" },
    ],
  },
];
