<script setup>
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTable } from '@/composables/useTable'

// Mapeamento de Services e Models
import { MemberService } from '../service/memberService'
import { ProjectService } from '../service/projectService' 
import { EventService } from '../service/eventService'     

import { MemberDTO, MemberFull } from '../models/Member'
import { EventDTO,EventFull } from '../models/Events'
import { ProjectDTO,ProjectFull } from '../models/Project'
// Componentes
import DataTable from '@/components/table/DataTable.vue'
import CreateModal from '@/components/modals/CreateModal.vue'
import UpdateModal from '@/components/modals/UpdateModal.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import ViewModal from '@/components/modals/ViewModal.vue'

const route = useRoute()
const section = computed(() => route.params.section)

// 1. Configuração Centralizada
const resources = {
  members: { 
    service: MemberService, 
    mappers: { ListDTO: MemberDTO, FullModel: MemberFull } 
  },
  projects: { 
    service: ProjectService, 
    mappers: { ListDTO: ProjectDTO, FullModel: ProjectFull } // Atualize aqui quando criar os models de projeto
  },
  events: { 
    service: EventService, 
    mappers: { ListDTO: EventDTO, FullModel: EventFull } 
  }
}

// 2. Resolve a configuração baseada na rota atual
const currentConfig = computed(() => resources[section.value] || resources.members)

// 3. Destruturação do Composable
const { 
  items, 
  loading, 
  selected, 
  getAll, 
  getById, 
  create, 
  update, 
  remove,
  clearSelected 
} = useTable()

// 4. Watcher de seção: Força a atualização dos dados ao trocar de aba
watch(() => route.params.section, (newSection) => {
  if (newSection) {
    clearSelected()
    const config = resources[newSection] || resources.members
    getAll(config.service, config.mappers)
  }
}, { immediate: true })

// 🔹 Controle de visibilidade dos modais
const showCreate = ref(false)
const showUpdate = ref(false)
const showDelete = ref(false)
const showView = ref(false)
const search = ref('')

// 🔹 Ações da Tabela
async function onEdit(itemDTO) {
  // Busca o model completo para carregar no UpdateModal
  await getById(itemDTO.id, currentConfig.value.service, currentConfig.value.mappers) 
  showUpdate.value = true
}

function onDelete(itemDTO) {
  selected.value = itemDTO 
  showDelete.value = true
}

async function onView(itemDTO) {
  // Busca o model completo para carregar no ViewModal
  await getById(itemDTO.id, currentConfig.value.service, currentConfig.value.mappers)
  showView.value = true
}

// 🔹 Handlers de Persistência (Passando service e mappers para atualizar a lista pós-ação)
async function handleCreate(newItem) {
  await create(newItem, currentConfig.value.service, currentConfig.value.mappers)
  showCreate.value = false
}

async function handleUpdate(updatedItem) {
  // selected.value.id contém o ID do item sendo editado
  await update(selected.value.id, updatedItem, currentConfig.value.service, currentConfig.value.mappers)
  showUpdate.value = false
}

async function handleConfirmDelete() {
  await remove(selected.value.id, currentConfig.value.service, currentConfig.value.mappers)
  showDelete.value = false
  clearSelected()
}

</script>

<template>
  <v-container v-if="!section" fluid class="pa-8 bg-slate-50 fill-height align-start">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-slate-800 mb-6">Painel Administrativo</h1>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card @click="$router.push('/admin/members')" hover class="pa-6 border-t-4 border-primary rounded-xl" elevation="2">
          <v-icon size="40" color="primary" class="mb-4">mdi-account-group</v-icon>
          <div class="text-h6 font-weight-bold">Membros</div>
          <div class="text-body-2 text-grey">Gerencie a equipe e permissões.</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card @click="$router.push('/admin/projects')" hover class="pa-6 border-t-4 border-success rounded-xl" elevation="2">
          <v-icon size="40" color="success" class="mb-4">mdi-rocket-launch</v-icon>
          <div class="text-h6 font-weight-bold">Projetos</div>
          <div class="text-body-2 text-grey">Acompanhe entregas e tecnologias.</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card @click="$router.push('/admin/events')" hover class="pa-6 border-t-4 border-info rounded-xl" elevation="2">
          <v-icon size="40" color="info" class="mb-4">mdi-calendar-check</v-icon>
          <div class="text-h6 font-weight-bold">Eventos</div>
          <div class="text-body-2 text-grey">Organize workshops e sprints.</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <div v-else class="admin-main">
    <div class="action-bar d-flex align-center pa-4 bg-white">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Pesquisar..."
        variant="outlined"
        density="compact"
        hide-details
        class="search-input mr-4"
        bg-color="#f8fafc"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        elevation="0"
        @click="showCreate = true"
      >
        Novo {{ section }}
      </v-btn>
    </div>

    <div class="admin-container">
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

  <CreateModal v-if="showCreate" v-model="showCreate" @save="handleCreate" />
  <UpdateModal v-if="showUpdate" v-model="showUpdate" :data="selected" @save="handleUpdate" />
  <DeleteModal v-if="showDelete" v-model="showDelete" :data="selected" @confirm="handleConfirmDelete" />
  <ViewModal v-if="showView" v-model="showView" :data="selected" />
</template>
<style scoped>
.button-registro {
  background-color: rgb(214, 214, 214);
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