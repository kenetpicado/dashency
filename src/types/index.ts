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
  id?: string
  guide: string
  description: string
  pieces: number
  grossWeight: number
  client: string
  entryDate: string
  status?: string
  createdAt?: Date
  type?: string
}

export interface IBatch {
  id?: string
  total: number
  type: string
  packages: IPackage[]
  createdAt?: Date
  user?: IUser
}

export interface IItemSidebar {
  item: {
    title: string
    icon: any
    to?: { name?: string }
  }
  active?: boolean
}

export interface IStatCard {
  stat: {
    title: string
    value: string | number
    icon?: any
  }
}
