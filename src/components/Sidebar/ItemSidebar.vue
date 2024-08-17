<script setup lang="ts">
interface IItemSidebar {
  item: {
    title: string
    icon: any
  }
}
defineProps<IItemSidebar>()
</script>

<template>
  <span class="flex items-center px-2 py-3 rounded-xl gap-4 hover:bg-blue-50 cursor-pointer">
    <component v-if="item.icon" :is="item.icon" size="25"></component>
    <span>{{ item.title }}</span>
  </span>
</template>
