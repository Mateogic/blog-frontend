import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ViteCompressionPlugin from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ViteCompressionPlugin({
      filter: /\.(js|css)$/i, // 只压缩 js 和 css 文件
      threshold: 1024, // 只压缩大于 1KB 的文件
      algorithm: 'gzip', // 使用 gzip 算法
      ext: '.gz', // 压缩文件的扩展名
    }),
    visualizer() // 放到最后
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  }
},
})
