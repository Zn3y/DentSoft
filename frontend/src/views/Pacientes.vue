<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pacientes = ref([])
const busqueda = ref('')
const nombre = ref('')
const apellido = ref('')
const documento = ref('')
const telefono = ref('')
const email = ref('')
const modoEdicion = ref(false)
const pacienteEditandoId = ref(null)
const mostrarFormulario = ref(false)
const rolUsuario = ref('')

const pacientesFiltrados = computed(() => {
  const q = busqueda.value.toLowerCase().trim()
  if (!q) return pacientes.value
  return pacientes.value.filter(p =>
    p.nombre.toLowerCase().includes(q) ||
    p.apellido.toLowerCase().includes(q) ||
    (p.documento && p.documento.toLowerCase().includes(q))
  )
})

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const obtenerPacientes = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}/pacientes`, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  pacientes.value = await res.json()
}

const guardarPaciente = async () => {
  // 🔴 Validación antes de enviar
  if (
    !nombre.value?.trim() ||
    !apellido.value?.trim() ||
    !documento.value?.trim() ||
    !telefono.value?.trim() ||
    !email.value?.trim()
  ) {
    alert("Todos los campos son obligatorios");
    return;
  }

  try {
    const token = localStorage.getItem('token')

    const url = modoEdicion.value
      ? `${API_URL}/pacientes/${pacienteEditandoId.value}`
      : `${API_URL}/pacientes`

    const response = await fetch(url, {
      method: modoEdicion.value ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        nombre: nombre.value,
        apellido: apellido.value,
        documento: documento.value,
        telefono: telefono.value,
        email: email.value
      })
    })

    // 🔴 Validar respuesta del servidor
    if (!response.ok) {
      throw new Error("Error al guardar el paciente");
    }

    // ✅ Solo limpiar si TODO salió bien
    nombre.value = ''
    apellido.value = ''
    documento.value = ''
    telefono.value = ''
    email.value = ''
    modoEdicion.value = false
    pacienteEditandoId.value = null

    obtenerPacientes()

  } catch (error) {
    console.error(error)
    alert("Hubo un error al guardar")
  }
}

const cargarPacienteParaEditar = (paciente) => {
  nombre.value = paciente.nombre
  apellido.value = paciente.apellido
  documento.value = paciente.documento || ''
  telefono.value = paciente.telefono
  email.value = paciente.email
  pacienteEditandoId.value = paciente.id
  modoEdicion.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
  mostrarFormulario.value = true
}

const cancelarEdicion = () => {
  nombre.value = ''
  apellido.value = ''
  documento.value = ''
  telefono.value = ''
  email.value = ''
  modoEdicion.value = false
  pacienteEditandoId.value = null
  mostrarFormulario.value = false
}

const eliminarPaciente = async (id) => {
  if (!confirm('¿Seguro que deseas eliminar este paciente?')) return
  const token = localStorage.getItem('token')
  await fetch(`${API_URL}/pacientes/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  })
  obtenerPacientes()
}

const verHistorial = (pacienteId) => {
  router.push(`/historial/${pacienteId}`)
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]))
    rolUsuario.value = payload.rol
  }
  obtenerPacientes()
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Pacientes</h1>

    <div class="mb-4">
      <button 
        @click="mostrarFormulario = !mostrarFormulario" 
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {{ mostrarFormulario ? 'Cancelar' : '+ Nuevo Paciente' }}
      </button>
    </div>

    <!-- Formulario -->
    <div v-if="mostrarFormulario" class="bg-white shadow rounded p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">{{ modoEdicion ? 'Editar Paciente' : 'Registrar Paciente' }}</h2>
      <div class="grid grid-cols-2 gap-4">
        <input v-model="nombre" placeholder="Nombre" class="p-2 border rounded w-full" />
        <input v-model="apellido" placeholder="Apellido" class="p-2 border rounded w-full" />
        <input v-model="documento" placeholder="Documento / Cédula" class="p-2 border rounded w-full" />
        <input v-model="telefono" placeholder="Teléfono" class="p-2 border rounded w-full" />
        <input v-model="email" placeholder="Email" class="p-2 border rounded w-full" />
      </div>
      <div class="mt-4 flex gap-3">
        <button @click="guardarPaciente" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ modoEdicion ? 'Actualizar' : 'Guardar' }}
        </button>
        <button v-if="modoEdicion" @click="cancelarEdicion" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
          Cancelar
        </button>
      </div>
    </div>

    <!-- Buscador -->
    <div class="mb-4">
      <input
        v-model="busqueda"
        placeholder="🔍 Buscar por nombre, apellido o documento..."
        class="p-2 border rounded w-full"
      />
    </div>

    <!-- Tabla -->
    <div class="bg-white shadow rounded">
      <table class="min-w-full table-fixed">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-2 text-left w-12">ID</th>
            <th class="p-2 text-left w-32">Nombre</th>
            <th class="p-2 text-left w-32">Apellido</th>
            <th class="p-2 text-left w-32">Documento</th>
            <th class="p-2 text-left w-28">Teléfono</th>
            <th class="p-2 text-left">Email</th>
            <th class="p-2 text-center w-48">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pacientesFiltrados.length === 0">
            <td colspan="7" class="p-4 text-center text-gray-400">No se encontraron pacientes</td>
          </tr>
          <tr v-for="paciente in pacientesFiltrados" :key="paciente.id" class="border-t hover:bg-gray-50">
            <td class="p-2">{{ paciente.id }}</td>
            <td class="p-2">{{ paciente.nombre }}</td>
            <td class="p-2">{{ paciente.apellido }}</td>
            <td class="p-2">{{ paciente.documento || '—' }}</td>
            <td class="p-2">{{ paciente.telefono }}</td>
            <td class="p-2">{{ paciente.email }}</td>
            <td class="p-2 text-center space-x-1">
              <button v-if="rolUsuario === 'doctor'" @click="verHistorial(paciente.id)" class="bg-green-600 text-white px-2 py-1 rounded text-sm">Historial</button>
              <button v-if="rolUsuario === 'doctor'" @click="cargarPacienteParaEditar(paciente)" class="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Editar</button>
              <button v-if="rolUsuario === 'doctor'" @click="eliminarPaciente(paciente.id)"  class="bg-red-600 text-white px-2 py-1 rounded text-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>