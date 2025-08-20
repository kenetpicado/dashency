<template>
  <header class="flex items-center justify-between mb-6">
    <span class="font-bold text-2xl">Gastos</span>
    <BtnPrimary @click="openModal = true"> Nuevo </BtnPrimary>
  </header>

  <DialogForm title="Gasto" :isOpen="openModal" @onClose="openModal = false">
    <Form @submit="onSubmit" class="flex flex-col gap-4">
      <datalist id="conceptos">
        <option v-for="item in concepts" :value="item" :key="item"></option>
      </datalist>

      <FieldForm
        text="Concepto"
        name="concepto"
        v-model="form.concept"
        rules="required"
        placeholder="ej. Pago de alquiler"
        list="conceptos"
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
        <BtnSecondary type="reset" id="resetExpense" @click="resetValues">Cancelar</BtnSecondary>
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

    <FieldForm
      text="Descripción"
      name="description"
      v-model="queryParams.description"
      type="search"
      placeholder="Buscar por descripción"
    />
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
      <tr v-if="processing">
        <td colspan="8" class="text-center">
          <span class="loading-table-data"> </span>
        </td>
      </tr>
      <tr v-else-if="!expenses.length">
        <td colspan="8" class="text-center">No hay datos que mostrar</td>
      </tr>
      <tr v-else v-for="(item, index) in expenses" :key="index" class="hover:bg-gray-50">
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
        <td>
          {{ item.description }}
        </td>
        <td>
          {{ item.quantity.toLocaleString('en') }}
        </td>
        <td>{{ item.cost.toLocaleString('en', CURRENCY_OPTIONS) }}</td>
        <td>{{ item.total?.toLocaleString('en', CURRENCY_OPTIONS) }}</td>
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
import { CURRENCY_OPTIONS } from '@/defaults'

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

onMounted(() => {
  getExpenses()
})

const resetValues = () => {
  openModal.value = false
  isEdit.value = false
  reset()
}

function onSubmit() {
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
