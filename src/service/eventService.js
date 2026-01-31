import { mockData } from '@/mockdata/Mockdata'
import axios from 'axios'
const BASE_URL = import.meta.env.BASE_URL

export const EventService = {
  async getList() {
    axios.get(`${BASE_URL}/Eventos/todas`)
      .then(response => {
        return response.data
      }).catch(error => {
        console.error(error);
        
      })
    return mockData.events
  },

  async getById(id) {
    axios.get(`${BASE_URL}/Eventos/todas`)
    return mockData.events.find(e => e.id === id)
  },

  async create(newItem) {

    const itemWithId = { ...newItem, id: Date.now() }
    mockData.events.push(itemWithId)
    return itemWithId
  },

  async update(id, updatedItem) {

    const index = mockData.events.findIndex(e => e.id === id)
    if (index !== -1) {
      mockData.events[index] = { ...mockData.events[index], ...updatedItem }
    }
    return mockData.events[index]
  },

  async remove(id) {
    await new Promise(res => setTimeout(res, 300))
    mockData.events = mockData.events.filter(e => e.id !== id)
    return true
  }
}