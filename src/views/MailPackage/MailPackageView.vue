<script setup lang="ts">
import { onMounted } from 'vue'
import usePackage from '@/composables/usePackage'
import TheTable from '@/components/Table/TheTable.vue'
import SelectForm from '@/components/Form/SelectForm.vue'
import InputForm from '@/components/Form/InputForm.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { watchDebounced } from '@vueuse/core'
import getFormattedDate from '@/utils/date'

const { getMailPackages, mailPackages, queryParams } = usePackage()

onMounted(() => {
  getMailPackages()
})

watchDebounced(queryParams.value, () => getMailPackages(), { debounce: 700, maxWait: 1000 })

function getThisPage(page: number) {
  queryParams.value.page = page
}
</script>

<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Correo</span>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
    <InputForm
      text="Guía"
      name="guide"
      v-model="queryParams.guide"
      placeholder="Número de guia"
      type="number"
    />
    <InputForm
      text="Cliente"
      name="client"
      v-model="queryParams.client"
      placeholder="Nombre del cliente"
    />
    <InputForm
      text="Tracking"
      name="tracking"
      v-model="queryParams.tracking"
      placeholder="Número de rastreo"
    />
    <SelectForm text="Tipo" name="type" v-model="queryParams.type">
      <option value="">Todos</option>
      <option value="Maritimo/Ocean">Maritimo/Ocean</option>
      <option value="Aereo/Air">Aereo/Air</option>
    </SelectForm>
  </div>

  <TheTable>
    <template #header>
      <th>Guia</th>
      <th>Tipo</th>
      <th>Peso</th>
      <th>Cliente</th>
      <th>Tracking</th>
      <th>Descripción</th>
      <th>Fecha</th>
    </template>
    <template #body>
      <tr v-if="!mailPackages.data.length">
        <td colspan="7" class="text-center">No hay paquetes</td>
      </tr>
      <tr v-for="(item, index) in mailPackages.data" :key="index" class="hover:bg-gray-50">
        <td>
          {{ item.guide }}
        </td>
        <td>
          {{ item.type }}
        </td>
        <td>
          {{ item.grossWeight }}
        </td>
        <td>
          {{ item.client }}
        </td>
        <td>
          {{ item.tracking }}
        </td>
        <td>
          {{ item.description }}
        </td>
        <td class="text-gray-400">
          {{ getFormattedDate(item.createdAt) }}
        </td>
      </tr>
    </template>
  </TheTable>
  <PaginationComponent
    :pages="mailPackages.pages"
    :page="mailPackages.current"
    @selected="getThisPage"
  />
</template>
