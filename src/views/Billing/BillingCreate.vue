<template>
  <loading v-model:active="isLoading" color="#2563eb" loader="dots" />

  <header class="flex items-center justify-between mb-4 h-14">
    <span class="font-bold text-2xl">Nueva</span>
  </header>

  <div class="grid grid-cols-2 gap-4">
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

      <div v-if="!selectedPackages.length" class="text-center text-gray-500">
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
            <td>${{ item.amount }}</td>
          </tr>
        </template>
      </TheTable>

      <InputForm text="Total pagado" name="total" v-model.number="form.paid" />

      <div class="grid grid-cols-2 gap-4">
        <InputForm text="Referencia" name="reference" type="number" v-model="form.reference" />
        <SelectForm text="Banco" name="bank" v-model="form.bank">
          <option value="">Seleccionar banco</option>
          <option v-for="item in banks" :value="item" :key="item">
            {{ item }}
          </option>
        </SelectForm>
      </div>

      <div class="text-sm text-red-400 mb-4">
        Por favor, verifique los datos antes de guardar la factura ya que no se podrán modificar posteriormente.
      </div>

      <div class="flex justify-end gap-4">
        <BtnSecondary>Cancelar</BtnSecondary>
        <BtnPrimary @click="onSubmit" :loading="processing"> Guardar </BtnPrimary>
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
import type { IBilling, IPackage, ISummary } from '@/types'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import usePackage from '@/composables/usePackage'
import PackageCard from '@/components/PackageCard.vue'
import TheTable from '@/components/Table/TheTable.vue'
import SelectForm from '@/components/Form/SelectForm.vue'
import useBilling from '@/composables/useBilling'

const isLoading = ref<boolean>(false)
const selectedPackages = ref<IPackage[]>([])

const { getPackages, packages } = usePackage()
const { storeBilling, processing } = useBilling()

onMounted(() => getPackages())

const prices = [
  { type: 'AEREO', value: 7 },
  { type: 'MARITIMO', value: 3 }
]

const banks = ["BAC", "LAFISE", "BANPRO", "FICOHSA", "ZELLE"]

const total = ref<ISummary[]>([
  { type: 'AEREO', weight: 0, amount: 0, count: 0 },
  { type: 'MARITIMO', weight: 0, amount: 0, count: 0 },
  { type: 'TOTAL', weight: 0, amount: 0, count: 0 },
])

const queryParams = ref({
  search: ''
})

const form = ref<IBilling>({
  client: '',
  packages_ids: [],
  paid: 0,
  reference: '',
  bank: '',
  summary: []
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

  if (!form.value.reference) {
    toast.error('Ingrese una referencia')
    return
  }

  if (!form.value.bank) {
    toast.error('Seleccione un banco')
    return
  }

  form.value.summary = total.value
  form.value.packages_ids = selectedPackages.value.map((item) => item.id) as string[]

  storeBilling(form.value)
}

function calculateTotal() {
  prices.forEach((price) => {
    const filtered = selectedPackages.value.filter((item) => item.type === price.type)
    const totalWeight = filtered.reduce((acc, item) => acc + item.grossWeight, 0)

    const currentTotal = total.value.find((item) => item.type === price.type)

    if (!currentTotal) return

    currentTotal.weight = Math.round(totalWeight * 100) / 100
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

  form.value.paid = Math.round(total.value.reduce((acc, item) => acc + item.amount, 0) * 100) / 100

  const summaryTotal = total.value.find((item) => item.type === "TOTAL")

  if (summaryTotal) {
    summaryTotal.weight = Math.round(total.value.reduce((acc, item) => acc + item.weight, 0) * 100) / 100
    summaryTotal.count = selectedPackages.value.length
    summaryTotal.amount = form.value.paid
  }
}

</script>