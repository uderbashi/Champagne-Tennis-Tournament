<template>
  <div class="flex bg-tennis-secondary my-2 pb-4 px-4 rounded-md shadow-md">
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
          :class="{'bg-red-400': checkValidity(index) !== 1}"
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
          style="font-size: 22px; --ionicon-stroke-width: 82px; visibility: inherit;"
          class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer ml-2"
          @click="addPlayer"
        ></ion-icon>
        <span :title="confirmMessage">
          <ion-icon
            name="checkmark"
            title="Confirm players"
            style="font-size: 22px; --ionicon-stroke-width: 82px; visibility: inherit;"
            class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer ml-2"
            :class="{'click-blocked': allValid() !== 1}"
            @click="confirmPlayers"
          ></ion-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, } from "vue";

const emit = defineEmits(["emitPlayers",]);

const isEditing = ref(true);
const players = ref([]);
const confirmMessage = ref("");

// checks validity of player's name (empty or duplicate)
// returns 1 if the name is valid, a muliplier of 2 if the name is empty, and of 3 if it is a duplicate
function checkValidity(index) {
  let ret = 1;
  const name = players.value[index];

  if(name === "") { // empty name
    ret *= 2;
  }
  if( players.value.filter((player) => player === name).length > 1) { // duplicate name
    ret *= 3;
  }
  return ret;
};

// checks validity of all players
// returns 1 if the name is valid, a muliplier of 2 if the name is empty, of 3 if it is a duplicate, 
// and of 5 if the number is not divisible by 4 (cant have two pais playing each other)
function allValid() {
  let ret = 1;
  let msg = "";
  for (let i = 0; i < players.value.length; i++) {
    ret *= checkValidity(i);
  }
  if (players.value.length % 4 !== 0) {
    ret *= 5;
  }
  if (players.value.length === 0) {
    ret *= 7;
  }

  if (ret % 2 === 0 ) {
    msg += "Empty player names are not allowed. (check red players)\n";
  }
  if (ret % 3 === 0 ) {
    msg += "Duplicate player names are not allowed. (check red players)\n";
  }
  if (ret % 5 === 0 ) {
    msg += "The number of players doesn't divide by 4 (matches of pairs cannot be created)\n";
  }
  if (ret % 7 === 0 ) {
    msg += "There are no players\n";
  }
  confirmMessage.value = msg;
  return ret;
}

function addPlayer() {
  players.value.push("");
};

function removePlayer(index) {
  players.value.splice(index, 1);
};

function confirmPlayers() {
  isEditing.value = false;
  emit("emitPlayers", players.value);
};
</script>

<style>
.click-blocked {
  pointer-events:none;
}
</style>
