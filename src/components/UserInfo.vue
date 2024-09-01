<template>
  <div class="flex gap-2 items-center">
    <img
      :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=DADFFB&color=0A165A`"
      alt=""
      class="object-cover w-10 h-10 rounded-full"
    />
    <div>
      <div class="mb-1">
        {{ item.name }}
      </div>
      <div class="text-sm text-gray-500">
        {{ item.email }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserInfo } from '@/types'

defineProps<{
  item: IUserInfo
}>()
</script>
