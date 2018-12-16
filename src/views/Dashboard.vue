<template>
  <div class="flex">
    <DashboardMenu class="mt-2 mr-3 p-2"></DashboardMenu>
    <router-view class="sm:flex-grow"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DashboardMenu from '@/components/dashboard/DashboardMenu.vue'

@Component({
  components: {
  DashboardMenu
  }
  })
export default class Dashboard extends Vue {}
</script>
