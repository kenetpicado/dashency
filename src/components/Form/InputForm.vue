<script setup lang="ts">
import type { IInputForm } from '@/types'
defineProps<IInputForm>()

const model = defineModel()
</script>

<template>
  <div class="w-full mb-5">
    <label class="block mb-1 text-gray-500">
      {{ text }}
    </label>

    <input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled ?? false"
      :autofocus="autofocus"
      :required="required ?? false"
      :name="name"
      class="h-12 border-gray-300 rounded-lg w-full transition duration-300 ease-in-out placeholder-gray-400 focus:border-edo-950"
      :class="[disabled ? 'bg-gray-100' : '']"
      v-model="model"
      step="any"
    />

    <p class="text-sm text-red-400 mt-2" v-if="error && error.field === name">
      {{ error.message }}
    </p>
  </div>
</template>
