<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Paquetes</span>
  </header>

  <div class="grid grid-cols-4 gap-4 mb-4">
    <SelectForm text="Tipo" name="type" v-model="queryParams.type">
      <option value="">Todos</option>
      <option value="AEREO">AEREO</option>
      <option value="MARITIMO">MARITIMO</option>
    </SelectForm>
    <SelectForm text="Estado" name="status" v-model="queryParams.status">
      <option value="">Todos</option>
      <option value="REGISTRADO">REGISTRADO</option>
    </SelectForm>
    <InputForm text="Cliente" name="client" v-model="queryParams.client" placeholder="Nombre del cliente" />
    <InputForm text="Guía" name="guide" v-model="queryParams.guide" placeholder="Número de guia" type="number" />
  </div>

  <TheTable>
    <template #header>
      <th>Detalles</th>
      <th>Peso (lbs)</th>
      <th>Tipo</th>
      <th>Estado</th>
      <th>Ingreso</th>
    </template>
    <template #body>
      <tr v-if="!packages?.length">
        <td colspan="7" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in packages" :key="index" class="hover:bg-gray-50">
        <td>
          <div class="mb-2">
            <span class="text-blue-600">{{ item.guide }}</span> - {{ item.client }}
          </div>
          <div class="text-sm text-gray-500">
           ({{ item.pieces }}) {{ item.description }}
          </div>
        </td>
        <td>
          {{ item.grossWeight }}
        </td>
        <td>
          {{ item.type }} {{ item.type == 'MARITIMO' ? '🚢' : '✈️'}}
        </td>
        <td>
          <span class="bg-red-100 text-red-600 px-3 py-1 rounded-lg">
            {{ item.status }}
          </span>
        </td>
        <td>
          {{ item.entryDate }}
        </td>
      </tr>
    </template>
  </TheTable>
</template>

<script setup lang="ts">
import TheTable from '@/components/Table/TheTable.vue'
import { onMounted } from 'vue'
import usePackage from '@/composables/usePackage'
import SelectForm from '@/components/Form/SelectForm.vue';
import InputForm from '@/components/Form/InputForm.vue';
import { watchDebounced } from '@vueuse/core'

const { getPackages, packages, queryParams } = usePackage()

onMounted(() => getPackages())

watchDebounced(
  queryParams.value,
  () => getPackages(),
  { debounce: 700, maxWait: 1000 },
)

</script>
