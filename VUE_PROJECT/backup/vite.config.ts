import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { fileURLToPath } from "url";
import libraryStat from "./src/YKComponent/src/plugins/rollup-plugin-libraryStat.js";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const chunkhash = new Date().valueOf();

interface ViteConfig {
  mode: string;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ViteConfig) => ({
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    libraryStat(mode),
  ],
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@YKComponent": fileURLToPath(
        new URL("./src/YKComponent/src/", import.meta.url)
      ),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].${chunkhash}.js`,
        chunkFileNames: `assets/[name].${chunkhash}.js`,
        assetFileNames: `assets/[name].${chunkhash}.[ext]`,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8808,
    // 是否开启 https
    https: false,
    open: false,
    proxy: {
      "/abroad-merchant": {
        target: "http://10.8.17.39:8001", // 服务器api地址
        changeOrigin: true, // true/false, Default: false - changes the origin of the host header to the target URL
      },
    },
  },
}));
