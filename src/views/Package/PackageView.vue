<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Paquetes</span>
  </header>

  <div class="grid grid-cols-4 gap-4 mb-4">
    <SelectForm text="Tipo" name="type" v-model="queryParams.type">
      <option value="">Selecciona un tipo</option>
      <option value="AEREO">AEREO</option>
      <option value="MARITIMO">MARITIMO</option>
    </SelectForm>
  </div>

  <TheTable>
    <template #header>
      <th>Guia</th>
      <th>Cliente</th>
      <th>Descripción</th>
      <th>Peso (lbs)</th>
      <th>Tipo</th>
      <th>Ingreso</th>
      <th>Estado</th>
    </template>
    <template #body>
      <tr v-if="!packages?.length">
        <td colspan="7" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in packages" :key="index" class="hover:bg-gray-50">
        <td>
          {{ item.guide }}
        </td>
        <td>
          {{ item.client }}
        </td>
        <td>
          {{ item.description }} ({{ item.pieces }})
        </td>
        <td>
          {{ item.grossWeight }}
        </td>
        <td>
          {{ item.type }}
        </td>
        <td>
          {{ item.entryDate }}
        </td>
        <td>
          <span class="bg-red-50 text-red-600 px-3 py-1 rounded-lg">
            {{ item.status }}
          </span>
        </td>
      </tr>
    </template>
  </TheTable>
</template>

<script setup lang="ts">
import TheTable from '@/components/Table/TheTable.vue'
import { onMounted, watch } from 'vue'
import usePackage from '@/composables/usePackage'
import SelectForm from '@/components/Form/SelectForm.vue';

const { getPackages, packages, queryParams } = usePackage()

onMounted(() => getPackages())

watch(() => queryParams.value, () => getPackages(), { deep: true })
</script>
