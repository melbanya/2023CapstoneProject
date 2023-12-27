import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
// import Page1 from './Page1.vue'
// import Page2 from './Page2.vue'

const routes = [
  // { path: '/page1', component: Page1 },
  // { path: '/page2', component: Page2 }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')

export default router
