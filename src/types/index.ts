export interface IInputForm {
  text: string
  name: string
  required?: boolean
  disabled?: boolean
  autofocus?: boolean
  type?: string
  placeholder?: string
  error?: {
    name: string
    value: string
  }
}
