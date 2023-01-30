<template>
  <div class="page-main">
    <header>
      <h3><img src="../assets/images/logo.png" alt="" />GLOBAL PAY<span>让跨境收款更便捷！</span></h3>
      <div class="header-right">
        <!-- <div class="search" :class="searchActive ? 'search-active' : ''" @click="searchActive = true">
            <input type="text" placeholder="请输入搜索关键字" />
            <el-icon :size="18" color="#9EC1D2"><Search /></el-icon>
          </div>
          <div class="dot-bell">
            <el-badge is-dot class="item"><el-icon :size="18" color="#3DD698"><bell-filled /></el-icon></el-badge>
          </div> -->
          <el-popover :width="340" trigger="click" popper-class="popper-bg">
            <template #reference>
              <img src="../assets/images/customer.png" alt="" class="customer-avatar"/>
            </template>
            <template #default>
              <div class="customer-content">
              <div class="top">
                <img class="a-logo" src="../assets/images/home/service-blue.png" />
                <div>
                  <h3>专属客户经理</h3>
                  <label>添加客户经理微信，实时对接各项问题</label>
                </div>
              </div>
              <div class="customer-qr">
                <h4>黄经理</h4>
                <p>
                  <label>联系方式：</label>13823188562
                </p>
                <p>
                  <label>服务时间：</label>9:00~18:00
                </p>
                <img src="../assets/images/home/qr-code.png" alt="">
              </div>
            </div>
            </template>
            
          </el-popover>
        <div class="user-down">
          <el-dropdown trigger="click">
            <p class="el-dropdown-link">
              <img src="../assets/images/avatar.png" alt="" class="user-avatar" style="width:36px"/>
              {{ username || "Williamli-123" }}
            </p>
            <template #dropdown>
              <el-dropdown-menu>
                <!--<el-dropdown-item>切换登录</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>-->
                <el-dropdown-item @click="logOut">安全退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>
    <div class="page-content">
      <div class="left-content" :class="{ 'menu-collapse': isCollapse }">
        <div class="menu-list">
          <el-menu router
            :collapse="isCollapse"
            background-color="#1F2A3C"
            text-color="#B8C3EA"
            active-text-color="#B8C3EA"
            :default-active="currentPath"
          >
            <el-menu-item index="/home/index">
              <img :src="getImageUrl('home')" alt="" />
              <label v-show="!isCollapse" class="label">首页</label>
            </el-menu-item>
            <template v-for="(item, index) in menuList" :key="index">
              <el-sub-menu :index="item.path" v-if="item.meta && item.meta.isMenu">
                <template #title>
                  <img :src="getImageUrl(item.meta.icon)" alt="" />
                  <label v-show="!isCollapse" class="label">{{item.meta.title}}</label>
                </template>
                <template v-for="sub in item.children" :key="sub.path">
                  <el-menu-item :index="sub.path" v-if="sub.meta && sub.meta.isMenu">{{ sub.meta.title }}</el-menu-item>
                </template>
              </el-sub-menu>
            </template>
          </el-menu>
        </div>
        <div class="menu-controller" @click="isCollapse = !isCollapse"></div>
      </div>
      <div class="right-content">
        <div class="router-content">
          <!-- <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="route.meta.keepAlive" :key="Component" />
          </keep-alive>
           <component :is="Component"  v-if="!route.meta.keepAlive"/>
        </router-view> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed,watch } from "vue";
