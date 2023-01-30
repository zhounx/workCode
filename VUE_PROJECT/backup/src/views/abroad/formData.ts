import { useEnumStore } from "@/store/enum";
const ENUM = useEnumStore();

const validateAmount = (rule: any, value: any, callback: any) => {
  let v = Number(value);
  if (!isNaN(v) && v > 0) {
    callback();
  } else {
    callback(new Error("请输入正确的订单总额"));
  }
};

const validateNumber = (rule: any, value: any, callback: any) => {
  let v = Number(value);
  if (!isNaN(v) && v > 0) {
    if (rule.field === "number") {
      let re = /^[0-9]+$/;
      if (!re.test(value)) return callback(new Error("请输入正确的商品数量"));
    }
    return callback();
  } else {
    if (rule.field === "number") {
      return callback(new Error("请输入正确的商品数量"));
    } else {
      return callback(
        new Error(
          rule.field === "amount"
            ? "请输入正确的商品总价"
            : "请输入正确的商品单价"
        )
      );
    }
  }
};

//占位用
const emptyInnput = {
  label: "",
  prop: "empty",
  slot: "empty",
  width: "510px",
  rules: [{ required: false }],
};

//订单基本信息-外贸订单
export const orderBaseFormItems1 = [
  {
    label: "订单号",
    type: "input",
    prop: "customOrderId",
    width: "510px",
    placeholder: "输入订单号编号",
    rules: [{ required: true, message: "输入订单号编号", trigger: "blur" }],
  },
  {
    label: "订单总额",
    type: "input",
    prop: "amount",
    maxlength: 13,
    width: "510px",
    isImplement: true,
    placeholder: "请输入订单总额",
    append: "USD",
    rules: [
      { required: true, message: "请输入订单总额", trigger: "blur" },
      { validator: validateAmount, trigger: "blur" },
    ],
  },
  {
    label: "买家英文名称",
    type: "input",
    prop: "buyerName",
    width: "510px",
    placeholder: "若为企业买家则填写企业名称，个人买家则填写买家姓名",
    rules: [{ required: true, message: "请输入买家英文名称", trigger: "blur" }],
  },
  {
    label: "贸易国家",
    slot: "tradeCountry",
    prop: "tradeCountry",
    width: "510px",
    rules: [{ required: true, message: "请选择贸易国家", trigger: "change" }],
  },
  {
    label: "店铺名称",
    type: "input",
    prop: "shopName",
    width: "510px",
    placeholder: "请填写贵司外贸独立站或平台店铺的店铺名称",
    rules: [
      {
        required: true,
        message: "请填写贵司外贸独立站或平台店铺的店铺名称",
        trigger: "blur",
      },
    ],
  },
  {
    label: "店铺/商品网址",
    type: "input",
    prop: "website",
    width: "510px",
    placeholder: "请填写贵司外贸独立站或平台店铺的店铺或商品网址",
    rules: [
      {
        required: true,
        message: "请填写贵司外贸独立站或平台店铺的店铺或商品网址",
        trigger: "blur",
      },
    ],
  },
  {
    label: "订单是否需结汇:",
    type: "select",
    prop: "exchangeType",
    width: "510px",
    options: [
      { label: "是", value: 1 },
      { label: "否", value: 2 },
    ],
    placeholder: "请选择",
    rules: [
      { required: true, message: "请确定订单是否需要结汇", trigger: "change" },
    ],
  },
  {
    label: "新/老买家:",
    type: "select",
    prop: "buyerType",
    width: "510px",
    options: [
      { label: "新买家", value: 1 },
      { label: "老买家", value: 2 },
    ],
    placeholder: "请选择",
    rules: [{ required: true, message: "", trigger: "change" }],
  },
  {
    label: "贸易凭证",
    slot: "tradeDocuments",
    prop: "tradeDocuments",
    width: "100%",
    placeholder:
      "请上传交易双方、交易标的和金额清晰可见的PI（形式发票、合同）或CI（商业发票）",
    rules: [
      {
        required: true,
        message:
          "请上传交易双方、交易标的和金额清晰可见的PI（形式发票、合同）或CI（商业发票）",
        trigger: "change",
      },
    ],
  },
  {
    label: "  其他凭证",
    slot: "otherDocuments",
    prop: "otherDocuments",
    placeholder: "上传凭证",
    width: "100%",
  },
];

