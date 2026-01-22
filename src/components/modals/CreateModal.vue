<script setup>
import { ref, computed, watch } from 'vue' // Adicione watch
import { useRoute } from 'vue-router'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'save'])
const route = useRoute()
const section = computed(() => route.params.section)

const form = ref({})

// 🔹 ESSENCIAL: Observar a abertura do modal para limpar/preparar o formulário
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    const initialForm = {}
    fields.value.forEach(field => {
      if (field.key === 'status') {
        initialForm[field.key] = 'active' // Valor padrão do seu mock
      } else {
        initialForm[field.key] = field.type === 'tags' ? [] : ''
      }
    })
    form.value = initialForm
  }
})

const fields = computed(() => {
if (section.value === 'members') {
    return [
      { key: 'name', label: 'Nome', type: 'text' },
      { key: 'role', label: 'Cargo', type: 'text' },
      { key: 'email', label: 'E-mail', type: 'text' },
      { key: 'status', label: 'Membro Ativo?', type: 'status-trigger' }, // 🔹 Novo tipo
      { key: 'avatar', label: 'Foto do Perfil (URL)', type: 'text' },
    ]
  } 
  if (section.value === 'projects') {
    return [
      { key: 'name', label: 'Nome do Projeto', type: 'text' },
      { key: 'status', label: 'Projeto Ativo?', type: 'status-trigger' }, // 🔹 Novo tipo
      { key: 'description', label: 'Descrição', type: 'textarea' },
      { key: 'technologies', label: 'Tecnologias', type: 'tags' },
      { key: 'images', label: 'Galeria do Projeto', type: 'image-list' },
    ]
  }
  if (section.value === 'events') {
    return [
      { key: 'name', label: 'Nome do Evento', type: 'text' },
      { key: 'date', label: 'Data do Evento', type: 'date' },
      { key: 'location', label: 'Localização', type: 'text' },
      { key: 'description', label: 'Detalhes', type: 'textarea' },
      { key: 'images', label: 'Fotos do Evento', type: 'image-list' },
    ]
  }
  return []
})

function submit() {
  emit('save', { ...form.value })
  emit('update:modelValue', false) // Fecha o modal após salvar
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="600" persistent>
    <v-card>
      <v-card-title class="text-capitalize pa-4 bg-primary text-white">
        Novo {{ section === 'members' ? 'Membro' : section === 'projects' ? 'Projeto' : 'Evento' }}
      </v-card-title>

      <v-card-text class="pt-6">
        <v-row>
          <v-col v-for="field in fields" :key="field.key" cols="12">
            
            <v-select
              v-if="field.type === 'status-trigger'"
              v-model="form[field.key]"
              :label="field.label"
              :items="[
                { title: 'Ativo', value: 'active' },
                { title: 'Inativo', value: 'inactive' }
              ]"
              variant="outlined"
              density="comfortable"
            />

            <v-file-input
              v-else-if="field.type === 'image-list'"
              v-model="form[field.key]"
              :label="field.label"
              multiple
              variant="outlined"
              density="comfortable"
            />

            <v-text-field
              v-else-if="field.type === 'date'"
              v-model="form[field.key]"
              :label="field.label"
              type="date"
              variant="outlined"
              density="comfortable"
            />

            <component
              v-else
              :is="field.type === 'textarea' ? 'v-textarea' : field.type === 'tags' ? 'v-combobox' : 'v-text-field'"
              v-model="form[field.key]"
              :label="field.label"
              :multiple="field.type === 'tags'"
              :chips="field.type === 'tags'"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
            />
            
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="text" color="grey" @click="emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="primary" variant="elevated" @click="submit">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>