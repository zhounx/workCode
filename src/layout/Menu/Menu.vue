<template>
  <el-scrollbar class="menu-container">
    <el-menu :collapse="isCollapse" :default-active="activeMenu" unique-opened>
      <MenuItem :menu-list="menuList" :default-menus="menus" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ElScrollbar, ElMenu } from 'element-plus'
import MenuItem from './MenuItem.vue'
import menus from '@/utils/menus'
import { getMenus } from '@/api/index'
const route = useRoute()
const store = useStore()
const activeMenu = ref('')
const menuList = [
  {
    id: 'home',
    name: '首页'
  },
  {
    id: 'base_information',
    name: '基础信息管理',
    children: [
      {
        id: 'role',
        name: '角色管理',
        path: '/role'
      },
      {
        id: 'mock',
        name: 'mock数据',
        path: '/base/mock'
      }
    ]
  },
  {
    id: 'system_config',
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

// 获取菜单
// const getMenuList = () => {
//   getMenus().then((res: any) => {
//     const customMenus = [
//       {
//         id: 'home',
//         name: '首页',
//         children: <any>[]
//       }
//     ]
//     const result = customMenus.concat(res as any[])
//     menuList.value = result
//   })
// }
// getMenuList()
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
const isCollapse = computed(() => store.state.layout.isCollapse)
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
