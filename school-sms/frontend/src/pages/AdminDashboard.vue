<template>
  <div class="p-6 space-y-6">
    <!-- Admin Profile (center) -->
    <div class="bg-white rounded-2xl shadow p-8 text-center">
      <div class="flex flex-col items-center gap-4">
        <!-- Avatar initials -->
        <div
          class="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600
                 flex items-center justify-center text-white text-3xl font-bold select-none">
          {{ initials }}
        </div>

        <!-- Name -->
        <h2 class="text-2xl font-extrabold tracking-tight">
          {{ user?.name || 'System Admin' }}
        </h2>

        <!-- Icons + meta -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <!-- email -->
          <span class="inline-flex items-center gap-2 text-sm text-gray-600">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16v12H4zM22 6l-10 7L2 6"/>
            </svg>
            {{ user?.email }}
          </span>

          <!-- role badge -->
          <span class="inline-flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6l7 4v4l-7 4-7-4V10l7-4z"/>
            </svg>
            {{ (user?.role || 'admin').toUpperCase() }}
          </span>
        </div>
      </div>
    </div>

    <!-- Stats -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
  <CardStat label="Total Class"        :value="stats.total_classes"   icon="class"      color="emerald" />
  <CardStat label="Total Students"     :value="stats.total_students"  icon="students"   color="pink" />
  <CardStat label="Total Teachers"     :value="stats.total_teachers"  icon="teachers"   color="amber" />
  <CardStat label="Today's Attendance" :value="stats.last_attendance" icon="attendance" color="sky" />
</div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue'
import api from '../api'
import CardStat from '../components/CardStat.vue'

const stats = reactive({ total_classes: 0, total_students: 0, total_teachers: 0, last_attendance: 0 })
const user = JSON.parse(localStorage.getItem('user') || 'null') || {}

const initials = computed(() => {
  const n = (user?.name || '').trim()
  if (!n) return 'A' // default
  return n.split(/\s+/).slice(0,2).map(s => s[0]?.toUpperCase()).join('') || 'A'
})

onMounted(async () => {
  const { data } = await api.get('/reports/dashboard')
  Object.assign(stats, data)
})
</script>