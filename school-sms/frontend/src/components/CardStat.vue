<template>
  <div class="bg-white rounded-xl shadow p-4 sm:p-5">
    <div class="flex items-center gap-3">
      <!-- Square colored icon -->
      <div :class="['w-10 h-10 rounded flex items-center justify-center', bgClass]">
        <Icon :name="icon" class="w-5 h-5 text-white" />
      </div>

      <div class="min-w-0">
        <div class="text-xs uppercase tracking-wide text-gray-500">{{ label }}</div>
        <div class="text-2xl font-bold leading-tight">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  label: String,
  value: [String, Number],
  icon:  { type: String, default: 'class' },   // class|students|teachers|attendance
  color: { type: String, default: 'emerald' }  // emerald|pink|amber|sky|indigo|cyan|teal
})

const bgClass = computed(() => ({
  emerald:'bg-emerald-500', pink:'bg-pink-500', amber:'bg-amber-500',
  sky:'bg-sky-500', indigo:'bg-indigo-500', cyan:'bg-cyan-500', teal:'bg-teal-500'
}[props.color] || 'bg-indigo-500'))
</script>
