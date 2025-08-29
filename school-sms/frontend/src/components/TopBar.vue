<template>
  <header class="bg-white shadow p-3 sm:p-4 sticky top-0 z-10">
    <div class="max-w-screen-2xl mx-auto flex items-center justify-between">
      <!-- Brand + Hamburger -->
      <div class="flex items-center gap-3">
        <button class="md:hidden p-2 rounded hover:bg-gray-100"
                @click="ui.toggle()" aria-label="Open menu">
          <!-- menu icon -->
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>
        <h1 class="text-base sm:text-lg font-semibold truncate">ALFAJR SCHOOL</h1>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-3">
        <!-- Mobile (sm-) : avatar + logout icon -->
        <div class="flex items-center gap-2 sm:hidden">
          <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center
                      text-xs font-bold text-gray-700 select-none">
            {{ initials }}
          </div>
          <button @click="logout" class="p-2 rounded hover:bg-red-50" aria-label="Logout">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"/>
            </svg>
          </button>
        </div>

        <!-- Desktop (sm+) : avatar + name/role + logout button -->
        <div class="hidden sm:flex items-center gap-3">
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center
                        text-sm font-bold text-gray-700 select-none">
              {{ initials }}
            </div>
            <div class="leading-tight">
              <div class="text-2xl text-gray-800">{{ user?.name || 'User' }}</div>
              <div class="text-xs text-gray-500 capitalize">{{ user?.role }}</div>
            </div>
          </div>
          <button @click="logout" class="px-3 py-1.5 bg-red-500 text-white rounded">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useUi } from '../stores/ui'
const ui = useUi()
const user = JSON.parse(localStorage.getItem('user') || 'null')
const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); location.href='/login' }

const initials = computed(() => {
  const n = (user?.name || '').trim()
  if (!n) return 'U'
  return n.split(/\s+/).slice(0,2).map(s => s[0]?.toUpperCase()).join('')
})
</script>
