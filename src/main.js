import { createApp } from 'vue'
import login from './login.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(login).use(ElementPlus).mount('#login')
