import { useDateFormat } from '@vueuse/core'

export const getFormattedDate = (date?: Date, format = 'DD/MM/YY hh:mm a') => {
  if (!date) {
    return ''
  }

  return useDateFormat(date, format, { locales: 'es-NI' }).value
}

export const getBaseDate = (date: Date | string) => {
  if (!date) {
    return ''
  }

  return useDateFormat(date, 'DD/MM/YYYY').value
}

export default getFormattedDate