//电商订单
export const orderBaseFormItems2 = [
  {
    label: "订单号",
    type: "input",
    prop: "customOrderId",
    width: "510px",
    placeholder: "输入便于您管理的订单号",
    rules: [
      { required: true, message: "输入便于您管理的订单号", trigger: "blur" },
    ],
  },
  {
    label: "订单总额",
    type: "input",
    prop: "amount",
    maxlength: 13,
    isImplement: true,
    width: "510px",
    placeholder: "请输入订单总额",
    append: "USD",
    rules: [
      { required: true, message: "请输入订单总额", trigger: "blur" },
      { validator: validateAmount, trigger: "blur" },
    ],
  },
  {
    label: "支付公司",
    type: "input",
    prop: "paymentCompany",
    width: "510px",
    placeholder: "请填写支付公司全称",
    rules: [{ required: true, message: "请填写支付公司全称", trigger: "blur" }],
  },
  {
    label: "支付订单号",
    type: "input",
    prop: "paymentOrderId",
    width: "510px",
    placeholder: "请填写支付订单号",
    rules: [{ required: true, message: "请填写支付订单号", trigger: "blur" }],
  },
  {
    label: "买家英文名称",
    type: "input",
    prop: "buyerName",
    width: "510px",
    placeholder: "若为企业买家则填写企业名称，个人买家则填写买家姓名",
    rules: [{ required: true, message: "请输入买家英文名称", trigger: "blur" }],
  },
  {
    label: "贸易国家",
    slot: "tradeCountry",
    prop: "tradeCountry",
    width: "510px",
    rules: [{ required: true, message: "请选择贸易国家", trigger: "change" }],
  },
  {
    label: "店铺名称",
    type: "input",
    prop: "shopName",
    width: "510px",
    placeholder: "请填写贵司外贸独立站或平台店铺的店铺名称",
    rules: [
      {
        required: true,
        message: "请填写贵司外贸独立站或平台店铺的店铺名称",
        trigger: "blur",
      },
    ],
  },
  {
    label: "店铺/商品网址",
    type: "input",
    prop: "website",
    width: "510px",
    placeholder: "请填写贵司外贸独立站或平台店铺的店铺或商品网址",
    rules: [
      {
        required: true,
        message: "请填写贵司外贸独立站或平台店铺的店铺或商品网址",
        trigger: "blur",
      },
    ],
  },
  {
    label: "贸易凭证",
    slot: "tradeDocuments",
    prop: "tradeDocuments",
    width: "100%",
    placeholder: "上传凭证",
    rules: [
      {
        required: true,
        message:
          "请上传交易双方、交易标的和金额清晰可见的PI（形式发票、合同）或CI（商业发票）",
        trigger: "change",
      },
    ],
  },
  {
    label: "  其他凭证",
    slot: "otherDocuments",
    prop: "otherDocuments",
    placeholder: "上传凭证",
    width: "100%",
  },
];

//电商类型
export const shopTypes = ENUM.SHOP_TYPE;

//tiktok订单
export const tiktokShopItems = [
  {
    label: "订单总额",
    type: "input",
    prop: "amount",
    maxlength: 13,
    isImplement: true,
    width: "510px",
    placeholder: "请输入订单总额",
    append: "USD",
    rules: [
      { required: true, message: "请输入订单总额", trigger: "blur" },
      { validator: validateAmount, trigger: "blur" },
    ],
  },
  {
    label: "订单号",
    type: "input",
    prop: "customOrderId",
    width: "510px",
    placeholder: "输入便于您管理的订单号",
    rules: [
      { required: true, message: "输入便于您管理的订单号", trigger: "blur" },
    ],
  },
  {
    label: "TikTok交易记录",
    slot: "tiktokTransactionFileList",
    prop: "tiktokTransactionFileList",
    width: "100%",
    placeholder: "上传TikTok交易记录",
    rules: [
      {
        required: true,
        message: "请上传交易双方的TikTok交易记录",
        trigger: "change",
      },
    ],
  },
];

