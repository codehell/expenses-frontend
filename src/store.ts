import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { Expense, RootStore } from '@/types'

Vue.use(Vuex)

export default new Vuex.Store<RootStore>({
  state: {
    expenses: [],
    filtered: []
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
