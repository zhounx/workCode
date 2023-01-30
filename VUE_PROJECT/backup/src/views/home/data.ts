export const abroadColumns = [
  { label: "收款单号", prop: "hkpuDepositId", width: "100px" },
  { label: "收款时间", prop: "createTime", width: "100px" },
  { label: "付款人", prop: "payerName", width: "100px" },
  { label: "金额", prop: "amount", width: "80px" },
  { label: "币种", prop: "currency", width: "80px" },
  { label: "收款账户", prop: "payeeBankAccountNo", width: "80px" },
  {label: '操作', slot:'operation', width:'100px'}
]
export const relatedColumns = [
  {prop:'selection'},
  {label: '订单编号',prop: 'customOrderId', width:'80px'},
  {label: '订单类型',prop: 'orderType', width:'80px'},
  {label: '商品名称',slot: 'goodsName'},
  {label: '订单金额',prop: 'amount', width:'60px',formatter:(a:any,b:any,c:any)=>{return `${c} ${a.currency}`}},
  {label: '可关联金额',prop: 'availableAmount', width:'60px',formatter:(a:any,b:any,c:any)=>{return `${c} ${a.currency}`}},
  {label: '本次关联金额',slot: 'thisAmount'},
]
export interface OrderType {
    customOrderId: string,
    orderId: string,
    orderType: string,
    amount:0,
    availableAmount:0,
    thisAmount:0
}
export enum Currency {
  USD = '美元',
  CNY = '人民币',
  EUR = '欧元',
}