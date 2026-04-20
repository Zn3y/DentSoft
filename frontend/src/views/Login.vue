<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/app'); 
      
    } else {
      alert(data.message || data.error || 'Error en el login');
    }
  } catch (error) {
    console.error('Error de red:', error);
    alert('No se pudo conectar con el servidor. Revisa tu conexión.');
  }
};
</script>

<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <input v-model="email" type="email" placeholder="Email" class="w-full mb-2 p-2 border rounded" />
    <input v-model="password" type="password" placeholder="Contraseña" class="w-full mb-4 p-2 border rounded" />
    <button @click="login" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Ingresar</button>
  </div>  

  <div class="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
    <h5 class="text-2xl font-bold mb-4">Usuarios de Prueba</h5>
    <p class="font-bold">Admin</p>
    <p >Email: admin@dentsoft.com</p>
    <p>Contraseña: Admin123</p>
    <p class="font-bold">Medico</p>
    <p>Email: doctor@dentsoft.com</p>
    <p>Contraseña: Doctor123</p>
    <p class="font-bold">Asistente</p>
    <p>Email: asistente@dentsoft.com</p>
    <p>Contraseña: Asistente123</p>
  </div>

</template>
