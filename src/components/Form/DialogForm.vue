<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'

defineProps<{
  title: string
  isOpen: boolean
}>()

const emit = defineEmits(['onClose'])
</script>

<template>
  <dialog :open="isOpen">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        class="w-[35rem] min-h-[10rem] bg-white rounded-lg p-5 text-gray-700"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold">
            {{ title }}
          </h2>
          <button @click="emit('onClose')" type="button" class="text-gray-400">
            <IconX size="20" />
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </dialog>
</template>
