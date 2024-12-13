<script setup lang="ts">
import type { IStatCard } from '@/types'
import { IconInfoCircle } from '@tabler/icons-vue'
defineProps<{
  stat: IStatCard
}>()
</script>

<template>
  <div class="stats shadow">
    <div class="stat">
      <div class="stat-title">
        {{ stat.title }}
      </div>
      <div class="stat-value">{{ stat.value }}</div>
    </div>
  </div>
</template>
