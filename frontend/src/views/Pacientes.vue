<script setup>
import { ref, onMounted } from 'vue'

const pacientes = ref([])
const nombre = ref('')
const apellido = ref('')
const telefono = ref('')
const email = ref('')
const modoEdicion = ref(false)
const pacienteEditandoId = ref(null)

const obtenerPacientes = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch('http://localhost:3000/pacientes', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  pacientes.value = await res.json()
}

const guardarPaciente = async () => {
  const token = localStorage.getItem('token')
  const url = modoEdicion.value
    ? `http://localhost:3000/pacientes/${pacienteEditandoId.value}`
    : 'http://localhost:3000/pacientes'

  await fetch(url, {
    method: modoEdicion.value ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ nombre: nombre.value, apellido: apellido.value, telefono: telefono.value, email: email.value })
  })

  nombre.value = ''
  apellido.value = ''
  telefono.value = ''
  email.value = ''
  modoEdicion.value = false
  pacienteEditandoId.value = null

  obtenerPacientes()
}

const cargarPacienteParaEditar = (paciente) => {
  nombre.value = paciente.nombre
  apellido.value = paciente.apellido
  telefono.value = paciente.telefono
  email.value = paciente.email
  pacienteEditandoId.value = paciente.id
  modoEdicion.value = true
}

const eliminarPaciente = async (id) => {
  if (!confirm('¿Seguro que deseas eliminar este paciente?')) return
  const token = localStorage.getItem('token')
  await fetch(`http://localhost:3000/pacientes/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  })
  obtenerPacientes()
}

onMounted(() => {
  obtenerPacientes()
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Pacientes</h1>

    <h2 class="text-xl mb-4">{{ modoEdicion ? 'Editar Paciente' : 'Registrar Paciente' }}</h2>

    <div class="space-y-2 mb-4">
      <input v-model="nombre" placeholder="Nombre" class="p-2 border rounded w-full" />
      <input v-model="apellido" placeholder="Apellido" class="p-2 border rounded w-full" />
      <input v-model="telefono" placeholder="Teléfono" class="p-2 border rounded w-full" />
      <input v-model="email" placeholder="Email" class="p-2 border rounded w-full" />
      <button @click="guardarPaciente" class="bg-blue-600 text-white px-4 py-2 rounded">
        {{ modoEdicion ? 'Actualizar' : 'Guardar' }}
      </button>
    </div>

    <table class="min-w-full bg-white shadow rounded">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-2">ID</th>
          <th class="p-2">Nombre</th>
          <th class="p-2">Apellido</th>
          <th class="p-2">Teléfono</th>
          <th class="p-2">Email</th>
          <th class="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paciente in pacientes" :key="paciente.id" class="border-t">
          <td class="p-2">{{ paciente.id }}</td>
          <td class="p-2">{{ paciente.nombre }}</td>
          <td class="p-2">{{ paciente.apellido }}</td>
          <td class="p-2">{{ paciente.telefono }}</td>
          <td class="p-2">{{ paciente.email }}</td>
          <td class="p-2 space-x-2">
            <button @click="cargarPacienteParaEditar(paciente)" class="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
            <button @click="eliminarPaciente(paciente.id)" class="bg-red-600 text-white px-2 py-1 rounded">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
