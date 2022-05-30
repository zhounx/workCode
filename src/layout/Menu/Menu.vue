<template>
  <el-scrollbar class="menu-container">
    <el-menu :collapse="appStore.isCollapse" :default-active="activeMenu">
      <MenuItem :menu-list="menuList" :default-menus="defaultMenus" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useAppStore } from '@/pinia-store'
import { useRoute } from 'vue-router'
import { ElScrollbar, ElMenu } from 'element-plus'
import MenuItem from './MenuItem.vue'
import defaultMenus from './defaultMenus'
const route = useRoute()
const appStore = useAppStore()
const activeMenu = ref('')
const menuList = [
  {
    id: 'home',
    name: '首页'
  },
  {
    id: 'base',
    name: '基础信息管理',
    children: [
      {
        id: 'table',
        name: '表格表单展示',
        path: '/base/table'
      },
      {
        id: 'mock',
        name: 'mock数据',
        path: '/base/mock'
      }
    ]
  },
  {
    id: 'setting',
    name: '系统设置',
    children: [
      {
        id: 'password',
        name: '修改密码',
        path: '/set/password'
      }
    ]
  }
]
watch(
  () => route,
  (val) => {
    const { meta } = val
    if (meta.activePath as string) {
      // 对应菜单激活 menu
      activeMenu.value = meta.activePath as string
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.menu-container {
  position: fixed;
  left: 0;
  top: 50px;
  bottom: 0;
  z-index: 1500;
  box-sizing: border-box;
  background-color: #2e3759;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}

.el-menu {
  border-right: 0;
  padding-bottom: 60px;

  &:not(.el-menu--collapse) {
    width: 220px;
  }

  .iconfont {
    margin-right: 18px;
    text-align: center;
    font-size: 16px;
    vertical-align: middle;
  }
}

.rightMenuBox {
  padding: 0 10px;
  text-align: center;

  .rightMenu {
    cursor: pointer;
  }
}
</style>
