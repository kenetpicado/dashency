<template>
  <header class="flex items-center justify-between mb-4">
    <span class="font-bold text-2xl">Detalles</span>
    <BtnPrimary @click.prevent="openModal = true"> Eliminar </BtnPrimary>
  </header>

  <DialogForm title="Confirmar" :isOpen="openModal" @onClose="openModal = false">
    <Form v-if="batch && batch._id" @submit="deleteBatch(batch._id)" class="flex flex-col gap-4">
      <div class="text-gray-400">
        Escriba <strong>ELIMINAR</strong> para confirmar la eliminación del lote y sus paquetes. Esta acción no se puede deshacer.
      </div>

      <FieldForm
        text="Acción"
        name="confirmar"
        v-model="action"
        rules="required"
        placeholder="ELIMINAR"
      />

      <div class="modal-action">
        <BtnSecondary @click="openModal = false">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :disabled="action !== 'ELIMINAR'" :loading="processing"> Confirmar </BtnPrimary>
      </div>
    </Form>
  </DialogForm>

  <template v-if="processing">
    <span class="loading loading-spinner loading-lg flex mx-auto text-gray-300"></span>
  </template>

  <template v-else-if="batch">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <TheTable table-class="table-fixed">
        <template #body>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Creado</td>
            <td>
              <span v-if="batch.createdAt">
                {{ format(batch.createdAt, { date: 'short', time: 'short' }) }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Realizado por</td>
            <td>
              {{ batch.user?.name || 'Desconocido' }}
            </td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Tipo</td>
            <td>
              {{ batch.type }}
            </td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Referencia</td>
            <td>
              {{ batch.code || 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Total</td>
            <td>$ {{ batch.total }}</td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Paquetes</td>
            <td>
              {{ batch.packages.length || '0' }}
            </td>
          </tr>
        </template>
      </TheTable>
    </div>

    <TheTable>
      <template #header>
        <th>Guia</th>
        <th>Tipo</th>
        <th>Peso</th>
        <th>Piezas</th>
        <th>Estado</th>
        <th>Cliente</th>
        <th>Descripción</th>
        <th>Ingreso</th>
        <th>Registrado</th>
      </template>
      <template #body>
        <tr v-if="!batch.packages.length">
          <td colspan="9" class="text-center">No hay paquetes</td>
        </tr>
        <tr v-for="(item, index) in batch.packages" :key="index" class="hover:bg-gray-50">
          <td>
            {{ item.guide }}
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>{{ item.grossWeight }} lb(s)</td>
          <td>
            {{ item.pieces }}
          </td>
          <td>
            {{ item.status }}
          </td>
          <td>
            {{ item.client }}
          </td>
          <td>
            {{ item.description }}
          </td>
          <td>
            <span v-if="item.entryDate">
              {{ format(item.entryDate, 'short') }}
            </span>
          </td>
          <td>
            <span v-if="item.createdAt">
              {{ format(item.createdAt, { date: 'short', time: 'short' }) }}
            </span>
          </td>
        </tr>
      </template>
    </TheTable>
  </template>
</template>

<script setup lang="ts">
import useBatch from '@/composables/useBatch'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import TheTable from '@/components/Table/TheTable.vue'
import { format } from '@formkit/tempo'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import FieldForm from '@/components/Form/FieldForm.vue'
import { Form } from 'vee-validate'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'

const route = useRoute()
const { getBatch, batch, processing, deleteBatch } = useBatch()
const openModal = ref(false)
const action = ref('')

onMounted(async () => await getBatch(route.params.id as string))
</script>
