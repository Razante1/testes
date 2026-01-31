

<script setup>
import { useTable } from '@/composables/useTable'
import { useAdminActions } from './hooks/useAdminAction'
import { resources } from './../../config/config'
import { useRoute } from 'vuetify/lib/composables/router.mjs'
import { computed, ref } from 'vue'


const props = defineProps({
  section: {
    type: String,
    default: ''
  }
})
const route = useRoute()
const section = computed(() => props.section || route.params.section || '')
const currentConfig = computed(() => resources[section.value] || { service: null, mappers: {} })
const search = ref('')

const { items, loading, getById, create, update, remove, selected } = useTable(currentConfig)


const { showCreate, showUpdate, showDelete, showView, onEdit, onView, onDelete, selectedItem } = useAdminActions(getById)

import DataTable from '@/components/table/DataTable.vue'
import CreateModal from '@/components/modals/CreateModal.vue'
import UpdateModal from '@/components/modals/UpdateModal.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import ViewModal from '@/components/modals/ViewModal.vue'

</script>


<template>
  <v-container v-if="!section" fluid class="pa-8 bg-slate-50 fill-height align-start">
 </v-container>

  <div v-else class="admin-main">
    <div class="action-bar d-flex align-center pa-4 bg-white border-bottom">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Pesquisar..."
        variant="outlined"
        density="compact"
        hide-details
        class="search-input mr-4"
        bg-color="#f8fafc"
      />

      <v-spacer />

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        elevation="0"
        @click="showCreate = true"
      >
        Novo Registro
      </v-btn>
    </div>

    <div class="admin-container">
      <v-progress-linear v-if="loading" indeterminate color="primary" />
      
      <DataTable
        :key="section" 
        :items="items"
        :search="search"
        height="calc(100vh - 160px)" 
        fixed-header
        @edit="onEdit"
        @delete="onDelete"
        @view="onView"
      />
    </div>
  </div>

  <CreateModal 
    v-model="showCreate" 
    @save="create" 
  />
  
  <UpdateModal 
    v-model="showUpdate" 
    :data="selected" 
    @save="update(selected.id, $event)" 
  />
  
  <DeleteModal 
    v-model="showDelete" 
    :data="selected" 
    @confirm="remove(selected.id)" 
  />
  
  <ViewModal 
    v-model="showView" 
    :data="selected" 
  />
</template>
<style scoped>
.button-registro {
  background-color: #babbbd;
  color: rgb(39, 39, 39);
}
.button-registro:hover {
  background-color: rgb(151, 151, 151);
}
.action-bar {
  border-bottom: 1px solid #e2e8f0;
  min-height: 72px;
}

.search-input {
  max-width: 400px; /* Limita o tamanho da busca para não ocupar a tela toda */
}

.admin-main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffffff;
}

.admin-container {
  flex: 1;
  overflow: hidden;
}
</style>