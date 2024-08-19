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

export interface IErrorSatus {
  field: string
  message: string
}

export interface ILoginForm {
  email: string
  password: string
}

export interface IProfile {
  _id: string
  name: string
  email: string
  role: status
  password_updated_at?: string
}
