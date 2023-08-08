import './assets/main.css'
import 'virtual:uno.css'
import 'animate.css'

import { createApp } from 'vue'
import { pinia } from './setup/pinia'
import { useTable } from './setup/vxeTables'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(useTable)

app.mount('#app')
