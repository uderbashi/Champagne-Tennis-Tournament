<template>
  <div class="flex bg-tennis-secondary my-2 pb-4 px-4 rounded-md shadow-md">
    <div class="flex-col w-full text-white text-center">
      <h1 class="text-xl font-semibold my-3">{{ title }}</h1>
      <span>Last saved: {{ timestamp }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String },
  timestamp: { type: String }
});
</script>