//商品信息
export const goodsListFormItems = [
  {
    label: "商品中文名称",
    type: "input",
    prop: "goodsName",
    width: "510px",
    placeholder: "请输入商品中文名称",
    rules: [{ required: true, message: "请输入商品中文名称", trigger: "blur" }],
  },
  {
    label: "商品英文名称",
    type: "input",
    prop: "goodsNameEn",
    width: "510px",
    placeholder: "请输入商品英文名称",
    rules: [{ required: true, message: "请输入商品英文名称", trigger: "blur" }],
  },
  {
    label: "商品数量",
    type: "input",
    prop: "number",
    isImplement: true,
    limitNumber: 0,
    width: "510px",
    maxlength: 8,
    placeholder: "请输入商品数量",
    rules: [
      { required: true, message: "请输入商品数量", trigger: "blur" },
      { validator: validateNumber, trigger: "blur" },
    ],
  },
  {
    label: "商品单位",
    slot: "unit",
    prop: "unit",
    width: "510px",
    rules: [{ required: true, message: "请选择单位", trigger: "change" }],
  },
  {
    label: "商品单价",
    type: "input",
    prop: "price",
    append: "USD",
    maxlength: 13,
    isImplement: true,
    width: "510px",
    placeholder: "请输入商品单价",
    rules: [
      { required: true, message: "请输入商品单价", trigger: "blur" },
      { validator: validateNumber, trigger: "blur" },
    ],
  },
  {
    label: "商品总价",
    type: "input",
    prop: "amount",
    append: "USD",
    maxlength: 13,
    isImplement: true,
    width: "510px",
    placeholder: "请输入商品总价",
    rules: [
      { required: true, message: "请输入商品总价", trigger: "blur" },
      { validator: validateNumber, trigger: "blur" },
    ],
  },
];

//电商商品信息
export const goodsListFormItems2 = [
  {
    label: "商品中文名称",
    type: "input",
    prop: "goodsName",
    width: "510px",
    placeholder: "请输入商品中文名称",
    rules: [{ required: true, message: "请输入商品中文名称", trigger: "blur" }],
  },
  {
    label: "商品英文名称",
    type: "input",
    prop: "goodsNameEn",
    width: "510px",
    placeholder: "请输入商品英文名称",
    rules: [
      { required: false, message: "请输入商品英文名称", trigger: "blur" },
    ],
  },
  {
    label: "商品数量",
    type: "input",
    prop: "number",
    isImplement: true,
    limitNumber: 0,
    width: "510px",
    maxlength: 8,
    placeholder: "请输入商品数量",
    rules: [
      { required: true, message: "请输入商品数量", trigger: "blur" },
      { validator: validateNumber, trigger: "blur" },
    ],
  },
  {
    label: "商品单位",
    slot: "unit",
    prop: "unit",
    width: "510px",
    rules: [{ required: true, message: "请选择单位", trigger: "change" }],
  },
  {
    label: "商品单价",
    type: "input",
    prop: "price",
    append: "USD",
    maxlength: 13,
    isImplement: true,
    width: "510px",
    placeholder: "请输入商品单价",
    rules: [
      { required: true, message: "请输入商品单价", trigger: "blur" },
      { validator: validateNumber, trigger: "blur" },
    ],
  },
  {
    label: "商品总价",
    type: "input",
    prop: "amount",
    append: "USD",
    maxlength: 13,
    isImplement: true,
    width: "510px",
    placeholder: "请输入商品总价",
    rules: [
      { required: true, message: "请输入商品总价", trigger: "blur" },
      { validator: validateNumber, trigger: "blur" },
    ],
  },
];

