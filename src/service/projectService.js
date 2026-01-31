import { mockData } from '@/mockdata/Mockdata'

export const ProjectService = {
  async getList() {
    await new Promise(res => setTimeout(res, 300))
    return mockData.projects 
  },

  async getById(id) {
    await new Promise(res => setTimeout(res, 300))
    return mockData.projects.find(p => p.id === id)
  },

  async create(newItem) {
    await new Promise(res => setTimeout(res, 300))
    const itemWithId = { ...newItem, id: Date.now() }
    mockData.projects.push(itemWithId)
    return itemWithId
  },

  async update(id, updatedItem) {
    await new Promise(res => setTimeout(res, 300))
    const index = mockData.projects.findIndex(p => p.id === id)
    if (index !== -1) {
      mockData.projects[index] = { ...mockData.projects[index], ...updatedItem }
    }
    return mockData.projects[index]
  },

  async remove(id) {
    await new Promise(res => setTimeout(res, 300))
    mockData.projects = mockData.projects.filter(p => p.id !== id)
    return true
  }
}