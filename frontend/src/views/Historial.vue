<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pacienteId = route.params.id

const historial = ref([])
const paciente = ref({})
const doctores = ref([])
const mostrarFormulario = ref(false)
const modoEdicion = ref(false)
const registroEditandoId = ref(null)

const doctor_id = ref('')
const fecha = ref('')
const diagnostico = ref('')
const tratamiento = ref('')
const observaciones = ref('')
const mensaje = ref('')
const error = ref('')

const dientes = ref([
  18,17,16,15,14,13,12,11, 21,22,23,24,25,26,27,28,
  48,47,46,45,44,43,42,41, 31,32,33,34,35,36,37,38
])
const estadoDientes = ref({})

const estadoColor = (estado) => {
  if (estado === 'caries') return 'bg-red-400 text-white'
  if (estado === 'extraccion') return 'bg-gray-600 text-white'
  if (estado === 'corona') return 'bg-yellow-400'
  if (estado === 'sano') return 'bg-green-400 text-white'
  return 'bg-white border border-gray-300'
}

const toggleDiente = (num) => {
  const estados = ['', 'sano', 'caries', 'corona', 'extraccion']
  const actual = estadoDientes.value[num] || ''
  const idx = estados.indexOf(actual)
  estadoDientes.value[num] = estados[(idx + 1) % estados.length]
}

const parsearOdontograma = (odontograma) => {
  if (!odontograma) return {}
  if (typeof odontograma === 'string') {
    try { return JSON.parse(odontograma) } catch { return {} }
  }
  return odontograma
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const obtenerPaciente = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}/pacientes`, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  const todos = await res.json()
  paciente.value = todos.find(p => p.id == pacienteId) || {}
}

const obtenerHistorial = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}/historial/${pacienteId}`, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  historial.value = await res.json()
}

const obtenerDoctores = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_URL}/usuarios/doctores`, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  doctores.value = await res.json()
}

const cargarRegistroParaEditar = (registro) => {
  modoEdicion.value = true
  registroEditandoId.value = registro.id
  doctor_id.value = registro.doctor_id
  fecha.value = registro.fecha ? registro.fecha.split('T')[0] : ''
  diagnostico.value = registro.diagnostico
  tratamiento.value = registro.tratamiento
  observaciones.value = registro.observaciones || ''
  estadoDientes.value = { ...parsearOdontograma(registro.odontograma) }
  mostrarFormulario.value = true
  mensaje.value = ''
  error.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelarFormulario = () => {
  mostrarFormulario.value = false
  modoEdicion.value = false
  registroEditandoId.value = null
  doctor_id.value = ''
  fecha.value = ''
  diagnostico.value = ''
  tratamiento.value = ''
  observaciones.value = ''
  estadoDientes.value = {}
  mensaje.value = ''
  error.value = ''
}

const guardarRegistro = async () => {
  mensaje.value = ''
  error.value = ''

  if (!doctor_id.value || !fecha.value || !diagnostico.value || !tratamiento.value) {
    error.value = 'Doctor, fecha, diagnóstico y tratamiento son obligatorios'
    return
  }

  const dientesConEstado = Object.values(estadoDientes.value).filter(e => e !== '')
  if (dientesConEstado.length < 32) {
    error.value = `Debes asignar el estado a todos los dientes. Faltan ${32 - dientesConEstado.length} diente(s)`
    return
  }

  const token = localStorage.getItem('token')
  const url = modoEdicion.value
    ? `http://localhost:3000/historial/registro/${registroEditandoId.value}`
    : `http://localhost:3000/historial/${pacienteId}`
  const method = modoEdicion.value ? 'PUT' : 'POST'

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({
      doctor_id: doctor_id.value,
      fecha: fecha.value,
      diagnostico: diagnostico.value,
      tratamiento: tratamiento.value,
      observaciones: observaciones.value,
      odontograma: estadoDientes.value
    })
  })

  const data = await res.json()
  if (res.ok) {
    mensaje.value = modoEdicion.value ? 'Registro actualizado correctamente' : 'Registro guardado correctamente'
    cancelarFormulario()
    obtenerHistorial()
  } else {
    error.value = data.error || 'Error al guardar'
  }
}

