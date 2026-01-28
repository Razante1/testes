<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  modelValue: Boolean,
  data: Object
})

const emit = defineEmits(['update:modelValue', 'save'])
const route = useRoute()
const section = computed(() => route.params.section)

const form = ref({})
const tempFiles = ref([])

// 🔹 ÚNICO WATCH: Consolida a inicialização dos dados
watch(() => props.modelValue, (isOpen) => {
  if (isOpen && props.data) {
    // Usamos spread {...} em vez de JSON.stringify para não perder objetos File
    form.value = { ...props.data }
    
    // Garante que images seja um array (essencial para o spread no handleNewImages)
    if (!Array.isArray(form.value.images)) {
      form.value.images = form.value.images ? [form.value.images] : []
    }
    
    // Garante que tecnologias seja um array
    if (!Array.isArray(form.value.technologies)) {
      form.value.technologies = form.value.technologies ? [form.value.technologies] : []
    }
  }
}, { immediate: true })

function getSrc(img) {
  if (typeof img === 'string') return img
  if (img instanceof File) return URL.createObjectURL(img)
  return ''
}

function removeImage(index) {
  form.value.images.splice(index, 1)
}

function handleNewImages(files) {
  if (!files || files.length === 0) return
  
  // Agora o form.value.images garantidamente é um array devido ao watch acima
  form.value.images = [...form.value.images, ...files]
  
  nextTick(() => { tempFiles.value = [] })
}

const fields = computed(() => {
  if (section.value === 'members') {
    return [
      { key: 'name', label: 'Nome', type: 'text' },
      { key: 'role', label: 'Cargo', type: 'text' },
      { key: 'images', label: 'Fotos do Membro', type: 'image-list' },
    ]
  } 
  if (section.value === 'projects') {
    return [
      { key: 'name', label: 'Nome do Projeto', type: 'text' },
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
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="650" persistent>
    <v-card shadow="24">
      <v-card-title class="bg-warning text-white pa-4">
        Editar {{ section }}
      </v-card-title>

      <v-card-text class="flex-grow-1 overflow-y-auto pt-6">
        <v-row>
          <v-col v-for="field in fields" :key="field.key" cols="12">
            <component
              :is="field.type === 'textarea' ? 'v-textarea' : field.type === 'tags' ? 'v-combobox' : 'v-text-field'"
              v-model="form[field.key]"
              :label="field.label"
              :multiple="field.type === 'tags'"
              :chips="field.type === 'tags'"
              :closable-chips="field.type === 'tags'"
              variant="outlined"
              density="comfortable"
            />
          </v-col>

          <v-col cols="12">
            <div class="text-overline mb-2 text-grey-darken-1">Galeria de Imagens</div>
            
            <v-row dense class="mb-4">
              <v-col v-for="(img, i) in form.images" :key="i" cols="4" sm="3" class="position-relative">
                <v-card variant="outlined" class="rounded-lg overflow-hidden border-dashed">
                  <v-img :src="getSrc(img)" aspect-ratio="1" cover class="bg-grey-lighten-3">
                    <v-btn
                      icon="mdi-close"
                      size="x-small"
                      color="error"
                      class="custom-delete-btn"
                      elevation="2"
                      @click="removeImage(i)"
                    />
                  </v-img>
                </v-card>
              </v-col>
            </v-row>

            <v-file-input
              v-model="tempFiles"
              label="Adicionar mais fotos"
              multiple
              prepend-inner-icon="mdi-camera-plus"
              variant="filled"
              accept="image/*"
              density="comfortable"
              @update:model-value="handleNewImages"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="text" color="grey-darken-1" @click="emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="warning" variant="elevated" class="px-6" @click="submit">Salvar Alterações</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.position-relative { position: relative; }
.custom-delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 10;
  width: 24px !important;
  height: 24px !important;
}
.border-dashed {
  border-style: dashed !important;
}
</style>