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
  IconPackage,
  IconPackages,
  IconUsersGroup,
  IconUser,
  IconDatabaseDollar,
  IconTransferOut,
  IconBooks,
  IconReceipt2,
  IconLogs,
  IconMail,
  IconReload,
  IconSettings
} from '@tabler/icons-vue'
import ItemSidebarLink from '@/components/Sidebar/ItemSidebarLink.vue'
import SectionSidebar from '@/components/Sidebar/SectionSidebar.vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'

const { hasRoles } = useAuthStore()
const route = useRoute()
const logo = import.meta.env.VITE_APP_LOGO || ''

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
    title: 'Configuración',
    to: { name: 'settings' },
    icon: IconSettings,
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
  }
]
</script>
