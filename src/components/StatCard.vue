<script setup lang="ts">
import type { IStatCard } from '@/types'
import { IconInfoCircle } from '@tabler/icons-vue'
defineProps<IStatCard>()
</script>

<template>
  <div class="bg-white border h-20 rounded-lg px-4">
    <div class="flex items-center h-full gap-2">
      <component :is="stat.icon ?? IconInfoCircle" size="30" class="text-edo-950" />
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
