<template>
  <aside class="min-h-screen p-0 m-0 bg-white flex flex-col border-r">
    <div class="h-full px-3 py-4 overflow-y-auto w-56">
      <div class="h-14 w-14 mx-auto my-6">
        <IconDeviceDesktopAnalytics class="text-edo-950" />
      </div>

      <ul class="space-y-1">
        <li
          v-for="(item, index) in items.filter((i) => i.show || i.show == undefined)"
          :key="index"
        >
          <SectionSidebar v-if="!item.to" :title="item.title" />
          <ItemSidebarLink
            v-else
            :item="item"
            :active="selected == item.to.name"
            @click="selected = item.to.name"
          />
        </li>
        <li>
          <ItemSidebar @click="logout" :item="{ title: 'Salir', icon: IconLogout }" />
        </li>
      </ul>
    </div>
  </aside>
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
  IconLogs
} from '@tabler/icons-vue'
import ItemSidebarLink from '@/components/Sidebar/ItemSidebarLink.vue'
import SectionSidebar from '@/components/Sidebar/SectionSidebar.vue'
import ItemSidebar from '@/components/Sidebar/ItemSidebar.vue'
import useAuth from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import { useStorage } from '@vueuse/core'

const { logout } = useAuth()
const { hasRoles } = useAuthStore()
const selected = useStorage('selected', 'home')

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
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
  },
  {
    title: 'Paquetes',
    to: { name: 'packages' },
    icon: IconPackage,
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
  },
  {
    title: 'Facturación',
    to: { name: 'billing' },
    icon: IconDatabaseDollar,
    show: hasRoles(['ROOT', 'ADMINISTRADOR', 'CAJERO'])
  },
  {
    title: 'Arqueos',
    to: { name: 'archings' },
    icon: IconLogs,
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
  },
  {
    title: 'Gastos',
    to: { name: 'expenses' },
    icon: IconTransferOut,
    show: hasRoles(['ROOT', 'ADMINISTRADOR'])
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
