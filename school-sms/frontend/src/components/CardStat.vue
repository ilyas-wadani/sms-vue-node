<template>
  <div class="bg-white rounded shadow p-4">
    <div class="text-sm text-gray-500">{{ label }}</div>
    <div class="text-2xl font-bold">{{ value }}</div>
  </div>
</template>
<script setup>
defineProps({ label: String, value: [String, Number] });
</script>
