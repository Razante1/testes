import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from '@/pages/AdminLayout.vue'
import AdminTableView from '@/views/admin/AdminTableView.vue'

const routes = [
  { path: "/", redirect: "/admin" },

  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '', 
        name: 'admin-home',
        component: AdminTableView
      },
      {
        path: ':section', 
        name: 'admin-section',
        component: AdminTableView,
        props: true
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