import { ElMessageBox } from "element-plus";
import { request } from "@/service/http";
import { CaretBottom, BellFilled, Search } from "@element-plus/icons-vue";
import { useStore } from "../store/user";
import { baseStore } from "../store/base";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const user = useStore();
const isCollapse = ref(false);
if (document.body.clientWidth < 1500) {
  isCollapse.value = true;
}
const baseInfo = baseStore();
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/menu/${name}.png`, import.meta.url).href;
};
const searchActive = ref<boolean>(false);
const username = computed(() => {
  return user.userInfo.userMobile.replace(/(\d{3})(.*)(\d{4})/, "$1****$3");
});

const currentPath = ref<string>(route.path.split(/\//, 3).join("/"));
//console.log(route.path)
//console.log(route.path.split(/\//, 3).join("/"))
watch(route,(newValue,oldValue)=>{
  currentPath.value = route.path.split(/\//, 3).join("/")
 // console.log(newValue.path)
})
const menuList = ref<any>([]);
menuList.value = router.options.routes;
const logOut = () => {
  ElMessageBox.confirm("确定退出登录么?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    let data: any = await request("get","/abroad-merchant/front/user/logout",{});
    if (data) {
      localStorage.clear();
      sessionStorage.clear();
      router.replace({ path: "/login" });
    }
  });
};
</script>
<style lang="scss" scoped>
.page-main {
  width: 100%;
  height: 100%;
  min-width: 1100px;
  background: #ecf2f5;

  header {
    width: 100%;height: 80px;
    display: flex;
    padding: 0 30px;
    box-sizing: border-box;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;

    h3 {
      display: flex;
      align-items: center;
      font-size: 24px;
      color: #131f3c;

      img {
        width: 83px;
        margin-right: 10px;
      }

      span {
        font-size: 16px;
        font-weight: 400;
        color: #131f3c;
        margin-left: 10px;
      }
    }

    .header-right {
      display: flex;
      align-items: center;

      .search {
        height: 30px;
        padding: 0 10px;
        box-sizing: border-box;
        background: #ffffff;
        display: flex;
        align-items: center;
        box-shadow: 0px 2px 6px 0px rgba(167, 210, 243, 0.36);
        border-radius: 15px;
        margin-right: 10px;
        width: 40px;

        input {
          border: none;
          width: 0px;
          height: 26px;

          &::placeholder {
            font-size: 14px;
            font-weight: 400;
            color: #bfcfd7;
          }
        }

        input[type="text"]:focus {
          outline: none;
        }
      }

      .search-active {
        animation: changewidth 5s infinite;
        animation-iteration-count: 1;
        width: 240px;

        input {
          animation: inputwidth 5s infinite;
          animation-iteration-count: 1;
          width: 280px;
        }
      }

      @keyframes changewidth {
        from {
          width: 40px;
        }

        to {
          width: 300px;
        }
      }

      @keyframes inputwidth {
        from {
          width: 0;
        }

        to {
          width: 280px;
        }
      }
    }
    .customer-avatar{
      width: 20px;height:20px;margin-right: 30px;
    }
    .dot-bell {
      width: 40px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #fff;
      box-shadow: 0px 2px 6px 0px rgba(167, 210, 243, 0.36);
      border-radius: 15px;
      margin-right: 10px;
    }

    .user-down {
      background-color: #fff;
      cursor: pointer;
      // box-shadow: 0px 2px 6px 0px rgba(167, 210, 243, 0.36);
      border-radius: 15px;

      .user-avatar {
        cursor: pointer;
        border-radius: 20px;
        margin-right: 8px;
      }

      .el-dropdown-link {
        display: flex;
        align-items: center;

        .el-icon--right {
          opacity: 0.6;
          margin-left: 5px;
        }
      }
    }
    .link {
      display: inline-block;
      padding-right: 20px;
    }
  }
  .page-content {
    width: 100%;
    height: calc(100% - 80px);
    box-sizing: border-box;
    display: flex;

    .left-content {
      padding-top: 30px;
      position: relative;
      .menu-list {
        height:100%;
        padding-top: 50px;
        background-color: #1f2a3c;
        box-sizing: border-box;
        border-radius: 0px 10px 10px 0px;
        img {
          width: 18px;
          height: 18px;
          margin-right: 10px;
        }

        .label {
          font-size: 16px;
          font-weight: bold;
          color: #b8c3ea;
        }

        &::v-deep(.el-menu) {
          width: 240px;
          border-right: none !important;
          &.el-menu--collapse {
            width: 60px;
            .is-active {
              width:68px!important;
              .el-sub-menu__title {
                border: none; border-radius: 0px 8px 8px 0px;
                background: linear-gradient(90deg, #2858ff, #776dff) !important;
              }
            }
          }
          .is-active {
            .el-sub-menu__title {
              label{
                  color: #fff;
                }
              img {
                position: relative;
                left: -37px;
                filter: drop-shadow(#fff 37px 0);
              }
            }
          }

          .el-sub-menu__title:hover {
            background:#27354C!important;
            img {
              position: relative;
              left: -37px;
              filter: drop-shadow(#fff 37px 0);
            }
          }

          .el-menu-item {
            &:hover {
              background: #27354C !important;
              img {
                position: relative;left: -37px;filter: drop-shadow(#fff 37px 0);
              }
            }
          }
          .el-menu-item {
              &.is-active {
                background: linear-gradient(90deg, #2858ff, #776dff) !important;
                width: 252px;
                border-radius: 0px 8px 8px 0px;
                border-right: none;
                color: #fff;
                img {
                  position: relative;left: -37px;filter: drop-shadow(#fff 37px 0);
                }
                label{
                  color: #fff;
                }
              }
            }
        }
      }

      .menu-controller {
        position: absolute;
        bottom: 100px;
        right: 0px;
        width: 50px;
        height: 40px;
        background: url(@/assets/images/menu/menu-unfold.png) no-repeat center/100%;

        &:hover {
          background: url(@/assets/images/menu/menu-unfold-hover.png) no-repeat center/100%;
        }
      }

      &.menu-collapse {
        .menu-controller {
          bottom: 110px;
          right: 5px;
          width: 50px;
          height:40px;
          background: url(@/assets/images/menu/menu-fold.png) no-repeat center/100%;
        }
      }
    }

    .right-content {
      width: calc(100vw - 240px);
      flex: 1;height: 100%;
      background: #ecf2f5;
      padding-bottom: 20px;
      box-sizing: border-box;
      .tag-menu {
        background: #fff;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #d8dce5;
        padding-left: 10px;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
      }

      .router-content {
        width: 100%;
        min-width:900px;
        padding: 30px 20px 0;
        box-sizing: border-box;
        height:100%;
        overflow-x: auto;
        overflow-y: auto;
      }
    }
  }
}


.customer-content{
    width: 100%;
    background: #FFFFFF;
    padding: 10px;
    box-sizing: border-box;
    .top{
      display: flex;
      .a-logo{
        width: 40px;
        height: 40px;
        background: linear-gradient(90deg, #2858FF, #776DFF);
        border-radius: 50%;
        margin-right: 10px;
      }
      h3{
        font-size: 16px;
        color: #1A2643;
        margin-bottom:3px;
      }
      label{
        font-size: 14px;
        font-weight: 500;
        color: #49546C;
      }
    }
    .customer-qr{
      width: 100%;
      border: 1px solid #E6E9EC;
      border-radius: 6px;
      margin-top: 20px;
      padding: 20px 20px 0;
      text-align: center;
      box-sizing: border-box;
      img{
        width:190px;margin: 20px auto;
      }
      h4{
        font-size: 16px;
        font-weight: bold;
        color: #1A2643;
        padding-bottom:8px;
        text-align: left;
      }
      p{
        font-size: 14px;
        font-weight: bold;
        color: #1A2643;
        margin-top:5px;
        text-align: left;
        label{
          color: #49546C;
        }
      }
    }
  }
</style>
