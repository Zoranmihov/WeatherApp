import { createRouter, createWebHistory } from 'vue-router'
import Weather from '../views/Weather.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/news',
      name: 'News',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/News.vue')
    }
  ]
})

export default router
