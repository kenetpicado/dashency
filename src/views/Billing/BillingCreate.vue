<template>
  <loading v-model:active="isLoading" color="#2563eb" loader="dots" />

  <header class="flex items-center justify-between mb-4 h-14">
    <span class="font-bold text-2xl">Nueva</span>
  </header>

  <div class="grid grid-cols-2 gap-4">
    <div>
      <InputForm
        text="Buscar"
        name="search"
        v-model="queryParams.search"
        placeholder="Buscar por guía o cliente"
      />
      <div v-for="item in 4" :key="item" class="bg-white border rounded-lg p-4 mb-4">
        <div class="flex justify-between">
          <span class="text-lg font-bold text-edo-950">1234567</span>
          <span class="text-gray-400">26/05/1998</span>
        </div>
        <div class="mb-2">KENET JOSE PICADO</div>
        <div class="text-sm text-gray-400 mb-3">
          ROPA ZAPATOS ACCESORIOS ART VARIOS BOLSA ABIERTA (1)
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm bg-edo-50 px-2 py-1 rounded-lg text-edo-900">AEREO</span>
          <span class="flex items-center gap-4">
            <span class="text-xl font-bold text-edo-950">2.5 lbs</span>
            <button type="button" class="bg-edo-950 rounded-full p-1 text-white">
              <IconArrowRight size="22" />
            </button>
          </span>
        </div>
      </div>
    </div>
    <div>
      <pre>{{selectedPackages}}</pre>
      <TheTable>
        <template #header>
          <th>Paquete</th>
          <th>Peso (lbs)</th>
        </template>
        <template #body>
          <tr>
            <td>Paquete</td>
            <td>4</td>
          </tr>
        </template>
      </TheTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import { ref } from 'vue'
import TheTable from '@/components/Table/TheTable.vue'
import InputForm from '@/components/Form/InputForm.vue'
import { IconUpload, IconArrowRight } from '@tabler/icons-vue'
import toast from '@/utils/toast'
import type { IBatch, IPackage } from '@/types'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import SelectForm from '@/components/Form/SelectForm.vue'

const isLoading = ref<boolean>(false)
const selectedPackages = ref<IPackage[]>()

const queryParams = ref({
  search: ''
})

function addPackage(pack) {
  selectedPackages.value.push(pack)
}

</script>
