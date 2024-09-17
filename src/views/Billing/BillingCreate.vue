<template>
  <loading v-model:active="processing" color="#2563eb" loader="dots" />
  <loading v-model:active="searching" color="#2563eb" loader="dots" />

  <header class="flex items-center justify-between mb-4 h-14">
    <span class="font-bold text-2xl">Nueva</span>
  </header>

  <div class="grid grid-cols-2 gap-4">
    <div>
      <div class="text-lg mb-2 font-bold">Buscar paquetes</div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <InputForm
          text="Cliente"
          name="search"
          type="search"
          v-model="queryParams.client"
          placeholder="Nombre del cliente"
        />
        <InputForm
          text="Guía"
          name="search"
          type="search"
          v-model="queryParams.guide"
          placeholder="Número de guía"
        />
      </div>
      <div v-if="!filteredPackages.length" class="text-center text-gray-400">
        No hay datos que mostrar
      </div>
      <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <PackageCard
          v-for="(item, index) in filteredPackages"
          :item="item"
          :key="index"
          :showIcon="true"
          @selectedItem="addPackage"
        />
      </div>
    </div>

    <div>
      <div class="text-lg mb-2 font-bold">Datos de la factura</div>

      <div v-if="!selectedPackages.length" class="text-center text-gray-400 mb-8">
        No hay paquetes seleccionados
      </div>

      <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-8">
        <PackageCard
          v-for="(item, index) in selectedPackages"
          :item="item"
          :key="index"
          :showIcon="true"
          :icon="IconTrash"
          @selectedItem="removePackage(index)"
        />
      </div>

      <TheTable class="mb-4">
        <template #header>
          <th>Tipo</th>
          <th>Peso total</th>
          <th>Paquetes</th>
          <th>Precio</th>
          <th>Total a pagar</th>
        </template>
        <template #body>
          <tr v-if="summary.length == 0">
            <td colspan="5" class="text-center">No hay datos que mostrar</td>
          </tr>
          <tr v-for="(item, index) in summary" :key="index">
            <td>{{ item.type }}</td>
            <td>{{ item.weight }} lbs</td>
            <td>{{ item.count }}</td>
            <td>
              <span v-if="item.price"> ${{ item.price }} </span>
            </td>
            <td>${{ item.amount }}</td>
          </tr>
        </template>
      </TheTable>

      <form @submit.prevent="onSubmit()">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <InputForm
            text="Cliente"
            name="client"
            v-model="form.client"
            placeholder="Nombre del cliente"
            required
          />
          <InputForm
            text="Notas (Opcional)"
            name="notes"
            v-model="form.notes"
            placeholder="Notas"
          />

          <SelectForm text="Cuenta" name="account" v-model="form.account" required>
            <option value="">Seleccionar cuenta</option>
            <option v-for="item in accounts" :value="item.id" :key="item.id">
              {{ item.type }} - {{ item.number }}
            </option>
          </SelectForm>
          <InputForm
            text="Referencia"
            name="reference"
            type="number"
            v-model="form.reference"
            placeholder="Código o referencia"
            required
          />

          <InputForm
            text="Costo delivery (Opcional)"
            name="delivery"
            v-model.number="form.delivery"
            placeholder="Costo del delivery"
            type="number"
          />
          <InputForm
            text="Dirección de entrega"
            name="address"
            v-model="form.address"
            placeholder="Direccion de entrega"
          />

          <InputForm
            text="Importe extra (Opcional)"
            name="fee"
            v-model.number="form.fee"
            placeholder="Importe extra"
            type="number"
          />
          <InputForm
            text="Total pagado"
            name="total"
            v-model.number="form.total"
            type="number"
            required
          />
        </div>

        <div class="text-sm text-gray-400 mb-4">
          Por favor, verifique los datos antes de guardar la factura ya que no se podrán modificar
          posteriormente.
        </div>

        <div v-if="errorMessage" class="bg-red-100 p-4 rounded-lg text-red-600">
          {{ errorMessage }}
        </div>

        <div v-else class="flex justify-end gap-4">
          <BtnSecondary>Cancelar</BtnSecondary>
          <BtnPrimary type="submit" :loading="processing"> Guardar </BtnPrimary>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import { computed, onMounted, ref, watch } from 'vue'
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
import usePrice from '@/composables/usePrice'
import useAccount from '@/composables/useAccount'
import { watchDebounced } from '@vueuse/core'

