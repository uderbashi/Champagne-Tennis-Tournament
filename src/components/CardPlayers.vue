<template>
  <div class="flex bg-tennis-secondary mt-2 pb-4 px-4 rounded-md shadow-md">
    <div class="flex-col w-full text-white text-center">
      <h1 class="text-xl font-semibold my-3">Player List</h1>
      <div
        v-for="(player, index) in players"
        :key="index"
        class="flex w-full items-center mb-2 justify-center"
      >
        <input
          v-model="players[index]"
          type="text"
          :placeholder="'Player ' + (index + 1)"
          :disabled="!isEditing"
          class="w-3/4 rounded-md text-black text-center"
        />
        <ion-icon
          v-if="isEditing"
          name="trash"
          title="Remove player"
          style="font-size: 22px"
          class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer ml-2"
          @click="removePlayer(index)"
        ></ion-icon>
      </div>

      <div v-if="isEditing">
        <ion-icon
          name="add"
          title="Add player"
          style="font-size: 22px; --ionicon-stroke-width: 82px"
          class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer ml-2"
          @click="addPlayer"
        ></ion-icon>
        <ion-icon
          name="checkmark"
          title="Confirm players"
          style="font-size: 22px; --ionicon-stroke-width: 82px"
          class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer ml-2"
          @click="confirmPlayers"
        ></ion-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const players = ref([]);
const isEditing = ref(true);

const addPlayer = () => {
  players.value.push(`Player ${players.value.length + 1}`);
};

const removePlayer = (index) => {
  players.value.splice(index, 1);
};

const confirmPlayers = () => {
  isEditing.value = false;
};
</script>
