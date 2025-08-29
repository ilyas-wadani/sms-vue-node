<template>
  <div class="p-4 sm:p-6">
    <!-- Header + Add form -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <h2 class="text-lg sm:text-xl font-semibold">Manage Teachers</h2>

      <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <input v-model="form.full_name" placeholder="Full name" class="border p-2 rounded w-full" />
        <input v-model="form.email" placeholder="Email" class="border p-2 rounded w-full sm:w-60" />
        <input v-model="form.phone" placeholder="Phone" class="border p-2 rounded w-full sm:w-40" />
        <input v-model="form.password" type="password" placeholder="Password" class="border p-2 rounded w-full sm:w-40" />
        <button @click="save" class="px-4 py-2 bg-green-600 text-white rounded w-full sm:w-auto">Add</button>
      </div>
    </div>

    <!-- Table (sm+) -->
    <div class="bg-white rounded shadow overflow-x-auto hidden sm:block">
      <table class="w-full text-sm">
        <thead class="text-left">
          <tr class="border-b">
            <th class="p-3">Name</th>
            <th class="p-3">Email</th>
            <th class="p-3">Phone</th>
            <th class="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in list" :key="t.id" class="border-b">
            <td class="p-3">{{ t.full_name }}</td>
            <td class="p-3">{{ t.email }}</td>
            <td class="p-3">{{ t.phone }}</td>
            <td class="p-3">
              <div class="flex flex-wrap gap-2">
                <button @click="edit(t)" class="px-3 py-1 bg-purple-600 text-white rounded">Edit</button>
                <button @click="t._showReset = !t._showReset" class="px-3 py-1 bg-amber-600 text-white rounded">Reset Pass</button>
                <button @click="remove(t.id)" class="px-3 py-1 bg-rose-500 text-white rounded">Delete</button>
              </div>
              <div v-if="t._showReset" class="mt-2 flex gap-2 items-center">
                <input v-model="t._newPass" type="password" placeholder="New password" class="border p-2 rounded w-48" />
                <button @click="resetPass(t)" class="px-3 py-1 bg-amber-600 text-white rounded">Save</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Cards (mobile) -->
    <div class="sm:hidden space-y-2">
      <div v-for="t in list" :key="t.id" class="bg-white rounded shadow p-3">
        <div class="font-semibold">{{ t.full_name }}</div>
        <div class="text-xs text-gray-500">{{ t.email }} • {{ t.phone }}</div>
        <div class="mt-3 grid grid-cols-3 gap-2">
          <button @click="edit(t)" class="px-3 py-2 bg-purple-600 text-white rounded">Edit</button>
          <button @click="t._showReset = !t._showReset" class="px-3 py-2 bg-amber-600 text-white rounded">Reset</button>
          <button @click="remove(t.id)" class="px-3 py-2 bg-rose-500 text-white rounded">Delete</button>
        </div>
        <div v-if="t._showReset" class="mt-2 flex gap-2">
          <input v-model="t._newPass" type="password" placeholder="New password" class="border p-2 rounded flex-1" />
          <button @click="resetPass(t)" class="px-3 py-2 bg-amber-600 text-white rounded">OK</button>
        </div>
      </div>
    </div>

    <!-- Edit form -->
    <div v-if="editing" class="mt-6 bg-white p-4 rounded shadow">
      <h3 class="font-semibold mb-2">Edit Teacher</h3>
      <div class="flex flex-col sm:flex-row gap-2">
        <input v-model="form.full_name" class="border p-2 rounded w-full" />
        <input v-model="form.email" class="border p-2 rounded w-full sm:w-60" />
        <input v-model="form.phone" class="border p-2 rounded w-full sm:w-40" />
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

const list = ref([])
const form = ref({ full_name:'', email:'', phone:'', password:'' })
const editing = ref(null)

const load = async () => {
  const { data } = await api.get('/teachers')
  list.value = data
}
const clear = () => form.value = { full_name:'', email:'', phone:'', password:'' }

const save = async () => {
  if (!form.value.full_name || !form.value.email || !form.value.password)
    return alert('Name, Email & Password are required')
  await api.post('/teachers', form.value)
  clear(); load()
}

const edit = (t) => {
  editing.value = t.id
  form.value = { full_name: t.full_name, email: t.email, phone: t.phone, password: '' } // password not editable here
}
const update = async () => {
  await api.put(`/teachers/${editing.value}`, {
    full_name: form.value.full_name, email: form.value.email, phone: form.value.phone
  })
  editing.value = null; clear(); load()
}
const cancel = () => { editing.value = null; clear() }

const remove = async (id) => {
  if (confirm('Delete this teacher?')) { await api.delete(`/teachers/${id}`); load() }
}

const resetPass = async (t) => {
  if (!t._newPass || t._newPass.length < 4) return alert('Password too short')
  await api.put(`/teachers/${t.id}/password`, { password: t._newPass })
  t._newPass = ''; t._showReset = false; alert('Password reset.')
}

onMounted(load)
</script>
