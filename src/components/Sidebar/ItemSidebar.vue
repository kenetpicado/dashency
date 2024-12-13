<script setup lang="ts">
import type { IItemSidebar } from '@/types'

defineProps<IItemSidebar>()
</script>

<template>
  <span class="flex items-center gap-4">
    <component v-if="item.icon" :is="item.icon" size="25"></component>
    <span>{{ item.title }}</span>
  </span>
</template>
