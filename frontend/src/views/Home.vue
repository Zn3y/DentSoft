<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-cyan-200">
    
    <nav class="fixed top-0 z-[1000] flex w-full items-center justify-between bg-white/95 px-[5%] py-5 shadow-sm backdrop-blur-md transition-all">
      <div class="bg-gradient-to-r from-[#0A4D68] via-[#05668D] to-[#00A8CC] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
        🦷 DentSoft
      </div>
      
      <ul class="hidden gap-10 list-none font-medium md:flex">
        <li><a href="#funciones" class="relative text-sm transition-colors hover:text-[#0A4D68] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all hover:after:w-full">Funciones</a></li>
        <li><a href="#beneficios" class="relative text-sm transition-colors hover:text-[#0A4D68] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all hover:after:w-full">Beneficios</a></li>
        <li><a href="#contacto" class="relative text-sm transition-colors hover:text-[#0A4D68] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all hover:after:w-full">Contacto</a></li>
      </ul>

      <a href="/login" class="rounded-full bg-gradient-to-r from-[#0A4D68] to-[#05668D] px-7 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
        Ingresar
      </a>
    </nav>

    <section class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50 px-[5%] pt-20 lg:flex-row lg:gap-16">
      <div class="absolute -right-[10%] -top-[20%] h-[600px] w-[600px] animate-pulse rounded-full bg-cyan-400/10 blur-3xl lg:h-[800px] lg:w-[800px]"></div>

      <div class="relative z-10 text-center lg:w-1/2 lg:text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tighter text-slate-900 md:text-6xl xl:text-7xl">
          El <span class="bg-gradient-to-r from-[#0A4D68] to-[#00A8CC] bg-clip-text text-transparent">CRM Odontológico</span> que transforma tu clínica
        </h1>
        <p class="mb-10 text-lg leading-relaxed text-slate-600 md:text-xl lg:max-w-xl font-light">
          Gestiona pacientes, citas, historiales médicos y facturación desde una plataforma intuitiva diseñada específicamente para odontólogos.
        </p>
        <div class="flex flex-wrap justify-center gap-5 lg:justify-start">
          <a href="#demo" class="rounded-full bg-gradient-to-r from-[#0A4D68] to-[#05668D] px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">Prueba Gratis 30 Días</a>
          <a href="#funciones" class="rounded-full border-2 border-[#0A4D68] bg-white px-8 py-4 text-base font-bold text-[#0A4D68] transition-all hover:bg-[#0A4D68] hover:text-white">Ver Funciones</a>
        </div>
      </div>

      <div class="relative z-10 mt-16 w-full max-w-lg lg:mt-0 lg:w-1/2">
        <div class="rotate-[-2deg] rounded-[2rem] bg-white p-8 shadow-2xl transition-transform hover:rotate-0 hover:-translate-y-2">
          <div class="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A4D68] to-[#00A8CC] text-2xl shadow-inner">🦷</div>
            <div class="text-xl font-bold text-slate-800">Panel de Control</div>
          </div>
          <div class="grid grid-cols-2 gap-5">
            <div class="rounded-xl bg-slate-50 p-5 text-center transition-colors hover:bg-cyan-50">
              <div class="text-3xl font-bold text-[#0A4D68]">127</div>
              <div class="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Pacientes</div>
            </div>
            <div class="rounded-xl bg-slate-50 p-5 text-center transition-colors hover:bg-cyan-50">
              <div class="text-3xl font-bold text-[#0A4D68]">18</div>
              <div class="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Citas Hoy</div>
            </div>
            <div class="rounded-xl bg-slate-50 p-5 text-center transition-colors hover:bg-cyan-50">
              <div class="text-3xl font-bold text-[#0A4D68]">94%</div>
              <div class="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Éxito</div>
            </div>
            <div class="rounded-xl bg-slate-50 p-5 text-center transition-colors hover:bg-cyan-50">
              <div class="text-3xl font-bold text-[#0A4D68]">$48K</div>
              <div class="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Ingresos</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="funciones" class="bg-white px-[5%] py-24">
      <div class="mx-auto mb-16 max-w-3xl text-center">
        <span class="mb-4 inline-block rounded-full bg-cyan-100 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-[#0A4D68]">Funcionalidades</span>
        <h2 class="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">Todo lo que necesitas en un solo lugar</h2>
        <p class="text-lg font-light text-slate-500">Optimiza cada aspecto de tu práctica dental con herramientas diseñadas para profesionales.</p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="feature in features" :key="feature.title" class="group rounded-3xl border-2 border-slate-50 p-10 transition-all hover:-translate-y-2 hover:border-cyan-400 hover:shadow-xl">
          <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A4D68] to-[#00A8CC] text-2xl shadow-lg transition-transform group-hover:scale-110">
            {{ feature.icon }}
          </div>
          <h3 class="mb-4 text-xl font-bold text-slate-800">{{ feature.title }}</h3>
          <p class="font-light leading-relaxed text-slate-500">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <section id="contacto" class="relative overflow-hidden bg-gradient-to-r from-[#0A4D68] via-[#05668D] to-[#00A8CC] px-[5%] py-24 text-center text-white">
      <div class="relative z-10 mx-auto max-w-4xl">
        <h2 class="mb-6 text-4xl font-bold md:text-6xl">Transforma tu clínica hoy</h2>
        <p class="mb-10 text-xl font-light opacity-90">Únete a miles de odontólogos que ya optimizaron su práctica con DentSoft</p>
        <form class="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row" @submit.prevent="demo">
          <input type="email" placeholder="Tu correo electrónico" required class="flex-1 rounded-full px-6 py-4 text-slate-900 outline-none focus:ring-2 focus:ring-cyan-400" />
          <button type="submit" class="rounded-full bg-slate-900 px-8 py-4 font-bold transition-all hover:-translate-y-1 hover:bg-white hover:text-[#0A4D68]">Empezar Prueba Gratis</button>
        </form>
      </div>
    </section>

    <footer class="bg-slate-900 px-[5%] py-16 text-white">
      <div class="grid gap-12 border-b border-slate-800 pb-12 md:grid-cols-2 lg:grid-cols-4">
        <div class="col-span-1 lg:col-span-1">
          <h3 class="mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">🦷 DentSoft</h3>
          <p class="font-light leading-relaxed text-slate-400">La solución CRM más completa para clínicas odontológicas. Diseñada para dentistas.</p>
        </div>
        <div v-for="group in footerLinks" :key="group.title">
          <h4 class="mb-6 font-bold text-cyan-400">{{ group.title }}</h4>
          <ul class="flex flex-col gap-3">
            <li v-for="link in group.links" :key="link"><a href="#" class="font-light text-slate-400 transition-colors hover:pl-1 hover:text-white">{{ link }}</a></li>
          </ul>
        </div>
      </div>
      <div class="pt-8 text-center text-sm font-light text-slate-500">
        &copy; 2026 DentSoft. Todos los derechos reservados.
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      features: [
        { icon: '📅', title: 'Agenda Inteligente', desc: 'Gestión avanzada de citas con recordatorios automáticos por SMS y email.' },
        { icon: '📋', title: 'Historiales Digitales', desc: 'Expedientes clínicos completos con odontogramas interactivos y notas.' },
        { icon: '💰', title: 'Facturación Automática', desc: 'Genera facturas, controla pagos y maneja múltiples métodos de pago.' },
        { icon: '📊', title: 'Reportes y Análisis', desc: 'Dashboards en tiempo real con métricas clave de tu clínica dental.' },
        { icon: '🔒', title: 'Seguridad Total', desc: 'Encriptación de datos y cumplimiento con normativas de protección médica.' },
        { icon: '📱', title: 'Acceso Móvil', desc: 'Gestiona tu clínica desde cualquier dispositivo con nuestra App nativa.' },
      ],
      footerLinks: [
        { title: 'Producto', links: ['Funciones', 'Precios', 'Integraciones', 'API'] },
        { title: 'Empresa', links: ['Nosotros', 'Contacto', 'Privacidad', 'Términos'] }
      ]
    }
  },
  methods: {
    demo() {
      alert("¡Gracias! Te contactaremos pronto.")
    }
  }
}
</script>