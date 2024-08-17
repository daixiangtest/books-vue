import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginTest.vue')
  },
  {
    path:'/home',
    name:'home',
    component: () => import('../views/HomeView.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
