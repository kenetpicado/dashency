<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Nuevo</span>
    <BtnPrimary @click="inputFile.click()">
      <IconUpload size="20"/>
      Subir archivo
    </BtnPrimary>
  </header>

  <input type="file" ref="inputFile" class="hidden" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" @change="onChange" />

  <div
    v-if="uploadedFile?.errors.length"
    class="bg-red-50 p-4 rounded-lg text-red-600"
  >
    <div class="mb-4">
      No se pudo procesar tu archivo ya que tiene errores, por favor, revisa y
      vuelve a intentarlo.
    </div>
    <pre>{{ uploadedFile?.errors[0] }}</pre>
  </div>

  <TheTable v-else class="mb-4">
    <template #header>
      <th>Guia</th>
      <th>Descripción</th>
      <th>Piezas</th>
      <th>Peso (lbs)</th>
      <th>Cliente</th>
      <th>Ingreso</th>
    </template>
    <template #body>
      <tr v-if="!uploadedFile?.rows.length">
        <td colspan="6" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr
        v-else
        v-for="(item, index) in uploadedFile?.rows.sort(
          (a, b) => a.guide - b.guide
        )"
        :key="index"
        class="hover:bg-gray-50"
      >
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
            required
            class="border-gray-300 rounded-lg block w-full transition duration-300 ease-in-out"
            v-model="item.gross_weight"
          />
        </td>
        <td>
          {{ item.client }}
        </td>
        <td>
          {{ item.entry_date }}
        </td>
      </tr>
    </template>
  </TheTable>
  <div class="grid grid-cols-4">
    <InputForm
      text="Total"
      name="total"
      v-model="form.total"
      type="number"
    />
  </div>
  <div class="flex justify-end gap-4">
    <BtnSecondary>Cancelar</BtnSecondary>
    <BtnPrimary @click="onSubmit">Guardar</BtnPrimary>
  </div>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import readXlsxFile from 'read-excel-file'
import { ref } from 'vue'
import TheTable from '@/components/Table/TheTable.vue'
import InputForm from '@/components/Form/InputForm.vue'
import { IconUpload } from '@tabler/icons-vue'
import toast from "@/utils/toast"
import type { IBatch, IExcelFile } from '@/types'
import useBatch from '@/composables/useBatch'

const uploadedFile = ref<IExcelFile>({
  rows: [],
  errors: []
})

const inputFile = ref(null)
const { storeBatch } = useBatch()

const form = ref<IBatch>({
  total: 0,
  packages: []
})

const schema = {
  Guide: {
    prop: 'guide',
    required: true
  },
  Description: {
    prop: 'description',
    required: true
  },
  Pieces: {
    prop: 'pieces',
    required: true
  },
  'Gross Weight': {
    prop: 'gross_weight',
    required: true
  },
  Client: {
    prop: 'client',
    required: true
  },
  FechaIngreso: {
    prop: 'entry_date',
    required: true
  }
}

function onChange(event) {
  readXlsxFile(event.target.files[0], { schema }).then((response) => {
    uploadedFile.value = response
  })
}

async function onSubmit() {
  form.value.packages = uploadedFile.value.rows

  if (!form.value.packages.length) {
    toast.error("No hay paquetes")
    return
  }

  if (!form.value.total || form.value.total < 1) {
    toast.error("El total es requerido")
    return
  }

  await storeBatch(form.value)
}
</script>
