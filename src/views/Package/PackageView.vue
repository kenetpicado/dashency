<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Paquetes</span>
  </header>

  <div class="grid grid-cols-4 gap-4 mb-4">
    <InputForm text="Guía" name="guide" v-model="queryParams.guide" placeholder="Número de guia" type="number" />
    <InputForm text="Cliente" name="client" v-model="queryParams.client" placeholder="Nombre del cliente" />
    <SelectForm text="Tipo" name="type" v-model="queryParams.type">
      <option value="">Todos</option>
      <option value="AEREO">AEREO</option>
      <option value="MARITIMO">MARITIMO</option>
    </SelectForm>
    <SelectForm text="Estado" name="status" v-model="queryParams.status">
      <option value="">Todos</option>
      <option v-for="item in status" :value="item" :key="item">{{ item }}</option>
    </SelectForm>
    <InputForm text="Ingreso" name="entryDate" v-model="queryParams.entryDate" type="date" />
  </div>

  <div v-if="!packages.data.length" class="text-center my-3 text-gray-400">
    No hay datos que mostrar
  </div>

  <div v-if="packages.data.length" class="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
    <PackageCard v-for="(item, index) in packages.data" :item="item" :key="index" :showIcon="false" />
  </div>

  <PaginationComponent :pages="packages.pages" :page="packages.current" @selected="getThisPage" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import usePackage from '@/composables/usePackage'
import SelectForm from '@/components/Form/SelectForm.vue'
import InputForm from '@/components/Form/InputForm.vue'
import { watchDebounced } from '@vueuse/core'
import PackageCard from '@/components/PackageCard.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import status from '@/utils/status'

const { getPackages, packages, queryParams } = usePackage()

onMounted(() => getPackages())

watchDebounced(queryParams.value, () => getPackages(), { debounce: 700, maxWait: 1000 })

function getThisPage(page: number) {
  queryParams.value.page = page
}
</script>
