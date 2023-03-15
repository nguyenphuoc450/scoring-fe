import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Antdv
import 'ant-design-vue/dist/antd.css'
import Antdv from 'ant-design-vue'

import '@/assets/scss/styles.scss'

const app = createApp(App)

app.use(router)
app.use(Antdv)

app.mount('#app')
