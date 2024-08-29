<script setup lang="ts">
import type { IItemSidebar } from '@/types'

defineProps<IItemSidebar>()
</script>

<template>
  <span
    class="flex items-center px-2 py-3 rounded-xl gap-4 cursor-pointer"
    :class="[active ? 'bg-blue-600 text-white' : 'hover:bg-gray-100']"
  >
    <component v-if="item.icon" :is="item.icon" size="25"></component>
    <span>{{ item.title }}</span>
  </span>
</template>
