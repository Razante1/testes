<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  data: Object, 
  endpoint: String
})

const emit = defineEmits(['update:modelValue', 'confirm'])
const itemName = computed(() => {
  return props.data?.name || props.data?.title || 'este registro'
})

async function confirmDelete() {
  emit('confirm', props.data?.id)
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="450" persistent>
    <v-card class="pa-2">
      <v-card-title class="d-flex align-center text-error">
        <v-icon icon="mdi-alert-octagon" class="me-2" color="error" />
        Confirmar Exclusão
      </v-card-title>

      <v-card-text class="text-body-1 pt-4">
        Você tem certeza que deseja remover <strong>"{{ itemName }}"</strong>? 
        <br>
        <span class="text-caption text-grey-darken-1">Esta ação não poderá ser desfeita.</span>
      </v-card-text>

      <v-divider class="mt-4"></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn 
          variant="text" 
          color="grey-darken-1" 
          @click="emit('update:modelValue', false)"
        >
          Cancelar
        </v-btn>
        
        <v-btn 
          color="error" 
          variant="elevated" 
          prepend-icon="mdi-trash-can"
          class="px-6"
          @click="confirmDelete"
        >
          Confirmar Exclusão
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>