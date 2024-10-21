<template>
  <div v-if="pages > 1" class="flex items-center justify-center gap-3 mb-4">
    <button v-if="Number(page) > 1" type="button"
      class="h-8 w-10 flex items-center justify-center rounded-lg border bg-white" @click="getPrev">
      <IconChevronLeft size="25" class="text-gray-500" />
    </button>
    <div class="text-sm text-gray-600">
      Pagina {{ page }} de {{ pages }}
    </div>
    <button v-if="Number(page) < pages" type="button"
      class="h-8 w-10 flex items-center justify-center rounded-lg border bg-white" @click="getNext">
      <IconChevronRight size="25" class="text-gray-500" />
    </button>
  </div>

</template>

<script setup lang="ts">
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

const props = defineProps<{
  pages: number
  page: number | string
}>()

const emit = defineEmits(['selected'])

function getPrev() {
  if (props.page === 1) return
  emit('selected', Number(props.page) - 1)
}

function getNext() {
  if (props.page === props.pages) return
  emit('selected', Number(props.page) + 1)
}

</script>
