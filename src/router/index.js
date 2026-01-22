import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from '@/components/layout/AdminLayout.vue'
import AdminTableView from '@/views/AdminTableView.vue'

const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: ':section',
        name: 'admin-section',
        component: AdminTableView
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
