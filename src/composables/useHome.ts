import type { IHome } from '@/types'
import { useHomeStore } from '@/stores/home'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export default function useHome() {
  const { home } = storeToRefs(useHomeStore())
  const processing = ref<boolean>(false)
  const year = ref(new Date().getFullYear())

  async function getHome() {
    processing.value = true

    await api
      .get('/home', {
        params: {
          timezoneOffset: new Date().getTimezoneOffset(),
          year: year.value
        }
      })
      .then((response) => {
        home.value = response.data as IHome
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { getHome, home, processing, year }
}