const selectedPackages = ref<IPackage[]>([])

const { getPackages, packages, queryParams, processing: searching } = usePackage()
const { storeBilling, processing } = useBilling()
const { prices, getPrices } = usePrice()
const { accounts, getAccounts, queryParams: accountParams } = useAccount()

const summary = ref<ISummary[]>([])
const errorMessage = ref<string>('')

const form = ref<IBilling>({
  client: '',
  packages_ids: [],
  total: 0,
  reference: '',
  account: '',
  summary: [],
  subTotal: 0,
  delivery: 0,
  fee: 0,
  address: '',
  notes: ''
})

function addPackage(item: IPackage) {
  selectedPackages.value.push(item)

  if (selectedPackages.value.length === 1) {
    form.value.client = item.client
  }

  updateSummary()
}

function removePackage(index: number) {
  selectedPackages.value.splice(index, 1)

  if (!selectedPackages.value.length) {
    form.value.client = ''
  }

  updateSummary()
}

const filteredPackages = computed(() => {
  return packages.value.data.filter((item) => {
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

  if (!form.value.account) {
    toast.error('Seleccione una cuenta')
    return
  }

  form.value.summary = summary.value
  form.value.packages_ids = selectedPackages.value.map((item) => item.id) as string[]

  storeBilling(form.value)
}

function updateSummary() {
  errorMessage.value = ''

  //Separar los paquetes por tipo
  const uniqueTypes = new Set(selectedPackages.value.map((item) => item.type))
  const temporalSummary = ref<ISummary[]>([])

  uniqueTypes.forEach((type) => {
    //Obtener el precio del tipo de envio actual
    const priceType = prices.value.find((item) => item.type === type)?.value || 0

    if (!priceType) {
      errorMessage.value = `No se encontró un precio para el tipo de envío ${type}, por favor registre uno`
      return
    }

    //Obtener todos los paquetes del tipo actual
    const currentTypePackages = selectedPackages.value.filter((item) => item.type === type)

    //Obtener el peso total de los paquetes del tipo actual
    const totalWeight = currentTypePackages.reduce((acc, item) => acc + item.grossWeight, 0)
    const roundedWeight = Math.round(totalWeight * 100) / 100

    const finishPrice = roundedWeight < 1 ? priceType : priceType * roundedWeight
    const roundedPrice = Math.round(finishPrice * 100) / 100

    const data = {
      type: type as string,
      weight: roundedWeight,
      count: currentTypePackages.length,
      price: priceType,
      amount: roundedPrice
    }

    temporalSummary.value.push(data)
  })

  //obtener el total de los paquetes donde type sea diferente a TOTAL
  const totalSummaryWeight = temporalSummary.value.reduce((acc, item) => acc + item.weight, 0)
  const totalSummaryAmount = temporalSummary.value.reduce((acc, item) => acc + item.amount, 0)

  const data = {
    type: 'TOTAL',
    weight: Math.round(totalSummaryWeight * 100) / 100,
    count: selectedPackages.value.length,
    amount: Math.round(totalSummaryAmount * 100) / 100
  }

  temporalSummary.value.push(data)

  form.value.subTotal = data.amount
  form.value.total = data.amount + (form.value?.delivery ?? 0) + (form.value?.fee ?? 0)
  summary.value = temporalSummary.value
}

onMounted(() => {
  packages.value.data = []
  accountParams.value.status = 'ACTIVO'
  getPrices()
  getAccounts()
})

watchDebounced(queryParams.value, () => getPackages(), { debounce: 500, maxWait: 1000 })

watch(
  () => [form.value.delivery, form.value.fee],
  () => {
    form.value.total = form.value.subTotal + (form.value?.delivery ?? 0) + (form.value?.fee ?? 0)
  }
)
</script>
