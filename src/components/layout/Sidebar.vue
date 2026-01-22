<script setup>
import { ref } from 'vue'

const rail = ref(false)
const drawer = ref(true) 

const items = [
  { title: 'Membros', route: '/admin/members', icon: 'mdi-account-group' },
  { title: 'Projetos', route: '/admin/projects', icon: 'mdi-folder-multiple' },
  { title: 'Eventos', route: '/admin/events', icon: 'mdi-calendar-multiple' },
  { title: 'Dados', route: '/admin/dados', icon: 'mdi-database' }
]
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    app
    elevation="1"
    width="260"
    class="admin-sidebar"
  >   
    <div class="sidebar-header" :class="{ 'px-2 justify-center': rail, 'px-4 justify-space-between': !rail }">
      
      <div v-if="!rail" class="d-flex align-center overflow-hidden">
        <img src="/camed.png" alt="Logo" class="sidebar-logo">
        <div class="ma-2">Admin Núcleo</div>
      </div>

      <v-btn
        variant="text"
        density="comfortable"
        :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
        @click.stop="rail = !rail"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="rail ? '' : item.title"
        :to="item.route"
        link
        color="primary"
        class="mb-2"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.admin-sidebar {
  border-right: 1px solid #e5e7eb !important;
  /* Garante que a fonte Poppins seja aplicada aqui também */
  font-family: 'Poppins', sans-serif !important;
  background-color: rgb(32, 32, 32);
  color: white;
}

.sidebar-header {
  display: flex;
  align-items: center;
  min-height: 64px;
  width: 100%;
}

.sidebar-logo {
  height: 40px; /* Ajuste o tamanho conforme necessário */
  width: auto;
  object-fit: contain;
  /* Transição suave para quando aparecer/sumir */
  transition: opacity 0.2s ease;
  align-self: center;
}
:deep(.v-list-item) {
  background-color: rgba(128, 128, 128, 0);
}
:deep(.v-list-item):hover {
  background-color: rgb(66, 66, 66);
}

:deep(.v-list-item--active) {
  background-color: #ffffff28 !important;
  color: #181818 !important;
}

/* Ajuste para que o texto dos itens da lista também use Poppins */
:deep(.v-list-item-title) {
  font-family: 'Poppins', sans-serif !important;
  font-weight: 500;
}
</style>