<template>
  <div class="cursor-pointer flex flex-col gap-2 bg-white border rounded-lg p-4">
    <!-- TOP -->
    <div class="flex justify-between">
      <span class="flex items-center gap-1 text-lg font-bold text-neutral">
        <IconCircleCheckFilled v-if="item.status == 'FACTURADO'" size="20" class="text-green-600" />
        {{ item.guide ?? 'Sin guia' }}
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

    <!-- MIDDLE -->
    <div class="flex-1 flex flex-col gap-2 mb-2">
      <div v-if="item.tracking" class="text-sm">
        {{ item.tracking }}
      </div>
      <div>
        {{ item.client }}
      </div>

      <div class="flex gap-1 items-center text-sm text-gray-400">
        <span>{{ item.type }}</span>
        <span v-if="item.type == 'AEREO'">✈️</span>
        <span v-else>🚢</span>
      </div>

      <div v-if="item.description" class="text-sm text-gray-400">
        {{ item.description }} <span v-if="item.pieces">({{ item.pieces }})</span>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <span class="bg-neutral-100 px-3 py-1 rounded-lg">
        {{ item.status }}
      </span>
      <span class="flex items-center gap-1">
        <span class="text-xl">{{ item.grossWeight }} lbs</span>
        <button
          v-if="showIcon"
          type="button"
          @click="emit('selectedItem', item)"
          class="bg-neutral rounded-full p-1 text-white"
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
