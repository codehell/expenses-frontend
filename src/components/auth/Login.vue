<template>
  <div class="flex justify-center container mx-auto">
    <div class="w-full max-w-xs">
      <h2>{{ $t('texts.login') }}</h2>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="send">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="ch-input"
            id="email"
            name="email"
            type="text"
            placeholder="email"
            v-model="email"
            v-validate="'required|email'">

          <div class="text-red text-xs text-center mt-1">{{ errors.first('email') }}</div>
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="ch-input"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            v-model="password"
            v-validate="'required|min:4'">

          <div class="text-red text-xs text-center mt-1">{{ errors.first('password') }}</div>
        </div>

        <div class="text-red text-xs text-center mt-1" v-if="error">{{ error }}</div>
        <div class="text-green text-xs text-center mt-1" v-if="message">{{ message }}</div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Login
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
      <p class="text-center text-grey text-xs">
        ©2018 Codehell Corp. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Config from '@/config'

@Component
export default class Login extends Vue {
  email: string = ''
  password: string = ''
  error: string = ''
  message: string = ''

  send () {
    let headers = new Headers()
    headers.set('Content-type', 'text/plain')
    headers.set('Authorization', 'Basic ' + btoa(this.email + ':' + this.password))
    this.$validator.validate()
      .then(result => {
        if (result) {
          fetch(Config.baseUrl() + 'auth/login', {
            method: 'POST',
            headers: headers
          })
            .then(res => {
              this.error = ''
              this.message = ''
              if (res.status === 200) {
                res.json()
                  .then((json) => {
                    window.localStorage.setItem('token', json.token)
                    this.$store.commit('setIsLogged', true)
                    this.$router.push({ name: 'dashboard/expenses' })
                  })
                this.message = this.$t('messages.login_ok') as string
              } else if (res.status === 401) {
                this.error = this.$t('errors.user_not_found') as string
              } else {
                throw new Error(res.statusText)
              }
            })
            .catch(() => {
              this.error = this.$t('errors.undefined') as string
            })
        }
      })
  }
}
</script>

<i18n>
  {
    "en": {
      "errors": {
        "user_not_found": "Incorrect user or password"
      },
      "messages": {
        "login_ok": "Correct login"
      },
      "texts": {
        "login": "Login"
      }
    }
  }
</i18n>
