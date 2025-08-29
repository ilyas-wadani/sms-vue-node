<template>
  <div class="w-full flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow rounded p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">School Login</h2>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block text-sm mb-1">Email</label>
          <input v-model="email" type="email" class="w-full border rounded p-2" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm mb-1">Password</label>
          <input v-model="password" type="password" class="w-full border rounded p-2" required />
        </div>
        <button class="w-full py-2 bg-gray-800 text-white rounded">Login</button>
      </form>
      <p class="text-xs text-gray-500 mt-4">Default admin: admin@school.local / admin123</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import api from '../api';
const email = ref('admin@school.local');
const password = ref('admin123');
const submit = async () => {
  try {
    const { data } = await api.post('/auth/login', { email: email.value, password: password.value });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    if (data.user.role==='admin') location.href='/dashboard'; else location.href='/t/dashboard';
  } catch (e) {
    alert(e.response?.data?.error || e.message);
  }
};
</script>
