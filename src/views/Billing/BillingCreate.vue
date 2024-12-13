<template>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <div class="text-lg mb-2 font-bold">Paquetes</div>
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
      <div v-if="searching" class="w-full flex justify-center mb-4">
        <LoadingAnimation />
      </div>
      <div v-else-if="!filteredPackages.length" class="text-center text-gray-400">
        No hay datos que mostrar
      </div>
      <TheTable v-else>
        <template #header>
          <th>Guia</th>
          <th>Cliente</th>
          <th>Tipo</th>
          <th>Peso</th>
          <th></th>
        </template>
        <template #body>
          <tr v-for="(item, index) in filteredPackages" :key="index">
            <td>
              {{ item.guide }}
            </td>
            <td>
              <div>
                {{ item.client }}
              </div>
              <div class="mt-1 text-xs text-gray-400">{{ item.description }}</div>
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
        </template>
      </TheTable>
    </div>

    <div>
      <div class="text-lg mb-2 font-bold">Factura</div>

      <div v-if="!selectedPackages.length" class="text-center text-gray-400 my-8">
        No hay paquetes seleccionados
      </div>

      <TheTable v-else>
        <template #header>
          <th>Guia</th>
          <th>Cliente</th>
          <th>Tipo</th>
          <th>Peso</th>
          <th></th>
        </template>
        <template #body>
          <tr v-for="(item, index) in selectedPackages" :key="index">
            <td>
              {{ item.guide }}
            </td>
            <td>
              <div>
                {{ item.client }}
              </div>
              <div class="mt-1 text-xs text-gray-400">{{ item.description }}</div>
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
        </template>
      </TheTable>

      <div class="my-8"></div>

      <div class="mb-4">
        <details class="bg-white border collapse collapse-arrow">
          <summary class="collapse-title text-base !font-bold font-medium">Precios</summary>
          <div class="collapse-content">
            <div class="grid grid-cols-2 gap-4">
              <InputForm
                v-for="item in localPrices"
                :key="item.id"
                :text="item.type"
                :name="item.type"
                v-model.number="item.value"
                placeholder="Precio"
                type="number"
              />
            </div>
          </div>
        </details>
      </div>

      <TheTable>
        <template #header>
          <th>Envío</th>
          <th>Peso total</th>
          <th>Paquetes</th>
          <th>Precio lb</th>
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
            <td class="font-bold">
              <span class=""> ${{ item.amount }} </span>
            </td>
          </tr>
        </template>
      </TheTable>

      <form @submit.prevent="onSubmit()" class="mt-4">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <InputForm
            text="Cliente"
            name="client"
            v-model="form.client"
            placeholder="Nombre del cliente"
            required
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
        </div>

        <details class="bg-white border collapse collapse-arrow">
          <summary class="collapse-title text-base !font-bold font-medium">Otros datos</summary>
          <div class="collapse-content">
            <div class="grid grid-cols-2 gap-4">
              <InputForm
                text="Costo envío terrestre (Opcional)"
                name="delivery"
                v-model.number="form.delivery"
                placeholder="Costo del delivery"
                type="number"
              />
              <InputForm
                text="Dirección de entrega (Opcional)"
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
                text="Notas (Opcional)"
                name="notes"
                v-model="form.notes"
                placeholder="Notas"
              />
            </div>
          </div>
        </details>

        <div class="text-sm text-gray-400 my-4">
          Por favor, verifique los datos antes de guardar la factura ya que no se podrán modificar
          posteriormente.
        </div>

        <div v-if="errorMessage" class="bg-red-100 p-4 rounded-lg text-red-600">
          {{ errorMessage }}
        </div>

        <div v-else class="flex justify-end gap-4">
          <BtnPrimary type="submit" :loading="processing"> Guardar </BtnPrimary>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import { computed, onMounted, ref, watch } from 'vue'
import InputForm from '@/components/Form/InputForm.vue'
import { IconTrash, IconChevronRight } from '@tabler/icons-vue'
import toast from '@/utils/toast'
import type { IBilling, IPackage, IPrice, ISummary } from '@/types'
import 'vue-loading-overlay/dist/css/index.css'
import usePackage from '@/composables/usePackage'
import TheTable from '@/components/Table/TheTable.vue'
import SelectForm from '@/components/Form/SelectForm.vue'
import useBilling from '@/composables/useBilling'
import usePrice from '@/composables/usePrice'
import useAccount from '@/composables/useAccount'
import { watchDebounced } from '@vueuse/core'
import LoadingAnimation from '@/components/Buttons/LoadingAnimation.vue'

const selectedPackages = ref<IPackage[]>([])

const { getPackages, packages, queryParams, processing: searching } = usePackage()
const { storeBilling, processing } = useBilling()
const { prices, getPrices } = usePrice()
const { accounts, getAccounts, queryParams: accountParams } = useAccount()

const summary = ref<ISummary[]>([])
const errorMessage = ref<string>('')
const localPrices = ref<IPrice[]>([])

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
  packages.value.data = []
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
