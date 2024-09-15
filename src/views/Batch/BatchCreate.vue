<template>
  <loading v-model:active="isLoading" color="#2563eb" loader="dots" />

  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Nuevo</span>
    <BtnSecondary @click="openInputFile">
      <IconUpload size="20" />
      Subir archivo
    </BtnSecondary>
  </header>

  <input
    type="file"
    id="excelFileInput"
    class="hidden"
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    @change="onChange"
  />

  <div v-if="workerStatus == 'ERROR'" class="bg-red-100 p-4 rounded-lg text-red-600 mb-4">
    No se pudo procesar tu archivo ya que tiene errores, por favor, revisa y vuelve a intentarlo.
    <br />
    {{ errorMesage }}
  </div>

  <TheTable class="mb-4">
    <template #header>
      <th>Guia</th>
      <th>Descripción</th>
      <th>Piezas</th>
      <th>Peso (lbs)</th>
      <th>Cliente</th>
      <th>Ingreso</th>
    </template>
    <template #body>
      <tr v-if="!form.packages.length">
        <td colspan="6" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-else v-for="(item, index) in form.packages" :key="index" class="hover:bg-gray-50">
        <td>
          {{ item.guide }}
        </td>
        <td class="truncate max-w-[5rem]">
          {{ item.description }}
        </td>
        <td>
          {{ item.pieces }}
        </td>
        <td>
          <input
            type="number"
            class="border-gray-300 rounded-lg block w-full transition duration-300 ease-in-out"
            v-model="item.grossWeight"
          />
        </td>
        <td>
          <input
            type="text"
            class="border-gray-300 rounded-lg block w-full transition duration-300 ease-in-out"
            v-model="item.client"
          />
        </td>
        <td>
          {{ item.entryDate }}
        </td>
      </tr>
    </template>
  </TheTable>
  <div class="grid grid-cols-4 gap-4">
    <InputForm text="Total" name="total" v-model="form.total" type="number" />
    <InputForm text="Código o referencia" name="code" v-model="form.code" />
    <SelectForm text="Tipo de lote" name="type" v-model="form.type">
      <option value="">Selecciona un tipo</option>
      <option v-for="price in prices" :value="price.type" :key="price.id">{{ price.type }}</option>
    </SelectForm>
  </div>
  <div class="flex justify-end gap-4">
    <BtnSecondary>Cancelar</BtnSecondary>
    <BtnPrimary @click="onSubmit" :loading="processing">Guardar</BtnPrimary>
  </div>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import { onMounted, ref } from 'vue'
import TheTable from '@/components/Table/TheTable.vue'
import InputForm from '@/components/Form/InputForm.vue'
import { IconUpload } from '@tabler/icons-vue'
import toast from '@/utils/toast'
import type { IBatch, IPackage } from '@/types'
import useBatch from '@/composables/useBatch'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import * as XLSX from 'xlsx'
import { useWebWorkerFn } from '@vueuse/core'
import SelectForm from '@/components/Form/SelectForm.vue'
import usePrice from '@/composables/usePrice'

const isLoading = ref<boolean>(false)

const { storeBatch, processing } = useBatch()
const { prices, getPrices } = usePrice()

const errorMesage = ref<string>('')

const form = ref<IBatch>({
  total: 0,
  type: '',
  packages: [],
  code: ''
})

onMounted(() => {
  getPrices()
})

const { workerFn, workerStatus } = useWebWorkerFn(
  async (file: File) => {
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: 'array', cellDates: true, dateNF: 'dd/mm/yyyy' })
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

    const requiredFields = [
      'Guide',
      'Description',
      'Pieces',
      'Gross Weight',
      'Client',
      'FechaIngreso'
    ]

    return jsonData
      .filter((item: any) => item.Guide)
      .map((item: any) => {
        const missingFields = requiredFields.filter((field) => !(field in item))

        if (missingFields.length) {
          throw new Error('Los campos ' + missingFields.join(', ') + ' son requeridos')
        }

        let formattedDate = ''

        if (typeof item['FechaIngreso'] === 'string') {
          const dateArray = item['FechaIngreso'].split('/').map((item) => item.padStart(2, '0'))
          formattedDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
        } else {
          formattedDate = `${item['FechaIngreso'].getFullYear()}-${(item['FechaIngreso'].getMonth() + 1).toString().padStart(2, '0')}-${item['FechaIngreso'].getDate().toString().padStart(2, '0')}`
        }

        return {
          guide: item['Guide'],
          description: item['Description'].toString().trim(),
          pieces: item['Pieces'],
          grossWeight: item['Gross Weight'],
          client: item['Client'].toString().trim(),
          entryDate: formattedDate
        } as IPackage
      }) as IPackage[]
  },
  {
    dependencies: ['https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js']
  }
)

function onChange(event: any) {
  errorMesage.value = ''
  isLoading.value = true

  workerFn(event.target.files[0])
    .then((packages: any) => {
      form.value.packages = packages as IPackage[]
    })
    .catch((error: any) => {
      errorMesage.value = error.message
    })
    .finally(() => {
      isLoading.value = false
    })
}

function onSubmit() {
  if (!form.value.packages.length) {
    toast.error('No hay paquetes')
    return
  }

  if (!form.value.total || form.value.total < 1) {
    toast.error('El total es requerido')
    return
  }

  if (!form.value.type) {
    toast.error('El tipo es requerido')
    return
  }

  if (!form.value.code) {
    toast.error('El código es requerido')
    return
  }

  storeBatch(form.value, () => {
    form.value.total = 0
    form.value.type = ''
    form.value.packages = []
  })
}

function openInputFile() {
  document.getElementById('excelFileInput')?.click()
}
</script>
