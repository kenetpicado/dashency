import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import UsersView from '@/views/UsersView.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: HomeView,
          name: 'home'
        },
        {
          path: 'usuarios',
          component: UsersView,
          name: 'users'
        }
      ]
    },
    {
      path: '/',
      component: GuestLayout,
      children: [
        {
          path: 'login',
          component: () => import('../views/Guest/LoginView.vue'),
          name: 'login'
        },
        {
          path: 'registrar',
          component: () => import('../views/Guest/RegisterView.vue'),
          name: 'register'
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
