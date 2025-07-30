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

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

  <TheTable>
    <template #header>
      <th>Guia</th>
      <th>Tipo</th>
      <th>Peso</th>
      <th>Piezas</th>
      <th>Estado</th>
      <th>Cliente</th>
      <th>Descripción</th>
      <th>Fecha Ingreso</th>
      <th>Fecha</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="!packages.data.length">
        <td colspan="10" class="text-center">No hay paquetes</td>
      </tr>
      <tr v-for="(item, index) in packages.data" :key="index" class="hover:bg-gray-50">
        <td>
          {{ item.guide }}
        </td>
        <td>
          {{ item.type }}
        </td>
        <td>{{ item.grossWeight }} lb(s)</td>
        <td>
          {{ item.pieces }}
        </td>
        <td>
          {{ item.status }}
        </td>
        <td>
          {{ item.client }}
        </td>
        <td>
          {{ item.description }}
        </td>
        <td>
          <span v-if="item.entryDate">
            {{ getFormattedDate(item.entryDate, 'DD/MM/YY') }}
          </span>
        </td>
        <td class="text-gray-400">
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>
          <button type="button" @click="editPackage(item)">
            <IconEdit size="25" />
          </button>
        </td>
      </tr>
    </template>
  </TheTable>

  <PaginationComponent :pages="packages.pages" :page="packages.current" @selected="getThisPage" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import usePackage from '@/composables/usePackage'
import SelectForm from '@/components/Form/SelectForm.vue'
import InputForm from '@/components/Form/InputForm.vue'
import { watchDebounced } from '@vueuse/core'
import PaginationComponent from '@/components/PaginationComponent.vue'
import status from '@/utils/status'
import usePrice from '@/composables/usePrice'
import { IconEdit } from '@tabler/icons-vue'
import type { IPackage } from '@/types'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import TheTable from '@/components/Table/TheTable.vue'
import getFormattedDate from '@/utils/date'

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
