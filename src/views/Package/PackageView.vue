<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Paquetes</span>
  </header>

  <DialogForm title="Paquete" :isOpen="openModal">
    <form @submit.prevent="onSubmit()" class="flex flex-col gap-4">
      <InputForm text="Cliente" name="client" v-model="form.client" required />
      <InputForm text="Descripción" name="description" v-model="form.description" required />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InputForm text="Piezas" name="pieces" v-model="form.pieces" type="number" required />
        <InputForm
          text="Peso (lbs)"
          name="grossWeight"
          v-model="form.grossWeight"
          type="number"
          required
        />
      </div>

      <div class="modal-action">
        <BtnSecondary @click="resetValues">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :loading="processing"> Actualizar </BtnPrimary>
      </div>
    </form>
  </DialogForm>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
    <SelectForm text="Tipo" name="type" v-model="queryParams.type">
      <option value="">Todos</option>
      <option v-for="price in prices" :value="price.type" :key="price.id">{{ price.type }}</option>
    </SelectForm>
    <SelectForm text="Estado" name="status" v-model="queryParams.status">
      <option value="">Todos</option>
      <option v-for="item in status" :value="item" :key="item">{{ item }}</option>
    </SelectForm>
    <InputForm text="Ingreso" name="entryDate" v-model="queryParams.entryDate" type="date" />
  </div>

  <span v-if="processing" class="loading loading-spinner loading-lg mx-auto flex items-center"></span>

  <div v-else-if="!packages.data.length" class="text-center my-3 text-gray-400">
    No hay datos que mostrar
  </div>

  <div
    v-else
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
  >
    <PackageCard
      v-for="(item, index) in packages.data"
      :item="item"
      :key="index"
      :showIcon="item.status === 'REGISTRADO'"
      :icon="IconEdit"
      @selectedItem="editPackage"
    />
  </div>

  <PaginationComponent :pages="packages.pages" :page="packages.current" @selected="getThisPage" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import usePackage from '@/composables/usePackage'
import SelectForm from '@/components/Form/SelectForm.vue'
import InputForm from '@/components/Form/InputForm.vue'
import { watchDebounced } from '@vueuse/core'
import PackageCard from '@/components/PackageCard.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import status from '@/utils/status'
import usePrice from '@/composables/usePrice'
import { IconEdit } from '@tabler/icons-vue'
import type { IPackage } from '@/types'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import DialogForm from '@/components/Form/DialogForm.vue'

const { getPackages, packages, queryParams, processing, updatePackage } = usePackage()
const { prices, getPrices } = usePrice()

const openModal = ref<boolean>(false)

const form = ref<IPackage>({
  guide: '',
  client: '',
  description: '',
  pieces: 0,
  grossWeight: 0,
  entryDate: ''
})

onMounted(() => {
  getPackages()
  getPrices()
})

watchDebounced(queryParams.value, () => getPackages(), { debounce: 700, maxWait: 1000 })

function getThisPage(page: number) {
  queryParams.value.page = page
}

function editPackage(item: IPackage) {
  form.value = { ...item }
  openModal.value = true
}

function resetValues() {
  form.value = {
    guide: '',
    client: '',
    description: '',
    pieces: 0,
    grossWeight: 0,
    entryDate: ''
  }
  openModal.value = false
}

function onSubmit() {
  updatePackage(form.value, () => {
    resetValues()
    getPackages()
  })
}
</script>
