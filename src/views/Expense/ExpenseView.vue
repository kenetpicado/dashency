<template>
  <header class="flex items-center justify-between mb-6">
    <span class="font-bold text-2xl">Gastos</span>
    <BtnPrimary @click="openModal = true"> Nuevo </BtnPrimary>
  </header>

  <DialogForm title="Gasto" :isOpen="openModal" @onClose="openModal = false">
    <Form @submit="onSubmit" class="flex flex-col gap-4">
      <FieldForm as="select" text="Concepto" name="concepto" v-model="conceptSelected">
        <option value="">Otro</option>
        <option v-for="item in concepts" :value="item" :key="item">
          {{ item }}
        </option>
      </FieldForm>

      <FieldForm
        v-if="!conceptSelected"
        text="Especificar concepto"
        name="especificar"
        v-model="form.concept"
        rules="required"
        placeholder="ej. Pago de alquiler"
      />

      <FieldForm
        text="Descripción (Opcional)"
        name="descripción"
        v-model="form.description"
        placeholder="ej. Pago mes de Enero"
      />

      <div class="grid grid-cols-2 gap-4">
        <FieldForm
          text="Cantidad"
          name="cantidad"
          v-model="form.quantity"
          type="number"
          rules="required|min_value:1"
        />
        <FieldForm
          text="Monto $"
          name="costo"
          v-model="form.cost"
          type="number"
          rules="required|min_value:0"
        />
      </div>

      <div class="font-bold">Total: ${{ (form.quantity * form.cost).toLocaleString() }}</div>

      <div class="modal-action">
        <BtnSecondary type="reset" @click="resetValues">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :loading="processing">
          {{ isEdit ? 'Actualizar' : 'Guardar' }}
        </BtnPrimary>
      </div>
    </Form>
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
      <th>Fecha</th>
      <th>Usuario</th>
      <th>Concepto</th>
      <th>Descripción</th>
      <th>Cant.</th>
      <th>Monto</th>
      <th>Total</th>
      <th>Acciones</th>
    </template>
    <template #body>
      <tr v-if="!expenses.length">
        <td colspan="8" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-for="(item, index) in expenses" :key="index" class="hover:bg-gray-50">
        <td>
          <span v-if="item.createdAt">
            {{ format(item.createdAt, { date: 'short', time: 'short' }) }}
          </span>
        </td>
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
        <td>
          <div class="flex items-center gap-4">
            <button type="button" @click="edit(item)">
              <IconEdit size="25" />
            </button>
            <button v-if="item.id" type="button" @click="confirmDelete(item.id)">
              <IconTrash size="25" />
            </button>
          </div>
        </td>
      </tr>
    </template>
  </TheTable>

  <ThePaginate v-model="meta.page" :meta="meta" />
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import { onMounted, ref, watch } from 'vue'
import TheTable from '@/components/Table/TheTable.vue'
import { format } from '@formkit/tempo'
import { IconEdit, IconTrash } from '@tabler/icons-vue'
import { watchDebounced } from '@vueuse/core'
import SelectForm from '@/components/Form/SelectForm.vue'
import useExpense from '@/composables/useExpense'
import DialogForm from '@/components/Form/DialogForm.vue'
import type { IExpense } from '@/types'
import concepts from '@/utils/concepts'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import ThePaginate from '@/components/ThePaginate.vue'
import { Form } from 'vee-validate'
import FieldForm from '@/components/Form/FieldForm.vue'

const {
  getExpenses,
  expenses,
  queryParams,
  processing,
  storeExpense,
  updateExpense,
  meta,
  form,
  reset,
  openModal,
  destroyExpense
} = useExpense()

const isEdit = ref<boolean>(false)
const conceptSelected = ref<string>('')

onMounted(() => {
  getExpenses()
})

const resetValues = () => {
  openModal.value = false
  conceptSelected.value = ''
  isEdit.value = false
  reset()
}

function onSubmit() {
  if (conceptSelected.value) {
    form.value.concept = conceptSelected.value
  }

  if (isEdit.value && form.value.id) {
    updateExpense(form.value.id)
  } else {
    storeExpense()
  }
}

watchDebounced(
  queryParams.value,
  () => {
    meta.value.page = 1
    getExpenses()
  },
  { debounce: 500, maxWait: 1000 }
)

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

watch(
  () => meta.value.page,
  () => {
    getExpenses()
  }
)

function confirmDelete(id: string) {
  if (confirm('¿Estás seguro de eliminar este gasto?')) {
    destroyExpense(id)
  }
}
</script>
