import { createApp } from 'vue'
import Chat_main from './Chat_main.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(Chat_main).use(ElementPlus,{dark:'auto'}).mount('#Chat_main')
