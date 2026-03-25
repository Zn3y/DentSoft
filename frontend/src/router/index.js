import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import Dashboard from '../views/Dashboard.vue'
import Pacientes from '../views/Pacientes.vue'
import Citas from '../views/Citas.vue'
import Admin from '../views/Usuarios.vue'
import Historial from '../views/Historial.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: Dashboard },
      { path: 'pacientes', component: Pacientes, meta: { requiresAuth: true, requiresStaff: true } },
      { path: 'citas', component: Citas, meta: { requiresAuth: true, requiresStaff: true } },
      { path: 'usuarios', component: Admin, meta: { requiresAuth: true, requiresAdmin: true } },
      { path: 'historial/:id', component: Historial, meta: { requiresAuth: true, requiresStaff: true } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) return next('/login')

  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]))

    if (to.meta.requiresAdmin && payload.rol !== 'admin') return next('/')
    if (to.meta.requiresStaff && !['doctor', 'asistente'].includes(payload.rol)) return next('/')
  }

  next()
})

export default router
