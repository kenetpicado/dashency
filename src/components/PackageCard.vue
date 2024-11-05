<template>
  <div class="flex flex-col bg-white border rounded-lg p-4">
    <div class="flex justify-between">
      <span class="flex items-center gap-1 text-lg font-bold text-edo-950 truncate">
        {{ item.guide ?? 'Sin guia' }}
        <IconCircleCheckFilled v-if="item.status == 'FACTURADO'" size="20" class="text-green-600" />
      </span>
      <span class="text-gray-400 text-sm">
        <span v-if="item.entryDate">
          {{ getBaseDate(item.entryDate) }}
        </span>
        <span v-else-if="item.createdAt">
          {{ getBaseDate(item.createdAt) }}
        </span>
      </span>
    </div>
    <div v-if="item.tracking" class="mb-2 text-sm">
      {{ item.tracking }}
    </div>
    <div class="mb-2">
      {{ item.client }}
    </div>
    <div class="text-sm text-gray-400 mb-4 flex-1">
      {{ item.description }} <span v-if="item.pieces">({{ item.pieces }})</span>
    </div>
    <div class="flex items-center justify-between">
      <span class="bg-edo-50 px-2 py-1 rounded-lg">
        {{ item.type }}
      </span>
      <span class="flex items-center gap-2">
        <span class="text-xl text-edo-950">{{ item.grossWeight }} lbs</span>
        <button
          v-if="showIcon"
          type="button"
          @click="emit('selectedItem', item)"
          class="bg-edo-950 rounded-full p-1 text-white"
        >
          <component :is="icon ?? IconArrowRight" size="22" />
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPackage } from '@/types'
import { getBaseDate } from '@/utils/date'
import { IconArrowRight, IconCircleCheckFilled } from '@tabler/icons-vue'

defineProps<{
  item: IPackage
  showIcon: boolean
  icon?: any
}>()

const emit = defineEmits(['selectedItem'])
</script>
