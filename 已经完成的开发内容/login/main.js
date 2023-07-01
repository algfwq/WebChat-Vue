import { createApp } from 'vue'
import login from './login.vue'

import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(login).use(ElementPlus,VueCookies,{dark:'auto'}).mount('#login').config.globalProperties.$cookies = VueCookies
