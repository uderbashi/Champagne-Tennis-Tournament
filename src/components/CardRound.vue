<template>
  <div class="flex bg-tennis-secondary my-2 pb-4 px-4 rounded-md shadow-md">
    <div class="flex-col w-full text-white text-center">
      <h1 class="text-xl font-semibold my-3">Round <slot /></h1>
      <div class="flex w-full">
        <!-- Table of Matches with Input Scores -->
        <div class="w-3/5 border-2 border-gray-200 rounded-md shadow-md">
          <table class="w-full divide-y divide-white">
            <thead>
              <tr>
                <th class="w-1/3 px-6 py-2">Team 1</th>
                <th class="w-1/6 px-6 py-2"></th>
                <th class="w-1/6 px-6 py-2"></th>
                <th class="w-1/3 px-6 py-2">Team 2</th>
              </tr>
            </thead>
            <tbody class="text-sm text-center">
              <tr
                v-for="(match, index) in matches"
                :key="index"
                :class="{ 'bg-tennis-primary': index % 2 === 0 }"
              >
                <td class="p-2">
                  {{ match.team1player1.nameOfPlayer }} <br />
                  {{ match.team1player2.nameOfPlayer }}
                </td>
                <td class="p-2">
                  <!-- v-model creates a link from the input to the item -->
                  <input
                    type="text"
                    v-model="match.team1score"
                    :disabled="!isActive"
                    @input="validateScore(index, true)"
                    class="w-3/4 rounded-md text-black text-center"
                    style="line-height: 200%"
                  />
                </td>
                <td class="p-2">
                  <input
                    type="text"
                    v-model="match.team2score"
                    :disabled="!isActive"
                    @input="validateScore(index, false)"
                    class="w-3/4 rounded-md text-black text-center"
                    style="line-height: 200%"
                  />
                </td>
                <td class="p-2">
                  {{ match.team2player1.nameOfPlayer }} <br />
                  {{ match.team2player2.nameOfPlayer }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- List of Players and Points -->
        <div class="w-2/5 border-2 border-gray-200 rounded-md shadow-md ml-1">
          <table class="w-full divide-y divide-white">
            <thead>
              <tr>
                <th class="w-2/3 px-6 py-2">Player</th>
                <th class="w-1/3 px-6 py-2">Score</th>
              </tr>
            </thead>
            <tbody class="text-sm text-center">
              <tr
                v-for="(score, index) in oldScore"
                :key="index"
                :class="{ 'bg-tennis-primary': index % 2 === 0 }"
              >
                <td class="">
                  {{ score.player.nameOfPlayer }}
                </td>
                <td class="">
                  {{ score.points }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="waiting.length > 0" class="w-full text-left border-2 border-gray-200 rounded-md shadow-md mt-1">
        <p class="ml-3 mt-1 text-sm">Players waiting (not playing this round) are:<strong class="ml-1 text-base">{{ waiting.map(item => item.nameOfPlayer).join(",  ") }}</strong>.</p>
        <p class="ml-3 mb-1 text-sm">Each of these players will get 5 points.</p>
      </div>
      <div v-if="isActive" class="mt-3">
        <span :title="confirmMessage">
          <ion-icon
            name="add"
            title="Add Round"
            style="font-size: 22px; --ionicon-stroke-width: 82px; visibility: inherit;"
            class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer ml-2"
            :class="{'click-blocked': allValid() !== 1}"
            @click="triggerRound"
          ></ion-icon>
        </span>
        <span :title="confirmMessage">
          <ion-icon
            name="trophy"
            title="Start finals"
            style="font-size: 22px; --ionicon-stroke-width: 82px; visibility: inherit;"
            class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer ml-2"
            :class="{'click-blocked': allValid() !== 1}"
            @click="triggerBracket"
          ></ion-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Match } from "../common/matches.js";

const props = defineProps({
  matches: { type: Array, default: ()=>[] },
  waiting: {type: Array, default: ()=>[]},
  oldScore: { type: Array, default: ()=>[] },
  isActive: { type: Boolean }
});

const emit = defineEmits(["emitTriggerRound", "emitTriggerBracket"]);
const confirmMessage = ref("");

// validates that the scores in the game are ints between [0-6]
function validateScore(matchID, isTeam1) {
  let tag = isTeam1 ? "team1score" : "team2score";
  // convert to number because the input is text
  let score = Number(props.matches[matchID][tag]);

  // convert to 0 if the input is not a number
  if(Number.isNaN(score)) {
    score = 0;
  }

  // if the input is a decimal point, floor it
  if(!Number.isInteger(score)) {
    score = Math.floor(score);
  }

  // check bounds
  if(score < 0) {
    score = 0;
  } else if(score > 6) {
    score = 6;
  }

  // update the match so it would hold a numeric value rather than a string
  props.matches[matchID][tag] = score;
}

function allValid () {
  let ret = 1; // return value
  let msg = ""; // message

  for (let match of  props.matches) {
    let s1 = match.team1score;
    let s2 = match.team2score;

    if (s2 > s1) { // make s1 always greater than s2
      [s1, s2] = [s2, s1];
    }

    if (s1 !== 6) {
      ret *= 2;
    }

    if (s2 === 6) {
      ret *= 3;
    }
  }

  if (ret % 2 === 0 ) {
    msg += "One match (or more matches) are not over\n";
  }
  if (ret % 3 === 0 ) {
    msg += "One match (or more matches) are tied at 6\n";
  }

  confirmMessage.value = msg;
  return ret;
}

function triggerRound () {
  emit("emitTriggerRound");
}

function triggerBracket () {
  emit("emitTriggerBracket");
}
</script>
