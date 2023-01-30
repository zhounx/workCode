export const formSearchItems = [
  { type: 'daterange', label: '申请时间', prop: 'applyTime',format:'YYYY-MM-DD',valueFormat:'YYYY-MM-DD HH:mm:ss'},
  {
    type: 'select', label: '卖出币种', prop: 'fromCurrency',
    options: [
      { label: '全部', value: '' },
      { label: 'CNY(人民币)', value: 'CNY' },
      { label: 'USD(美元)', value: 'USD' },
    ],
    placeholder: ''
  },
  {
    type: 'select', label: '买入币种', prop: 'toCurrency',
    options: [
      { label: '全部', value: '' },
      { label: 'CNY(人民币)', value: 'CNY' },
      { label: 'USD(美元)', value: 'USD' },
    ],
    placeholder: ''
  },
  { type: 'input', label: '换汇订单号', prop: 'exchangeOrderNo', placeholder: '请输入换汇订单号' },
  {
    type: 'select', label: '换汇状态', prop: 'exchangeStatus',
    options: [
      { label: '全部', value: '' },
      { label: '换汇处理中', value: '1' },
      { label: '换汇成功', value: '2' },
      { label: '换汇失败', value: '3' },
    ],
    placeholder: ''
  },

  { slot: "search" },
]

export const columns = [
  { label: '申请时间', slot: 'createTime', width: '160px' },
  { label: '换汇订单号', prop: 'referenceNo', width: '100px' },
  { label: '卖出金额', prop: 'amount', width: '80px' },
  { label: '卖出币种', prop: 'fromCurrency', width: '80px' },
  { label: '买入金额', prop: 'accountAmount', width: '100px' },
  { label: '买入币种', prop: 'toCurrency', width: '90px' },
  { label: '汇率', prop: 'exchangeRate', width: '80px' },
  { label: '换汇状态', slot: 'exchangeStatus', width: '100px' },
]

export enum Currency {
  USD = '美元',
  CNY = '人民币',
  EUR = '欧元',
}
