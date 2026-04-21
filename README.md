# 🦷 DentSoft – CRM Odontológico

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Vue](https://img.shields.io/badge/Vue-3.x-42b883)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

Sistema CRM odontológico desarrollado con arquitectura Full Stack (Node.js + Vue 3) que permite gestionar pacientes, citas y visualizar estadísticas en tiempo real mediante un dashboard interactivo.

---

## 🚀 Demo del Proyecto

> Proyecto en desarrollo local  
> Backend: `http://localhost:3000`  
> Frontend: `http://localhost:5173`

---

# 📌 Características

✅ Autenticación segura con JWT  
✅ Rutas protegidas con middleware  
✅ CRUD completo de pacientes  
✅ Gestión de citas odontológicas  
✅ Dashboard dinámico con estadísticas  
✅ Gráficos interactivos con Chart.js  
✅ Arquitectura modular (Controllers / Routes / Middlewares)

---

# 🛠️ Tecnologías Utilizadas

## 🔹 Backend
- Node.js
- Express
- MySQL
- JSON Web Token (JWT)
- CORS

## 🔹 Frontend
- Vue 3 (Composition API)
- Vue Router
- Chart.js
- vue-chartjs
- Tailwind CSS
- Fetch API

---

# 📂 Estructura del Proyecto

```
DentSoft/
│
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── citasController.js
│   │   └── dashboardController.js
│   │   └── historialController.js
│   │   └── pacientesControlller.js
│   │   └── usuariosCOntroller.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── routes/
│   │   └── citas.Routes.js
│   │   └── dashboardRoutes.js
│   │   └── historialRoutes.js
│   │   └── pacientesRoutes.js
│   │   └── usuariosRoutes.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── icon.svg
│   │   └── logo.png
│   ├── src/
│   │   ├── routes/
│   │   │   └── index.js
│   │   ├── views/
│   │   │   └── Citas.vue
│   │   │   └── Dashboard.vue
│   │   │   └── Historial.vue
│   │   │   └── Home.vue
│   │   │   └── Layout.vue
│   │   │   └── Login.vue
│   │   │   └── Pacientes.vue
│   │   │   └── Usuarios.vue
│   │   └── App.vue
│   └── index.html
│
└── README.md
```

---

# 🔐 Autenticación

El sistema utiliza JWT para proteger rutas privadas.

Header requerido:

```
Authorization: Bearer TU_TOKEN
```

El token se almacena en:

```js
localStorage.getItem("token")
```

Middleware de seguridad implementado en:

```
backend/middlewares/auth.js
```

---

# 📊 Dashboard

El dashboard muestra:

- 📌 Total de pacientes
- 📅 Citas del día
- ⏳ Citas próximas
- 📈 Gráfico de citas por mes
- 🥧 Gráfico de citas por estado

## Endpoint estadísticas

```
GET /dashboard
```

## Endpoint gráficos

```
GET /dashboard/graficos
```

---

# ⚙️ Instalación Local

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/TU-USUARIO/dentsoft.git
cd dentsoft
```

---

## 2️⃣ Configurar Backend

```bash
cd backend
npm install
```

Configurar conexión en `config/database.js`:

```js
host: 'localhost',
user: 'root',
password: '',
database: 'dentsoft'
```

Ejecutar servidor:

```bash
node server.js
```

Servidor en:

```
http://localhost:3000
```

---

## 3️⃣ Configurar Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend en:

```
http://localhost:5173
```

---

# 🛡️ Seguridad Implementada

- Middleware de autenticación
- Verificación de token JWT
- Manejo de errores HTTP
- Protección de endpoints sensibles

---

# 👨‍💻 Autor

**Schneyder Garzón**  
Full Stack Developer  
