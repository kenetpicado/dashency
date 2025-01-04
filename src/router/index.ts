import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import UsersView from '@/views/UsersView.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import { useAuthStore } from '@/stores/auth'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('../views/HomeView.vue'),
          name: 'home',
          meta: { title: 'Inicio' }
        },
        {
          path: 'usuarios',
          component: UsersView,
          name: 'users',
          meta: { title: 'Usuarios' }
        },
        {
          path: 'lotes',
          component: () => import('../views/Batch/BatchView.vue'),
          name: 'batches',
          meta: { title: 'Lotes' }
        },
        {
          path: 'lotes/crear',
          component: () => import('../views/Batch/BatchCreate.vue'),
          name: 'batches.create',
          meta: { title: 'Crear Lote' }
        },
        {
          path: 'lotes/:id',
          component: () => import('../views/Batch/BatchShow.vue'),
          name: 'batches.show',
          meta: { title: 'Detalles Lote' }
        },
        {
          path: 'paquetes',
          component: () => import('../views/Package/PackageView.vue'),
          name: 'packages',
          meta: { title: 'Paquetes' }
        },
        {
          path: 'paquetes-de-correo',
          component: () => import('../views/MailPackage/MailPackageView.vue'),
          name: 'mail.packages',
          meta: { title: 'Paquetes de correos' }
        },
        {
          path: 'sincronizacion',
          component: () => import('../views/Sync/SyncView.vue'),
          name: 'sync',
          meta: { title: 'Sincronización' }
        },
        {
          path: 'facturacion',
          component: () => import('../views/Billing/BillingView.vue'),
          name: 'billing',
          meta: { title: 'Facturación' }
        },
        {
          path: 'facturacion/crear',
          component: () => import('../views/Billing/BillingCreate.vue'),
          name: 'billing.create',
          meta: { title: 'Crear Factura' }
        },
        {
          path: 'facturacion/:id',
          component: () => import('../views/Billing/BillingShow.vue'),
          name: 'billing.show',
          meta: { title: 'Factura' }
        },
        {
          path: 'gastos',
          component: () => import('../views/Expense/ExpenseView.vue'),
          name: 'expenses',
          meta: { title: 'Gastos' }
        },
        {
          path: 'arqueos',
          component: () => import('../views/Arching/ArchingView.vue'),
          name: 'archings',
          meta: { title: 'Arqueos' }
        },
        {
          path: 'arqueos/crear',
          component: () => import('../views/Arching/ArchingCreate.vue'),
          name: 'archings.create',
          meta: { title: 'Crear Arqueo' }
        },
        {
          path: 'arqueos/:id',
          component: () => import('../views/Arching/ArchingShow.vue'),
          name: 'archings.show',
          meta: { title: 'Arqueo' }
        },
        {
          path: 'configuracion',
          component: () => import('../views/Setting/SettingView.vue'),
          name: 'settings',
          meta: { title: 'Configuración' }
        },
        {
          path: 'perfil',
          component: () => import('../views/Profile/ProfileView.vue'),
          name: 'profile',
          meta: { title: 'Perfil' }
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
          name: 'login',
          meta: { title: 'Iniciar Sesión' }
        },
        {
          path: 'registrar',
          component: () => import('../views/Guest/RegisterView.vue'),
          name: 'register',
          meta: { title: 'Registrarse' }
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
  const token = Cookies.get('edo_token')
  const auth = useAuthStore().getAuth()

  if (to.name === 'billing.show') {
    document.title = 'Factura-' + to.params.id
  } else {
    document.title = to.meta.title + ' - ' + (import.meta.env.VITE_APP_NAME || 'Dashency')
  }

  //Si no hay token y la ruta requiere autenticación
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  }

  //Rutas login y register cuando ya hay token
  else if (!to.meta.requiresAuth && token) {
    if (auth?.role === 'CAJERO') {
      next({ name: 'billing' })
    } else {
      next({ name: 'home' })
    }
  }

  //este usuario solo puede acceder a facturación: billing, billing.create, billing.show, mail.packages, sync y perfil
  else if (
    auth?.role === 'CAJERO' &&
    !to.name?.toString().startsWith('billing') &&
    to.name !== 'profile' &&
    to.name !== 'sync' &&
    to.name !== 'mail.packages'
  ) {
    next({ name: 'billing' })
  }

  //Todo OK
  else {
    next()
  }
})

export default router
