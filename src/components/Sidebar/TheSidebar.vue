<template>
  <ul class="menu text-base-content min-h-full w-64 p-4 bg-white space-y-1 border-r">
    <span class="menu-title">
      <img :src="logo" alt="" class="w-auto h-[2.5rem] my-2 lg:my-8 mx-auto" />
    </span>
    <li v-for="(item, index) in items.filter((i) => i.show || i.show == undefined)" :key="index">
      <SectionSidebar v-if="!item.to" :title="item.title" />
      <ItemSidebarLink
        v-else
        :item="item"
        :active="
          item.to.name === route.name ||
          (item.activeIn && item.activeIn.includes(route.name as string))
        "
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  IconHome,
  IconLogout,
  IconPackage,
  IconPackages,
  IconUsersGroup,
  IconUser,
  IconDatabaseDollar,
  IconTransferOut,
  IconDeviceDesktopAnalytics,
  IconBooks,
  IconReceipt2,
  IconLogs,
  IconMail,
  IconReload
} from '@tabler/icons-vue'
import ItemSidebarLink from '@/components/Sidebar/ItemSidebarLink.vue'
import SectionSidebar from '@/components/Sidebar/SectionSidebar.vue'
import ItemSidebar from '@/components/Sidebar/ItemSidebar.vue'
import useAuth from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'

const { logout } = useAuth()
const { hasRoles } = useAuthStore()
const route = useRoute()
const logo =
  import.meta.env.VITE_APP_LOGO ||
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRty2ZsNw6rVmMywsvo_CrUJbvOIw8Th-vX3Q&s'

const items = [
  {
    title: 'Administración'
  },
  {
    title: 'Inicio',
    to: { name: 'home' },
    icon: IconHome,
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
  },
  {
    title: 'Usuarios',
    to: { name: 'users' },
    icon: IconUsersGroup,
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
  },
  {
    title: 'Lotes',
    to: { name: 'batches' },
    icon: IconPackages,
    show: hasRoles(['ROOT', 'ADMINISTRADOR']),
    activeIn: ['batches.create', 'batches.show']
  },
  {
    title: 'Paquetes',
    to: { name: 'packages' },
    icon: IconPackage,
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
  },
  {
    title: 'Correo',
    to: { name: 'mail.packages' },
    icon: IconMail,
    show: hasRoles(['ROOT', 'ADMINISTRADOR', 'CAJERO'])
  },
  {
    title: 'Sincronización',
    to: { name: 'sync' },
    icon: IconReload,
    show: hasRoles(['ROOT', 'ADMINISTRADOR', 'CAJERO'])
  },
  {
    title: 'Finanzas'
  },
  {
    title: 'Facturación',
    to: { name: 'billing' },
    icon: IconDatabaseDollar,
    show: hasRoles(['ROOT', 'ADMINISTRADOR', 'CAJERO']),
    activeIn: ['billing.create', 'billing.show']
  },
  {
    title: 'Gastos',
    to: { name: 'expenses' },
    icon: IconTransferOut,
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
  },
  {
    title: 'Arqueos',
    to: { name: 'archings' },
    icon: IconLogs,
    show: hasRoles(['ROOT', 'ADMINISTRADOR']),
    activeIn: ['archings.create', 'archings.show']
  },
  {
    title: 'Configuración'
  },
  {
    title: 'Precios',
    to: { name: 'prices' },
    icon: IconReceipt2,
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
  },
  {
    title: 'Cuentas',
    to: { name: 'accounts' },
    icon: IconBooks,
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
  },
  {
    title: 'Perfil',
    to: { name: 'profile' },
    icon: IconUser,
    show: true
  }
]
</script>
