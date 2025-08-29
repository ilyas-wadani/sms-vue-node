<template>
  <div class="p-4 sm:p-6 space-y-4">
    <h2 class="text-lg sm:text-xl font-semibold">Mark Attendance</h2>

    <!-- Controls: stacked on mobile, inline on desktop -->
    <div class="flex flex-col sm:flex-row gap-2 sm:items-center">
      <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <select v-model="class_id" class="border p-2 rounded w-full sm:w-60">
          <option disabled value="">Select Class</option>
          <option v-for="c in classes" :key="c.id" :value="c.id">
            {{ c.name }} - {{ c.section }}
          </option>
        </select>
        <input type="date" v-model="date" class="border p-2 rounded w-full sm:w-auto" />
      </div>
      <div class="flex gap-2">
        <button @click="loadStudents" class="px-4 py-2 bg-blue-600 text-white rounded">Load</button>
        <button v-if="items.length" @click="save" class="px-4 py-2 bg-green-600 text-white rounded">Save</button>
      </div>
    </div>

    <div v-if="items.length" class="bg-white rounded shadow">
      <!-- Desktop/Tablet table -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="p-3 text-left">Student</th>
              <th class="p-3">Status</th>
              <th class="p-3 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="it in items" :key="it.student_id" class="border-b">
              <td class="p-3 text-left">{{ it.full_name }} ({{ it.student_code }})</td>
              <td class="p-3">
                <select v-model="it.status" class="border p-2 rounded">
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="excused">Excused</option>
                </select>
              </td>
              <td class="p-3">
                <input v-model="it.note" class="border p-2 rounded w-full" placeholder="Note (optional)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div class="sm:hidden divide-y">
        <div v-for="it in items" :key="it.student_id" class="p-3">
          <div class="font-medium">{{ it.full_name }}</div>
          <div class="text-xs text-gray-500">{{ it.student_code }}</div>
          <div class="mt-2">
            <select v-model="it.status" class="border p-2 rounded w-full">
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="excused">Excused</option>
            </select>
          </div>
          <input v-model="it.note" class="mt-2 border p-2 rounded w-full" placeholder="Note (optional)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const classes = ref([])
const class_id = ref('')
const date = ref(new Date().toISOString().slice(0,10))
const items = ref([])

const load = async () => {
  const { data } = await api.get('/classes')
  classes.value = data
}
const loadStudents = async () => {
  if (!class_id.value) return alert('Select class')
  const { data } = await api.get(`/attendance/class/${class_id.value}/students`)
  items.value = data.map(s => ({ ...s, student_id: s.id, status: 'present', note: '' }))
}
const save = async () => {
  await api.post('/attendance/mark', {
    class_id: class_id.value,
    date: date.value,
    items: items.value.map(({ student_id, status, note }) => ({ student_id, status, note }))
  })
  alert('Saved'); items.value = []
}
onMounted(load)
</script>
