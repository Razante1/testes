<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  data: Object
})

const emit = defineEmits(['update:modelValue'])


const fields = computed(() => {
  if (!props.data) return []
  return Object.entries(props.data).filter(([key]) => key !== 'id')
})


function getSrc(img) {
  if (typeof img === 'string') return img
  if (img instanceof File) return URL.createObjectURL(img)
  return ''
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    max-width="800"
  >
    <v-card>
      <v-card-title class="bg-grey-lighten-4 pa-4 d-flex align-center">
        <v-icon icon="mdi-eye" class="me-2" color="primary" />
        <span class="text-h6">Detalhes do Registro</span>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-6">
        <v-row>
          <v-col
            v-for="[key, value] in fields"
            :key="key"
            cols="12"
            class="pb-4"
          >
            <div class="text-overline text-grey-darken-1 lh-1">{{ key.replace(/_/g, ' ') }}</div>
            
            <div v-if="key === 'images' && Array.isArray(value)" class="mt-2">
              <v-row v-if="value.length > 0">
                <v-col
                  v-for="(img, i) in value"
                  :key="i"
                  cols="12" sm="4" md="3"
                >
                  <v-hover v-slot="{ isHovering, props: hoverProps }">
                    <v-img
                      v-bind="hoverProps"
                      :src="getSrc(img)"
                      aspect-ratio="1"
                      cover
                      class="rounded-lg bg-grey-lighten-2"
                      :elevation="isHovering ? 4 : 0"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey-lighten-5" />
                        </v-row>
                      </template>
                    </v-img>
                  </v-hover>
                </v-col>
              </v-row>
              <div v-else class="text-caption text-italic text-grey">Nenhuma imagem carregada.</div>
            </div>

            <div v-else-if="Array.isArray(value)" class="mt-1">
              <v-chip
                v-for="(item, i) in value"
                :key="i"
                size="small"
                color="primary"
                variant="flat"
                class="me-2 mb-1"
              >
                {{ item }}
              </v-chip>
            </div>

            <div v-else class="text-body-1 text-high-emphasis mt-1" style="white-space: pre-wrap;">
              {{ value || '—' }}
            </div>

            <v-divider class="mt-4" opacity="0.1"></v-divider>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn
          color="primary"
          variant="tonal"
          @click="emit('update:modelValue', false)"
          prepend-icon="mdi-close"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.lh-1 { line-height: 1; }
</style>