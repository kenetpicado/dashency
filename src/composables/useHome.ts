import type { IHome } from '@/types'
import { useHomeStore } from '@/stores/home'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export default function useHome() {
  const { setHome } = useHomeStore()
  const { home } = storeToRefs(useHomeStore())
  const processing = ref<boolean>(false)

  async function getHome() {
    await api
      .get('/home', {
        params: {
          timezoneOffset: new Date().getTimezoneOffset()
        }
      })
      .then((response) => {
        setHome(response.data as IHome)
      })
  }

  return { getHome, home, processing }
}
