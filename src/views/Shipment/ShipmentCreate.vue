<template>
  <div class="mb-4 flex items-center justify-between gap-4">
    <div class="flex flex-col gap-1">
      <h2 class="text-lg font-bold">Nueva encomienda</h2>
      <div class="text-sm text-balance text-gray-400">Crea una nueva etiqueta de encomienda</div>
    </div>
  </div>

  <div class="bg-white border rounded-lg p-6">
    <Form @submit="onSubmit" class="flex flex-col gap-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FieldForm
          text="Nombre del remitente"
          name="senderName"
          v-model="form.senderName"
          rules="required"
          placeholder="ej. Carlos Rivas"
        />

        <FieldForm
          text="Teléfono del remitente"
          name="senderPhone"
          v-model="form.senderPhone"
          rules="required"
          placeholder="ej. 099123456"
        />

        <FieldForm
          as="select"
          text="País de destino"
          name="destinationCountry"
          v-model="form.destinationCountry"
          rules="required"
        >
          <option value="Nicaragua">Nicaragua</option>
          <option value="Estados Unidos">Estados Unidos</option>
        </FieldForm>

        <FieldForm
          text="Departamento de destino"
          name="destinationDepartment"
          v-model="form.destinationDepartment"
          rules="required"
          placeholder="ej. Managua"
        />

        <FieldForm
          text="Nombre del destinatario"
          name="receiverName"
          v-model="form.receiverName"
          rules="required"
          placeholder="ej. María González"
        />

        <FieldForm
          text="Teléfono del destinatario"
          name="receiverPhone"
          v-model="form.receiverPhone"
          rules="required"
          placeholder="ej. 098765432"
        />
      </div>

      <FieldForm
        text="Dirección completa"
        name="fullAddress"
        v-model="form.fullAddress"
        rules="required"
        placeholder="ej. Calle 123, Ciudad, Referencias"
      />

      <div class="form-control w-fit">
        <label class="label cursor-pointer gap-2">
          <input type="checkbox" class="toggle" v-model="printAuto" />
          <span class="label-text">Imprimir automaticamente</span>
        </label>
      </div>

      <div class="modal-action justify-end">
        <RouterLink :to="{ name: 'shipments' }">
          <BtnSecondary> Cancelar </BtnSecondary>
        </RouterLink>
        <BtnPrimary type="submit" :loading="processing"> Guardar </BtnPrimary>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import FieldForm from '@/components/Form/FieldForm.vue'
import useShipment from '@/composables/useShipment'
import { useStorage } from '@vueuse/core'
import { Form } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const { processing, storeShipment, getShipment, shipment, updateShipment } = useShipment()
const route = useRoute()

const form = ref({
  id: '',
  senderName: '',
  senderPhone: '',
  destinationDepartment: '',
  destinationCountry: 'Nicaragua',
  receiverName: '',
  receiverPhone: '',
  fullAddress: ''
})

const printAuto = useStorage('shipment_print_auto', true)

const onSubmit = () => {
  form.value.id
    ? updateShipment(form.value, printAuto.value)
    : storeShipment(form.value, printAuto.value)
}

onMounted(async () => {
  if (route.params.id) {
    await getShipment(route.params.id as string)
    if (shipment.value) {
      form.value.id = route.params.id as string
      form.value.senderName = shipment.value.senderName || ''
      form.value.senderPhone = shipment.value.senderPhone || ''
      form.value.destinationDepartment = shipment.value.destinationDepartment || ''
      form.value.destinationCountry = shipment.value.destinationCountry || 'Nicaragua'
      form.value.receiverName = shipment.value.receiverName || ''
      form.value.receiverPhone = shipment.value.receiverPhone || ''
      form.value.fullAddress = shipment.value.fullAddress || ''
    }
  }
})
</script>
