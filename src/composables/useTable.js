import { ref, watch } from 'vue'

export function useTable(config) {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selected = ref(null)

  // 🔹 A mágica: funções internas que já sabem quem usar baseadas na config atual
  async function getAll() {
    // Se não houver config ou service, sai silenciosamente sem quebrar
    if (!config.value?.service) return 
    
    loading.value = true
    try {
      const data = await config.value.service.getList()
      const { ListDTO } = config.value.mappers
      items.value = ListDTO ? data.map(i => new ListDTO(i)) : data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function getById(id) {
    loading.value = true
    try {
      const data = await config.value.service.getById(id)
      const { FullModel } = config.value.mappers
      selected.value = FullModel ? new FullModel(data) : data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function create(payload) {
    loading.value = true
    try {
      await config.value.service.create(payload)
      await getAll() // Auto-refresh!
    } finally {
      loading.value = false
    }
  }

  async function update(id, payload) {
    loading.value = true
    try {
      await config.value.service.update(id, payload)
      await getAll()
    } finally {
      loading.value = false
    }
  }

  async function remove(id) {
    loading.value = true
    try {
      await config.value.service.remove(id)
      await getAll()
    } finally {
      loading.value = false
    }
  }


  watch(config, (newConfig) => {
    if (newConfig?.service) {
      selected.value = null
      getAll()
    } else {
      items.value = [] 
    }
  }, { immediate: true })

  return {
    items, loading, error, selected,
    getAll, getById, create, update, remove
  }
}