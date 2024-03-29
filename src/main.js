import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Antdv
import 'ant-design-vue/dist/antd.css'
import Antdv from 'ant-design-vue'

import '@/assets/scss/styles.scss'

const app = createApp(App)

app.use(router)
app.use(Antdv)
app.use(store)

app.mount('#app')
