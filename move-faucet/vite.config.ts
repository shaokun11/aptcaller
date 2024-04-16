import { defineConfig, loadEnv } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";

import ReactivityTransform from "@vue-macros/reactivity-transform/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      ReactivityTransform(), 
      //  `import { ref , reactive ..... } from 'vue'` 
      AutoImport({
        imports: ["vue", "vue-router"],
      }),
    ],
    assetsDir: "static-hash",
    publicPath: "./",
    server: {
      // host: 'localhost', 
      host: "0.0.0.0", 
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
    // scss Global
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@import "@/styles/color.scss";@import "@/styles/theme.scss";`,
    //     },
    //   },
    // },
  };
});
