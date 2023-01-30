export const abroadSearchItems = [
    {type: 'daterange',label: '收款时间', prop: 'depositsStartTime',format:'YYYY-MM-DD',valueFormat:'YYYY-MM-DD HH:mm:ss'},
    {type: 'input',label: '付款方', prop: 'payerName', placeholder: '请输入付款方名称'},
    {type: 'select', label: '收款状态', prop: 'status',
        options: [
            {label: '全部',value:""},
            {label: '已入账',value:1},
            {label: '待入账',value:2},
        ],
        placeholder: ''
    },
    {type: 'input', label: '关联的订单编号', prop: 'associateOrderNo', placeholder: '请输入关联订单编号'},
    {type: 'select', label: '关联审核状态', prop: 'associateOrderStatus',
        options: [
            {label: '全部',value:""},
            {label: '待关联',value:0},
            {label: '审核中',value:1},
            {label: '审核通过',value:2},
            {label: '审核不通过',value:3},
        ],
        placeholder: ''
    },
    {slot:"search"},
]
export const abroadColumns = [
    {label: '收款时间',prop: 'createTime', width:'120px',formatter:(a:any,b:any,cellValue:any)=>{return cellValue.replace('T',' ')}},
    {label: '付款方',prop: 'payerName', width:'80px'},
    {label: '收款金额',prop: 'amount', width:'80px',formatter:(a:any,b:any,c:any)=>{return `${c} ${a.currency}`}},
    {label: '已关联金额',prop: 'usableAmount', width:'100px',formatter:(a:any,b:any,c:any)=>{return `${c} ${a.currency}`}},
    {label: '实际入账金额',prop: 'accountAmount', width:'120px',formatter:(a:any,b:any,c:any)=>{return `${c} ${a.currency}`}},
    {label: '银行手续费',slot: 'serviceFee', width:'80px',formatter:(a:any,b:any,c:any)=>{return `${c} ${a.currency}`}},
    {label: '收款类型',prop: 'trxType', width:'80px'},
    {label: '收款状态',slot: 'status', width:'80px'},
    {label: '收款账号',prop: 'payeeBankAccountNo', width:'120px'},
    {label: '收款银行',prop: 'payeeBankName', width:'120px'},
    {label: '关联的订单编号',prop: 'associateOrders', width:'120px'},
    {label: '关联审核状态',prop: 'associateStatus', width:'80px'},
    {label: '操作', slot:'operation', width:'80px'},
]

export const orderSearchItems = [
    {type: 'daterange', label: '订单创建时间', prop: 'dateRange',valueFormat:'YYYY-MM-DD'},
    {type: 'input', label: '订单编号', prop: 'customOrderId', placeholder: '请输入订单编号'},
    {type: 'input', label: '出境物流单号', prop: 'logisticsOrderNo', placeholder: '请输入出境物流单号'},
    {type: 'select', label: '订单审核状态', prop: 'status',
        options: [
            {label: '全部',value:''},
            {label: '审核中',value:'WAIT'},
            {label: '审核通过',value:'SUCCESS'},
            {label: '审核不通过',value:'FAIL'}
        ],
        placeholder: '请选择订单审核状态'
    },
    {slot:"search"},
]
export const orderColumns = [
    {label: '订单编号',prop: 'customOrderId', width:'80px'},
    {label: '订单类型',prop: 'orderType', width:'80px'},
    {label: '店铺类型',slot: 'shopType', width:'40px'},
    {label: '商品名称',slot: 'goodsName', width:'80px'},
    {label: '商品总价',slot: 'amount', width:'80px'},
    {label: '订单金额',prop: 'orderAmount', width:'80px',formatter:(a:any,b:any,c:any)=>{return `${c} ${a.currency}`}},
    {label: '可关联金额',prop: 'availableAmount', width:'80px',formatter:(a:any,b:any,c:any)=>{return `${c} ${a.currency}`}},
    {label: '出境物流单号',slot: 'logisticsOrderNo', width:'120px'},
    {label: '物流方式',slot: 'logisticsMode', width:'120px'},
    {label: '物流承运商',slot: 'logisticsCompany', width:'120px'},
    {label: '订单审核状态',slot: 'status', width:'120px'},
    {label: '关联付款方',slot: 'payerName', width:'80px'},
    {label: '订单创建时间',prop: 'createTime', width:'100px'},
    {label: '操作', slot:'operation', width:'80px'},
]