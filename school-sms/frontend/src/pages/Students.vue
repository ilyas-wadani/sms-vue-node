<template>
  <div class="p-4 sm:p-6">
    <!-- Header + Add form -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <h2 class="text-lg sm:text-xl font-semibold">Manage Students</h2>

      <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <input v-model="form.full_name" placeholder="Full name"
               class="border p-2 rounded w-full" />
        <input v-model="form.student_code" placeholder="Student ID"
               class="border p-2 rounded w-full sm:w-40" />
        <select v-model="form.class_id" class="border p-2 rounded w-full sm:w-auto">
          <option disabled value="">Class</option>
          <option v-for="c in classes" :key="c.id" :value="c.id">
            {{ c.name }} - {{ c.section }}
          </option>
        </select>
        <input v-model="form.guardian_phone" placeholder="Guardian phone"
               class="border p-2 rounded w-full" />
        <button @click="save"
                class="px-4 py-2 bg-green-600 text-white rounded w-full sm:w-auto">Add</button>
      </div>
    </div>

    <!-- Desktop/Tablet table -->
    <div class="bg-white rounded shadow overflow-x-auto hidden sm:block">
      <table class="w-full text-sm">
        <thead class="text-left">
          <tr class="border-b">
            <th class="p-3">#</th>
            <th class="p-3">Name</th>
            <th class="p-3">ID</th>
            <th class="p-3">Class</th>
            <th class="p-3">Guardian</th>
            <th class="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s,i) in students" :key="s.id" class="border-b">
            <td class="p-3">{{ i+1 }}</td>
            <td class="p-3">{{ s.full_name }}</td>
            <td class="p-3">{{ s.student_code }}</td>
            <td class="p-3">{{ s.class_name }}-{{ s.section }}</td>
            <td class="p-3">{{ s.guardian_phone }}</td>
            <td class="p-3">
              <div class="flex gap-2">
                <button @click="edit(s)" class="px-3 py-1 bg-purple-600 text-white rounded">Edit</button>
                <button @click="remove(s.id)" class="px-3 py-1 bg-rose-500 text-white rounded">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile cards -->
    <div class="sm:hidden space-y-2">
      <div v-for="(s,i) in students" :key="s.id" class="bg-white rounded shadow p-3">
        <div class="flex items-center justify-between">
          <div class="font-semibold">{{ s.full_name }}</div>
          <span class="text-xs text-gray-500">#{{ i+1 }}</span>
        </div>
        <div class="mt-1 flex flex-wrap gap-2 text-xs">
          <span class="px-2 py-0.5 bg-gray-100 rounded border">ID: {{ s.student_code }}</span>
          <span class="px-2 py-0.5 bg-gray-100 rounded border">Class: {{ s.class_name }}-{{ s.section }}</span>
        </div>
        <div class="text-xs text-gray-500 mt-1">Guardian: {{ s.guardian_phone }}</div>

        <div class="mt-3 grid grid-cols-2 gap-2">
          <button @click="edit(s)" class="px-3 py-2 bg-purple-600 text-white rounded">Edit</button>
          <button @click="remove(s.id)" class="px-3 py-2 bg-rose-500 text-white rounded">Delete</button>
        </div>
      </div>
    </div>

    <!-- Edit form -->
    <div v-if="editing" class="mt-6 bg-white p-4 rounded shadow">
      <h3 class="font-semibold mb-2">Edit Student</h3>
      <div class="flex flex-col sm:flex-row gap-2">
        <input v-model="form.full_name" class="border p-2 rounded w-full" />
        <input v-model="form.student_code" class="border p-2 rounded w-full sm:w-40" />
        <select v-model="form.class_id" class="border p-2 rounded w-full sm:w-auto">
          <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.name }} - {{ c.section }}</option>
        </select>
        <input v-model="form.guardian_phone" class="border p-2 rounded w-full" />
        <div class="flex gap-2">
          <button @click="update" class="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
          <button @click="cancel" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const classes = ref([])
const students = ref([])
const form = ref({ full_name:'', student_code:'', class_id:'', guardian_phone:'' })
const editing = ref(null)

const load = async () => {
  const c = await api.get('/classes');   classes.value = c.data
  const s = await api.get('/students');  students.value = s.data
}
const save = async () => {
  if(!form.value.full_name || !form.value.student_code || !form.value.class_id) return alert('Complete fields')
  await api.post('/students', form.value)
  form.value = { full_name:'', student_code:'', class_id:'', guardian_phone:'' }
  load()
}
const edit = (s) => {
  editing.value = s.id
  form.value = { full_name:s.full_name, student_code:s.student_code, class_id:s.class_id, guardian_phone:s.guardian_phone }
}
const update = async () => {
  await api.put(`/students/${editing.value}`, form.value)
  editing.value = null
  form.value = { full_name:'', student_code:'', class_id:'', guardian_phone:'' }
  load()
}
const cancel = () => { editing.value = null; form.value = { full_name:'', student_code:'', class_id:'', guardian_phone:'' } }
const remove = async (id) => { if(confirm('Delete?')) { await api.delete(`/students/${id}`); load() } }

onMounted(load)
</script>
