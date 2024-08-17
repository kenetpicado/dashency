<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import TheTable from '@/components/Table/TheTable.vue'
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-xl">Usuarios</span>
    <BtnPrimary> Nuevo </BtnPrimary>
  </header>

  <TheTable>
    <template #header>
      <th>ID</th>
      <th>Nombre</th>
      <th>Correo</th>
      <th>Rol</th>
      <th>Accciones</th>
    </template>
    <template #body>
      <tr class="hover:bg-gray-50">
        <td>1</td>
        <td>Kenet</td>
        <td>kenet</td>
        <td>role</td>
        <td>dfv</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td>1</td>
        <td>Kenet</td>
        <td>kenet</td>
        <td>role</td>
        <td>sdfvdf</td>
      </tr>
    </template>
  </TheTable>
</template>