//未发货,新买家
export const logisticsListFormItems1 = (exchangeType: number) => {
  const required = exchangeType == 1 ? true : false;
  return [
    {
      label: "成交方式",
      prop: "transactionMethodCode",
      slot: "transactionMethodCode",
      width: "510px",
      placeholder: "请选择成交方式",
      rules: [{ required, message: "请选择成交方式", trigger: "change" }],
    },
    {
      label: "预计发货日期",
      type: "date",
      prop: "expectSendGoodsTime",
      width: "510px",
      rules: [{ required, message: "请选择日期", trigger: "change" }],
    },
    emptyInnput,
    {
      label: "货运沟通记录",
      prop: "transComFileList",
      slot: "transComFileList",
      width: "510px",
      rules: [
        {
          required,
          message: "请上传货运沟通记录",
          trigger: "change",
        },
      ],
    },
    {
      label: "下单沟通记录",
      prop: "orderComFileList",
      slot: "orderComFileList",
      width: "510px",
      rules: [
        {
          required: required,
          message: "请上传下单沟通记录",
          trigger: "change",
        },
      ],
    },
  ];
};

//未发货,老买家
export const logisticsListFormItems2 = (exchangeType: number) => {
  const required = exchangeType == 1 ? true : false;
  return [
    {
      label: "成交方式",
      prop: "transactionMethodCode",
      slot: "transactionMethodCode",
      width: "510px",
      placeholder: "请选择成交方式",
      rules: [{ required, message: "请选择成交方式", trigger: "change" }],
    },
    {
      label: "预计发货日期",
      type: "date",
      prop: "expectSendGoodsTime",
      width: "510px",
      rules: [{ required, message: "请选择日期", trigger: "change" }],
    },
    {
      label: "近期出境物流单",
      slot: "outboundLogisticsOrderFileList",
      prop: "outboundLogisticsOrderFileList",
      width: "100%",
      placeholder: "请上传近期出境物流单",
      rules: [
        {
          required,
          message: "请上传近期出境物流单",
          trigger: "change",
        },
      ],
    },
  ];
};

//已发货,老买家
export const logisticsListFormItems3 = (exchangeType: number) => {
  const required = exchangeType == 1 ? true : false;
  return [
    {
      label: "物流单号",
      type: "input",
      prop: "logisticsOrderNo",
      width: "510px",
      placeholder: "请输入物流单号",
      rules: [{ required, message: "请输入物流单号", trigger: "blur" }],
    },
    {
      label: "物流方式",
      slot: "logisticsMode",
      prop: "logisticsMode",
      width: "510px",
      rules: [{ required, message: "请选择物流方式", trigger: "change" }],
    },
    {
      label: "预计发货日期",
      type: "date",
      prop: "expectSendGoodsTime",
      width: "510px",
      rules: [{ required, message: "请选择日期", trigger: "change" }],
    },
    {
      label: "物流公司",
      type: "input",
      prop: "logisticsCompany",
      width: "510px",
      placeholder: "请输入物流公司名称",
      rules: [{ required, message: "请输入物流公司名称", trigger: "blur" }],
    },
    {
      label: "成交方式",
      prop: "transactionMethodCode",
      slot: "transactionMethodCode",
      width: "510px",
      placeholder: "请选择成交方式",
      rules: [{ required, message: "请选择成交方式", trigger: "change" }],
    },
    {
      label: "物流单附件",
      slot: "fileList",
      prop: "fileList",
      width: "510px",
      placeholder: "上传附件",
      rules: [{ required, message: "请上传物流单附件", trigger: "change" }],
    },
    {
      label: "近期出境物流单",
      slot: "outboundLogisticsOrderFileList",
      prop: "outboundLogisticsOrderFileList",
      width: "510px",
      placeholder: "请上传近期出境物流单",
      rules: [
        {
          required,
          message: "请上传近期出境物流单",
          trigger: "change",
        },
      ],
    },
  ];
};

