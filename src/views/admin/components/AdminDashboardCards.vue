<template>
  <v-row>
    <v-col 
      v-for="(config, key) in resources" 
      :key="key" 
      cols="12" 
      sm="6" 
      md="4"
    >
      <v-card
        @click="$router.push(`/admin/${key}`)"
        hover
        elevation="2"
        class="pa-6 rounded-xl border-t-4 transition-swing"

      >
        <div class="d-flex align-center mb-4">
          <v-avatar color="gray" variant="tonal" size="56">
            <v-icon size="32">{{ getIcon(key) }}</v-icon>
          </v-avatar>
        </div>

        <h3 class="text-h6 font-weight-bold text-slate-800 text-capitalize">
          {{ key }}
        </h3>
        
        <p class="text-body-2 text-grey-darken-1 mt-1">
          Gerenciar registros, edições e visualizações de {{ key }}.
        </p>

        <v-divider class="my-4" />

        <div class="d-flex align-center text-caption font-weight-bold">
          ACESSAR MÓDULO
          <v-icon end size="16">mdi-arrow-right</v-icon>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { resources } from '@/config/config.jsx'

// Mapeamento visual para os cards não ficarem todos iguais
const getIcon = (key) => {
  const icons = {
    members: 'mdi-account-group',
    projects: 'mdi-rocket-launch',
    events: 'mdi-calendar-star'
  }
  return icons[key] || 'mdi-database'
}


</script>

<style scoped>
.v-card {
  transition: all 0.3s ease-in-out;
}
.v-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1) !important;
}
.transition-swing {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>