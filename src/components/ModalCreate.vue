<template>
  <div class="flex flex-col">
    <h1 class="text-xl">Create Game:</h1>
    <input
      type="text"
      v-model="gameName"
      placeholder="Game Name"
      class="transition-all duration-300 ease-in-out 
        w-5/6 self-center py-1 mt-4 rounded-md text-black text-center border border-black 
        hover:border-tennis-primary hover:w-full 
        focus:outline-none focus:border-tennis-secondary focus:w-full"
      />
    <div>
      <button
        @click="$emit('close', true)"
        class="mt-8 mx-1 py-2 px-6 text-white bg-tennis-primary hover:bg-tennis-secondary"
      >
        Create
      </button>
      <button
        @click="$emit('close', false)"
        class="mt-8 mx-1 py-2 px-6 text-white bg-tennis-primary hover:bg-tennis-secondary"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const gameName = ref("");
</script>
