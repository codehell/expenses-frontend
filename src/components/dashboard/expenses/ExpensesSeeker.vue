<template>
    <div>
        <form class="bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4" @submit.prevent="search">
            <h3>Seek expense</h3>
            <div class="my-4">
                <input class="ch-input" name="date" ref="flp" placeholder="By date" v-model="date">
            </div>
            <div class="mb-4">
                <input
                    class="ch-input"
                    name="description"
                    type="text"
                    placeholder="By description"
                    v-model="description"
                >
            </div>
            <button type="submit" class="btn btn-indigo">Search</button>
            <button type="button" class="btn btn-indigo" @click="clear">Clear</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'flatpickr/dist/themes/dark.css'
import flatpickr from 'flatpickr'
import moment, { Moment } from 'moment'
import { Expense } from '@/types'

@Component
export default class ExpensesSeeker extends Vue {
  date: string = ''
  description: string = ''

  get expenses () {
    return this.$store.state.expenses
  }

  clear () {
    this.date = ''
    this.description = ''
    this.search()
  }
  search () {
    let expenses: Array<Expense> = this.expenses
    if (this.date.length > 0) {
      let selD: Moment = moment(this.date)
      expenses = expenses.filter((expense: Expense) => {
        let expD: Moment = moment(expense.created_at).startOf('day')
        let diff: number = selD.diff(expD, 'days')
        return diff === 0
      })
    }
    if (this.description.length > 0) {
      expenses = expenses.filter((expense: Expense) => {
        return expense.description.toLowerCase().includes(this.description)
      })
    }
    this.$store.commit('setFiltered', expenses)
  }

  mounted () {
    let element = this.$refs.flp as HTMLElement
    flatpickr(element, {})
  }
}
</script>
