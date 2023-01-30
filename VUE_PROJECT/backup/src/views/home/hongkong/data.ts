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
const validateBR = (rule: any, value: any, callback: any) => {
  let res = 0;

  if (value === "") {
    callback(new Error("请输入正确的企业商业登记号码"));
  }
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "-") {
      res++;
    }
  }
  if (value.length - res === 16) {
    callback();
  } else {
    callback(new Error("企业商业登记号码格式错误，请重新输入"));
  }
};
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

//开户申请表
export const applyFormInfoItems = [
  {
    label: "开户申请表",
    slot: "accountOpenFormImage",
    prop: "accountOpenFormImage",
    width: "100%",
    rules: [{ required: true, message: "请上传开户申请表", trigger: "change" }],
  },
];

//香港地区营业执照信息
export const hkLicenseInfoFormItems = [
  {
    label: "注册证书（CR）图片",
    slot: "registerCrImage",
    prop: "registerCrImage",
    width: "510px",
    rules: [
      {
        required: true,
        message: "请上传注册证书（CR）图片",
        trigger: "change",
      },
    ],
  },
  {
    label: "商业登记证书（BR）图片",
    prop: "businessBrImage",
    slot: "businessBrImage",
    width: "510px",
    rules: [
      {
        required: true,
        message: "请上传商业登记证书（BR）图片",
        trigger: "change",
      },
    ],
  },
  {
    label: "法团成立表格或周年申报表",
    prop: "legalsTableImage",
    slot: "legalsTableImage",
    width: "510px",
    rules: [
      {
        required: true,
        message: "请上传法团成立表格或周年申报表",
        trigger: "change",
      },
    ],
  },
  {
    label: "董事手持注册证书图片",
    slot: "ceoHolderImage",
    prop: "ceoHolderImage",
    width: "510px",
    rules: [
      {
        required: true,
        message: "请上传董事手持注册证书图片",
        trigger: "change",
      },
    ],
  },
  {
    label: "企业中文名称",
    type: "input",
    prop: "companyCnName",
    placeholder: "请输入企业中文名称",
    width: "510px",
    rules: [{ required: true, message: "请输入企业中文名称", trigger: "blur" }],
  },
  {
    label: "企业英文名称",
    type: "input",
    prop: "companyEnName",
    placeholder: "请输入企业英文名称",
    width: "510px",
    rules: [{ required: true, message: "请输入企业英文名称", trigger: "blur" }],
  },
  {
    label: "企业注册编号",
    type: "input",
    prop: "companyRegisterCode",
    placeholder: "CR证书左上角7位编号",
    maxlength: 7,
    width: "510px",
    rules: [
      { required: true, message: "请输入企业注册编号", trigger: "blur" },
      {
        pattern: /^\d{7}$/,
        message: "请输入正确的CR号",
        trigger: "blur",
      },
    ],
  },
  {
    label: "企业商业登记号码",
    type: "input",
    prop: "companyBusinessCode",
    placeholder: "BR证书16位商业登记号码",
    width: "510px",
    maxlength: 20,
    rules: [
      {
        required: true,
        validator: validateBR,
        trigger: "blur",
      },
    ],
  },
  {
    label: "企业注册地址",
    type: "input",
    prop: "companyAddress",
    placeholder: "请输入企业注册地址/场所",
    width: "510px",
    rules: [
      { required: true, message: "请输入企业注册地址/场所", trigger: "blur" },
    ],
  },
];

