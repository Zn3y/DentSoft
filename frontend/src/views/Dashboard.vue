<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
)

// =============================
// ESTADÍSTICAS NUMÉRICAS
// =============================
const totalPacientes = ref(0)
const citasHoy = ref(0)
const citasProximas = ref(0)

// =============================
// DATOS CRUDOS DE GRÁFICOS
// =============================
const citasMes = ref([])
const citasEstado = ref([])

// =============================
// COMPUTED PARA GRÁFICOS
// (Siempre devuelven estructura válida)
// =============================
const barData = computed(() => ({
  labels: citasMes.value.map(c => 'Mes ' + c.mes),
  datasets: [
    {
      label: 'Citas',
      backgroundColor: '#3B82F6',
      data: citasMes.value.map(c => c.total)
    }
  ]
}))

const pieData = computed(() => ({
  labels: citasEstado.value.map(c => c.estado),
  datasets: [
    {
      backgroundColor: ['#3B82F6', '#F97316'],
      data: citasEstado.value.map(c => c.total)
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false
}

// =============================
// PETICIONES
// =============================
const obtenerEstadisticas = async () => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch('http://localhost:3000/dashboard', {
      headers: { Authorization: 'Bearer ' + token }
    })

    const data = await res.json()

    totalPacientes.value = data.totalPacientes || 0
    citasHoy.value = data.citasHoy || 0
    citasProximas.value = data.citasProximas || 0
  } catch (error) {
    console.error('Error estadísticas:', error)
  }
}

const obtenerGraficos = async () => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch('http://localhost:3000/dashboard/graficos', {
      headers: { Authorization: 'Bearer ' + token }
    })

    const data = await res.json()

    citasMes.value = data.citasMes || []
    citasEstado.value = data.citasEstado || []
  } catch (error) {
    console.error('Error gráficos:', error)
  }
}

onMounted(() => {
  obtenerEstadisticas()
  obtenerGraficos()
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

    <!-- =========================
         TARJETAS SUPERIORES
    ========================== -->
    <div class="grid grid-cols-3 gap-6 mb-6">
      <div class="bg-white shadow rounded p-4 text-center">
        <p class="text-gray-500">Total Pacientes</p>
        <p class="text-2xl font-bold">{{ totalPacientes }}</p>
      </div>

      <div class="bg-white shadow rounded p-4 text-center">
        <p class="text-gray-500">Citas Hoy</p>
        <p class="text-2xl font-bold">{{ citasHoy }}</p>
      </div>

      <div class="bg-white shadow rounded p-4 text-center">
        <p class="text-gray-500">Citas Próximas</p>
        <p class="text-2xl font-bold">{{ citasProximas }}</p>
      </div>
    </div>

    <!-- =========================
         GRÁFICOS
    ========================== -->
    <div class="grid grid-cols-2 gap-6">
      <div class="bg-white shadow rounded p-4">
        <h2 class="font-bold mb-2">Citas por Mes</h2>
          <div class="h-80">
            <Bar
              :data="barData"
              :options="chartOptions"
            />
          </div>
      </div>

      <div class="bg-white shadow rounded p-4">
        <h2 class="font-bold mb-2">Citas por Estado</h2>
        <div class="h-80">
          <Pie
            :data="pieData"
            :options="chartOptions"
          />
        </div>

      </div>
    </div>
  </div>
</template>
