import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import useCrud from '@/composables/useCrud'
import useForm from '@/composables/useForm'
import { ref } from 'vue'

export default function useUser() {
  const { users } = storeToRefs(useUserStore())
  const { index, processing, update } = useCrud('/users')
  const openModal = ref<boolean>(false)

  const { form, reset } = useForm<any>({
    id: '',
    role: '',
    status: ''
  })

  async function getUsers() {
    await index().then((response) => {
      users.value = response.data
    })
  }

  async function updateUser() {
    await update(form.value.id, form.value).then(() => {
      getUsers()
      document.getElementById('resetUser')?.click()
      reset()
      openModal.value = false
    })
  }

  return { getUsers, updateUser, users, processing, form, openModal }
}
