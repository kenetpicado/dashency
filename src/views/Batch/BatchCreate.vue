<template>
  <loading v-model:active="isLoading"/>

  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Nuevo</span>
    <BtnPrimary @click="openInputFile">
      <IconUpload size="20" />
      Subir archivo
    </BtnPrimary>
  </header>

  <input type="file" id="excelFileInput" class="hidden"
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    @change="onChange" />

  <div v-if="error" class="bg-red-50 p-4 rounded-lg text-red-600">
    No se pudo procesar tu archivo ya que tiene errores, por favor, revisa y
    vuelve a intentarlo.
    <pre>{{ error }}</pre>
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
          <input type="number" required
            class="border-gray-300 rounded-lg block w-full transition duration-300 ease-in-out"
            v-model="item.gross_weight" />
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
    <InputForm text="Total" name="total" v-model="form.total" type="number" />
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
import type { IBatch, IPackage, IExcelFileError } from '@/types'
import useBatch from '@/composables/useBatch'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import * as XLSX from 'xlsx';

const error = ref<IExcelFileError>()
const isLoading = ref<boolean>(false)

const { storeBatch } = useBatch()

const form = ref<IBatch>({
  total: 0,
  packages: []
})

const schema = {
  Guide: {
    prop: 'guide',
    type: String,
    required: true
  },
  Description: {
    prop: 'description',
     type: String,
    required: true
  },
  Pieces: {
    prop: 'pieces',
    type: String,
    required: true
  },
  'Gross Weight': {
    prop: 'gross_weight',
     type: String,
    required: true
  },
  Client: {
    prop: 'client',
     type: String,
    required: true
  },
  FechaIngreso: {
    prop: 'entry_date',
     type: String,
    required: true
  }
}

function onChange(event: any) {
  isLoading.value = true;

  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = function (e) {
    const arrayBuffer = e.target?.result;

    if (arrayBuffer) {
      // Leer el archivo usando SheetJS
      const data = new Uint8Array(arrayBuffer as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      // Suponiendo que quieres leer la primera hoja
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convertir la hoja de cálculo a JSON (cambia según tus necesidades)
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Aquí deberías mapear jsonData a tu estructura IPackage[]
      form.value.packages = jsonData as IPackage[];

      error.value = undefined;
    } else {
      // Manejar el error si no se puede leer el archivo
      error.value = { message: 'No se pudo leer el archivo.' } as IExcelFileError;
    }

    isLoading.value = false;
  };

  reader.onerror = function () {
    // Manejar el error de lectura del archivo
    error.value = { message: 'Error al leer el archivo.' } as IExcelFileError;
    isLoading.value = false;
  };

  reader.readAsArrayBuffer(file);
}

function onSubmit() {
  if (!form.value.packages.length) {
    toast.error("No hay paquetes")
    return
  }

  if (!form.value.total || form.value.total < 1) {
    toast.error("El total es requerido")
    return
  }

  storeBatch(form.value)
}

function openInputFile() {
  document.getElementById('excelFileInput')?.click()
}

</script>