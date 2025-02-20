import './assets/index.css'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
import { createApp } from 'vue'
import App from './app.vue'
import { router } from './router'

const app = createApp(App)

app.use(VueQueryPlugin)
app.use(DataLoaderPlugin, { router })
app.use(router)

app.mount('#app')
