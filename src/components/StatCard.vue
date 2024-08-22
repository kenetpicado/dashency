<script setup lang="ts">
import { IconInfoCircle } from '@tabler/icons-vue'

interface IStatCard {
  stat: {
    title: string
    value: string
    icon?: any
  }
}
defineProps<IStatCard>()
</script>

<template>
  <div class="bg-white border h-20 rounded-lg px-4">
    <div class="flex items-center h-full gap-2">
      <component :is="stat.icon ?? IconInfoCircle" size="30" class="text-blue-600" />
      <div>
        <div class="font-bold text-lg">
          {{ stat.value }}
        </div>
        <div class="text-sm text-gray-500">
          {{ stat.title }}
        </div>
      </div>
    </div>
  </div>
</template>
