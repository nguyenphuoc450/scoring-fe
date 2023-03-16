import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import storeRoot from './store'

// Antdv
import 'ant-design-vue/dist/antd.css'
import Antdv from 'ant-design-vue'

import '@/assets/scss/styles.scss'

const app = createApp(App)
const store = createStore(storeRoot)

app.use(router)
app.use(Antdv)
app.use(store)

app.mount('#app')
