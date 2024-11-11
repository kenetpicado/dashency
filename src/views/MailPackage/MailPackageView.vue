<script setup lang="ts">
import { onMounted } from 'vue'
import usePackage from '@/composables/usePackage'
import TheTable from '@/components/Table/TheTable.vue'
import SelectForm from '@/components/Form/SelectForm.vue'
import InputForm from '@/components/Form/InputForm.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { watchDebounced } from '@vueuse/core'

const { getMailPackages, mailPackages, queryParams } = usePackage()

onMounted(async () => {
  await getMailPackages()
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

  <div class="grid grid-cols-4 gap-4 mb-4">
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
      <th>Paquete</th>
      <th>Tipo</th>
      <th>Peso</th>
    </template>
    <template #body>
      <tr v-if="!mailPackages.data.length">
        <td colspan="4" class="text-center">No hay paquetes</td>
      </tr>
      <tr v-for="(item, index) in mailPackages.data" :key="index" class="hover:bg-gray-50">
        <td>
          {{ item.guide }}
        </td>
        <td>
          <div class="mb-1 font-bold">
            {{ item.tracking }}
          </div>
          <div class="mb-1">
            {{ item.client }}
          </div>
          <div v-if="item.description" class="text-sm text-gray-400">
            {{ item.description }}
          </div>
        </td>
        <td>
          {{ item.type }}
        </td>
        <td>
          {{ item.grossWeight }}
        </td>
      </tr>
    </template>
  </TheTable>
  <PaginationComponent :pages="mailPackages.pages" :page="mailPackages.current" @selected="getThisPage" />
</template>
