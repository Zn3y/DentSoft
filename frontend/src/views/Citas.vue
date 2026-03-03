<script setup>
import { ref, onMounted } from 'vue'

const citas = ref([])
const pacientes = ref([])

const paciente_id = ref('')
const fecha = ref('')
const hora = ref('')
const motivo = ref('')

const doctores = ref([])
const doctor_id = ref('')

const obtenerDoctores = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch('http://localhost:3000/usuarios/doctores', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  doctores.value = await res.json()
}

const obtenerCitas = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch('http://localhost:3000/citas', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  citas.value = await res.json()
}

const obtenerPacientes = async () => {
  const token = localStorage.getItem('token')
  const res = await fetch('http://localhost:3000/pacientes', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  pacientes.value = await res.json()
}

const crearCita = async () => {
  const token = localStorage.getItem('token')
  await fetch('http://localhost:3000/citas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ paciente_id: paciente_id.value, fecha: fecha.value, hora: hora.value, motivo: motivo.value, doctor_id: doctor_id.value })
  })

  paciente_id.value = ''
  fecha.value = ''
  hora.value = ''
  motivo.value = ''
  doctor_id.value = ''

  obtenerCitas()
}

onMounted(() => {
  obtenerPacientes()
  obtenerDoctores()  
  obtenerCitas()
})

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Citas</h1>

    <div class="mb-6 space-y-2">
      <select v-model="paciente_id" class="p-2 border rounded w-full">
        <option disabled value="">Seleccione paciente</option>
        <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.id">
          {{ paciente.nombre }} {{ paciente.apellido }}
        </option>
      </select>
      <input type="date" v-model="fecha" class="p-2 border rounded w-full" />
      <input type="time" v-model="hora" class="p-2 border rounded w-full" />
      <select v-model="doctor_id" class="p-2 border rounded w-full">
        <option disabled value="">Seleccione doctor</option>
        <option v-for="doctor in doctores" :key="doctor.id" :value="doctor.id">
          {{ doctor.nombre }}
        </option>
      </select>
      <input placeholder="Motivo Consulta" v-model="motivo" class="p-2 border rounded w-full" />
      <button @click="crearCita" class="bg-blue-600 text-white px-4 py-2 rounded">Guardar Cita</button>
    </div>

    <table class="min-w-full bg-white shadow rounded">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-2">ID</th>
          <th class="p-2">Paciente</th>
          <th class="p-2">Doctor</th>
          <th class="p-2">Fecha</th>
          <th class="p-2">Hora</th>
          <th class="p-2">Motivo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cita in citas" :key="cita.id" class="border-t">
          <td class="p-2 text-center">{{ cita.id }}</td>
          <td class="p-2 text-center">{{ cita.nombre }} {{ cita.apellido }}</td>
          <td class="p-2 text-center">{{ cita.doctor_nombre }}</td>
          <td class="p-2 text-center">{{ formatearFecha(cita.fecha) }}</td>
          <td class="p-2 text-center">{{ cita.hora }}</td>
          <td class="p-2 text-center">{{ cita.motivo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
