<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h2 class="text-xl font-semibold mb-3">Student Results</h2>
    <div class="flex gap-2 mb-4">
      <input v-model="code" placeholder="Enter Student ID" class="border p-2 rounded flex-1" />
      <button @click="search" class="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
    </div>
    <div v-if="rows.length" class="bg-white rounded shadow overflow-x-auto">
      <table class="w-full">
        <thead><tr class="border-b">
          <th class="p-3 text-left">Exam</th><th class="p-3">Subject</th><th class="p-3">Term</th><th class="p-3">Year</th><th class="p-3">Marks</th><th class="p-3">Grade</th>
        </tr></thead>
        <tbody>
          <tr v-for="(r,i) in rows" :key="i" class="border-b">
            <td class="p-3 text-left">{{ r.exam_name }}</td>
            <td class="p-3">{{ r.subject }}</td>
            <td class="p-3">{{ r.term }}</td>
            <td class="p-3">{{ r.year }}</td>
            <td class="p-3">{{ r.marks }}</td>
            <td class="p-3">{{ r.grade }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-gray-500">Enter a valid Student ID (e.g., S-1001) to see results.</p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import api from '../api';
const code = ref('S-1001');
const rows = ref([]);
const search = async () => { const { data } = await api.get(`/results/by-code/${code.value}`); rows.value = data; };
</script>
