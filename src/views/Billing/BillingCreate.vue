<template>
  <form @submit.prevent="onSubmit" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="bg-white p-5 rounded-xl border flex flex-col gap-4">
      <div class="text-lg mb-2 font-bold">Buscar paquetes</div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
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
      <div class="h-96 overflow-y-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Guia</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Peso</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="searching">
              <td colspan="5" class="text-center">
                <IsLoading class="opacity-10" />
              </td>
            </tr>
            <tr v-else-if="!filteredPackages.length">
              <td colspan="5" class="text-center text-gray-400">No hay datos que mostrar</td>
            </tr>
            <tr v-for="(item, index) in filteredPackages" :key="index">
              <td>
                {{ item.guide }}
              </td>
              <td>
                {{ item.client }}
              </td>
              <td>
                {{ item.type }}
              </td>
              <td>
                {{ item.grossWeight }}
              </td>
              <td>
                <button
                  @click="addPackage(item)"
                  type="button"
                  class="bg-neutral rounded-full p-1 text-white"
                >
                  <IconChevronRight size="20" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="bg-white p-5 rounded-xl border flex flex-col gap-4">
      <div class="text-lg font-bold">Paquetes seleccionados</div>

      <div class="h-[31rem] overflow-y-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Guia</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Peso</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!selectedPackages.length">
              <td colspan="5" class="text-center text-gray-400">No hay paquetes seleccionados</td>
            </tr>
            <tr v-for="(item, index) in selectedPackages" :key="index">
              <td>
                {{ item.guide }}
              </td>
              <td>
                {{ item.client }}
              </td>
              <td>
                {{ item.type }}
              </td>
              <td>
                {{ item.grossWeight }}
              </td>
              <td>
                <button
                  @click="removePackage(index)"
                  type="button"
                  class="bg-error rounded-full p-1 text-white"
                >
                  <IconTrash size="20" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="bg-white p-5 rounded-xl border flex flex-col gap-4">
      <div class="text-lg font-bold">Datos de facturación</div>

      <div class="flex flex-col gap-4 mb-4">
        <InputForm
          text="Cliente"
          name="client"
          v-model="form.client"
          placeholder="Nombre del cliente"
          required
        />

        <div class="grid grid-cols-1 grid-cols-2 gap-4">
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
            text="Dirección de entrega (Opcional)"
            name="address"
            v-model="form.address"
            placeholder="Direccion de entrega"
          />

          <InputForm
            text="Notas (Opcional)"
            name="notes"
            v-model="form.notes"
            placeholder="Notas"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InputForm
          v-for="item in localPrices"
          :key="item.id"
          :text="`PRECIO ${item.type}`"
          :name="item.type"
          v-model.number="item.value"
          placeholder="Precio"
          type="number"
        />
      </div>
    </div>

    <div class="bg-white p-5 rounded-xl border flex flex-col gap-4">
      <div class="text-lg font-bold">Resumen</div>

      <table class="table table-fixed mb-4">
        <thead>
          <tr>
            <th>Envío</th>
            <th>Peso</th>
            <th>Paquetes</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in summary" :key="index">
            <td>{{ item.type }}</td>
            <td>{{ item.weight }} lbs</td>
            <td>{{ item.count }}</td>
            <td>${{ item.amount }}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <table class="table table-fixed mb-4 uppercase">
          <tbody>
            <tr>
              <td colspan="3">Subtotal</td>
              <td>${{ form.subTotal }}</td>
            </tr>
            <tr>
              <td colspan="3">Costo de envío ($)</td>
              <td>
                <InputForm
                  name="delivery"
                  v-model.number="form.delivery"
                  placeholder="$0"
                  type="number"
                />
              </td>
            </tr>
            <tr>
              <td colspan="3">Otros importes ($)</td>
              <td>
                <InputForm name="fee" v-model.number="form.fee" placeholder="$0" type="number" />
              </td>
            </tr>
            <tr>
              <td colspan="3" class="font-bold">Total</td>
              <td class="font-bold">$ {{ form.total }}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="errorMessage" class="bg-red-100 p-4 rounded-lg text-red-600 mb-4">
          {{ errorMessage }}
        </div>

        <div class="flex justify-end">
          <BtnPrimary type="submit" :loading="processing" :disabled="!!errorMessage">
            Generar factura
          </BtnPrimary>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import { computed, onMounted, ref, watch } from 'vue'
import InputForm from '@/components/Form/InputForm.vue'
import { IconTrash, IconChevronRight } from '@tabler/icons-vue'
import toast from '@/utils/toast'
import type { IPackage, IPrice, ISummary } from '@/types'
import 'vue-loading-overlay/dist/css/index.css'
import usePackage from '@/composables/usePackage'
import SelectForm from '@/components/Form/SelectForm.vue'
import useBilling from '@/composables/useBilling'
import usePrice from '@/composables/usePrice'
import useAccount from '@/composables/useAccount'
import { watchDebounced } from '@vueuse/core'
import IsLoading from '@/components/IsLoading.vue'

const selectedPackages = ref<IPackage[]>([])

const { getPackages, packages, queryParams, processing: searching, meta } = usePackage()
const { storeBilling, processing } = useBilling()
const { prices, getPrices } = usePrice()
const { accounts, getAccounts, queryParams: accountParams } = useAccount()

const summary = ref<ISummary[]>([])
const errorMessage = ref<string>('')
const localPrices = ref<IPrice[]>([])

const form = ref<any>({
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
  return packages.value.filter((item) => {
    return !selectedPackages.value.find((selected) => selected.id === item.id)
  })
})

function onSubmit() {
  if (!selectedPackages.value.length) {
    toast.error('Debe seleccionar al menos un paquete')
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
    const priceType = localPrices.value.find((item) => item.type === type)?.value || 0

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
  form.value.total = Math.round(form.value.total * 100) / 100
  summary.value = temporalSummary.value
}

onMounted(async () => {
  searching.value = true
  packages.value = []
  queryParams.value.status = 'REGISTRADO'
  accountParams.value.status = 'ACTIVO'
  await getPrices()
  getAccounts()

  localPrices.value = prices.value
})

watchDebounced(
  queryParams.value,
  () => {
    queryParams.value.status = 'REGISTRADO'
    meta.value.page = 1
    getPackages()
  },
  { debounce: 500, maxWait: 1000 }
)

watch(
  () => [form.value.delivery, form.value.fee],
  () => {
    form.value.total = form.value.subTotal + (form.value?.delivery ?? 0) + (form.value?.fee ?? 0)
  }
)

watch(
  () => localPrices.value,
  () => {
    updateSummary()
  },
  { deep: true }
)
</script>
