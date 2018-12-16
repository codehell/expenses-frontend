<template>
  <div class="flex justify-center container mx-auto">
    <div class="w-full max-w-xs">
      <h2>{{ $t('texts.sign_up') }}</h2>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="send">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
            {{ $t('labels.email') }}
          </label>
          <input
            class="ch-input"
            id="email"
            name="email"
            type="text"
            :placeholder="$t('labels.email')"
            v-model="email"
            v-validate="'required|email'">

          <div class="text-red text-xs text-center mt-1">{{ errors.first('email') }}</div>
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            {{ $t('labels.password') }}
          </label>
          <input
            class="ch-input"
            id="password"
            name="password"
            ref="password"
            type="password"
            placeholder="******************"
            v-model="password"
            v-validate="'required|min:4'">

          <div class="text-red text-xs text-center mt-1">{{ errors.first('password') }}</div>
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            {{ $t('labels.confirm_password') }}
          </label>
          <input
              class="ch-input"
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="******************"
              v-model="confirmPassword"
              v-validate="'required|confirmed:password|min:4'">

          <div class="text-red text-xs text-center mt-1">{{ errors.first('confirm_password') }}</div>
        </div>

        <div class="text-red text-xs text-center mt-1" v-if="error">{{ error }}</div>
        <div class="text-green text-xs text-center mt-1" v-if="message">{{ message }}</div>

        <div class="flex items-center justify-between mt-4">
          <button
            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Sign In
          </button>
        </div>
      </form>
      <p class="text-center text-grey text-xs">
        ©2018 Acme Corp. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Config from '@/config'

@Component
export default class Register extends Vue {
  confirmPassword: string = ''
  email: string = ''
  password: string = ''
  error: string = ''
  message: string = ''

  send () {
    this.error = ''
    this.message = ''
    let data = {
      'email': this.email,
      'password': this.password,
      'confirm_password': this.confirmPassword
    }
    let headers = new Headers()
    headers.set('Content-Type', 'application/json')
    this.$validator.validate()
      .then(ok => {
        if (ok) {
          fetch(Config.baseUrl() + 'auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
          })
            .then(res => {
              if (res.status === 201) {
                this.message = this.$t('messages.user_created') as string
              } else {
                throw new Error(res.statusText)
              }
            })
            .catch(err => {
              if (err.message === 'Conflict') {
                this.error = this.$t('errors.unique_violation') as string
              } else {
                this.error = this.$t('errors.undefined') as string
              }
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
        "unique_violation": "This email is already registered"
      },
      "messages": {
        "user_created": "User was successfully created"
      },
      "texts": {
        "sign_up": "Sign Up"
      }
    }
  }
</i18n>
