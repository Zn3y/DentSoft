<script setup>
import { ref, onMounted } from 'vue'

const usuarios = ref([])
const nombre = ref('')
const email = ref('')
const password = ref('')
const rol = ref('asistente')
const mensaje = ref('')
const error = ref('')
const modoEdicion = ref(false)
const usuarioEditandoId = ref(null)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const obtenerUsuarios = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch('${API_URL}/usuarios/todos', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  usuarios.value = await res.json()
}

const guardarUsuario = async () => {
  mensaje.value = ''
  error.value = ''

  if (!nombre.value || !email.value || (!modoEdicion.value && !password.value)) {
    error.value = 'Nombre y email son obligatorios'
    return
  }

  const token = localStorage.getItem('token')

  if (modoEdicion.value) {
    const body = { nombre: nombre.value, email: email.value, rol: rol.value }
    if (password.value) body.password = password.value

    const res = await fetch(`${API_URL}/usuarios/${usuarioEditandoId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (res.ok) {
      mensaje.value = 'Usuario actualizado correctamente'
      cancelarEdicion()
      obtenerUsuarios()
    } else {
      error.value = data.error || 'Error al actualizar usuario'
    }
  } else {
    const res = await fetch('${API_URL}/usuarios/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ nombre: nombre.value, email: email.value, password: password.value, rol: rol.value })
    })
    const data = await res.json()
    if (res.ok) {
      mensaje.value = 'Usuario creado correctamente'
      cancelarEdicion()
      obtenerUsuarios()
    } else {
      error.value = data.error || 'Error al crear usuario'
    }
  }
}

const cargarUsuarioParaEditar = (usuario) => {
  modoEdicion.value = true
  usuarioEditandoId.value = usuario.id
  nombre.value = usuario.nombre
  email.value = usuario.email
  password.value = ''
  rol.value = usuario.rol
  mensaje.value = ''
  error.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelarEdicion = () => {
  modoEdicion.value = false
  usuarioEditandoId.value = null
  nombre.value = ''
  email.value = ''
  password.value = ''
  rol.value = 'asistente'
}

const eliminarUsuario = async (id) => {
  if (!confirm('¿Seguro que deseas eliminar este usuario?')) return
  const token = localStorage.getItem('token')
  await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  })
  obtenerUsuarios()
}

const rolColor = (r) => {
  if (r === 'admin') return 'bg-purple-100 text-purple-700'
  if (r === 'doctor') return 'bg-blue-100 text-blue-700'
  return 'bg-gray-100 text-gray-600'
}

onMounted(() => {
  obtenerUsuarios()
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Administración de Usuarios</h1>

    <!-- Formulario -->
    <div class="bg-white shadow rounded p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">
        {{ modoEdicion ? 'Editar Usuario' : 'Crear nuevo usuario' }}
      </h2>

      <div v-if="mensaje" class="mb-4 p-3 bg-green-100 text-green-700 rounded">{{ mensaje }}</div>
      <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded">{{ error }}</div>

      <div class="grid grid-cols-2 gap-4">
        <input v-model="nombre" placeholder="Nombre completo" class="p-2 border rounded w-full" />
        <input v-model="email" type="email" placeholder="Email" class="p-2 border rounded w-full" />
        <input
          v-model="password"
          type="password"
          :placeholder="modoEdicion ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña'"
          class="p-2 border rounded w-full"
        />
        <select v-model="rol" class="p-2 border rounded w-full">
          <option value="asistente">Asistente</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div class="mt-4 flex gap-3">
        <button @click="guardarUsuario" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {{ modoEdicion ? 'Actualizar' : 'Crear Usuario' }}
        </button>
        <button v-if="modoEdicion" @click="cancelarEdicion" class="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500">
          Cancelar
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white shadow rounded p-6">
      <h2 class="text-xl font-semibold mb-4">Usuarios registrados</h2>
      <table class="min-w-full table-fixed">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-2 text-left w-12">ID</th>
            <th class="p-2 text-left w-40">Nombre</th>
            <th class="p-2 text-left">Email</th>
            <th class="p-2 text-left w-28">Rol</th>
            <th class="p-2 text-left w-36">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in usuarios" :key="u.id" class="border-t hover:bg-gray-50">
            <td class="p-2">{{ u.id }}</td>
            <td class="p-2">{{ u.nombre }}</td>
            <td class="p-2">{{ u.email }}</td>
            <td class="p-2">
              <span :class="['px-2 py-1 rounded text-sm font-medium', rolColor(u.rol)]">
                {{ u.rol }}
              </span>
            </td>
            <td class="p-2 space-x-2">
              <button @click="cargarUsuarioParaEditar(u)" class="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Editar</button>
              <button @click="eliminarUsuario(u.id)" class="bg-red-600 text-white px-2 py-1 rounded text-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>