//已发货,新买家
export const logisticsListFormItems4 = (exchangeType: number) => {
  const required = exchangeType == 1 ? true : false;
  return [
    {
      label: "物流单号",
      type: "input",
      prop: "logisticsOrderNo",
      width: "510px",
      placeholder: "请输入物流单号",
      rules: [{ required, message: "请输入物流单号", trigger: "blur" }],
    },
    {
      label: "物流方式",
      slot: "logisticsMode",
      prop: "logisticsMode",
      width: "510px",
      rules: [{ required, message: "请选择物流方式", trigger: "change" }],
    },
    {
      label: "预计发货日期",
      type: "date",
      prop: "expectSendGoodsTime",
      width: "510px",
      rules: [{ required, message: "请选择日期", trigger: "change" }],
    },
    {
      label: "物流公司",
      type: "input",
      prop: "logisticsCompany",
      width: "510px",
      placeholder: "请输入物流公司名称",
      rules: [{ required, message: "请输入物流公司名称", trigger: "blur" }],
    },
    {
      label: "成交方式",
      prop: "transactionMethodCode",
      slot: "transactionMethodCode",
      width: "510px",
      placeholder: "请选择成交方式",
      rules: [{ required, message: "请选择成交方式", trigger: "change" }],
    },
    {
      label: "物流单附件",
      slot: "fileList",
      prop: "fileList",
      width: "510px",
      placeholder: "上传附件",
      rules: [{ required, message: "请上传物流单附件", trigger: "change" }],
    },
    {
      label: "下单沟通记录",
      prop: "orderComFileList",
      slot: "orderComFileList",
      width: "510px",
      rules: [{ required, message: "请上传下单沟通记录", trigger: "change" }],
    },
    {
      label: "货运沟通记录",
      prop: "transComFileList",
      slot: "transComFileList",
      width: "510px",
      rules: [{ required, message: "请上传货运沟通记录", trigger: "change" }],
    },
  ];
};

export function logisticsListFormItems(
  buyerType: number = 1,
  status: number = 1,
  orderType?: number | null,
  exchangeType: number = 1
) {
  if (orderType === 2) {
    return shopLogisticsListFormItems;
  }
  const res: any[] = [
    {
      label: "发货状态",
      prop: "status",
      slot: "status",
      width: "510px",
      options: [
        { label: "已发货", value: 1 },
        { label: "未发货", value: 0 },
      ],
      placeholder: "请选择发货状态",
      rules: [
        {
          required: true,
          message: "请选择发货状态",
          trigger: "change",
        },
      ],
    },
  ];

  if (buyerType === 1) {
    if (status === 0) {
      res.push(...logisticsListFormItems1(exchangeType));
    } else if (status === 1) {
      res.push(...logisticsListFormItems4(exchangeType));
    }
  } else if (buyerType === 2) {
    if (status === 0) {
      res.push(...logisticsListFormItems2(exchangeType));
    } else if (status === 1) {
      res.push(...logisticsListFormItems3(exchangeType));
    }
  }

  return res;
}

const shopLogisticsListFormItems = [
  {
    label: "发货状态",
    type: "select",
    prop: "status",
    width: "510px",
    options: [
      { label: "已发货", value: 1 },
      { label: "未发货", value: 0 },
    ],
    placeholder: "",
  },
  {
    label: "物流方式",
    slot: "logisticsMode",
    prop: "logisticsMode",
    width: "510px",
    rules: [{ required: true, message: "请选择物流方式", trigger: "change" }],
  },
  {
    label: "物流单号",
    type: "input",
    prop: "logisticsOrderNo",
    width: "510px",
    placeholder: "请输入出境物流单号",
    rules: [{ required: true, message: "请输入出境物流单号", trigger: "blur" }],
  },
  {
    label: "物流公司",
    type: "input",
    prop: "logisticsCompany",
    width: "510px",
    placeholder: "请输入物流公司名称",
    rules: [{ required: true, message: "请输入物流公司名称", trigger: "blur" }],
  },
  {
    label: "物流单附件",
    slot: "fileList",
    prop: "fileList",
    width: "100%",
    placeholder: "上传附件",
    rules: [{ required: true, message: "请上传物流单附件", trigger: "change" }],
  },
];

//非结汇用外贸订单
export const orderBaseFormItems3 = (() => {
  const res = [];
  for (const item of orderBaseFormItems1) {
    const newItem: any = { ...item };
    newItem.rules = [];

    if (!!item.rules) {
      for (const rule of item.rules) {
        let newRule = { ...rule };
        if (newItem.prop != "exchangeType" && newItem.prop != "buyerType") {
          newRule.required = false;
        }
        newItem?.rules.push(newRule);
      }
    }

    res.push(newItem);
  }
  return res;
})();
