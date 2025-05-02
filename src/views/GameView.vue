<template>
  <main class="container text-white">
    <div class="flex flex-col gap-2">
      <CardTitle
        :title="title"
        :timestamp="lastSave"
      ></CardTitle>
      <div v-if="step >= ENUM_STEPS.STEP_PLAYER">
        <CardPlayers 
          :players="players"
          :isActive="step===ENUM_STEPS.STEP_PLAYER"
          @emitPlayers="receivePlayers"
        />
      </div>  
      <div v-if="step >= ENUM_STEPS.STEP_ROUNDS">
        <div v-for="(roundMatches, index) in allMatches" :key="index">
          <CardRound
            :matches="roundMatches"
            :waiting="roundWaitng[index]"
            :oldScore="calculatePoints(index)"
            :isActive="matchActive[index]"
            @emitTriggerRound="triggerRound"
            @emitTriggerBracket="triggerBracket"
          >{{index + 1}}</CardRound>
        </div>
      </div>
      <div v-if="step >= ENUM_STEPS.STEP_BRACKET">
        <CardBracket 
          :matches="bracketMatches" 
          :isActive="step === ENUM_STEPS.STEP_BRACKET"
          @emitEnd="endTournament"
        />
      </div>
      <div v-if="step >= ENUM_STEPS.STEP_FINISH">
        <CardResults 
          :winners="winners" 
        />
      </div>
    </div>
    <SaveFAB @emitClick="saveRefsToFile"/>
  </main>
</template>

<script setup>
// ===== Imports =====
// Common
import { shuffleArray, calculateTourPoints, Player, getMatches, getNextRoundMatches, getInitBracketMatches, getWinners } from "../common/matches.js";

// Componenets
import CardTitle from "@/components/CardTitle.vue";
import CardPlayers from "@/components/CardPlayers.vue";
import CardRound from "@/components/CardRound.vue";
import CardBracket from "@/components/CardBracket.vue";
import CardResults from "@/components/CardResults.vue";
import SaveFAB from "@/components/SaveFAB.vue";

// Vue
import { ref, onBeforeMount, onUpdated } from "vue";

// ===== Data ===== 
// References
const ENUM_STEPS = {STEP_PLAYER: 0, STEP_ROUNDS: 1, STEP_BRACKET: 2, STEP_FINISH: 3}
const title = ref("Champagne tournament");
const lastSave = ref("None");
const step = ref(ENUM_STEPS.STEP_PLAYER)
const players = ref([]);
const roundPoints = ref([]); // array of  int arrays, where every internal array contains the points for each player earned in that round
const roundWaitng = ref([]); // array of player name arrays, each array represents a round and inside are the players who are waiting (not playing) that round
const allMatches = ref([]); // array of match arrays
const matchActive = ref([]); // array of booleans holding whether the match is active or not
const bracketMatches = ref([]); // an array of matches for the bracket stage
const winners = ref([]);

function saveRefs() {
  const data = {
    title: title.value,
    lastSave: new Date().toISOString(),
    step: step.value,
    players: players.value,
    roundPoints: roundPoints.value,
    allMatches: allMatches.value,
    matchActive: matchActive.value,
    bracketMatches: bracketMatches.value,
    winners: winners.value
  };

  // save to local storage (browser's data)
  localStorage.setItem("refs", JSON.stringify(data));

  lastSave.value = data.lastSave;
  return data;
}
onUpdated(saveRefs);

function saveRefsToFile() {
  let data = saveRefs();
  
  // create a blob
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  
  // create a temporary download link
  let link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = data.lastSave + '.json';
  link.click();
}

function safeLoad(vueRef, value) {
  if (value !== undefined) {
    vueRef.value = value;
  }
}

function loadRefs() {
  let dataStr = localStorage.getItem("refs");
  if (!dataStr) {
    return;
  }
  let data = JSON.parse(dataStr);
  safeLoad(title, data.title);
  safeLoad(lastSave, data.lastSave);
  safeLoad(step, data.step);
  safeLoad(players, data.players);
  safeLoad(roundPoints, data.roundPoints);
  safeLoad(roundWaitng, data.roundWaitng);
  safeLoad(allMatches, data.allMatches);
  safeLoad(matchActive, data.matchActive);
  safeLoad(bracketMatches, data.bracketMatches);
  safeLoad(winners, data.winners);
}
onBeforeMount(loadRefs);

// Constrol state
function advanceStep() {
  if (step.value === ENUM_STEPS.STEP_FINISH) {
    return;
  }
  step.value = step.value + 1;
}

// Players Data
function receivePlayers() {
  roundPoints.value = new Array();
  roundPoints.value[0] =  new Array(players.value.length).fill(0);

  // copy, then shuffle the players, so we would create random first games
  let firstRoundPlayers = players.value.slice(0);
  console.log(players.value);
  shuffleArray(firstRoundPlayers)

  // The split is created so that always the losers bracket will have 
  // a multiple of two. This ensures that valid games are always 
  // picked. The rest of the players (max.3) will be waiting for the round
  // but that logic is handled by the function getMatches.
  // The formula is (n - (n % 4)) / 2.
  
  const split = (firstRoundPlayers.length - (firstRoundPlayers.length % 4)) / 2;

  const smallerGroup = firstRoundPlayers.slice(0, split);
  const largerGroup = firstRoundPlayers.slice(split);

  const res = getMatches(largerGroup, smallerGroup); // the larger group has to go as winners
  allMatches.value.push(res.matches);
  roundWaitng.value.push(res.waiting);
  matchActive.value.push(true); // make the added game active.

  advanceStep();
}


// Rounds Data

function calculatePoints(round) {
  return calculateTourPoints(players.value, roundPoints.value, round + 1);
}

function triggerBracket() {
  getNextRoundMatches(allMatches.value.at(-1), players.value, roundPoints.value, roundWaitng.value);
  matchActive.value[matchActive.value.length - 1] = false;
  bracketMatches.value = getInitBracketMatches(players.value, roundPoints.value);
  advanceStep();
}

function triggerRound() {
  let res = getNextRoundMatches(allMatches.value.at(-1), players.value, roundPoints.value,roundWaitng.value);
  // getNextRoundMatches returns an empty array if it could not make pairing
  if (res.matches.length === 0) {
    triggerBracket();
    return;
  }
  
  matchActive.value[matchActive.value.length - 1] = false;
  allMatches.value.push(res.matches);
  roundWaitng.value.push(res.waiting);
  matchActive.value.push(true); // make the added game active.
  roundPoints.value.push(new Array(players.value.length).fill(0)); // add new scores to be filled
}

//Bracket data

function endTournament() {
  winners.value = getWinners(bracketMatches.value);
  advanceStep();
}
</script>
