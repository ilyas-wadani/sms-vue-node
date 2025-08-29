<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="2" class="shrink-0">
    <!-- CLASS (book) -->
    <g v-if="name==='class'">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 6a2 2 0 012-2h6a2 2 0 012 2v13a2 2 0 00-2-2H5a2 2 0 00-2 2V6z"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 6a2 2 0 00-2-2h-6a2 2 0 00-2 2v13a2 2 0 012-2h6a2 2 0 012 2V6z"/>
    </g>

    <!-- STUDENTS (user) -->
    <g v-else-if="name==='students'">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 7a4 4 0 110 8 4 4 0 010-8z"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 21a7 7 0 0114 0"/>
    </g>

    <!-- TEACHERS (mortarboard) -->
    <g v-else-if="name==='teachers'">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.5-3.7M5.5 21a12 12 0 0113 0"/>
    </g>

    <!-- ATTENDANCE (check) -->
    <g v-else-if="name==='attendance'">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
    </g>

    <!-- DEFAULT -->
    <g v-else>
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v3m0 12v3M21 12h-3M6 12H3"/>
    </g>
  </svg>
</template>

<script setup>
defineProps({ name: { type: String, required: true } })
</script>
