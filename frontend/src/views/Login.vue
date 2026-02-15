<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  const res = await fetch('http://localhost:3000/usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  })

  const data = await res.json()

  if (res.ok) {
    localStorage.setItem('token', data.token)
    router.push('/')
  } else {
    alert(data.error)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <input v-model="email" type="email" placeholder="Email" class="w-full mb-2 p-2 border rounded" />
    <input v-model="password" type="password" placeholder="Contraseña" class="w-full mb-4 p-2 border rounded" />
    <button @click="login" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Ingresar</button>
  </div>
</template>
