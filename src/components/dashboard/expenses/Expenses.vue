<template>
    <div>
        <h2 class="mb-5 text-center">Expenses</h2>
        <div v-if="error">
            <p>{{ error }}</p>
        </div>
        <div v-if="message">
            <p>{{ message }}</p>
        </div>
        <div class="flex flex-wrap justify-evenly container mx-auto">
            <div class="w-full max-w-xs">
                <ExpensesSeeker></ExpensesSeeker>
            </div>
            <div class="w-full max-w-xs">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="create">
                    <div class="mb-4">
                        <input
                                class="ch-input"
                                type="text" v-model="amount" :placeholder="$t('texts.amount')" required>
                    </div>
                    <div class="mb-4">
                        <input
                                class="ch-input"
                                type="text" v-model="description" :placeholder="$t('texts.description')">
                    </div>
                    <div class="mb-4">
                        <select
                                class="ch-input"
                                v-model="selectedTags" multiple>
                            <option :value="tag.id" v-for="tag in tags" :key="tag.id">{{ tag.name }}</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-indigo">Submit</button>
                    <button type="button" class="btn btn-indigo" @click="refresh()">Refresh</button>
                </form>
            </div>
            <div class="w-full max-w-xs">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="createTag">
                    <div class="mb-4">
                        <input
                                class="ch-input"
                                type="text" v-model="tag" :placeholder="$t('texts.new_tag')">
                    </div>
                    <button type="submit" class="btn btn-indigo">Submit</button>
                </form>
            </div>
        </div>

        <ExpensesList :expenses="filtered" @delete-expense="deleteExpense"/>

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Config from '@/config'
import ExpensesList from '@/components/dashboard/expenses/ExpensesList.vue'
import ExpensesSeeker from '@/components/dashboard/expenses/ExpensesSeeker.vue'
import moment from 'moment'
import { Tag } from '@/types'

@Component({
  components: {
  ExpensesList,
  ExpensesSeeker
  }
  })
export default class Expenses extends Vue {
    amount: string = ''
    description: string = ''
    error: string = ''
    headers: Headers = new Headers()
    message: string = ''
    tag: string = ''
    tags: Array<Tag> = []
    selectedTags: Array<Number> = []

    get expenses () {
      return this.$store.state.expenses
    }

    get filtered () {
      return this.$store.state.filtered
    }

    create () {
      this.error = ''
      this.message = ''
      let tagsData: Array<Object> = []
      this.selectedTags.forEach((tag: Number) => {
        tagsData.push({ 'id': tag })
      })
      let data = {
        'amount': this.amount,
        'description': this.description,
        'tags': tagsData
      }
      this.headers.set('Content-Type', 'application/json')
      fetch(Config.baseUrl() + 'expenses', {
        method: 'Post',
        headers: this.headers,
        body: JSON.stringify(data)
      })
        .then((res) => {
          if (res.status === 201) {
            this.message = this.$t('messages.created') as string
          } else {
            this.message = this.$t('errors.undefined') as string
          }
        })
    }

    createTag () {
      this.error = ''
      this.message = ''
      let data = {
        'name': this.tag
      }
      this.headers.set('Content-Type', 'application/json')
      fetch(Config.baseUrl() + 'tags', {
        method: 'Post',
        headers: this.headers,
        body: JSON.stringify(data)
      })
        .then((res) => {
          if (res.status === 201) {
            this.message = this.$t('messages.created') as string
          } else {
            this.message = this.$t('errors.undefined') as string
          }
        })
    }

    deleteExpense (expense: Object) {
      this.error = ''
      this.message = ''
      this.headers.set('Content-Type', 'application/json')
      fetch(Config.baseUrl() + 'expenses', {
        method: 'Delete',
        headers: this.headers,
        body: JSON.stringify(expense)
      })
        .then((res) => {
          if (res.status === 204) {
            this.message = this.$t('messages.expense_deleted') as string
          } else {
            this.message = this.$t('errors.undefined') as string
          }
        })
    }

    refresh () {
      this.error = ''
      this.message = ''
      fetch(Config.baseUrl() + 'expenses', {
        method: 'GET',
        headers: this.headers
      })
        .then(res => {
          if (res.status === 401) {
            localStorage.removeItem('token')
            this.$store.commit('setIsLogged', false)
            this.$router.push({ name: 'login' })
          } else if (res.status !== 200) {
            this.error = this.$t('errors.undefined') as string
          } else {
            res.json()
              .then(json => {
                this.$store.commit('setExpenses', json.expenses)
                this.$store.commit('setFiltered', json.expenses)
                this.tags = json.tags
              })
          }
        })
        .catch(() => {
          this.error = this.$t('errors.undefined') as string
        })
    }

    parseDate (date: string) {
      return moment(date).format('lll')
    }

    mounted () {
      this.headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'))
      this.refresh()
    }
}
</script>

<i18n>
    {
        "en": {
            "texts": {
                "description": "Description",
                "amount": "Amount",
                "new_tag": "New tag"
            },
            "messages": {
                "expense_deleted": "The expense was deleted successfully"
            }
        }
    }
</i18n>
