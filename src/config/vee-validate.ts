import { localize, setLocale } from '@vee-validate/i18n'
import es from '@vee-validate/i18n/dist/locale/es.json'
import { all } from '@vee-validate/rules'
import { configure, defineRule } from 'vee-validate'

setLocale('es')

configure({
  generateMessage: localize({
    es
  }),
  validateOnBlur: false,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: false
})

configure({
  generateMessage: localize({
    es: {
      messages: {
        required: 'Este campo es requerido',
        min: 'Debe tener al menos 0:{min} caracteres',
        confirmed: 'Este campo no coincide'
      }
    }
  })
})

defineRule('password', (value: string) => {
  if (value.length < 8) {
    return 'Debe tener al menos 8 caracteres'
  }

  if (!/[A-Z]/.test(value)) {
    return 'Debe contener al menos una letra mayúscula'
  }

  if (!/\d/.test(value)) {
    return 'Debe contener al menos un número'
  }

  return true
})

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})
