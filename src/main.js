import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import VueKakaoSdk from './plugins/VueKakaoSdk'

const app = createApp(App).use(store).use(router)

const apiKey = 'api Key';
app.use(VueKakaoSdk, { apiKey });
app.mount('#app')