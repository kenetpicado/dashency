<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Gastos</span>
    <BtnPrimary @click="openModal = true"> Nuevo </BtnPrimary>
  </header>

  <DialogForm title="Gasto" :isOpen="openModal" @onClose="openModal = false">
    <form @submit.prevent="onSubmit()" class="flex flex-col gap-4">
      <SelectForm text="Concepto" name="concept" v-model="conceptSelected">
        <option value="">Otro</option>
        <option v-for="item in concepts" :value="item" :key="item">
          {{ item }}
        </option>
      </SelectForm>

      <InputForm
        v-if="!conceptSelected"
        text="Especificar concepto"
        name="concept"
        v-model="form.concept"
      />

      <InputForm text="Descripción (Opcional)" name="description" v-model="form.description" />

      <div class="grid grid-cols-2 gap-4">
        <InputForm text="Cantidad" name="quantity" v-model="form.quantity" type="number" />
        <InputForm text="Monto $" name="cost" v-model="form.cost" type="number" />
      </div>

      <div class="font-bold">Total: ${{ (form.quantity * form.cost).toLocaleString() }}</div>

      <div class="modal-action">
        <BtnSecondary @click="resetValues">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :loading="processing">
          {{ isEdit ? 'Actualizar' : 'Guardar' }}
        </BtnPrimary>
      </div>
    </form>
  </DialogForm>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
    <SelectForm text="Concepto" name="concept" v-model="queryParams.concept">
      <option value="">Todos</option>
      <option v-for="item in concepts" :value="item" :key="item">
        {{ item }}
      </option>
    </SelectForm>
  </div>

  <TheTable>
    <template #header>
      <th>Usuario</th>
      <th>Concepto</th>
      <th>Descripción</th>
      <th>Cant.</th>
      <th>Monto</th>
      <th>Total</th>
      <th>Fecha</th>
      <th></th>
    </template>
    <template #body>
      <tr v-if="!expenses.data.length">
        <td colspan="8" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in expenses.data" :key="index" class="hover:bg-gray-50">
        <td>
          {{ item.user?.name }}
        </td>
        <td>
          {{ item.concept }}
        </td>
        <td class="text-gray-500">
          {{ item.description }}
        </td>
        <td>
          {{ item.quantity }}
        </td>
        <td>${{ item.cost.toLocaleString() }}</td>
        <td>${{ item.total?.toLocaleString() }}</td>
        <td class="text-gray-400">
          {{ getFormattedDate(item.createdAt) }}
        </td>
        <td>
          <div class="flex gap-4 justify-end">
            <button type="button" @click="edit(item)">
              <IconEdit size="20" />
            </button>
          </div>
        </td>
      </tr>
    </template>
  </TheTable>

  <PaginationComponent :pages="expenses.pages" :page="expenses.current" @selected="getThisPage" />
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import { onMounted, ref } from 'vue'
import TheTable from '@/components/Table/TheTable.vue'
import getFormattedDate from '@/utils/date'
import { IconEdit } from '@tabler/icons-vue'
import InputForm from '@/components/Form/InputForm.vue'
import { watchDebounced } from '@vueuse/core'
import SelectForm from '@/components/Form/SelectForm.vue'
import useExpense from '@/composables/useExpense'
import DialogForm from '@/components/Form/DialogForm.vue'
import type { IExpense } from '@/types'
import concepts from '@/utils/concepts'
import toast from '@/utils/toast'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

const { getExpenses, expenses, queryParams, processing, storeExpense, updateExpense } = useExpense()
const openModal = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const conceptSelected = ref<string>('')

onMounted(() => {
  getExpenses()
})

const form = ref<IExpense>({
  id: '',
  concept: '',
  description: '',
  quantity: 1,
  cost: 0
})

const resetValues = () => {
  openModal.value = false
  conceptSelected.value = ''
  isEdit.value = false

  form.value = {
    concept: '',
    description: '',
    quantity: 1,
    cost: 0
  }
}

function onSubmit() {
  if (!form.value.concept && !conceptSelected.value) {
    toast.error('El concepto es requerido')
    return
  }

  if (!form.value.quantity) {
    toast.error('La cantidad es requerida')
    return
  }

  if (!form.value.cost) {
    toast.error('El costo es requerido')
    return
  }

  if (conceptSelected.value) {
    form.value.concept = conceptSelected.value
  }

  if (isEdit.value) {
    updateExpense(form.value, () => resetValues())
  } else {
    storeExpense(form.value, () => resetValues())
  }
}

watchDebounced(queryParams.value, () => getExpenses(), { debounce: 500, maxWait: 1000 })

function edit(item: IExpense) {
  form.value = { ...item }

  if (concepts.includes(item.concept)) {
    conceptSelected.value = item.concept
  } else {
    conceptSelected.value = ''
    form.value.concept = item.concept
  }

  isEdit.value = true
  openModal.value = true
}

function getThisPage(page: number) {
  if (page == expenses.value.current) return
  queryParams.value.page = page
}
</script>
