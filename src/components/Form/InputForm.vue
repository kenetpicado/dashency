<script setup lang="ts">
import type { IInputForm } from '@/types'
defineProps<IInputForm>()

const model = defineModel()
</script>

<template>
  <div class="form-control w-full">
    <div class="label">
      <span class="label-text text-gray-500">
        {{ text }}
      </span>
    </div>

    <input
      :id="name"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled ?? false"
      :autofocus="autofocus"
      :required="required ?? false"
      :name="name"
      class="input input-bordered w-full"
      v-model="model"
      step="any"
    />

    <div v-if="errors && errors[name]" class="label">
      <span class="label-text-alt text-red-400">
        {{ errors[name] }}
      </span>
    </div>
  </div>
</template>
