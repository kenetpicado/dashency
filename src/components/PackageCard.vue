<template>
    <div class="bg-white border rounded-lg p-4">
        <div class="flex justify-between">
            <span class="text-lg font-bold text-edo-950">
                {{ item.guide }}
            </span>
            <span class="text-gray-400">
                {{ getBaseDate(item.entryDate) }}
            </span>
        </div>
        <div class="mb-2">
            {{ item.client }}
        </div>
        <div class="text-sm text-gray-400 mb-4">
            {{ item.description }} ({{ item.pieces }})
        </div>
        <div class="flex items-center justify-between">
            <div class="flex gap-1">
                <span class="text-sm bg-edo-50 px-2 py-1 rounded-lg text-edo-900">
                    {{ item.type }}
                </span>
                <span class="text-sm bg-gray-100 px-2 py-1 rounded-lg">
                    {{ item.status }}
                </span>
            </div>
            <span class="flex items-center gap-4">
                <span class="text-xl font-bold text-edo-950">{{ item.grossWeight }} lbs</span>
                <button v-if="showIcon" type="button" @click="emit('selectedItem', item)"
                    class="bg-edo-950 rounded-full p-1 text-white">
                    <component :is="icon ?? IconArrowRight" size="22" />
                </button>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IPackage } from '@/types';
import { getBaseDate } from '@/utils/date';
import { IconArrowRight } from '@tabler/icons-vue';

defineProps<{
    item: IPackage
    showIcon: boolean,
    icon?: any
}>()

const emit = defineEmits(['selectedItem'])
</script>