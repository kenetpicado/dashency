<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import { onMounted } from 'vue'
import useUser from "@/composables/useUser"

const { getUsers, users } = useUser()

onMounted(() => {
  getUsers()
})
</script>

<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Usuarios</span>
    <BtnPrimary> Nuevo </BtnPrimary>
  </header>

  <TheTable>
    <template #header>
      <th>#</th>
      <th>Nombre</th>
      <th>Correo</th>
      <th>Rol</th>
      <th>Estado</th>
    </template>
    <template #body>

      <tr v-for="(item, index) in users" :key="index" class="hover:bg-gray-50">
        <td>{{ index + 1}}</td>
        <td>
          {{ item.name }}
        </td>
        <td>
          {{ item.email }}
        </td>
        <td>
          {{ item.role }}
        </td>
        <td>
          {{ item.status }}
        </td>
      </tr>
    </template>
  </TheTable>
</template>
