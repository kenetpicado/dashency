<template>
  <div class="flex items-center justify-center mt-4 w-full">
    <div class="join">
      <button
        type="button"
        @click.prevent="model = meta.prevPage"
        class="join-item btn"
        :disabled="!meta.hasPrevPage"
      >
        «
      </button>
      <button type="button" class="join-item btn">{{ meta.page }}/{{ meta.totalPages }}</button>
      <button
        type="button"
        @click.prevent="model = meta.nextPage"
        class="join-item btn"
        :disabled="!meta.hasNextPage"
      >
        »
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMeta } from '@/types'

defineProps<{
  meta: IMeta
}>()

const model = defineModel()
</script>
