import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import api from './api/index'



const app = createApp(App)
// 全局注册ElementPlus组件
app.use(ElementPlus)
// 全局注册ElementPlus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
//   全局注册ElementPlus 国际化语言为中文
app.use(ElementPlus, {locale: zhCn,})
// 全局注册路由
app.use(router)
app.config.globalProperties.$api=api
app.mount('#app')