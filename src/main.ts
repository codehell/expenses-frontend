import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/app.css'
import i18n from './i18n'
import VeeValidate, { Validator } from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

/* tslint:disable:no-var-requires */
const fontawesome = require('@fortawesome/vue-fontawesome')

library.add(faTrash, faPen)
Vue.use(VeeValidate)
Vue.component('font-awesome-icon', fontawesome.FontAwesomeIcon)

Vue.config.productionTip = false

const dictionary = {
  en: {
    attributes: {
      confirm_password: 'confirm password'
    }
  }
}

Validator.localize(dictionary)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
