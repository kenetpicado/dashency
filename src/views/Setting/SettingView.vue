<template>
  <DialogForm title="Precio" :isOpen="openModalPrice">
    <form @submit.prevent="onSubmitPrice()" class="flex flex-col gap-4">
      <InputForm text="Tipo" name="type" v-model="formPrice.type" required />
      <InputForm text="Monto $" name="value" v-model="formPrice.value" type="number" required />
      <div class="modal-action">
        <BtnSecondary @click="resetValues">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :loading="processing">
          {{ formPrice.id ? 'Actualizar' : 'Guardar' }}
        </BtnPrimary>
      </div>
    </form>
  </DialogForm>

  <DialogForm title="Cuenta" :isOpen="openModalAccount">
    <form @submit.prevent="onSubmitAccount()" class="flex flex-col gap-4">
      <InputForm text="Tipo (Banco)" name="type" v-model="formAccount.type" required />

      <InputForm text="Cuenta" name="number" v-model="formAccount.number" required />

      <InputForm text="Propietario" name="holder" v-model="formAccount.holder" required />

      <SelectForm v-if="formAccount.id" text="Estado" name="status" v-model="formAccount.status">
        <option value="ACTIVO">Activo</option>
        <option value="INACTIVO">Inactivo</option>
      </SelectForm>

      <div class="modal-action">
        <BtnSecondary @click="resetValues">Cancelar</BtnSecondary>
        <BtnPrimary type="submit" :loading="processing">
          {{ formAccount.id ? 'Actualizar' : 'Guardar' }}
        </BtnPrimary>
      </div>
    </form>
  </DialogForm>

  <header class="flex items-center justify-between mb-8">
    <span class="font-bold text-2xl">Precios</span>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
    <div v-for="item in prices" :key="item.id" class="bg-white border p-4 rounded-xl">
      <div class="flex flex-col gap-6 items-center mb-8">
        <span class="text-sm">{{ item.type }}</span>
        <span class="font-bold text-6xl">${{ item.value }}</span>
      </div>
      <div class="flex justify-end">
        <button type="button" @click="editPrice(item)">
          <IconEdit size="25" class="text-gray-400" />
        </button>
      </div>
    </div>
    <button
      type="button"
      @click="openModalPrice = true"
      class="bg-white border-4 border-dashed p-4 rounded-xl flex items-center justify-center min-h-[195px]"
    >
      <div class="text-gray-400 flex flex-col gap-4 items-center">
        <IconPlus size="40" class="text-gray-300" />
        Agregar
      </div>
    </button>
  </div>

  <header class="flex items-center justify-between mb-8">
    <span class="font-bold text-2xl">Cuentas</span>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
    <div v-for="item in accounts" :key="item.id" class="bg-white border p-4 rounded-xl truncate">
      <div class="flex flex-col gap-6 items-center mb-8 truncate">
        <span class="text-sm">{{ item.type }}</span>
        <span class="font-bold text-xl text-center">{{ item.number }}</span>
        <span class="text-sm text-center">{{ item.holder }}</span>
      </div>
      <div class="flex justify-end">
        <button type="button" @click="editAccount(item)">
          <IconEdit size="25" class="text-gray-400" />
        </button>
      </div>
    </div>
    <button
      type="button"
      @click="openModalAccount = true"
      class="bg-white border-4 border-dashed p-4 rounded-xl flex items-center justify-center min-h-[195px]"
    >
      <div class="text-gray-400 flex flex-col gap-4 items-center">
        <IconPlus size="40" class="text-gray-300" />
        Agregar
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import BtnPrimary from '@/components/Buttons/BtnPrimary.vue'
import BtnSecondary from '@/components/Buttons/BtnSecondary.vue'
import DialogForm from '@/components/Form/DialogForm.vue'
import InputForm from '@/components/Form/InputForm.vue'
import usePrice from '@/composables/usePrice'
import type { IAccount, IPrice } from '@/types'
import toast from '@/utils/toast'
import { IconEdit, IconPlus } from '@tabler/icons-vue'
import { onMounted, ref } from 'vue'
import { defaultPriceForm, defaultAccountForm } from '@/defaults'
import useAccount from '@/composables/useAccount'
import SelectForm from '@/components/Form/SelectForm.vue'

const { getPrices, prices, storePrice, processing, updatePrice } = usePrice()
const {
  getAccounts,
  accounts,
  storeAccount,
  processing: processingAccount,
  updateAccount
} = useAccount()

const openModalPrice = ref<boolean>(false)
const openModalAccount = ref<boolean>(false)

onMounted(async () => {
  await getPrices()
  await getAccounts()
})

const formPrice = ref<IPrice>({ ...defaultPriceForm })
const formAccount = ref<IAccount>({ ...defaultAccountForm })

const resetValues = () => {
  openModalPrice.value = false
  openModalAccount.value = false
  formPrice.value = { ...defaultPriceForm }
  formAccount.value = { ...defaultAccountForm }
}

function onSubmitPrice() {
  formPrice.value.type = formPrice.value.type.trim().toLocaleUpperCase()

  const exist = prices.value.find((price) => price.type === formPrice.value.type)

  if (exist && exist.id !== formPrice.value.id) {
    toast.error('Ya existe un precio con este tipo')
    return
  }

  if (formPrice.value.value < 1) {
    toast.error('El precio debe ser mayor a 0')
    return
  }

  if (formPrice.value.id) {
    updatePrice(formPrice.value, () => resetValues())
  } else {
    storePrice(formPrice.value, () => resetValues())
  }
}

function onSubmitAccount() {
  if (formAccount.value.id) {
    updateAccount(formAccount.value, () => resetValues())
  } else {
    storeAccount(formAccount.value, () => resetValues())
  }
}

function editPrice(item: IPrice) {
  formPrice.value = { ...item }
  openModalPrice.value = true
}

function editAccount(item: IAccount) {
  formAccount.value = { ...item }
  openModalAccount.value = true
}
</script>
