<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-blue-900 text-white p-5">
      <h2 class="text-2xl font-bold mb-8">CRM Odontológico</h2>

      <p class="mt-6 text-white font-semibold">
        {{ usuario.nombre }} - {{ usuario.rol }}
      </p>

      <nav class="space-y-4">
        <router-link to="/" class="block hover:bg-blue-700 p-2 rounded">Inicio</router-link>
        <router-link to="/pacientes" class="block hover:bg-blue-700 p-2 rounded">Pacientes</router-link>
        <router-link to="/citas" class="block hover:bg-blue-700 p-2 rounded">Agendar Citas</router-link>
      </nav>

      <button @click="logout" class="bg-red-600 text-white px-3 py-1 rounded mt-4">
        Logout
      </button>
    </aside>

    <!-- Contenido -->
    <main class="flex-1 p-8 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref({ nombre: '', rol: '' })

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]))
    usuario.value = { nombre: payload.nombre, rol: payload.rol }
  }
})

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
