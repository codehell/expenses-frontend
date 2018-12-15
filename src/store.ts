import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { Expense, RootStore } from '@/types'

Vue.use(Vuex)

export default new Vuex.Store<RootStore>({
  state: {
    expenses: [],
    filtered: [],
    isLogged: false,
  },
  mutations: {
    setExpenses (state, expenses) {
      state.expenses = expenses
    },
    setFiltered (state, expenses) {
      state.filtered = expenses
    },
    setIsLogged (state, isLogged) {
      state.isLogged = isLogged
    }
  },
  actions: {

  }
})
