<script setup>
import { ref } from 'vue'
import Sidebar from '@/views/admin/components/Sidebar.vue'

const drawer = ref(true)
</script>

<template>
  <v-app>

    <Sidebar v-model="drawer" />
    <v-main>
      <div class="admin-main">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.admin-main {
  padding: 24px;
  background-color: #f8fafc;
  min-height: 100vh;
}
</style>
