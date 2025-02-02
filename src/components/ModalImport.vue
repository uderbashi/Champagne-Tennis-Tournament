<template>
  <div>
    <h1 class="text-xl">Import Game:</h1>
    <button
      @click="$emit('close', true)"
      class="mt-8 mx-1 py-2 px-6 text-white bg-tennis-primary hover:bg-tennis-secondary"
    >
      Import
    </button>
    <button
      @click="$emit('close', false)"
      class="mt-8 mx-1 py-2 px-6 text-white bg-tennis-primary hover:bg-tennis-secondary"
    >
      Close
    </button>
  </div>
</template>
