import { mockData } from '@/mockdata/Mockdata'

export const MemberService = {
  // Retorna os dados crus para o DTO
  async getList() {
    // Simula delay de rede
    await new Promise(res => setTimeout(res, 300))
    return mockData.members
  },

  // Retorna o objeto completo para o FullModel
  async getById(id) {
    await new Promise(res => setTimeout(res, 300))
    return mockData.members.find(m => m.id === id)
  },

  // 🔹 NOVA: Ação de Criar
  async create(newItem) {
    await new Promise(res => setTimeout(res, 300))
    const itemWithId = { 
      ...newItem, 
      id: Date.now() // Gera um ID único temporário
    }
    mockData.members.push(itemWithId)
    return itemWithId
  },

  // 🔹 NOVA: Ação de Atualizar
  async update(id, updatedItem) {
    await new Promise(res => setTimeout(res, 300))
    const index = mockData.members.findIndex(m => m.id === id)
    if (index !== -1) {
      // Mescla os dados antigos com os novos
      mockData.members[index] = { ...mockData.members[index], ...updatedItem }
    }
    return mockData.members[index]
  },

  // 🔹 NOVA: Ação de Remover
  async remove(id) {
    await new Promise(res => setTimeout(res, 300))
    mockData.members = mockData.members.filter(m => m.id !== id)
    return true
  }
}