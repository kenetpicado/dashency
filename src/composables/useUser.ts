import type { IErrorStatus, IUser } from '@/types'
import { useUserStore } from '@/stores/user'
import api from '@/config/axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export default function useUser() {
  const { setUsers } = useUserStore()
  const { users } = storeToRefs(useUserStore())
  const processing = ref<boolean>(false)

  async function getUsers() {
    try {
      const response = await api.get('/users')
      setUsers(response.data as IUser[])
    } catch (error) {}
  }

  async function updateUser(data: IUser) {
    try {
      processing.value = true
      const response = await api.put('/users/' + data._id, data)
      await getUsers()
    } catch (error) {
    } finally {
      processing.value = false
    }
  }

  return { getUsers, updateUser, users, processing }
}
