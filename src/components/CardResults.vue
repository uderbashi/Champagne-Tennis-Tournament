<template>
  <div class="flex bg-tennis-secondary my-2 pb-4 px-4 rounded-md shadow-md">
    <div class="flex-col w-full text-white text-center">
      <h1 class="text-xl font-semibold my-3">Congratulations!</h1>
      <div v-for="(colour, index) in colours" :key="index">
        <div class="flex flex-row items-center justify-center w-full">
          <div :class="colour">
            <ion-icon
              name="trophy"
              style="font-size: 22px; --ionicon-stroke-width: 82px; visibility: inherit;"
              class="mx-2"
            ></ion-icon>
          </div>
          <div class=" font-semibold text-base">
            {{ winners[2 * index].nameOfPlayer }} &
            {{ winners[2 * index + 1].nameOfPlayer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const colours = ["text-yellow-400", "text-gray-300", "text-orange-800"];
const props = defineProps({
  winners: { type: Array, default: ()=>[] }
});
</script>
