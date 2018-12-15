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
                    <router-link class="mx-2" :to="{ name: 'login' }">Logout</router-link>
                    <router-link class="mx-2" :to="{ name: 'dashboard/expenses' }">Dashboard</router-link>
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
  get isLogged () {
    return localStorage.getItem('token') != null
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
        @apply text-indigo-dark;
    }
</style>
