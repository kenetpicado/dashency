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
  lastActivity?: Date
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

export interface IPackageResponse {
  data: IPackage[]
  pages: number
  current: number
}

export interface IBatchResponse {
  data: IBatch[]
  pages: number
  current: number
}

export interface IBatch {
  id?: string
  total: number
  code: string
  type: string
  packages: IPackage[]
  createdAt?: Date
  user?: IUserInfo
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
  title: string | number
  value: string | number
  icon?: any
}

export interface ISummary {
  type: string
  weight: number
  amount: number
  count: number
}

export interface IBilling {
  id?: string
  client: string
  packages?: IPackage[]
  packages_ids?: Array<string>
  total: number
  reference: string
  bank: string
  summary?: ISummary[]
  createdAt?: Date
  user?: IUserInfo
}

export interface IBillingResponse {
  data: IBilling[]
  pages: number
  current: number
}

export interface IUserInfo {
  id: string
  name: string
  email: string
}

export interface IExpense {
  id?: string
  concept: string
  description?: string
  quantity: number
  cost: number
  total?: number
  createdAt?: Date
  user?: IUserInfo
}

export interface IExpenseResponse {
  data: IExpense[]
  pages: number
  current: number
}

export interface IHome {
  stats: IStatCard[]
  expenses: Array<any>
  incomes: Array<any>
}

export interface IArching {
  id?: string
  date: string
  billings?: IBilling[]
  billing_ids?: Array<string>
  total: number
  createdAt?: Date
  user?: IUserInfo
  summary: ISummary[]
  summaryBanks: IBankSummary[]
}

export interface IArchingResponse {
  data: IArching[]
  pages: number
  current: number
}

export interface IBankSummary {
  bank: string
  total: number
  references: string[]
}
