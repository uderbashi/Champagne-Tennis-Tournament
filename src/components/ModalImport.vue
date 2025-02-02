<template>
  <div>
    <h1 class="text-xl">Import Game:</h1>
    <label
      class="mt-8 mx-1 py-2 px-6 w-full text-white bg-tennis-primary hover:bg-tennis-secondary"
    >
      {{ fileName }}
      <input type="file" accept=".json" style="display: none;" @change="fileSelected">
  </label>
  
    <div>
      <button
        @click="load"
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
  </div>
</template>

<script setup>
import { ref } from "vue";

const fileName = ref("Select File");
const fileData = ref("");
const emit = defineEmits(["close"]);

function parseFile(filename, result) {
  try {
    const data = JSON.parse(result);
    // check if the json is valid
    if (data) {
      fileName.value = filename;
      fileData.value = result;
    } else {
      console.error('Invalid JSON');
    }
  } catch (error) {
    console.error('Error parsing JSON: ', error);
  }
}

function fileSelected(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {parseFile(file.name, reader.result);};
    reader.readAsText(file); // Read the file as text
  }
}

function load() {
  if (fileData.value !== "") {
    localStorage.setItem("refs", fileData.value);
  }
  emit('close', true);
}
</script>
