import './assets/main.css'
import 'virtual:uno.css'
import 'animate.css'

import './styles/scss/element.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { pinia } from './setup/pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
