export const formSearchItems = [
    {type: 'daterange', label: '变动发生时间', prop: 'startChangeTime',format:'YYYY-MM-DD',valueFormat:'YYYY-MM-DD HH:mm:ss'},
    {type: 'select', label: '账户类型', prop: 'currency',
        options: [
            {label: '全部',value:''},
            {label: '人民币账户',value:'CNY'},
            {label: '美元账户',value:'USD'},
        ],
        placeholder: ''
    },
    {type: 'select', label: '业务类型', prop: 'businessType',
        options: [
            {label: '全部',value:''},
            {label: '收款',value:1},
            {label: '付款',value:2},
            {label: '提现',value:3},
            {label: '换汇',value:4},
            {label: '账户服务',value:5},
        ],
        placeholder: ''
    },
    {type: 'select', label: '状态', prop: 'state',
        options: [
            {label: '全部',value:''},
            {label: '处理中',value:1},
            {label: '成功',value:2},
            {label: '失败',value:3},
        ],
        placeholder: ''
    },
    {type: 'input', label: '收款来源账户', prop: 'receiveSourceAccountNo', placeholder: '请输入收款来源账户'},
    {type: 'select', label: '资金流向', prop: 'accountFlow',
        options: [
            {label: '全部',value:''},
            {label: '入账',value:1},
            {label: '出账',value:-1},
        ],
        placeholder: ''
    },
    {slot:"search"},
]

export const columns = [
    {label: '变动发生时间',prop: 'createTime', width:'140px'},
    {label: '账户类型',prop: 'currency', width:'80px'},
    {label: '业务类型',prop: 'businessType', width:'80px'},
    {label: '本次交易金额',prop: 'changeAmount', width:'100px'},
    {label: '资金流向',prop:"accountFlow", width:'80px'},
    {label: '交易后账户总余额',prop: 'closingBalance', width:'140px'},
    {label: '状态',slot: 'state', width:'60px'},
    {label: '收款来源账户',prop: 'receiveSourceAccountNo', width:'120px'},
    {label: '交易订单号',prop: 'payNo', width:'100px'},
    // {label: '操作', slot:'operation'},
]

