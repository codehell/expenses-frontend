import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

interface Expense {
  amount: string
  // eslint-disable-next-line
  created_at: string
}

interface RootStore {
  expenses: Array<Expense>
  filtered: Array<Expense>
}

Vue.use(Vuex)

export default new Vuex.Store<RootStore>({
  state: {
    expenses: [],
    filtered: [],
  },
  mutations: {
    setExpenses (state, expenses) {
      state.expenses = expenses
    },
    setFiltered (state, expenses) {
      state.filtered = expenses
    }
  },
  actions: {

  }
})
