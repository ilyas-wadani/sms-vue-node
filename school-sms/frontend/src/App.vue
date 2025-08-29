<template>
  <div class="min-h-screen md:flex">
    <Sidebar v-if="isAuthed" />
    <div class="flex-1 min-w-0">
      <TopBar v-if="isAuthed" />
      <router-view />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import Sidebar from './components/Sidebar.vue';
import TopBar from './components/TopBar.vue';
const isAuthed = computed(() => !!localStorage.getItem('token'));
</script>
