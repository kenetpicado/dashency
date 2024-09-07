<template>
  <div v-if="pages > 1" class="flex items-center justify-center gap-1 mb-4">
    <button
      type="button"
      v-for="item in pages"
      @click="selectThisPage(item)"
      :class="item == page ? 'bg-edo-950 text-white border-edo-950' : 'bg-white'"
      class="h-8 w-10 flex items-center justify-center rounded-lg border"
      :key="item"
    >
      {{ item }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pages: number
  page: number | string
}>()

const emit = defineEmits(['selected'])

function selectThisPage(selected: number) {
  if (selected === props.page) return
  emit('selected', selected)
}
</script>
