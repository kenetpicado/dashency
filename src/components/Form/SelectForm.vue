<template>
  <div class="w-full mb-5">
    <label class="block mb-1 text-gray-500">
      {{ text }}
    </label>

    <select
      class="h-12 border-gray-300 rounded-lg block w-full transition duration-300 ease-in-out focus:border-edo-950"
      v-model="model"
      :required="required"
    >
      <slot></slot>
    </select>

    <p class="text-sm text-red-400 mt-2" v-if="error && error.field === name">
      {{ error.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IInputForm } from '@/types'
defineProps<IInputForm>()
const model = defineModel()
</script>
