<script setup>
import Carousel from './components/Carousel.vue';


const icons = [
  { id: 1, icon: 'mdi-home', label: 'Home' },
  { id: 2, icon: 'mdi-account', label: 'Perfil' },
  { id: 3, icon: 'mdi-cog', label: 'Configurações' },
  { id: 4, icon: 'mdi-bell', label: 'Notificações' },
  { id: 5, icon: 'mdi-email', label: 'Mensagens' },
  { id: 6, icon: 'mdi-heart', label: 'Favoritos' },
  { id: 7, icon: 'mdi-star', label: 'Destaques' },
  { id: 8, icon: 'mdi-calendar', label: 'Agenda' },
  { id: 9, icon: 'mdi-chart-line', label: 'Relatórios' },
  { id: 10, icon: 'mdi-folder', label: 'Arquivos' },
  { id: 11, icon: 'mdi-image', label: 'Galeria' },
  { id: 12, icon: 'mdi-lock', label: 'Segurança' },
  { id: 13, icon: 'mdi-help-circle', label: 'Ajuda' },
  { id: 14, icon: 'mdi-logout', label: 'Sair' }
]


</script>

<template>
  <Carousel
  :items="icons"
  :interval="5000"
  :visibleCount="14"
  :duration="60"
  @select="handleSelect"
  />

</template>

<style scoped>

</style>
