import toast from '@/utils/toast'
import useForm from '@/composables/useForm'
import useCrud from '@/composables/useCrud'

interface IFormPassword {
  currentPassword: string
  password: string
  confirmPassword: string
}

export default function usePassword() {
  const { request, processing } = useCrud('password')

  const { form, reset } = useForm<IFormPassword>({
    currentPassword: '',
    password: '',
    confirmPassword: ''
  })

  function updatePassword() {
    request({
      method: 'PUT',
      url: '/password',
      data: form.value
    }).then(() => {
      document.getElementById('passwordForm')?.click()
      toast.success('Actualizada correctamente')
      reset()
    })
  }

  return {
    updatePassword,
    form,
    processing
  }
}
