import type { IErrorStatus, IUser } from '@/types'
import { useUserStore } from '@/stores/user'
import api from "@/config/axios.js"
import { storeToRefs } from "pinia"

export default function useUser() {
  const { setUsers } = useUserStore()
  const { users } = storeToRefs(useUserStore())

  async function getUsers() {
     try {
      const response = await api.get('/users')
      setUsers(response.data as IUser[])
    } catch (error) {

    }
  }

  return { getUsers, users }
}
