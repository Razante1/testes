import { ref } from 'vue'

export function useTable() {
  const items = ref([])
  const error = ref(null)
  const loading = ref(false)
  const selected = ref(null)

async function getAll(service, mappers) {
  loading.value = true
  items.value = [] 
  try {
    const data = await service.getList()
    items.value = mappers?.ListDTO 
      ? data.map(item => new mappers.ListDTO(item)) 
      : data
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
} 


  async function getById(id, service, mappers) {
    loading.value = true
    try {
      const data = await service.getById(id)
      selected.value = mappers?.FullModel 
        ? new mappers.FullModel(data) 
        : data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // 🔹 CRIAR
  async function create(payload, service, mappers) {
    loading.value = true
    try {
      await service.create(payload)
      // Após criar, atualiza a lista automaticamente usando o service e mappers atuais
      await getAll(service, mappers)
    } catch (err) {
      error.value = err
      throw err 
    } finally {
      loading.value = false
    }
  }

  // 🔹 ATUALIZAR
  async function update(id, payload, service, mappers) {
    loading.value = true
    try {
      await service.update(id, payload)
      await getAll(service, mappers)
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }


  async function remove(id, service, mappers) {
    loading.value = true
    try {
      await service.remove(id)
      await getAll(service, mappers)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function select(item) {
    selected.value = item
  }

  function clearSelected() {
    selected.value = null
  }

  return {
    items,
    loading,
    error,
    selected,
    getAll,
    getById,
    create,
    update,
    remove,
    select,
    clearSelected
  }
}