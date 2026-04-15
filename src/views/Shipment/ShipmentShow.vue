<template>
  <header class="flex items-center justify-between mb-6">
    <span class="font-bold text-2xl">Detalles</span>
    <BtnPrimary @click.prevent="openModal = true"> Eliminar </BtnPrimary>
  </header>

  <DialogForm title="Confirmar" :isOpen="openModal" @onClose="openModal = false">
    <Form
      v-if="shipment && shipment.id"
      @submit="deleteShipment(shipment.id, goBack)"
      class="flex flex-col gap-4"
    >
      <div class="text-gray-400">
        Escriba <strong>ELIMINAR</strong> para confirmar la eliminación del shipment. Esta acción no
        se puede deshacer.
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
        <BtnPrimary type="submit" :disabled="action !== 'ELIMINAR'" :loading="processing">
          Confirmar
        </BtnPrimary>
      </div>
    </Form>
  </DialogForm>

  <template v-if="processing">
    <span class="loading loading-spinner loading-lg flex mx-auto text-gray-300"></span>
  </template>

  <template v-else-if="shipment">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <TheTable table-class="table-fixed">
        <template #body>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Creado</td>
            <td>
              <span v-if="shipment.createdAt">
                {{ format(shipment.createdAt, { date: 'short', time: 'short' }) }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Realizado por</td>
            <td>
              {{ shipment.user?.name || 'Desconocido' }}
            </td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Sender name</td>
            <td>{{ shipment.senderName }}</td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Sender phone</td>
            <td>{{ shipment.senderPhone }}</td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Destination department</td>
            <td>{{ shipment.destinationDepartment }}</td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Destination country</td>
            <td>{{ shipment.destinationCountry }}</td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Receiver name</td>
            <td>{{ shipment.receiverName }}</td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Receiver phone</td>
            <td>{{ shipment.receiverPhone }}</td>
          </tr>
          <tr>
            <td class="border-r border-gray-200 text-gray-400">Full address</td>
            <td>{{ shipment.fullAddress }}</td>
          </tr>
        </template>
      </TheTable>
    </div>
  </template>
</template>

<script setup lang="ts">
import TheTable from '@/components/Table/TheTable.vue'
import useShipment from '@/composables/useShipment'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { format } from '@formkit/tempo'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import FieldForm from '@/components/Form/FieldForm.vue'
import { Form } from 'vee-validate'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'

const route = useRoute()
const router = useRouter()
const { getShipment, shipment, processing, deleteShipment } = useShipment()
const openModal = ref(false)
const action = ref('')

onMounted(async () => {
  await getShipment(route.params.id as string)
})

function goBack() {
  openModal.value = false
  router.push({ name: 'shipments' })
}
</script>
