export interface Expense {
  id: number
  user_id: number
  amount: string
  description: string
  created_at: string
  updated_at: string
}

export interface Tag {
  id: number
  user_id: number
  name: string
  created_at: string
  updated_at: string
}

export interface RootStore {
  expenses: Array<Expense>
  filtered: Array<Expense>
}