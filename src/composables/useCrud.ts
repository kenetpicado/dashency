import api from '@/config/axios'
import { ref } from 'vue'
import toast from '@/utils/toast'
import processError from '@/utils/process-error'

export default function useCrud(path: string) {
  const processing = ref<boolean>(false)

  async function index(params?: any) {
    processing.value = true
    try {
      return await api.get(path, { params })
    } catch (error) {
      processError(error)
      throw error
    } finally {
      processing.value = false
    }
  }

  async function store(data: any) {
    processing.value = true
    try {
      const response = await api.post(path, data)
      toast.success('Guardado')
      return response
    } catch (error) {
      processError(error)
      throw error
    } finally {
      processing.value = false
    }
  }

  async function show(id: string) {
    processing.value = true
    try {
      return await api.get(`${path}/${id}`)
    } catch (error) {
      processError(error)
      throw error
    } finally {
      processing.value = false
    }
  }

  async function update(id: string, data: any) {
    processing.value = true
    try {
      const response = await api.put(`${path}/${id}`, data)
      toast.success('Actualizado')
      return response
    } catch (error) {
      processError(error)
      throw error
    } finally {
      processing.value = false
    }
  }

  async function destroy(id: string) {
    processing.value = true
    try {
      const response = await api.delete(`${path}/${id}`)
      toast.success('Eliminado')
      return response
    } catch (error) {
      processError(error)
      throw error
    } finally {
      processing.value = false
    }
  }

  async function request(options: any) {
    processing.value = true
    try {
      return await api.request(options)
    } catch (error) {
      processError(error)
      throw error
    } finally {
      processing.value = false
    }
  }

  return {
    index,
    show,
    store,
    update,
    destroy,
    request,
    processing
  }
}
