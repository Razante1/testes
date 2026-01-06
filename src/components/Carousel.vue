<script setup lang="ts">
import { computed } from 'vue'

type Item = string | {
  id?: number | string
  icon: string
  label?: string
  value?: any
}

const props = defineProps<{
  items: Item[]
  duration?: number 
}>()

const emit = defineEmits<{
  (e: 'select', item: Item): void
}>()

const duration = computed(() => props.duration ?? 20)

const normalizedItems = computed(() =>
  props.items.map((item, index) =>
    typeof item === 'string'
      ? { id: index, icon: item }
      : item
  )
)


const loopItems = computed(() => [
  ...normalizedItems.value,
  ...normalizedItems.value
])

function selectItem(item: Item) {
  emit('select', item)
}
</script>


<template>
  <div class="carousel">
    <div
      class="carousel-track"
      :style="{ animationDuration: duration + 's' }"
    >
      <div
        v-for="item in loopItems"
        :key="item.id + '-loop'"
        class="carousel-item"
        @click="selectItem(item)"
      >
        <i :class="item.icon"></i>
        <span v-if="item.label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.carousel {
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  width: max-content;
  animation: 2s scroll linear infinite;
  gap: 30px
}

.carousel-item {
  min-width: 120px;
  text-align: center;
  cursor: pointer;
  padding: 12px;
  transition: transform 0.7s;
  background-color: gray;
}

.carousel-item:hover {
  transform: scale(1.1);
}

/* animação contínua */
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

</style>
