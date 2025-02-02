<template>
  <div>
    <h1 class="text-xl">Create Game:</h1>
    <input
      type="text"
      v-model="gameName"
      placeholder="Game Name"
      class="py-2 px-1 w-full bg-transparent border-b focus:border-tennis-primary focus:outline-none focus:shadow-[0px_1px_0_0_tennis-secondary]"
    />
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
</template>

<script setup>
import { ref } from "vue";

const gameName = ref("");
</script>
