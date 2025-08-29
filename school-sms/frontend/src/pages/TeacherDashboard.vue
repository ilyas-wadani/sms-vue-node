<template>
  <div class="min-h-[70vh] flex items-center justify-center p-6">
    <div class="w-full max-w-3xl">
      <div class="bg-white rounded-2xl shadow p-8 text-center">
        <div class="flex flex-col items-center gap-4">

          <!-- Avatar (initials) -->
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600
                      flex items-center justify-center text-white text-3xl font-bold select-none">
            {{ initials }}
          </div>

          <!-- Name + meta -->
          <div>
            <h2 class="text-2xl font-extrabold tracking-tight">{{ user?.name || 'Teacher' }}</h2>

            <div class="mt-1 inline-flex items-center gap-2 text-sm text-gray-600">
              <!-- mail icon -->
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16v12H4zM22 6l-10 7L2 6"/>
              </svg>
              <span>{{ user?.email }}</span>
            </div>

            <div class="mt-2 inline-flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
              <!-- badge icon -->
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6l7 4v4l-7 4-7-4V10l7-4z"/>
              </svg>
              <span>Teacher</span>
            </div>
          </div>

          <!-- Quick actions -->
          <div class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            <RouterLink to="/attendance"
              class="action-btn">
              <!-- check icon -->
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 13l4 4L19 7"/>
              </svg>
              <span>Attendance</span>
            </RouterLink>

            <RouterLink to="/exams"
              class="action-btn">
              <!-- clipboard icon -->
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      d="M9 5h6m-7 4h8M7 9v10a2 2 0 002 2h6a2 2 0 002-2V9"/>
              </svg>
              <span>Enter Marks</span>
            </RouterLink>

            <RouterLink to="/results"
              class="action-btn">
              <!-- search icon -->
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="7" stroke-width="2"/>
                <path stroke-width="2" stroke-linecap="round" d="M20 20l-3-3"/>
              </svg>
              <span>Results</span>
            </RouterLink>

            <button @click="logout"
              class="action-btn !bg-rose-600 !text-white hover:opacity-95">
              <!-- logout icon -->
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      d="M15 12H3m8-7l-5 5m5 9l-5-5M21 5v14a2 2 0 01-2 2h-6"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>

          <p class="mt-6 text-gray-600 text-sm">
            Use the actions above to mark attendance or enter exam marks.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const user = JSON.parse(localStorage.getItem('user') || 'null') || {}

const initials = computed(() => {
  const n = (user?.name || '').trim()
  if (!n) return 'T'
  return n.split(/\s+/).slice(0,2).map(s => s[0]?.toUpperCase()).join('') || 'T'
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  location.href = '/login'
}
</script>

<style scoped>
.action-btn {
  @apply flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-gray-100 text-gray-800
         hover:bg-gray-200 transition;
}
</style>