//企业基础信息
export const baseInfoFormItems = [
  {
    label: "企业经营地址",
    type: "input",
    prop: "address",
    placeholder: "",
    width: "510px",
    rules: [{ required: true, message: "请输入企业经营地址", trigger: "blur" }],
  },
  {
    label: "员工规模",
    type: "select",
    prop: "businessScale",
    width: "510px",
    rules: [{ required: true, message: "请选择员工规模", trigger: "change" }],
    options: [
      { label: "1-19人", value: 1 },
      { label: "20-99人", value: 2 },
      { label: "100-500人", value: 3 },
      { label: "500人以上", value: 4 },
    ],
    placeholder: "请选择员工规模",
  },
  {
    label: "主要营业区域",
    type: "select",
    prop: "businessScope",
    width: "510px",
    options: [
      { label: "中国", value: "CN" },
      { label: "中国香港", value: "HK" },
      { label: "美国", value: "US" },
    ],
    placeholder: "请选择主要营业区域",
  },
  {
    label: "营业规模",
    type: "select",
    prop: "businessVolume",
    width: "510px",
    rules: [{ required: true, message: "请选择营业规模", trigger: "change" }],
    options: [
      { label: "0~5万美元", value: 1 },
      { label: "5~10万美元", value: 2 },
      { label: "10~50万美元", value: 3 },
      { label: "50~100万美元", value: 4 },
      { label: "100万美元以上", value: 5 },
    ],
    placeholder: "请选择员工规模",
  },
  {
    label: "企业网址",
    type: "input",
    prop: "businessWeb",
    placeholder: "请输入企业的网址",
    width: "510px",
  },
  {
    label: "经营品类",
    type: "input",
    prop: "category",
    placeholder: "请输入经营品类,如服饰、玩具等",
    width: "510px",
    rules: [{ required: true, message: "请输入经营品类", trigger: "blur" }],
  },
  {
    label: "联系人手机号",
    type: "input",
    prop: "contractNumber",
    placeholder: "请输入企业联系人手机号",
    width: "510px",
    maxlength: 11,
    rules: [
      { required: true, message: "请输入企业联系人手机号", trigger: "blur" },
      {
        pattern:
          /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
        message: "请输入正确的联系人手机号",
        trigger: "blur",
      },
    ],
  },
  {
    label: "联系人邮箱",
    type: "input",
    prop: "contractEmail",
    placeholder: "请输入企业联系人邮箱",
    width: "510px",
    rules: [
      { required: true, message: "请输入企业联系人邮箱", trigger: "blur" },
    ],
  },
  {
    label: "所属行业",
    type: "input",
    prop: "industry",
    placeholder: "请输入所属行业,如服装产业等",
    width: "510px",
    rules: [{ required: true, message: "请输入所属行业", trigger: "blur" }],
  },
  {
    label: "企业注册地区",
    type: "select",
    prop: "region",
    width: "510px",
    rules: [
      { required: true, message: "请选择企业注册地区", trigger: "change" },
    ],
    options: [{ label: "中国", value: "CN" }],
    placeholder: "请选择企业注册地区",
  },

  {
    label: "企业股权架构图",
    slot: "structureImage",
    prop: "structureImage",
    width: "510px",
    rules: [
      { required: true, message: "请上传企业股权架构照片", trigger: "change" },
    ],
  },
  {
    label: "前台照",
    slot: "receptionImage",
    prop: "receptionImage",
    width: "510px",
    rules: [{ required: true, message: "请上传前台照片", trigger: "change" }],
  },
  {
    label: "办公环境照",
    slot: "officeEnvImage",
    prop: "officeEnvImage",
    width: "510px",
    rules: [
      { required: true, message: "请上传办公环境照片", trigger: "change" },
    ],
  },
  {
    label: "仓库照",
    slot: "storehouseImage",
    prop: "storehouseImage",
    width: "510px",
    rules: [{ required: true, message: "请上传仓库照片", trigger: "change" }],
  },
];

