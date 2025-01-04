<template>
  <div>
    <div class="mb-1">
      {{ item.name }}
    </div>
    <div class="text-sm text-gray-500 truncate max-w-28">
      {{ item.email }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserInfo } from '@/types'

defineProps<{
  item: IUserInfo
}>()
</script>
