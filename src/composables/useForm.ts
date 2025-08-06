import { ref } from 'vue'

export default function useForm<T>(initialValues: any) {
  const form = ref<T>({ ...initialValues })

  function reset() {
    form.value = { ...initialValues }
  }

  return { form, reset }
}
