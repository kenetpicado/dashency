import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import UsersView from '@/views/UsersView.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { useStorage } from '@vueuse/core'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('../views/HomeView.vue'),
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
        },
        {
          path: 'lotes/:id',
          component: () => import('../views/Batch/BatchShow.vue'),
          name: 'batches.show'
        },
        {
          path: 'paquetes',
          component: () => import('../views/Package/PackageView.vue'),
          name: 'packages'
        },
        {
          path: 'facturacion',
          component: () => import('../views/Billing/BillingView.vue'),
          name: 'billing'
        },
        {
          path: 'facturacion/crear',
          component: () => import('../views/Billing/BillingCreate.vue'),
          name: 'billing.create'
        },
        {
          path: 'facturacion/:id',
          component: () => import('../views/Billing/BillingShow.vue'),
          name: 'billing.show'
        },
        {
          path: 'gastos',
          component: () => import('../views/Expense/ExpenseView.vue'),
          name: 'expenses'
        },
        {
          path: 'arqueos',
          component: () => import('../views/Arching/ArchingView.vue'),
          name: 'archings'
        },
        {
          path: 'arqueos/crear',
          component: () => import('../views/Arching/ArchingCreate.vue'),
          name: 'archings.create'
        },
        {
          path: 'arqueos/:id',
          component: () => import('../views/Arching/ArchingShow.vue'),
          name: 'archings.show'
        },
        {
          path: 'precios',
          component: () => import('../views/Price/PriceView.vue'),
          name: 'prices'
        },
        {
          path: 'cuentas',
          component: () => import('../views/Account/AccountView.vue'),
          name: 'accounts'
        },
        {
          path: 'perfil',
          component: () => import('../views/Profile/ProfileView.vue'),
          name: 'profile'
        }
      ]
    },
    {
      path: '/',
      component: GuestLayout,
      meta: { requiresAuth: false },
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

router.beforeEach((to, from, next) => {
  const token = useAuthStore().getToken()
  const auth = useAuthStore().getAuth()
  const selected = useStorage('selected', 'home')

  if (to.meta.requiresAuth && !token) {
    //Si no hay token y la ruta requiere autenticación
    next({ name: 'login' })
  } else if (!to.meta.requiresAuth && token) {
    //Rutas login y register cuando ya hay token
    if (auth?.role === 'CAJERO') {
      next({ name: 'billing' })
    } else {
      next({ name: 'home' })
    }
  } else if (auth?.role === 'CAJERO') {
    //este usuario solo puede acceder a facturación: billing, billing.create, billing.show y perfil
    if (!to.name?.toString().startsWith('billing') && to.name !== 'profile') {
      selected.value = 'billing'
      next({ name: 'billing' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
