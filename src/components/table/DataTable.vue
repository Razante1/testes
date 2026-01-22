<script setup>
import { computed } from 'vue'

defineEmits(['edit', 'delete', 'view'])

const props = defineProps({
  items: Array,
  height: { type: String, default: '400px' },
  search: String, // Este é o search que vem do AdminView
  density: { type: String, default: 'comfortable' }
})

// ❌ REMOVI: const search = ref('') -> Pois usaremos a prop search

const headers = computed(() => {
  if (!Array.isArray(props.items) || props.items.length === 0) return []

  const generatedHeaders = Object.keys(props.items[0])
    .filter(key => key !== 'id' && key !== 'images')
    .map(key => ({
      title: key.replace(/_/g, ' ').toUpperCase(),
      key,
      align: 'start',
      minWidth: '200px', // Reduzi um pouco para caber melhor
    }))

  return [
    ...generatedHeaders,
    { 
      title: 'AÇÕES', 
      key: 'actions', 
      sortable: false, 
      align: 'center',
      width: '130px',
      fixed: true,
    }
  ]
})
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search" 
    :height="height" 
    fixed-header
    :density="density"
    class="custom-table"
  >
    <template #item.actions="{ item }">
      <div class="actions-wrapper">
        <v-btn icon="mdi-eye" variant="text" size="small" color="info" @click="$emit('view', item)" />
        <v-btn icon="mdi-pencil" variant="text" size="small" color="warning" @click="$emit('edit', item)" />
        <v-btn icon="mdi-delete" variant="text" size="small" color="error" @click="$emit('delete', item)" />
      </div>
    </template>

    <template #no-data>
      <v-alert type="info" variant="tonal" class="ma-4">
        Nenhum registro encontrado.
      </v-alert>
    </template>
  </v-data-table>
</template>

<style scoped>
/* Estilo para garantir que a tabela ocupe o container sem margens */
.custom-table {
  background: white !important;
  width: 100% !important;
}

/* Fixação da coluna de ações */
:deep(.v-data-table__table) {
  border-collapse: separate;
  border-spacing: 0;
}

:deep(thead th:last-child),
:deep(tbody td:last-child) {
  position: sticky !important;
  right: 0 !important;
  z-index: 2 !important;
  background: white !important;
  border-left: 1px solid #eef2ff !important;
}

:deep(thead th:last-child) {
  z-index: 3 !important;
  background: #f8fafc !important;
}

.actions-wrapper {
  display: flex;
  justify-content: center;
  gap: 2px;
}
</style>