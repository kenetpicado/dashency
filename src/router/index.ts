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
        },
        {
          path: 'lotes',
          component: () => import('../views/Batch/BatchView.vue'),
          name: 'batches'
        },
        {
          path: 'lotes/crear',
          component: () => import('../views/Batch/BatchCreate.vue'),
          name: 'batches.create'
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

//verificar que este logueado antes de acceder a las rutas
router.beforeEach((to, from, next) => {
  // const token = localStorage.getItem('token')
  // if (to.name !== 'login' && !token) next({ name: 'login' })
  // else next()
  console.log(to, from)
  next()
})

export default router
