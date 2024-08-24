<template>
  <aside class="w-72 min-h-screen p-0 m-0 bg-white flex flex-col border-r">
    <div class="h-full px-3 py-4 overflow-y-auto">
      <div class="h-14 w-14 mx-auto my-6">
        <img src="/gh.png" class="h-full w-full" alt="" />
      </div>
      <ul class="space-y-1">
        <li v-for="(item, index) in items" :key="index">
          <SectionSidebar v-if="!item.to" :title="item.title" />
          <ItemSidebarLink v-else :item="item" />
        </li>
        <li>
          <ItemSidebar @click="logout" :item="{ title: 'Salir', icon: IconLogout }" />
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { IconHome, IconLogout, IconUser } from '@tabler/icons-vue'
import ItemSidebarLink from '@/components/Sidebar/ItemSidebarLink.vue'
import SectionSidebar from '@/components/Sidebar/SectionSidebar.vue'
import ItemSidebar from '@/components/Sidebar/ItemSidebar.vue'
import useAuth from '@/composables/useAuth'

const { logout } = useAuth()

const items = [
  {
    title: 'Inicio',
    to: { name: 'home' },
    icon: IconHome
  },
  {
    title: 'Lotes',
    to: { name: 'batches' },
    icon: IconUser
  },
  {
    title: 'Paquetes',
    to: { name: 'packages' },
    icon: IconUser
  },
  {
    title: 'Administración'
  },
  {
    title: 'Usuarios',
    to: { name: 'users' },
    icon: IconUser
  }
]
</script>
