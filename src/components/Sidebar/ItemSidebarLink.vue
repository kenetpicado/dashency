<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ItemSidebar from './ItemSidebar.vue'
import router from '@/router';

const props = defineProps<{
  item: {
    title: string
    to: { name: string }
    icon: any
  }
}>()

</script>

<template>
  <RouterLink :to="item.to">
    <ItemSidebar :item="item" />
  </RouterLink>
</template>