export enum Currency {
    USD = '美元',
    CNY = '人民币',
    EUR = '欧元',
}
const validateBankAddress = (rule: any, value: any, callback: any) => {
    if (value !== 4) {
      callback(new Error("请选择开户行所在地"));
    } else {
      callback();
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
export const addAccountform1 = [
    {
      label: "收款类型",
      slot: "receiveUse",
      prop: "receiveUse",
      width: "100%",
    //   rules: [
    //     { required: true, message: "请选择收款类型", trigger: "change" },
    //   ],
    },
    {
      label: "收款账户所属银行",
      slot: "bankId",
      prop: "bankId",
      width: "100%",
      options: [{ label: "", value: "" }],
      placeholder: "请选择收款账户所属银行",
    //   rules: [{ required: true, message: "请选择收款账户所属银行", trigger: "change" }],
    },
  
    {
      label: "提现账户",
      slot:"settleAccount",
      prop: "settleAccount",
      width: "100%",
      options: [{ label: "", value: "" }],
    //   rules: [{ required: true, message: "请选择开户银行", trigger: "blur" }],
    },
    {
      type: "textarea",
      label: "收款场景说明",
      prop: "receiveDescription",
      width: "100%",
      placeholder: "请说明为何需要使用多个收款账户进行收款，该账户申请用于哪些类目商品的收款;详细的说明有助于快速通过开户申请",
      rules: [{ required: true, message: "请填写收款场景说明", trigger: "blur" }], 
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
  ];
  export const addAccountforms1 = [
    {
      label: "收款类型",
      slot: "receiveUse",
      prop: "receiveUse",
      width: "100%",
    //   rules: [
    //     { required: true, message: "请选择收款类型", trigger: "change" },
    //   ],
    },
    {
      label: "收款账户所属银行",
      slot: "bankId",
      prop: "bankId",
      width: "100%",
      options: [{ label: "", value: "" }],
      placeholder: "请选择收款账户所属银行",
    //   rules: [{ required: true, message: "请选择收款账户所属银行", trigger: "change" }],
    },
  
    {
      label: "提现账户",
      slot:"settleAccount",
      prop: "settleAccount",
      width: "100%",
      options: [{ label: "", value: "" }],
    //   rules: [{ required: true, message: "请选择开户银行", trigger: "blur" }],
    },
    {
      type: "textarea",
      label: "收款场景说明",
      prop: "receiveDescription",
      width: "100%",
      placeholder: "请说明为何需要使用多个收款账户进行收款，该账户申请用于哪些类目商品的收款;详细的说明有助于快速通过开户申请",
      rules: [{ required: true, message: "请填写收款场景说明", trigger: "blur" }], 
    },
  ];
  export const fixAccountform1 = [
    
    // {
    //   type:"input",
    //   label: "审核不通过原因",
    //   prop: "checkMessage",
    //   width: "100%",
    //   placeholder: "审核不通过原因",
    //   disabled:"disabled"
    // },
    {
      label: "收款账户所属银行",
      slot: "bankId",
      prop: "bankId",
      width: "100%",
      options: [{ label: "", value: "" }],
      placeholder: "请选择收款账户所属银行",
    //   rules: [{ required: true, message: "请选择收款账户所属银行", trigger: "change" }],
    },
  
    {
      label: "提现账户",
      slot:"settleAccount",
      prop: "settleAccount",
      width: "100%",
      options: [{ label: "", value: "" }],
    //   rules: [{ required: true, message: "请选择开户银行", trigger: "blur" }],
    },
    {
      type: "textarea",
      label: "收款场景说明",
      prop: "receiveDescription",
      width: "100%",
      placeholder: "请说明为何需要使用多个收款账户进行收款，该账户申请用于哪些类目商品的收款;详细的说明有助于快速通过开户申请",
      rules: [{ required: true, message: "请填写收款场景说明", trigger: "blur" }], 
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
  ];
  export const fixAccountforms1 = [
    // {
    //   type:"input",
    //   label: "审核不通过原因",

    //   prop: "checkMessage",
    //   width: "100%",
    //   placeholder: "审核不通过原因",
    //   disabled:"disabled"
    // },
    {
      label: "收款账户所属银行",
      slot: "bankId",
      prop: "bankId",
      width: "100%",
      options: [{ label: "", value: "" }],
      placeholder: "请选择收款账户所属银行",
    //   rules: [{ required: true, message: "请选择收款账户所属银行", trigger: "change" }],
    },
  
    {
      label: "提现账户",
      slot:"settleAccount",
      prop: "settleAccount",
      width: "100%",
      options: [{ label: "", value: "" }],
    //   rules: [{ required: true, message: "请选择开户银行", trigger: "blur" }],
    },
    {
      type: "textarea",
      label: "收款场景说明",
      prop: "receiveDescription",
      width: "100%",
      placeholder: "请说明为何需要使用多个收款账户进行收款，该账户申请用于哪些类目商品的收款;详细的说明有助于快速通过开户申请",
      rules: [{ required: true, message: "请填写收款场景说明", trigger: "blur" }], 
    },
  ];
  export const addAccountform2 = [
    {
      type: "select",
      label: "店铺类型",
      prop: "shopType",
      width: "100%",
      options: [
        { label: "亚马逊店铺", value: 1 },
        { label: "ebay店铺", value: 2 },
        { label: "Tiktok", value: 3 }],
      placeholder: "请选择店铺类型",
      rules: [{ required: true, message: "请选择店铺类型", trigger: "change" }],
    },
    {
      type: "input",
      label: "店铺账户名称",
      prop: "shopAccountName",
      width: "100%",
      placeholder: "请选择店铺账户名称",
      rules: [{ required: true, message: "请选择店铺账户名称", trigger: "blur" }], 
    },
    {
      label: "店铺经营类别",
      slot: "shopCategoryType",
      prop: "shopCategoryType",
      width: "100%",
      rules: [
        { required: true, validator: validateCategoryType, trigger: "change" },
      ],
    }, 
    {
      type: "input",
      label: "店铺ID",
      prop: "shopId",
      width: "100%",
      placeholder: "请输入店铺ID",
      rules: [{ required: true, message: "请输入店铺ID", trigger: "blur" }], 
    },
    {
      type: "input",
      label: "店铺网址",
      prop: "shopWebUrl",
      width: "100%",
      placeholder: "请输入店铺网址",
      rules: [{ required: true, message: "请输入店铺网址", trigger: "blur" }], 
    },
    {
      type: "input",
      label: "店铺名称",
      prop: "shopName",
      width: "100%",
      placeholder: "请输入店铺名称",
      rules: [{ required: true, message: "请输入店铺名称", trigger: "blur" }], 
    },
    {
      label: "店铺所在地区",
      prop: "shopRegion",
      slot: "shopRegion",
      width: "100%",
      placeholder: "请输入店铺所在地区",
      rules: [{ required: true, message: "请输入店铺所在地区", trigger: "blur" }],
    },
    
  ];
  export const addAccountforms2 = [
    {
      type: "select",
      label: "店铺类型",
      prop: "shopType",
      width: "100%",
      options: [
        { label: "亚马逊店铺", value: "1" },
        { label: "ebay店铺", value: "2" },
        { label: "Tiktok", value: "3" }],
      placeholder: "请选择店铺类型",
      rules: [{ required: true, message: "请选择店铺类型", trigger: "change" }],
      disabled: "disabled",
    },
    {
      type: "input",
      label: "店铺账户名称",
      prop: "shopAccountName",
      width: "100%",
      placeholder: "请选择店铺账户名称",
      rules: [{ required: true, message: "请选择店铺账户名称", trigger: "blur" }],
      disabled: "disabled",
    },
    {
      label: "店铺经营类别",
      slot: "shopCategoryType",
      prop: "shopCategoryType",
      width: "100%",
      rules: [
        { required: true, validator: validateCategoryType, trigger: "change" },
      ],
      disabled: "disabled",
    }, 
    {
      type: "input",
      label: "店铺ID",
      prop: "shopId",
      width: "100%",
      placeholder: "请输入店铺ID",
      rules: [{ required: true, message: "请输入店铺ID", trigger: "blur" }], 
      disabled: "disabled",
    },
    {
      type: "input",
      label: "店铺网址",
      prop: "shopWebUrl",
      width: "100%",
      placeholder: "请输入店铺网址",
      rules: [{ required: true, message: "请输入店铺网址", trigger: "blur" }], 
      disabled: "disabled",
    },
    {
      type: "input",
      label: "店铺名称",
      prop: "shopName",
      width: "100%",
      placeholder: "请输入店铺名称",
      rules: [{ required: true, message: "请输入店铺名称", trigger: "blur" }], 
      disabled: "disabled",
    },
    {
      label: "店铺所在地区",
      prop: "shopRegion",
      slot: "shopRegion",
      width: "100%",
      placeholder: "请输入店铺所在地区",
      disabled: "disabled",
      rules: [{ required: true, message: "请输入店铺所在地区", trigger: "blur" }],
    },
    
  ];
  export const fixAccountform2 = [
    {
      type: "select",
      label: "店铺类型",
      prop: "shopType",
      width: "100%",
      options: [
        { label: "亚马逊店铺", value: 1 },
        { label: "ebay店铺", value: 2 },
        { label: "Tiktok", value: 3 }],
      placeholder: "请选择店铺类型",
      rules: [{ required: true, message: "请选择店铺类型", trigger: "change" }],
    },
    {
      type: "input",
      label: "店铺账户名称",
      prop: "shopAccountName",
      width: "100%",
      placeholder: "请选择店铺账户名称",
      rules: [{ required: true, message: "请选择店铺账户名称", trigger: "blur" }], 
    },
    {
      label: "店铺经营类别",
      slot: "shopCategoryType",
      prop: "shopCategoryType",
      width: "100%",
      rules: [
        { required: true, validator: validateCategoryType, trigger: "change" },
      ],
    }, 
    {
      type: "input",
      label: "店铺ID",
      prop: "shopId",
      width: "100%",
      placeholder: "请输入店铺ID",
      rules: [{ required: true, message: "请输入店铺ID", trigger: "blur" }], 
    },
    {
      type: "input",
      label: "店铺网址",
      prop: "shopWebUrl",
      width: "100%",
      placeholder: "请输入店铺网址",
      rules: [{ required: true, message: "请输入店铺网址", trigger: "blur" }], 
    },
    {
      type: "input",
      label: "店铺名称",
      prop: "shopName",
      width: "100%",
      placeholder: "请输入店铺名称",
      rules: [{ required: true, message: "请输入店铺名称", trigger: "blur" }], 
    },
    {
      label: "店铺所在地区",
      prop: "shopRegion",
      slot: "shopRegion",
      width: "100%",
      placeholder: "请输入店铺所在地区",
      rules: [{ required: true, message: "请输入店铺所在地区", trigger: "blur" }],
    },
    
  ];
  export const fixAccountforms3NotEdit = [
    {
      type: "select",
      label: "店铺类型",
      prop: "shopType",
      width: "100%",
      options: [
        { label: "亚马逊店铺", value: 1 },
        { label: "ebay店铺", value: 2 },
        { label: "Tiktok", value: 3 }],
      placeholder: "请选择店铺类型",
      disabled:"disabled",
      rules: [{ required: true, message: "请选择店铺类型", trigger: "change" }],
    },
    {
      type: "input",
      label: "店铺账户名称",
      prop: "shopAccountName",
      width: "100%",
      placeholder: "请选择店铺账户名称",
      disabled:"disabled",
      rules: [{ required: true, message: "请选择店铺账户名称", trigger: "blur" }], 
    },
    {
      label: "店铺经营类别",
      slot: "shopCategoryType",
      prop: "shopCategoryType",
      width: "100%",
      disabled:"disabled",
      rules: [
        { required: true, validator: validateCategoryType, trigger: "change" },
      ],
    }, 
    {
      type: "input",
      label: "店铺ID",
      prop: "shopId",
      width: "100%",
      placeholder: "请输入店铺ID",
      disabled:"disabled",
      rules: [{ required: true, message: "请输入店铺ID", trigger: "blur" }], 
    },
    {
      type: "input",
      label: "店铺网址",
      prop: "shopWebUrl",
      width: "100%",
      placeholder: "请输入店铺网址",
      disabled:"disabled",
      rules: [{ required: true, message: "请输入店铺网址", trigger: "blur" }], 
    },
    {
      type: "input",
      label: "店铺名称",
      prop: "shopName",
      width: "100%",
      disabled:"disabled",
      placeholder: "请输入店铺名称",
      rules: [{ required: true, message: "请输入店铺名称", trigger: "blur" }], 
    },
    {
      label: "店铺所在地区",
      prop: "shopRegion",
      slot: "shopRegion",
      width: "100%",
      disabled:"disabled",
      placeholder: "请输入店铺所在地区",
      rules: [{ required: true, message: "请输入店铺所在地区", trigger: "blur" }],
    },
    
  ];
  export const fetchForm = [
    {
      type: "input",
      label: "提现方式",
      prop: "types",
      width: "90%",
      placeholder: "请输入提现方式",
      disabled: "disabled",
    },
    {
      label: "资产账户",
      slot: "wallet",
      prop: "wallet",
      width: "90%",
      rules: [{ required: true, message: "请选择资产账户", trigger: "blur" }],
    },
    {
      label: "到账账户",
      slot: "receiveAccount",
      prop: "receiveAccount",
      width: "90%",
      rules: [{ required: true, message: "请选择到账账户", trigger: "blur" }],
    },
    {
      type: "input",
      label: "提现金额",
      isImplement: true,
      prop: "withdrawAmount",
      width: "90%",
      placeholder: "请输入提现金额",
      rules: [{ required: true, message: "请输入提现金额", trigger: "blur" }],
    },
    {
      label: "短信验证码",
      slot: "verificationCode",
      prop: "verificationCode",
      width: "90%",
      placeholder: "请输入短信验证码",
      rules: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
    },
  ];