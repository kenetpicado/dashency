import type { IAccount, IPrice } from '../types'

export const defaultPriceForm: IPrice = {
  id: '',
  type: '',
  value: 0
}

export const defaultAccountForm: IAccount = {
  id: '',
  type: '',
  number: '',
  holder: '',
  status: ''
}
