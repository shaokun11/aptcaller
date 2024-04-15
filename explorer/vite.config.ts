import { defineConfig, loadEnv } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";

import ReactivityTransform from "@vue-macros/reactivity-transform/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取`.env`环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      ReactivityTransform(), // 启用响应式语法糖 $ref ...
      // 解决 `import { ref , reactive ..... } from 'vue'` 大量引入的问题
      AutoImport({
        imports: ["vue", "vue-router"],
      }),
    ],
    assetsDir: "static-hash",
    publicPath: "./",
    // 反向代理解决跨域问题
    server: {
      // host: 'localhost', // 只能本地访问
      host: "0.0.0.0", // 局域网别人也可访问
      port: Number(env.VITE_APP_PORT),
      open: false,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVICE_API,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "./src"),
        },
      ],
    },
    // 引入scss全局变量
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@import "@/styles/color.scss";@import "@/styles/theme.scss";`,
    //     },
    //   },
    // },
  };
});
