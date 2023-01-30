import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


const chunkhash = new Date().valueOf()
// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    rollupOptions:{
        output:{
            entryFileNames: `assets/[name].${chunkhash}.js`,
            chunkFileNames: `assets/[name].${chunkhash}.js`,
            assetFileNames: `assets/[name].${chunkhash}.[ext]`
        },
        // plugins: [myExample()]
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8001,
    // 是否开启 https
    https: false,
    open: false,
    proxy: {
      // '/agent': {
      //   target: 'http://t-pb.lepass.cn', // 服务器api地址
      //   changeOrigin: true,  // true/false, Default: false - changes the origin of the host header to the target URL
      // }
    }
  }
})
