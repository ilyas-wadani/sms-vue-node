<template>
  <header class="bg-white shadow p-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- Hamburger (mobile only) -->
      <button class="md:hidden p-2 rounded hover:bg-gray-100"
              @click="ui.toggle()" aria-label="Open menu">☰</button>
      <h1 class="text-lg font-semibold">ALFAJR SCHOOL</h1>
    </div>
    <div class="flex items-center gap-4">
      <span class="text-sm text-gray-600">{{ user?.name }} ({{ user?.role }})</span>
      <button @click="logout" class="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
    </div>
  </header>
</template>
<script setup>
import { useUi } from '../stores/ui'
const ui = useUi()
const user = JSON.parse(localStorage.getItem('user') || 'null')
const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); location.href='/login' }
</script>
