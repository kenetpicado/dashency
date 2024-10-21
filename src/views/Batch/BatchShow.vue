<template>
  <header class="flex items-center justify-between mb-8 h-14">
    <span class="font-bold text-2xl">Detalles</span>
  </header>

  <DialogForm title="Paquete" :isOpen="openModal" @onClose="resetValues">
    <form @submit.prevent="onSubmit()">
      <InputForm text="Cliente" name="client" v-model="form.client" required />
      <InputForm text="Descripción" name="description" v-model="form.description" required />
      <InputForm text="Piezas" name="pieces" v-model="form.pieces" type="number" required />
      <InputForm
        text="Peso (lbs)"
        name="grossWeight"
        v-model="form.grossWeight"
        type="number"
        required
      />

      <div class="flex justify-end gap-4">
        <BtnSecondary @click="resetValues">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :loading="processing"> Actualizar </BtnPrimary>
      </div>
    </form>
  </DialogForm>

  <main class="grid grid-cols-4 gap-2 mb-4">
    <StatCard v-for="(stat, index) in stats" :stat="stat" :key="index" />
  </main>

  <div class="mb-4 bg-white p-4 rounded-xl border">
    <UserInfo v-if="batch?.user" :item="batch.user" />
  </div>

  <div v-if="batch?.packages" class="grid grid-cols-2 xl:grid-cols-3 gap-4">
    <PackageCard
      v-for="(item, index) in batch?.packages"
      :item="item"
      :key="index"
      :showIcon="item.status === 'REGISTRADO'"
      :icon="IconEdit"
      @selectedItem="editPackage"
    />
  </div>
</template>

<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import useBatch from '@/composables/useBatch'
import getFormattedDate from '@/utils/date'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PackageCard from '@/components/PackageCard.vue'
import UserInfo from '@/components/UserInfo.vue'
import type { IPackage, IStatCard } from '@/types'
import { IconEdit } from '@tabler/icons-vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import usePackage from '@/composables/usePackage'
import InputForm from '@/components/Form/InputForm.vue'

const route = useRoute()
const { getBatch, batch } = useBatch()
const { updatePackage, processing } = usePackage()

onMounted(() => getBatch(route.params.id as string))

const openModal = ref<boolean>(false)

const form = ref<IPackage>({
  guide: '',
  client: '',
  description: '',
  pieces: 0,
  grossWeight: 0,
  entryDate: ''
})

const stats = computed(
  () =>
    [
      {
        title: 'Tipo',
        value: batch.value?.type || ''
      },
      {
        title: 'Total',
        value: '$ ' + batch.value?.total || ''
      },
      {
        title: 'Paquetes',
        value: batch.value?.packages.length || '0'
      },
      {
        title: 'Código o referencia',
        value: batch.value?.code || ''
      },
      {
        title: 'Creado',
        value: getFormattedDate(batch.value?.createdAt) || ''
      }
    ] as IStatCard[]
)

function editPackage(item: IPackage) {
  form.value = { ...item }
  openModal.value = true
}

function resetValues() {
  form.value = {
    guide: '',
    client: '',
    description: '',
    pieces: 0,
    grossWeight: 0,
    entryDate: ''
  }
  openModal.value = false
}

function onSubmit() {
  updatePackage(form.value, () => {
    resetValues()
    getBatch(route.params.id as string)
  })
}
</script>
