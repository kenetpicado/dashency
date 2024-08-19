import router from '@/router'
import { ref } from 'vue'

export default function useUser() {
  const users = ref([])

  function logout(): void {
    router.push({ name: 'login' })
  }

  function getUsers() {}

  return { register }
}
