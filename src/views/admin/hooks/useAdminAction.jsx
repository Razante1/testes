// src/views/Admin/hooks/useAdminActions.js
import { ref } from 'vue'

export function useAdminActions(getById) {
  const showCreate = ref(false)
  const showUpdate = ref(false)
  const showDelete = ref(false)
  const showView = ref(false)
  const selectedItem = ref(null)

  // Ações disparadas pela DataTable
  async function onEdit(itemDTO) {
    await getById(itemDTO.id) // Busca o FullModel via useTable
    showUpdate.value = true
  }

  async function onView(itemDTO) {
    await getById(itemDTO.id)
    showView.value = true
  }

  function onDelete(itemDTO) {
    selectedItem.value = itemDTO // Apenas o DTO basta para deletar
    showDelete.value = true
  }

  return {
    showCreate, showUpdate, showDelete, showView,
    onEdit, onView, onDelete, selectedItem
  }
}