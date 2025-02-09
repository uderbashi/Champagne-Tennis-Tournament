<template>
  <div class="flex bg-tennis-secondary 
    my-2 px-4 rounded-md shadow-md 
    hover:bg-tennis-primary duration-300"
    @click="onClicked" 
  >
    <div class="flex flex-row justify-between w-full pb-2">
      <div class="flex-col text-white text-left">
        <h1 class="text-xl font-semibold my-3">{{ title }}</h1>
        <span class="text-sm">Last saved: {{ lastSave }}</span>
      </div>
      <div class="flex items-center">
        <ion-icon
          name="Play"
          style="font-size: 32px; --ionicon-stroke-width: 82px;"
        ></ion-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["emitGameSelected"]);

const props = defineProps({
  title: { type: String },
  lastSave: { type: String },
  index:{type: Number}
});

function onClicked() {
  emit("emitGameSelected", props.index);
}
</script>
