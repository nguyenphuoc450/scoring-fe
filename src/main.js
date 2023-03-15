import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/scss/main.scss'
// Antdv
import 'ant-design-vue/dist/antd.css'
import Antdv from 'ant-design-vue'
import AntIcons from '@ant-design/icons-vue'

const app = createApp(App)

app.use(router)
app.use(Antdv)

app.mount('#app')
