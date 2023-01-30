<template>
    <div class="dialog-page">
    <el-dialog v-model="dialogVisible" width="50%" :before-close="closeDialog" :show-close="false" destroy-on-close custom-class="related-dialog">
        <div class="dialog-content">
          <h3>关联订单<span>(通过审核的订单才可关联)</span></h3>
          <div v-if="relatedInfo?.comment" class="disagree">
            <img src="@/assets/images/warn-icon.png" alt="" />
            <p>审核不通过原因:{{ relatedInfo?.comment }}</p>
          </div>
          <p class="amount">
            本次收款金额为<span>{{ relatedInfo?.accountAmount}}{{ Currency[relatedInfo?.depositsCurrency] }}</span>，已关联订单的金额为<span>{{ relatedInfo.usableAmount}}{{ Currency[relatedInfo.depositsCurrency] }}</span>
          </p>
          <yk-table
            size="small"
            ref="relatedTableRef"
            :columns="relatedColumns"
            :tableData="relatedData"
            @size-change="sizeChange"
            @current-change="currentChange"
            :pageSize="pageSize"
            :total="relatedTotal"
            :currentPage="currentPage"
            :layout="'prev, pager, next'"
            @selection-change="handleSelectionChange"
            :rowKey="'orderId'"
          >
            <template v-slot:goodsName>
              <el-table-column label="商品名称" width="120px" align="center">
                <template #default="scope">
                  <span>{{scope.row.goodsList&&scope.row.goodsList.map((goods:any)=>{return goods.goodsName}).join(", ")}}</span>
                </template>
              </el-table-column>
            </template>
            <template v-slot:thisAmount>
              <el-table-column label="本次关联金额" width="150px" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.thisAmount" placeholder="请输入" size="small">
                    <template #append>{{ scope.row.currency }}</template>
                  </el-input>
                </template>
              </el-table-column>
            </template>
          </yk-table>
          <p class="remark">
            在上方勾选要关联的订单，点击下方关联按钮即完成收款与订单的关联
          </p>
        </div>
        <template #footer>
          <el-button type="primary" plain @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="associateOrder()">关联</el-button>
        </template>
    </el-dialog>
</div>
</template>
<script lang="ts" setup>
import { watch, ref } from "vue";
import { request } from "@/service/http";
import {CaretRight} from '@element-plus/icons-vue'
import YkForm from "@/components/yk-form.vue";
import YkTable from "@/components/yk-table.vue";
import {relatedColumns,OrderType,Currency} from "../data";
const props = defineProps({
    orderId:{
        type: Number,
        default: 0,
    }
})
const dialogVisible = ref<boolean>(false);
const relatedData = ref([]);
let relatedTotal = ref<number>(0);
let currentPage = ref<number>(1);
let pageSize = ref<number>(10);
let relatedInfo = ref({})
function closeDialog(){
    emits("close");
}
const emits = defineEmits([
  "close",'freshen'
]);
watch(props, (newVal, oldVal) => {
   if(newVal.orderId){
    associateOrderView()
    dialogVisible.value=true
   }else{
    dialogVisible.value=false
   }
});
// 关联订单列表
async function associateOrderView() {
    let { data }: any = await request("POST","/abroad-merchant/front/accountDeposit/associateOrderView",{
        id:props.orderId,
        pageSize: pageSize.value,
        pageNumber: currentPage.value,
    });
    let {orderInfos:{records,total},...obj} = data;
    relatedInfo.value = obj;
    relatedTotal.value = total;
    relatedData.value = records;
    relatedData.value.forEach((o: any) => {
        o.thisAmount = o.availableAmount + "";
    });
}
const sizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  associateOrderView();
};
const currentChange = (page: number) => {
  currentPage.value = page;
  associateOrderView();
};
// 关联订单
async function associateOrder() {
  const orderList = selectOrder.value.map((o: OrderType) => {
    return {
      amount: o.thisAmount,
      orderId: o.orderId,
    };
  });
  let { code }: any = await request("POST","/abroad-merchant/front/accountDeposit/associateOrder",{
      id: props.orderId,
      orderList,
    }
  );
  if (code == 200) {
    closeDialog();
    emits("freshen"); 
  }
}
const selectOrder = ref<OrderType[]>([]);
const handleSelectionChange = (val: OrderType[]) => {
  selectOrder.value = val;
};
</script>

<style lang="scss" scoped>
.dialog-page{
    &::v-deep(.el-dialog) {
      border-radius: 20px;
    }
    &::v-deep(.el-dialog__body){
        padding:10px 40px 20px;
    }
    &::v-deep(.el-dialog__footer){
        text-align: center;
        padding-bottom:40px;
        .el-button {
          width: 168px;
          height: 58px;
          font-size: 18px;
          font-weight: bold;
        }
      }
    .dialog-content{
        width: 100%;position: relative;
        h3{
            font-size: 22px;color: #25343C;margin-bottom: 15px;
            span{
                font-size: 14px;
                font-weight: 400;
                color: #EF8479;
            }
        }
        .disagree {
            width: 100%;
            height: 50px;background: #FFE0DA;border-radius: 12px;
            padding: 0 30px;box-sizing: border-box;
            display: flex;
            align-items: center;
            img {
                width: 16px;height: 16px;
            }
            p {
                color: #F13729;
                font-size: 14px;
                margin-left: 5px;
            }
        }
        .amount{
            font-size: 16px;font-weight: 400;color: #6A767D;
            padding: 20px 0;
            span{
                color: rgba(25, 94, 255, 1);font-weight: bold;
            }
        }
        .remark{
            font-size: 14px;
            font-weight: 400;
            color: #A7B4BD;
            position: absolute;
            bottom: 8px;
        }
    }
}

</style>