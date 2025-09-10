<template>
  <ul class="menu text-base-content min-h-full w-64 p-4 bg-white space-y-0 border-r">
    <li class="menu-title">
      <img :src="logo" alt="" class="w-auto h-[4rem] my-1 mx-auto" />
    </li>
    <li v-for="(item, index) in items.filter((i) => i.show)" :key="index">
      <span v-if="!item.to" class="menu-title mt-2">
        {{ item.title }}
      </span>

      <RouterLink
        v-else
        :to="item.to"
        :class="{
          active: item.to.name === route.name || item.activeIn.includes(route.name as string)
        }"
      >
        <span class="flex items-center gap-2">
          <component v-if="item.icon" :is="item.icon" size="25"></component>
          <span>{{ item.title }}</span>
        </span>
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  IconHome,
  IconPackage,
  IconPackages,
  IconUsersGroup,
  IconDatabaseDollar,
  IconTransferOut,
  IconLogs,
  IconMail,
  IconReload,
  IconSettings,
  IconUser
} from '@tabler/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink, useRoute } from 'vue-router'

const { canShowThisItem } = useAuthStore()
const route = useRoute()
const logo = import.meta.env.VITE_APP_LOGO || ''

const items = [
  {
    title: 'Administración',
    show: false,
    activeIn: []
  },
  {
    title: 'Inicio',
    to: { name: 'home' },
    icon: IconHome,
    show: canShowThisItem({ name: 'home' }),
    activeIn: ['home'],
  },
  {
    title: 'Usuarios',
    to: { name: 'users' },
    icon: IconUsersGroup,
    show: canShowThisItem({ name: 'users' }),
    activeIn: []
  },
  {
    title: 'Lotes',
    to: { name: 'batches' },
    icon: IconPackages,
    show: canShowThisItem({ name: 'batches' }),
    activeIn: ['batches.create', 'batches.show']
  },
  {
    title: 'Paquetes',
    to: { name: 'packages' },
    icon: IconPackage,
    show: canShowThisItem({ name: 'packages' }),
    activeIn: []
  },
  {
    title: 'Correo',
    to: { name: 'mail.packages' },
    icon: IconMail,
    show: canShowThisItem({ name: 'mail.packages' }),
    activeIn: []
  },
  {
    title: 'Sincronización',
    to: { name: 'sync' },
    icon: IconReload,
    show: canShowThisItem({ name: 'sync' }),
    activeIn: []
  },
  {
    title: 'Finanzas',
    show: true,
    activeIn: []
  },
  {
    title: 'Facturación',
    to: { name: 'billing' },
    icon: IconDatabaseDollar,
    show: canShowThisItem({ name: 'billing' }),
    activeIn: ['billing.create', 'billing.show']
  },
  {
    title: 'Gastos',
    to: { name: 'expenses' },
    icon: IconTransferOut,
    show: canShowThisItem({ name: 'expenses' }),
    activeIn: []
  },
  {
    title: 'Arqueos',
    to: { name: 'archings' },
    icon: IconLogs,
    show: canShowThisItem({ name: 'archings' }),
    activeIn: ['archings.create', 'archings.show']
  },
  {
    title: 'Configuración',
    to: { name: 'settings' },
    icon: IconSettings,
    show: canShowThisItem({ name: 'settings' }),
    activeIn: []
  },
  {
    title: 'Perfil',
    to: { name: 'profile' },
    icon: IconUser,
    show: true,
    activeIn: []
  }
]

</script>
