<template>
    <div id="app">
        <nav class="nav-top">
            <div>
                <router-link class="mx-2" :to="{ name: 'home' }">
                    <img class="logo" src="./assets/chlogo.png" alt="chlogo">
                </router-link>
            </div>
            <div class="flex">
                <template v-if="!isLogged">
                    <router-link class="mx-2" :to="{ name: 'login' }">Login</router-link>
                    <router-link class="mx-2" :to="{ name: 'register' }">Sing up</router-link>
                </template>
                <template v-else>
                    <a href="#" @click.prevent="logout">Logout</a>
                    <router-link class="mx-2" :to="{ name: 'dashboard' }">Dashboard</router-link>
                </template>
            </div>
        </nav>
        <router-view/>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  logout () {
    this.$store.commit('setIsLogged', false)
    localStorage.removeItem('token')
    this.$router.push({ name: 'login' })
  }
  get isLogged () {
    return this.$store.state.isLogged
  }

  mounted () {
    if (localStorage.getItem('token')) {
      this.$store.commit('setIsLogged', true)
    }
  }
}
</script>

<style>
    body {
        background-color: #f7f7f7;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f7f7f7;
    }

    .nav-top {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        height: 50px;
    }

    nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    nav a.router-link-exact-active {
        /*noinspection CssUnresolvedCustomPropertySet*/
        @apply text-indigo-dark;
    }
</style>
