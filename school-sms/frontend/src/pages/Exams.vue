<template>
  <div class="p-4 sm:p-6 space-y-6">
    <h2 class="text-lg sm:text-xl font-semibold">Exams & Marks</h2>

    <!-- Controls -->
    <div class="flex flex-col sm:flex-row flex-wrap gap-2 sm:items-end">
      <input v-model="exam.name" placeholder="Exam name" class="border p-2 rounded w-full sm:w-auto" />
      <input v-model="exam.term" placeholder="Term" class="border p-2 rounded w-full sm:w-28" />
      <input v-model="exam.year" type="number" placeholder="Year" class="border p-2 rounded w-full sm:w-28" />
      <input v-model="exam.subject" placeholder="Subject" class="border p-2 rounded w-full sm:w-auto" />
      <select v-model="exam.class_id" class="border p-2 rounded w-full sm:w-56">
        <option disabled value="">Class</option>
        <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.name }} - {{ c.section }}</option>
      </select>
      <input v-model="exam.date" type="date" class="border p-2 rounded w-full sm:w-auto" />
      <button @click="create" class="px-4 py-2 bg-green-600 text-white rounded w-full sm:w-auto">Create</button>
    </div>

    <!-- Exams list: table on tablet/desktop -->
    <div class="bg-white rounded shadow overflow-x-auto hidden sm:block">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="p-3 text-left">Exam</th>
            <th class="p-3">Class</th>
            <th class="p-3">Date</th>
            <th class="p-3">Enter Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in exams" :key="e.id" class="border-b">
            <td class="p-3 text-left">{{ e.name }} - {{ e.subject }} (T{{ e.term }} {{ e.year }})</td>
            <td class="p-3">{{ classLabel(e.class_id) }}</td>
            <td class="p-3">{{ e.date }}</td>
            <td class="p-3">
              <button @click="openMarks(e)" class="px-3 py-1 bg-blue-600 text-white rounded">Enter</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Exams list: cards on mobile -->
    <div class="sm:hidden space-y-2">
      <div v-for="e in exams" :key="e.id" class="bg-white rounded shadow p-3">
        <div class="font-semibold">{{ e.name }} — {{ e.subject }}</div>
        <div class="text-xs text-gray-500 mt-1">
          Class: {{ classLabel(e.class_id) }} • Term {{ e.term }} {{ e.year }} • {{ e.date }}
        </div>
        <button @click="openMarks(e)" class="mt-3 w-full px-3 py-2 bg-blue-600 text-white rounded">Enter Marks</button>
      </div>
    </div>

    <!-- Marks entry -->
    <div v-if="activeExam" class="bg-white rounded shadow p-4">
      <h3 class="font-semibold mb-2">Marks - {{ activeExam.name }} ({{ classLabel(activeExam.class_id) }})</h3>

      <!-- Table for sm+ -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="p-3 text-left">Student</th>
              <th class="p-3">Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in marks" :key="row.student_id" class="border-b">
              <td class="p-3 text-left">{{ row.full_name }}</td>
              <td class="p-3">
                <input type="number" v-model.number="row.marks" min="0" max="100"
                       class="border p-2 rounded w-24" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cards for mobile -->
      <div class="sm:hidden divide-y">
        <div v-for="row in marks" :key="row.student_id" class="py-3">
          <div class="font-medium">{{ row.full_name }}</div>
          <input type="number" v-model.number="row.marks" min="0" max="100"
                 class="mt-2 border p-2 rounded w-full" placeholder="Marks (0-100)" />
        </div>
      </div>

      <div class="mt-4 flex flex-col sm:flex-row gap-2">
        <button @click="saveMarks" class="px-4 py-2 bg-green-600 text-white rounded">Save Marks</button>
        <button @click="activeExam=null" class="px-4 py-2 bg-gray-300 rounded sm:ml-2">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const classes = ref([])
const exams = ref([])
const exam = ref({ name:'Midterm', term:'1', year:new Date().getFullYear(), subject:'Math', class_id:'', date:new Date().toISOString().slice(0,10) })
const activeExam = ref(null)
const marks = ref([])

const load = async () => {
  const cls = await api.get('/classes'); classes.value = cls.data
  const ex = await api.get('/exams');    exams.value  = ex.data
}
const classLabel = (id) => {
  const c = classes.value.find(x => x.id === id)
  return c ? `${c.name}-${c.section}` : id
}
const create = async () => {
  if (!exam.value.name || !exam.value.class_id) return alert('Fill all')
  await api.post('/exams', exam.value)
  await load()
}
const openMarks = async (e) => {
  activeExam.value = e
  const { data } = await api.get(`/attendance/class/${e.class_id}/students`)
  marks.value = data.map(s => ({ student_id: s.id, full_name: s.full_name, marks: 0 }))
}
const saveMarks = async () => {
  await api.post(`/exams/${activeExam.value.id}/marks`, {
    items: marks.value.map(({ student_id, marks }) => ({ student_id, marks }))
  })
  alert('Saved')
}
onMounted(load)
</script>
