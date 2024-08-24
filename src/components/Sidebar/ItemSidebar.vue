<script setup lang="ts">
import router from '@/router';

interface IItemSidebar {
  item: {
    title: string
    icon: any
    to: { name?: string }
  }
}
const props = defineProps<IItemSidebar>()

const isActive = () => {
  if (router.currentRoute.value.name && props.item.to?.name) {
    return router.currentRoute.value.name.toString().includes(props.item.to?.name)
  }

  return false
}

</script>

<template>
  <span class="flex items-center px-2 py-3 rounded-xl gap-4 cursor-pointer"
    :class="[isActive() ? 'bg-blue-600 text-white' : 'hover:bg-blue-50']">
    <component v-if="item.icon" :is="item.icon" size="25"></component>
    <span>{{ item.title }}</span>
  </span>
</template>