const eliminarRegistro = async (id) => {
  if (!confirm('¿Eliminar este registro?')) return
  const token = localStorage.getItem('token')
  await fetch(`http://localhost:3000/historial/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  })
  obtenerHistorial()
}

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

onMounted(() => {
  obtenerPaciente()
  obtenerHistorial()
  obtenerDoctores()
})
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <h1 class="text-3xl font-bold">Historial Clínico</h1>
    </div>

    <div class="mb-4">
      <button @click="router.push('/app/pacientes')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Volver a Pacientes
      </button>    
    </div>

    <!-- Info del paciente -->
    <div class="bg-white shadow rounded p-4 mb-6 flex gap-8">
      <div><span class="text-gray-500 text-sm">Paciente</span><p class="font-semibold text-lg">{{ paciente.nombre }} {{ paciente.apellido }}</p></div>
      <div><span class="text-gray-500 text-sm">Documento</span><p class="font-semibold">{{ paciente.documento || '—' }}</p></div>
      <div><span class="text-gray-500 text-sm">Teléfono</span><p class="font-semibold">{{ paciente.telefono || '—' }}</p></div>
      <div><span class="text-gray-500 text-sm">Email</span><p class="font-semibold">{{ paciente.email || '—' }}</p></div>
    </div>

    <!-- Botón nuevo registro -->
    <div class="mb-4">
      <button @click="mostrarFormulario ? cancelarFormulario() : (mostrarFormulario = true)"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {{ mostrarFormulario ? 'Cancelar' : '+ Nuevo Registro' }}
      </button>
    </div>

    <!-- Formulario -->
    <div v-if="mostrarFormulario" class="bg-white shadow rounded p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">{{ modoEdicion ? 'Editar registro clínico' : 'Nuevo registro clínico' }}</h2>

      <div v-if="mensaje" class="mb-4 p-3 bg-green-100 text-green-700 rounded">{{ mensaje }}</div>
      <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded">{{ error }}</div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <select v-model="doctor_id" class="p-2 border rounded w-full">
          <option disabled value="">Seleccione doctor</option>
          <option v-for="d in doctores" :key="d.id" :value="d.id">{{ d.nombre }}</option>
        </select>
        <input type="date" v-model="fecha" class="p-2 border rounded w-full" />
        <textarea v-model="diagnostico" placeholder="Diagnóstico" class="p-2 border rounded w-full col-span-2 h-24"></textarea>
        <textarea v-model="tratamiento" placeholder="Tratamiento realizado" class="p-2 border rounded w-full col-span-2 h-24"></textarea>
        <textarea v-model="observaciones" placeholder="Observaciones (opcional)" class="p-2 border rounded w-full col-span-2 h-20"></textarea>
      </div>

      <!-- Odontograma -->
      <div class="mb-4">
        <h3 class="font-semibold mb-2">Odontograma <span class="text-sm text-gray-400">(clic para cambiar estado)</span></h3>
        <div class="flex gap-3 mb-2 text-sm">
          <span class="flex items-center gap-1"><span class="w-4 h-4 bg-green-400 rounded inline-block"></span> Sano</span>
          <span class="flex items-center gap-1"><span class="w-4 h-4 bg-red-400 rounded inline-block"></span> Caries</span>
          <span class="flex items-center gap-1"><span class="w-4 h-4 bg-yellow-400 rounded inline-block"></span> Corona</span>
          <span class="flex items-center gap-1"><span class="w-4 h-4 bg-gray-600 rounded inline-block"></span> Extracción</span>
        </div>
        <div class="flex gap-1 mb-1 flex-wrap">
          <button v-for="num in dientes.slice(0, 16)" :key="num" @click="toggleDiente(num)"
            :class="['w-10 h-10 rounded text-xs font-bold border transition', estadoColor(estadoDientes[num])]">{{ num }}</button>
        </div>
        <div class="flex gap-1 flex-wrap">
          <button v-for="num in dientes.slice(16)" :key="num" @click="toggleDiente(num)"
            :class="['w-10 h-10 rounded text-xs font-bold border transition', estadoColor(estadoDientes[num])]">{{ num }}</button>
        </div>
        <p class="text-sm mt-2" :class="Object.values(estadoDientes).filter(e => e !== '').length === 32 ? 'text-green-600' : 'text-red-500'">
          {{ Object.values(estadoDientes).filter(e => e !== '').length }}/32 dientes marcados
        </p>
      </div>

      <div class="flex gap-3">
        <button @click="guardarRegistro" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {{ modoEdicion ? 'Actualizar Registro' : 'Guardar Registro' }}
        </button>
        <button @click="cancelarFormulario" class="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500">
          Cancelar
        </button>
      </div>
    </div>

    <!-- Historial -->
    <div v-if="historial.length === 0" class="bg-white shadow rounded p-6 text-center text-gray-400">
      No hay registros clínicos para este paciente.
    </div>

    <div v-for="registro in historial" :key="registro.id" class="bg-white shadow rounded p-6 mb-4">
      <div class="flex justify-between items-start mb-3">
        <div>
          <span class="text-sm text-gray-400">{{ formatearFecha(registro.fecha) }}</span>
          <span class="ml-3 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Dr. {{ registro.doctor_nombre }}</span>
        </div>
        <div class="space-x-2">
          <button @click="cargarRegistroParaEditar(registro)" class="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Editar</button>
          <button @click="eliminarRegistro(registro.id)" class="bg-red-600 text-white px-2 py-1 rounded text-sm">Eliminar</button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-500 font-medium">Diagnóstico</p>
          <p class="mt-1">{{ registro.diagnostico }}</p>
        </div>
        <div>
          <p class="text-gray-500 font-medium">Tratamiento</p>
          <p class="mt-1">{{ registro.tratamiento }}</p>
        </div>
        <div v-if="registro.observaciones" class="col-span-2">
          <p class="text-gray-500 font-medium">Observaciones</p>
          <p class="mt-1">{{ registro.observaciones }}</p>
        </div>
      </div>

      <!-- Odontograma guardado -->
      <div v-if="registro.odontograma" class="mt-4">
        <p class="text-gray-500 font-medium text-sm mb-2">Odontograma</p>
        <div class="flex gap-3 mb-2 text-sm">
          <span class="flex items-center gap-1"><span class="w-4 h-4 bg-green-400 rounded inline-block"></span> Sano</span>
          <span class="flex items-center gap-1"><span class="w-4 h-4 bg-red-400 rounded inline-block"></span> Caries</span>
          <span class="flex items-center gap-1"><span class="w-4 h-4 bg-yellow-400 rounded inline-block"></span> Corona</span>
          <span class="flex items-center gap-1"><span class="w-4 h-4 bg-gray-600 rounded inline-block"></span> Extracción</span>
        </div>
        <div class="flex gap-1 mb-1 flex-wrap">
          <span v-for="num in [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28]" :key="num"
            :class="['w-10 h-10 rounded text-xs font-bold border flex items-center justify-center', estadoColor(parsearOdontograma(registro.odontograma)[num])]">{{ num }}</span>
        </div>
        <div class="flex gap-1 flex-wrap">
          <span v-for="num in [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38]" :key="num"
            :class="['w-10 h-10 rounded text-xs font-bold border flex items-center justify-center', estadoColor(parsearOdontograma(registro.odontograma)[num])]">{{ num }}</span>
        </div>
      </div>
    </div>
  </div>
</template>