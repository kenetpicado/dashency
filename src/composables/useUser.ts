import type { IUser } from '@/types'
import { useUserStore } from '@/stores/user'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import toast from '@/utils/toast'

export default function useUser() {
  const { setUsers } = useUserStore()
  const { users } = storeToRefs(useUserStore())
  const processing = ref<boolean>(false)

  async function getUsers() {
    processing.value = true
    await api
      .get('/users')
      .then((response) => {
        setUsers(response.data as IUser[])
      })
      .finally(() => {
        processing.value = false
      })
  }

  function updateUser(data: IUser, onDone: () => void) {
    processing.value = true

    api
      .put('/users/' + data.id, data)
      .then(() => {
        getUsers()
        onDone()
      })
      .catch((error: any) => {
        toast.error(error.response?.data?.message || error?.message || 'Error')
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { getUsers, updateUser, users, processing }
}
