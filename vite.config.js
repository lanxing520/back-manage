import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
      // 可以选择auto-import.d.ts生成的位置
      dts: 'src/auto-import.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 自定义别名
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@img': path.resolve(__dirname, './src/assets/img'),
    },
  },
  server: {
    host:'0,0,0,0',
    port:8081,
    
    headers: {
      // 确保 iframe 可以正常加载
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  build: {
    // 确保静态资源路径正确
    assetsDir: 'static',
    // 如果你需要将第三方静态文件复制到dist目录
    copyPublicDir: true,
  },
})
