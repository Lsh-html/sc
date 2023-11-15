import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// process.env["VITE_DEV_SERVER_URL"]
// https://vitejs.dev/config/
export default defineConfig({
  // publicPath: process ,
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')//设置别名
    }
  },

  base: "/",
  server: {
    host: "0.0.0.0",
    proxy: {
      '/szjy-boot': {
        target: 'http://47.97.34.76/szjy-boot',
        changeOrigin: true,// 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
        secure: true, // 接受运行在https上，默认不接受
      }
    }
  },

  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }

})
