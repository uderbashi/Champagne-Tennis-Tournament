<template>
  <main class="container text-white">
    <Suspense>
      <ListGameEntries/>
      <template #fallback>
        <span>Loading...</span>
      </template>
    </Suspense>
    <span class="px-8 text-sm">If you want a game to be shown, please send its JSON save file to the admin.</span>
  </main>
</template>

<script setup>
import ListGameEntries from '@/components/ListGameEntries.vue';
</script>
