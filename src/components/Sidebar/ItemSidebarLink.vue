<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ItemSidebar from './ItemSidebar.vue'
import type { IItemSidebar } from '@/types'

defineProps<IItemSidebar>()
</script>

<template>
  <RouterLink v-if="item.to" :to="item.to">
    <ItemSidebar :item="item" :active="active" />
  </RouterLink>
</template>
