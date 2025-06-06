import './assets/main.css'
// 导入 Element Plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import App from '@/App.vue'
// 导入路由
import router from '@/router'
// 导入全局路由守卫
import '@/permission'
import 'animate.css';
import 'nprogress/nprogress.css'
// 引入全局状态管理 Pinia
import pinia from '@/stores'
// 图片点击放大
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
const app = createApp(App)
// 导入 element-plus 暗黑 css
import 'element-plus/theme-chalk/dark/css-vars.css'

// 1. 创建并应用 Pinia 实例
// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)

// 2. 应用路由
app.use(router)
app.use(pinia)
app.use(VueViewer)

// 3. 引入图标 (可以在 use Pinia 和 router 之后，mount 之前)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 4. 挂载应用
app.mount('#app')