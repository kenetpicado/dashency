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

defineRule('password', (value: string) => {
  if (value.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres'
  }

  if (!/[A-Z]/.test(value)) {
    return 'La contraseña debe contener al menos una letra mayúscula'
  }

  if (!/\d/.test(value)) {
    return 'La contraseña debe contener al menos un número'
  }

  return true
})

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})
