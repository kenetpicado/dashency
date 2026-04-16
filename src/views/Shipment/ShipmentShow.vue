<template>
  <div class="mb-4 flex items-center justify-between gap-4">
    <div class="flex flex-col gap-1">
      <h2 class="text-lg font-bold">Encomienda</h2>
      <div class="text-sm text-balance text-gray-400">Detalles de la etiqueta de encomienda</div>
    </div>
    <RouterLink :to="{ name: 'shipments.create' }">
      <BtnSecondary> Crear otro </BtnSecondary>
    </RouterLink>
  </div>

  <template v-if="processing">
    <span class="loading loading-spinner loading-lg flex mx-auto text-gray-300"></span>
  </template>

  <template v-else-if="shipment">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <div>
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
              <td class="border-r border-gray-200 text-gray-400">Nombre del remitente</td>
              <td>{{ shipment.senderName }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Teléfono del remitente</td>
              <td>{{ shipment.senderPhone }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">País de destino</td>
              <td>{{ shipment.destinationCountry }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Departamento de destino</td>
              <td>{{ shipment.destinationDepartment }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Nombre del destinatario</td>
              <td>{{ shipment.receiverName }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Teléfono del destinatario</td>
              <td>{{ shipment.receiverPhone }}</td>
            </tr>
            <tr>
              <td class="border-r border-gray-200 text-gray-400">Dirección completa</td>
              <td>{{ shipment.fullAddress }}</td>
            </tr>

            <tr>
              <td class="border-r border-gray-200 text-gray-400">Acciones</td>
              <td>
                <div class="flex flex-col gap-4">
                  <BtnSecondary class="hidden lg:block" id="printButton" v-print="printObj">
                    Imprimir
                  </BtnSecondary>
                  <BtnSecondary
                    :loading="downloadingImage"
                    :disabled="processing || !shipment"
                    @click="downloadLabelAsPng"
                  >
                    Descargar
                  </BtnSecondary>
                </div>
              </td>
            </tr>
          </template>
        </TheTable>
      </div>
    </div>

    <div class="overflow-x-auto">
      <div
        style="width: 6in; height: 4in"
        class="uppercase flex flex-col gap-2 bg-white text-xl p-4"
        id="printMe"
      >
        <div>
          <img src="/stick-logo.jpg" alt="Logo" class="py-1 h-[60px] w-auto mx-auto" />
        </div>
        <div>
          Remitente <br />
          <strong> {{ shipment.senderName }} ({{ shipment.senderPhone }}) </strong>
        </div>
        <div>
          Destinatario <br />
          <strong> {{ shipment.receiverName }} ({{ shipment.receiverPhone }}) </strong>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            Departamento <br />
            <strong>
              {{ shipment.destinationDepartment }}
            </strong>
          </div>
          <div>
            Pais <br />
            <strong>
              {{ shipment.destinationCountry }}
            </strong>
          </div>
        </div>
        <div class="line-clamp-3">
          Direccion:
          <strong>
            {{ shipment.fullAddress }}
          </strong>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import TheTable from '@/components/Table/TheTable.vue'
import useShipment from '@/composables/useShipment'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { format } from '@formkit/tempo'
import { toPng } from 'html-to-image'
import toast from '@/utils/toast'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'

const route = useRoute()
const { getShipment, shipment, processing } = useShipment()
const downloadingImage = ref(false)

const downloadLabelAsPng = async () => {
  const element = document.getElementById('printMe')

  if (!element) {
    toast.error('No se pudo encontrar la etiqueta para descargar')
    return
  }

  downloadingImage.value = true

  try {
    const width = element.offsetWidth
    const height = element.offsetHeight

    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
      width,
      height,
      canvasWidth: width,
      canvasHeight: height
    })

    const link = document.createElement('a')
    link.download = `${shipment.value?.tracking || 'etiqueta'}.png`
    link.href = dataUrl
    link.click()

    toast.success('Imagen descargada')
  } catch (error) {
    toast.error('No se pudo descargar la imagen')
  } finally {
    downloadingImage.value = false
  }
}

onMounted(async () => {
  await getShipment(route.params.id as string)
})

const printObj = {
  id: 'printMe',
  popTitle: 'Paquete',
  printTitle: 'Paquete'
}
</script>
