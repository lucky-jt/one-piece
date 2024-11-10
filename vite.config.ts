// vite.config.ts
import ip from "ip";
import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import pxtovw from "postcss-px-to-viewport";

// https://vitejs.dev/config/

// postcss-px-to-viewport配置项
const pxToVwConfig = {
  viewportWidth: 1920, // 设计稿的宽度，根据实际情况调整
  unitPrecision: 5, // 单位转换后保留的精度
  viewportUnit: "vw", // 希望使用的视口单位
  selectorBlackList: [], // 不转换的类名
  minPixelValue: 1, // 小于或等于`1px`的不转换为视口单位
  mediaQuery: false, // 允许在媒体查询中转换`px`
};

export default defineConfig({
  server: {
    open: true,
    host: "0.0.0.0",
  },
  define: {
    "import.meta.env.BASE_IP": JSON.stringify(ip.address()),
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 配置 @ 指向 src 目录
    },
  },
  // css: {
  //   postcss: {
  //     plugins: [pxtovw(pxToVwConfig)], // 使用postcss-px-to-viewport插件],
  //   },
  // },
});
