export interface IInputForm {
  text: string
  name: string
  required?: boolean
  disabled?: boolean
  autofocus?: boolean
  type?: string
  placeholder?: string
  error?: IErrorStatus
}

export interface IErrorStatus {
  field: string
  message: string
}

export interface ILoginForm {
  email: string
  password: string
}

export interface IRegisterForm {
  email: string
  name: string
  password: string
  password_confirmation: string
}

export interface IUser {
  id: string
  name: string
  email: string
  role: string
  status: string
  passwordUpdatedAt?: Date
  lastActiveAt?: Date
  createdAt: Date
}

export interface IButton {
  type?: 'submit' | 'button'
  disabled?: boolean
  loading?: boolean
}

export interface IPackage {
  guide: string
  description: string
  pieces: number
  gross_weight: number
  client: string
  entry_date: string
}

export interface ICreatedBy {
  id: string
  name: string
  email: string
}

export interface IBatch {
  total: number
  packages: IPackage[]
  created_at: Date
  created_by: ICreatedBy
}

export interface IExcelFile {
  rows: IPackage[]
}
