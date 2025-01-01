<template>
  <main class="container text-white">
    <div class="flex flex-col gap-2">
      <div v-if="step >= ENUM_STEPS.STEP_PLAYER">
        <CardPlayers @emitPlayers="receivePlayers"/>
      </div>  
      <div v-if="step >= ENUM_STEPS.STEP_ROUNDS">
        <div v-for="(roundMatches, index) in allMatches" :key="index">
          <CardRound
            :matches="roundMatches"
            :oldScore="calculatePoints(index)"
            :isActive="matchActive[index]"
            @emitTriggerRound="triggerRound"
            @emitTriggerBracket="triggerBracket"
          >{{index + 1}}</CardRound>
        </div>
      </div>
      <div v-if="step >= ENUM_STEPS.STEP_BRACKET">
        <CardBracket />
      </div>
    </div>
    <SaveFAB />
  </main>
</template>

<script setup>
// ===== Imports =====
// Common
import { calculateTourPoints, Player, Match, getMatches, getNextRoundMatches } from "../common/matches.js";

// Componenets
import CardBracket from "@/components/CardBracket.vue";
import CardPlayers from "@/components/CardPlayers.vue";
import CardRound from "@/components/CardRound.vue";
import SaveFAB from "@/components/SaveFAB.vue";

// Vue
import { ref } from "vue";

// ===== Data ===== 
// References
const ENUM_STEPS = {STEP_PLAYER: 0, STEP_ROUNDS: 1, STEP_BRACKET: 2, STEP_FINISH: 3}
const step = ref(ENUM_STEPS.STEP_PLAYER)
const players = ref([]);
const roundPoints = ref([]); // array of  int arrays, where every internal array contains the points for each player earned in that round
const allMatches = ref([]); // array of match arrays
const matchActive = ref([]); // array of booleans holding whether the match is active or not

// Constrol state
function advanceStep() {
  if (step.value === ENUM_STEPS.STEP_FINISH) {
    return;
  }
  step.value = step.value + 1;
}

// Players Data
function receivePlayers(receivedPlayers) {
  for(let player of receivedPlayers) {
    players.value.push(new Player(player, []));
  }
  roundPoints.value = new Array();
  roundPoints.value[0] =  new Array(players.value.length).fill(0);

  // copy, then shuffle the players, so we would create random first games
  let firstRoundPlayers = players.value.slice(0);
  // shuffle
  for(let i = firstRoundPlayers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [firstRoundPlayers[i], firstRoundPlayers[j]] = [firstRoundPlayers[j], firstRoundPlayers[i]];
  }

  // split
  const split = Math.ceil(firstRoundPlayers.length / 2);

  const half1 = firstRoundPlayers.slice(0, split);
  const half2 = firstRoundPlayers.slice(split);

  const res = getMatches(half1, half2);
  allMatches.value.push(res);
  matchActive.value.push(true); // make the added game active.

  advanceStep();
}


// Rounds Data

function calculatePoints(round) {
  return calculateTourPoints(players.value, roundPoints.value, round + 1);
}

function triggerBracket() {
  matchActive.value[matchActive.value.length - 1] = false;
}

function triggerRound() {
  matchActive.value[matchActive.value.length - 1] = false;
  let matches = getNextRoundMatches(allMatches.value.at(-1), players.value, roundPoints.value);
  allMatches.value.push(matches);
  matchActive.value.push(true); // make the added game active.
  roundPoints.value.push(new Array(players.value.length).fill(0)); // add new scores to be filled
}

//Bracket data

</script>
