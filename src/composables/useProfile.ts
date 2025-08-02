import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/config/axios'
import type { IUser } from '@/types'
import { storeToRefs } from 'pinia'
import toast from '@/utils/toast'

export default function useProfile() {
  const processing = ref(false)
  const { auth } = storeToRefs(useAuthStore())

  const form = ref<any>({
    name: '',
    email: ''
  })

  async function getProfile() {
    await api.get('/profile').then((response) => {
      auth.value = response.data as IUser
      form.value.name = response.data.name
      form.value.email = response.data.email
    })
  }

  function updateProfile() {
    processing.value = true

    api
      .put('/profile', form.value)
      .then(async () => {
        await getProfile()
        toast.success('Perfil actualizado')
      })
      .catch((error: any) => {
        toast.error(error.response?.data?.message || error?.message || 'Error')
      })
      .finally(() => {
        processing.value = false
      })
  }

  return { getProfile, processing, auth, updateProfile, form }
}
