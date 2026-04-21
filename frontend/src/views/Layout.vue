<template>
  <div class="flex min-h-screen w-full bg-gray-100 overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-blue-900 text-white p-5 flex flex-col">
      <h2 class="text-2xl font-bold mb-8">🦷 DentSoft</h2>

      <p class="mt-6 text-white font-semibold">
        {{ usuario.nombre }} - Rol: {{ usuario.rol }}
      </p>

      <nav class="space-y-2 mt-4">
        <router-link to="/app" class="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
          <HomeIcon class="w-5 h-5" /> Inicio
        </router-link>

        <!-- Solo admin -->
        <router-link v-if="usuario.rol === 'admin'" to="/app/usuarios" class="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
          <UsersIcon class="w-5 h-5" /> Usuarios
        </router-link>

        <!-- Solo doctor y asistente -->
        <router-link v-if="['doctor', 'asistente'].includes(usuario.rol)" to="/app/pacientes" class="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
          <UserGroupIcon class="w-5 h-5" /> Pacientes
        </router-link>

        <router-link v-if="['doctor', 'asistente'].includes(usuario.rol)" to="/app/citas" class="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
          <CalendarIcon class="w-5 h-5" /> Agendar Citas
        </router-link>
      </nav>

      <button @click="logout" class="bg-red-600 text-white px-3 py-1 rounded mt-6">
        Logout
      </button>
    </aside>

    <!-- Contenido -->
    <main class="flex-1 p-8 overflow-auto bg-gray-100">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { HomeIcon, UsersIcon, UserGroupIcon, CalendarIcon } from '@heroicons/vue/24/outline'


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