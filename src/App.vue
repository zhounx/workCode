<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useStore } from 'vuex'
import { debounce } from 'lodash-es'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const { commit } = useStore()
const locale = zhCn

const resizeFun = () => {
  const baseWidth = 1000
  const clientWidth = document.documentElement.clientWidth
  commit('layout/updateCollapse', clientWidth < baseWidth ? true : false)
}

const debounceResize = debounce(resizeFun, 300)

onMounted(() => {
  // 视图发生变化更新菜单折叠状态
  useEventListener(window, 'resize', debounceResize)
})
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
