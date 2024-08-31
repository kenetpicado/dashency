<template>
  <loading v-model:active="isLoading" color="#2563eb" loader="dots" />

  <header class="flex items-center justify-between mb-4 h-14">
    <span class="font-bold text-2xl">Nueva</span>
  </header>

  <div class="grid grid-cols-2 gap-8">
    <div>
      <div class="text-lg mb-2 font-bold">
        Paquetes
      </div>
      <InputForm text="Buscar" name="search" v-model="queryParams.search" placeholder="Buscar por guía o cliente" />
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <PackageCard v-for="(item, index) in filteredPackages" :item="item" :key="index" :showIcon="true"
          @selectedItem="addPackage" />
      </div>
    </div>
    <div>
      <div class="text-lg mb-2 font-bold">
        Factura
      </div>

      <InputForm text="Cliente" name="client" v-model="form.client" />

      <div v-if="!selectedPackages.length" class="text-center text-gray-500 my-4">
        No hay paquetes seleccionados
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        <PackageCard v-for="(item, index) in selectedPackages" :item="item" :key="index" :showIcon="true"
          :icon="IconTrash" @selectedItem="removePackage(index)" />
      </div>

      <TheTable class="mb-4">
        <template #header>
          <th>Tipo</th>
          <th>Peso total</th>
          <th>Paquetes</th>
          <th>Total a pagar</th>
        </template>
        <template #body>
          <tr v-for="(item, index) in total" :key="index">
            <td>{{ item.type }}</td>
            <td>{{ item.weight }} lbs</td>
            <td>{{ item.count }}</td>
            <td>$ {{ item.amount }}</td>
          </tr>
          <tr>
            <td class="font-bold">Total</td>
            <td class="font-bold">
              {{ total.reduce((acc, item) => acc + item.weight, 0) }} lbs
            </td>
            <td class="font-bold">{{ selectedPackages.length }}</td>
            <td class="font-bold">
              $ {{ total.reduce((acc, item) => acc + item.amount, 0) }}
            </td>
          </tr>
        </template>
      </TheTable>

      <InputForm text="Total pagado" name="total" v-model="form.paid" class="mb-4" />

      <div class="flex justify-end gap-4">
        <BtnSecondary>Cancelar</BtnSecondary>
        <BtnPrimary @click="onSubmit" :loading="false"> Guardar </BtnPrimary>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import { computed, onMounted, ref } from 'vue'
import InputForm from '@/components/Form/InputForm.vue'
import { IconTrash } from '@tabler/icons-vue'
import toast from '@/utils/toast'
import type { IPackage } from '@/types'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import usePackage from '@/composables/usePackage'
import PackageCard from '@/components/PackageCard.vue'
import TheTable from '@/components/Table/TheTable.vue'

const isLoading = ref<boolean>(false)
const selectedPackages = ref<IPackage[]>([])

const prices = [
  { type: 'AEREO', value: 7 },
  { type: 'MARITIMO', value: 3 }
]

const total = ref([
  { type: 'AEREO', weight: 0, amount: 0, count: 0 },
  { type: 'MARITIMO', weight: 0, amount: 0, count: 0 }
])

const queryParams = ref({
  search: ''
})

const form = ref({
  client: '',
  grossWeightTotal: 0,
  amount: 0,
  packages: [],
  paid: 0
})

function addPackage(item: IPackage) {
  selectedPackages.value.push(item)

  if (selectedPackages.value.length === 1) {
    form.value.client = item.client
  }

  calculateTotal()
}

function removePackage(index: number) {
  selectedPackages.value.splice(index, 1)

  if (!selectedPackages.value.length) {
    form.value.client = ''
  }

  calculateTotal()
}

const { getPackages, packages } = usePackage()

onMounted(() => getPackages())

const filteredPackages = computed(() => {
  return packages.value.filter((item) => {
    return !selectedPackages.value.find((selected) => selected.id === item.id)
  })
})

function onSubmit() {
  if (!form.value.client) {
    toast.error('Debe ingresar el nombre del cliente')
    return
  }

  if (!selectedPackages.value.length) {
    toast.error('Debe seleccionar al menos un paquete')
    return
  }

  if (!form.value.grossWeightTotal || form.value.grossWeightTotal <= 0) {
    toast.error('El peso total debe ser mayor a 0')
    return
  }

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    toast.success('Factura creada correctamente')
  }, 2000)
}

function calculateTotal() {
  prices.forEach((price) => {
    const filtered = selectedPackages.value.filter((item) => item.type === price.type)
    const totalWeight = filtered.reduce((acc, item) => acc + item.grossWeight, 0)

    const currentTotal = total.value.find((item) => item.type === price.type)

    if (!currentTotal) return

    currentTotal.weight = totalWeight
    currentTotal.count = filtered.length

    if (totalWeight == 0) {
      currentTotal.amount = 0
      return
    }

    if (totalWeight < 1) {
      currentTotal.amount = price.value
    } else {
      currentTotal.amount = Math.round((price.value * totalWeight) * 100) / 100
    }
  })

  form.value.paid = total.value.reduce((acc, item) => acc + item.amount, 0)
}

</script>
