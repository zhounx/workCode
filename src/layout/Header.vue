<template>
  <div class="header-left">
    <el-icon :size="25" color="#fff" @click="handleCollapseClick">
      <expand v-if="appStore.isCollapse" />
      <fold v-else />
    </el-icon>
    <span class="company-name">
      {{ userStore.company }}
    </span>
  </div>
  <div class="header-right">
    <el-dropdown>
      <div class="el-dropdown-link">
        <el-avatar :src="avatar" />
        <span class="name">{{ userStore.userName }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handlelogout"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElMessageBox,
  ElIcon
} from 'element-plus'
import { useUserStore, useAppStore } from '@/pinia-store'
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/auth'
import avatarImg from '@/assets/imgs/default-avatar.png'
// interface Props {
//   isCollapse: boolean
// }
// const props = defineProps<Props>()
const userStore = useUserStore()
const appStore = useAppStore()
const router = useRouter()

const avatar = avatarImg

// 点击菜单缩起展开
const handleCollapseClick = () => {
  appStore.isCollapse = !appStore.isCollapse
}

// 退出
const handlelogout = () => {
  ElMessageBox.confirm('确认退出当前账户吗？').then(() => {
    localStorage.clear()
    sessionStorage.clear()
    removeToken()
    router.push('/login')
  })
}

</script>

<style lang="scss" scoped>
.header-left {
  display: flex;
  align-items: center;

  .el-icon {
    cursor: pointer;
  }

  .company-name {
    margin-left: 10px;
  }

  .name {
    font-size: 15px;
  }
}

.header-right {
  height: 50px;
  width: 70%;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-dropdown) {
  color: #fff;
  cursor: pointer;

  .name {
    font-size: 13px;
    float: right;
    height: 50px;
    line-height: 50px;
    margin-left: 10px;
  }

  :deep(.el-dropdown-menu__item) {
    font-weight: 400;
  }
}

.el-avatar {
  width: 28px;
  height: 28px;
  margin: 12px 0;
}

.collapse-icon {
  cursor: pointer;
  vertical-align: initial;
  margin-right: 20px;
  transition: 0.2s;
  border-radius: 50%;

  &:hover {
    opacity: 0.5;
  }
}
</style>
