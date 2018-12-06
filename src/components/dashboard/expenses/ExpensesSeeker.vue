<template>
    <div>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="search">
            <div class="mb-4">
                <input class="ch-input" name="date" ref="flp" placeholder="By date" v-model="date">
            </div>
            <div class="mb-4">
                <input class="ch-input" name="description" type="text" placeholder="By description">
            </div>
            <button type="submit" class="btn btn-indigo">Search</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'flatpickr/dist/themes/dark.css'
import flatpickr from 'flatpickr'
import moment, { Moment } from 'moment'

@Component
export default class ExpensesSeeker extends Vue {
  date: string = ''

  get expenses () {
    return this.$store.state.expenses
  }

  private search () {
    let selD: Moment = moment(this.date)
    let expenses: any = this.expenses.filter((expense: any) => {
      let expD: Moment = moment(expense.created_at).startOf('day')
      let diff: number = selD.diff(expD, 'days')
      return diff === 0
    })
    this.$store.commit('setFiltered', expenses)
  }

  mounted () {
    let element = this.$refs.flp as HTMLElement
    flatpickr(element, {})
  }
}
</script>

<style scoped>

</style>
