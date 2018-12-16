<template>
    <div>
        <h3>Expenses</h3>
        <div class="my-2 text-right">
            <router-link class="link" :to="{ name: 'dashboard/expenses' }">manage</router-link>
        </div>
        <h3>Settings</h3>
        <div class="my-2 text-right">
            <router-link class="link" :to="{ name: 'dashboard/expenses' }">profile</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class DashboardMenu extends Vue {
}
</script>

<style scoped>
    .link {
        color: #a0a0a0;
        text-decoration: none;
    }
</style>
