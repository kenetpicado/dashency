<template>
  <div class="mb-4 flex items-center justify-between gap-4">
    <div class="flex flex-col gap-1">
      <h2 class="text-lg font-bold">Encomiendas</h2>
      <div class="text-sm text-balance text-gray-400">Administra las etiquetas de encomienda</div>
    </div>
    <RouterLink :to="{ name: 'shipments.create' }">
      <BtnPrimary> Nuevo </BtnPrimary>
    </RouterLink>
  </div>

  <div class="hidden lg:block">
    <TheTable>
      <template #header>
        <th>Creado</th>
        <th>Envia</th>
        <th>Recibe</th>
        <th>Destino</th>
        <th>Acciones</th>
      </template>
      <template #body>
        <TableSkeleton v-if="processing" :columns="5" />
        <tr v-else-if="!shipments.length">
          <td colspan="5" class="text-center">No hay datos que mostrar</td>
        </tr>
        <tr v-else v-for="(item, index) in shipments" :key="index" class="hover:bg-gray-50">
          <td>
            <span v-if="item.createdAt">
              {{ format(item.createdAt, { date: 'short', time: 'short' }) }}
            </span>
          </td>
          <td>{{ item.senderName }}</td>
          <td>{{ item.receiverName }}</td>
          <td>{{ item.destinationDepartment }}, {{ item.destinationCountry }}</td>
          <td>
            <div class="flex gap-4 items-center">
              <RouterLink :to="{ name: 'shipments.show', params: { id: item.id } }">
                <IconEye size="20" />
              </RouterLink>
              <RouterLink :to="{ name: 'shipments.edit', params: { id: item.id } }">
                <IconEdit size="20" />
              </RouterLink>
              <button v-if="item.id" type="button" @click="confirmDelete(item.id)">
                <IconTrash size="20" />
              </button>
            </div>
          </td>
        </tr>
      </template>
    </TheTable>
  </div>

  <div class="grid gap-4 lg:hidden">
    <div v-if="processing" class="grid gap-3">
      <div
        v-for="index in 3"
        :key="index"
        class="card border border-base-200 bg-base-100 shadow-sm animate-pulse"
      >
        <div class="card-body gap-2 p-4">
          <div class="skeleton h-4 w-32"></div>
          <div class="skeleton h-5 w-48"></div>
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-3/4"></div>
          <div class="flex justify-end gap-2 pt-2">
            <div class="skeleton h-9 w-9 rounded-btn"></div>
            <div class="skeleton h-9 w-9 rounded-btn"></div>
            <div class="skeleton h-9 w-9 rounded-btn"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!shipments.length" class="text-center text-gray-400 py-4">
      No hay datos que mostrar
    </div>

    <div
      v-else
      v-for="(item, index) in shipments"
      :key="index"
      class="card border border-base-200 bg-base-100 shadow-sm"
    >
      <div class="card-body gap-2 p-4">
        <div class="flex items-start justify-between gap-2">
          <div class="text-gray-400 text-sm">
            <span v-if="item.createdAt">
              {{ format(item.createdAt, { date: 'short', time: 'short' }) }}
            </span>
          </div>
          <div class="font-bold uppercase">{{ item.destinationCountry }}</div>
        </div>

        <div class="grid gap-2 text-sm">
          <div>
            <div class="text-xs uppercase tracking-wide text-gray-400">Envia</div>
            <div class="font-medium">{{ item.senderName }}</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide text-gray-400">Recibe</div>
            <div class="font-medium">{{ item.receiverName }}</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide text-gray-400">Destino</div>
            <div class="font-medium">
              {{ item.destinationDepartment }}, {{ item.destinationCountry }}
            </div>
          </div>
        </div>

        <div class="card-actions justify-end gap-4">
          <RouterLink
            :to="{ name: 'shipments.show', params: { id: item.id } }"
            class="btn btn-sm btn-circle btn-neutral"
          >
            <IconEye size="20" />
          </RouterLink>
          <RouterLink
            :to="{ name: 'shipments.edit', params: { id: item.id } }"
            class="btn btn-sm btn-circle btn-warning"
          >
            <IconEdit size="20" />
          </RouterLink>
          <button
            v-if="item.id"
            type="button"
            class="btn btn-sm btn-circle"
            @click="confirmDelete(item.id)"
          >
            <IconTrash size="20" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <ThePaginate v-model="meta.page" :meta="meta" />
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import ThePaginate from '@/components/ThePaginate.vue'
import TheTable from '@/components/Table/TheTable.vue'
import useShipment from '@/composables/useShipment'
import { format } from '@formkit/tempo'
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-vue'
import { onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import TableSkeleton from '@/components/TableSkeleton.vue'

const { getShipments, shipments, processing, deleteShipment, meta } = useShipment()

onMounted(async () => {
  await getShipments()
})

watch(
  () => meta.value.page,
  () => {
    getShipments()
  }
)

function confirmDelete(id: string) {
  if (confirm('¿Estás seguro de eliminar este shipment?')) {
    deleteShipment(id)
  }
}
</script>
