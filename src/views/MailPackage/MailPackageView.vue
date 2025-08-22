<script setup lang="ts">
import { onMounted } from 'vue'
import usePackage from '@/composables/usePackage'
import TheTable from '@/components/Table/TheTable.vue'
import { watchDebounced } from '@vueuse/core'
import { format } from '@formkit/tempo'
import ThePaginate from '@/components/ThePaginate.vue'
import FieldForm from '@/components/Form/FieldForm.vue'

const { getMailPackages, mailPackages, queryParams, meta, processing } = usePackage()

onMounted(() => {
  getMailPackages()
})

watchDebounced(
  queryParams.value,
  () => {
    meta.value.page = 1
    getMailPackages()
  },
  { debounce: 700, maxWait: 1000 }
)
</script>

<template>
  <header class="flex items-center justify-between mb-6">
    <span class="font-bold text-2xl">Correo</span>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
    <FieldForm
      text="Guía"
      name="guide"
      v-model="queryParams.guide"
      placeholder="Número de guia"
      type="number"
    />

    <FieldForm
      text="Cliente"
      name="client"
      v-model="queryParams.client"
      placeholder="Nombre del cliente"
      type="search"
    />

    <FieldForm
      text="Tracking"
      name="tracking"
      v-model="queryParams.tracking"
      placeholder="ej. 1Z12345E0205271688"
      type="search"
    />

    <FieldForm as="select" text="Tipo" name="type" v-model="queryParams.type">
      <option value="">Todos</option>
      <option value="Maritimo/Ocean">Maritimo/Ocean</option>
      <option value="Aereo/Air">Aereo/Air</option>
    </FieldForm>
  </div>

  <TheTable>
    <template #header>
      <th>Creado</th>
      <th>Guia</th>
      <th>Tipo</th>
      <th>Peso</th>
      <th>Cliente</th>
      <th>Tracking</th>
      <th>Descripción</th>
    </template>
    <template #body>
      <tr v-if="processing">
        <td colspan="7">
          <span class="loading-table-data"> </span>
        </td>
      </tr>
      <tr v-else-if="!mailPackages.length">
        <td colspan="7" class="text-center">No hay paquetes</td>
      </tr>
      <tr v-else v-for="(item, index) in mailPackages" :key="index" class="hover:bg-gray-50">
        <td>
          <span v-if="item.createdAt">
            {{ format(item.createdAt, { date: 'short', time: 'short' }) }}
          </span>
        </td>
        <td>
          {{ item.guide || '-' }}
        </td>
        <td>
          {{ item.type }}
        </td>
        <td>{{ item.grossWeight }} lb(s)</td>
        <td>
          {{ item.client }}
        </td>
        <td>
          {{ item.tracking || '-' }}
        </td>
        <td>
          {{ item.description }}
        </td>
      </tr>
    </template>
  </TheTable>

  <ThePaginate v-model="meta.page" :meta="meta" />
</template>
