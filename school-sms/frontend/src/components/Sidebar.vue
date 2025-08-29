<template>
  <!-- Backdrop (mobile only) -->
  <transition name="fade">
    <div
      v-if="ui.sidebarOpen"
      class="fixed inset-0 z-40 bg-black/40 md:hidden"
      @click="ui.close()"
    />
  </transition>

  <!-- Drawer / Static sidebar -->
  <transition name="slide">
    <aside
      class="fixed z-50 inset-y-0 left-0 w-72 bg-gray-800 text-white p-4
             md:static md:translate-x-0 md:z-auto md:min-h-screen"
      :class="ui.sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
      aria-label="Main navigation"
    >
      <!-- Close button (mobile) -->
      <div class="flex items-center justify-between md:hidden mb-4">
        <div class="text-xl font-bold">AL-FAJRI</div>
        <button @click="ui.close()" class="p-2 rounded hover:bg-white/10" aria-label="Close menu">✕</button>
      </div>

      <!-- Brand / Title (desktop) -->
      <div class="hidden md:block text-xl font-bold mb-6">AL-FAJRI</div>

      <nav class="space-y-2">
        <RouterLink v-if="user?.role==='admin'" to="/dashboard" class="navlink">Dashboard</RouterLink>
        <RouterLink v-if="user?.role==='teacher'" to="/t/dashboard" class="navlink">Dashboard</RouterLink>
        <RouterLink v-if="user?.role==='admin'" to="/teachers" class="navlink">Teachers</RouterLink>
        <RouterLink v-if="user?.role==='admin'" to="/classes" class="navlink">Class</RouterLink>
        <RouterLink v-if="user?.role==='admin'" to="/students" class="navlink">Students</RouterLink>
        <RouterLink to="/attendance" class="navlink">Attendance</RouterLink>
        <RouterLink to="/exams" class="navlink">Exams</RouterLink>
        <RouterLink to="/results" class="navlink">Results (Public)</RouterLink>
        

      </nav>
    </aside>
  </transition>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUi } from '../stores/ui'
const ui = useUi()
const user = JSON.parse(localStorage.getItem('user') || 'null')

// optional: auto-close on route change (mobile)
const router = useRouter()
router.afterEach(() => ui.close())
</script>

<style scoped>
.navlink {
  display: block;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}
.navlink:hover {
  background-color: #374151; /* Tailwind's bg-gray-700 */
}
/* transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform .2s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
</style>
