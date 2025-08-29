<template>
  <div class="p-4 sm:p-6">
    <!-- Header + Add form -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <h2 class="text-lg sm:text-xl font-semibold">Manage Class</h2>

      <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <input
          v-model="form.name"
          placeholder="Class (e.g., 10)"
          class="border p-2 rounded w-full sm:w-28"
        />
        <input
          v-model="form.section"
          placeholder="Section (e.g., A)"
          class="border p-2 rounded w-full sm:w-24"
        />
        <button
          @click="save"
          class="px-4 py-2 bg-green-600 text-white rounded w-full sm:w-auto"
        >
          Add
        </button>
      </div>
    </div>

    <!-- Desktop/Tablet table -->
    <div class="bg-white rounded shadow hidden sm:block">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-left">
            <tr class="border-b">
              <th class="p-3">S.No</th>
              <th class="p-3">Class Name</th>
              <th class="p-3">Section</th>
              <th class="p-3">Creation Date</th>
              <th class="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c,i) in classes" :key="c.id" class="border-b">
              <td class="p-3">{{ i+1 }}</td>
              <td class="p-3">{{ c.name }}</td>
              <td class="p-3">{{ c.section }}</td>
              <td class="p-3">{{ fmt(c.created_at) }}</td>
              <td class="p-3">
                <div class="flex gap-2">
                  <button @click="edit(c)" class="px-3 py-1 bg-purple-600 text-white rounded">Edit</button>
                  <button @click="remove(c.id)" class="px-3 py-1 bg-rose-500 text-white rounded">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile cards -->
    <div class="sm:hidden space-y-2">
      <div
        v-for="(c,i) in classes"
        :key="c.id"
        class="bg-white rounded shadow p-3"
      >
        <div class="flex items-center justify-between">
          <div class="font-semibold">Class {{ c.name }} - {{ c.section }}</div>
          <span class="text-xs text-gray-500">#{{ i+1 }}</span>
        </div>
        <div class="text-xs text-gray-500 mt-1">Created: {{ fmt(c.created_at) }}</div>
        <div class="mt-3 flex gap-2">
          <button @click="edit(c)" class="flex-1 px-3 py-2 bg-purple-600 text-white rounded">Edit</button>
          <button @click="remove(c.id)" class="flex-1 px-3 py-2 bg-rose-500 text-white rounded">Delete</button>
        </div>
      </div>
    </div>

    <!-- Edit form -->
    <div v-if="editing" class="mt-6 bg-white p-4 rounded shadow">
      <h3 class="font-semibold mb-2">Edit Class</h3>
      <div class="flex flex-col sm:flex-row gap-2">
        <input v-model="form.name" class="border p-2 rounded w-full sm:w-28" />
        <input v-model="form.section" class="border p-2 rounded w-full sm:w-24" />
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
const form = ref({ name: '', section: '' })
const editing = ref(null)

const fmt = (d) => new Date(d).toLocaleString()

const load = async () => {
  const { data } = await api.get('/classes')
  classes.value = data
}
const save = async () => {
  if (!form.value.name || !form.value.section) return alert('Fill all')
  await api.post('/classes', form.value)
  form.value = { name: '', section: '' }
  load()
}
const edit = (c) => {
  editing.value = c.id
  form.value = { name: c.name, section: c.section }
}
const update = async () => {
  await api.put(`/classes/${editing.value}`, form.value)
  editing.value = null
  form.value = { name: '', section: '' }
  load()
}
const cancel = () => {
  editing.value = null
  form.value = { name: '', section: '' }
}
const remove = async (id) => {
  if (confirm('Delete?')) {
    await api.delete(`/classes/${id}`)
    load()
  }
}
onMounted(load)
</script>