//法人信息
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
    label: "董事身份证照或其他有效证件",
    slot: "legalInfoImageUrl",
    prop: "legalInfoImageUrl",
    width: "100%",
    rules: [{ required: true, validator: validateImageUrl, trigger: "change" }],
  },
  {
    label: "法人姓名",
    type: "input",
    prop: "name",
    width: "510px",
    placeholder: "请输入企业法人姓名",
    rules: [{ required: true, message: "请输入法人姓名", trigger: "change" }],
  },
  {
    label: "法人手机号",
    type: "input",
    prop: "mobile",
    width: "510px",
    placeholder: "请输入企业法人手机号",
    maxlength: 11,
    rules: [
      { required: true, message: "请输入法人手机号", trigger: "blur" },
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
    width: "510px",
    placeholder: "请输入企业证件号码",
    rules: [{ required: true, message: "请输入证件号码", trigger: "change" }],
  },
  {
    label: "持股比例",
    type: "input",
    prop: "shares",
    width: "510px",
    placeholder: "请输入企业法人持股比例，若未持股则填写0",
    append: "%",
    rules: [{ required: true, validator: validateShares, trigger: "blur" }],
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

//结算信息-对公结算
export const settleInfoFormItems2 = [
  {
    label: "结算方式",
    slot: "settleType",
    prop: "settleType",
    width: "100%",
    rules: [{ required: true, message: "请选择结算方式", trigger: "change" }],
  },
  {
    label: "开户许可证",
    slot: "cardImage",
    prop: "cardImage",
    width: "100%",
    rules: [
      { required: true, message: "请上传开户许可证照片", trigger: "change" },
    ],
  },
  {
    label: "户名",
    type: "input",
    prop: "cardholder",
    placeholder: "请输入户名",
    width: "510px",
    disabled: "disablede",
    rules: [{ required: false, message: "请输入户名", trigger: "blur" }],
  },
  {
    label: "结算账号",
    type: "input",
    prop: "accountNo",
    placeholder: "请输入结算账号",
    width: "510px",
    rules: [{ required: true, message: "请输入结算账号", trigger: "blur" }],
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
    width: "510px",
    rules: [
      { required: true, message: "请输入开户行网点名称", trigger: "blur" },
    ],
  },
  {
    label: "银行预留联系方式",
    type: "input",
    prop: "accountMobile",
    placeholder: "请输入开户时预留的手机/座机号码",
    width: "510px",
    rules: [
      {
        required: true,
        message: "请输入开户时预留的手机/座机号码",
        trigger: "blur",
      },
      // {
      //   pattern:/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
      //   message: "请输入正确的手机号",
      //   trigger: "blur",
      // }
    ],
  },
];
//结算信息-对私结算
export const settleInfoFormItems1 = [
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
    placeholder: "请输入企业法人姓名信息",
    width: "510px",
    disabled: "disabled",
    rules: [
      { required: false, message: "请输入企业法人姓名信息", trigger: "blur" },
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
    width: "510px",
    rules: [
      { required: true, message: "请输入开户行网点名称", trigger: "blur" },
    ],
  },
  {
    label: "银行预留联系方式",
    type: "input",
    prop: "accountMobile",
    placeholder: "请输入企业法人手机号信息",
    maxlength: 11,
    width: "510px",
    rules: [
      {
        required: true,
        message: "请输入企业法人手机号信息",
        trigger: "change",
      },
      {
        pattern:
          /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
        message: "请输入正确的银行预留手机号",
        trigger: "change",
      },
    ],
  },
];

//企业股东信息
export const shareholderInfosFormItems = [
  {
    label: "与企业的关系",
    type: "select",
    prop: "type",
    width: "1040px",
    rules: [{ message: "请选择与企业的关系", trigger: "change" }],
    options: [
      { label: "股东", value: "04" },
      { label: "实际控制人", value: "02" },
    ],
    labelWidth: "100px",
    placeholder: "请选择与企业的关系",
  },
  {
    label: "身份证照或其他有效证件",
    slot: "idCardImageUrl",
    prop: "idCardImageUrl",
    labelWidth: "100px",
    width: "100%",
    rules: [{ required: true, validator: validateImageUrl, trigger: "change" }],
  },
  {
    label: "姓名",
    labelWidth: "100px",
    type: "input",
    prop: "name",
    width: "510px",
    placeholder: "请输入该股东/实控人的姓名",
    rules: [
      {
        required: true,
        message: "请输入该股东/实控人的姓名",
        trigger: "change",
      },
    ],
  },
  {
    label: "手机号码",
    type: "input",
    prop: "mobile",
    width: "510px",
    labelWidth: "90px",
    maxlength: 11,
    placeholder: "请输入该股东/实控人的手机号码",
    rules: [
      {
        required: true,
        message: "请输入该股东/实控人的手机号码",
        trigger: "blur",
      },
      {
        pattern:
          /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
        message: "请输入正确的手机号",
        trigger: "blur",
      },
    ],
  },
  {
    label: "证件类型",
    type: "select",
    prop: "idType",
    labelWidth: "100px",
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
    label: "证件号码",
    type: "input",
    prop: "idCardNo",
    labelWidth: "90px",
    width: "510px",
    placeholder: "请输入该股东/实控人的证件号码",
    rules: [
      {
        required: true,
        message: "请输入该股东/实控人的证件号码",
        trigger: "change",
      },
    ],
  },
  {
    label: "国籍",
    type: "select",
    labelWidth: "100px",
    prop: "region",
    width: "510px",
    rules: [{ required: true, message: "请选择国籍", trigger: "change" }],
    options: [{ label: "中国", value: "CN" }],
    placeholder: "请选择国籍",
  },
  {
    label: "持股比例",
    type: "input",
    prop: "shares",
    labelWidth: "90px",
    width: "510px",
    placeholder: "请输入该股东/实控人的持股比例",
    append: "%",
    rules: [{ required: true, validator: validateShares, trigger: "blur" }],
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
    placeholder: "请输入店铺账号",
    labelWidth: "90px",
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
    width: "510px",
    labelWidth: "90px",
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
