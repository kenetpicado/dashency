import toast from './toast'

export default function processError(error: any) {
  toast.error(error.response?.data?.message || error?.message || 'Ha ocurrido un error')
}
