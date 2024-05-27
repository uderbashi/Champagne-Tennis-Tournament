<template>
  <main class="container text-white">
    <div class="flex flex-col gap-2">
      <div v-if="step >= ENUM_STEPS.STEP_PLAYER">
        <CardPlayers @emitPlayers="receivePlayers"/>
      </div>  
      <div v-if="step >= ENUM_STEPS.STEP_ROUNDS">
        <div v-for="(roundMatches, index) in matchesArr" :key="index">
          <CardRound :matches="roundMatches">{{index + 1}}</CardRound>
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
// Componenets
import CardBracket from "@/components/CardBracket.vue";
import CardPlayers from "@/components/CardPlayers.vue";
import CardRound from "@/components/CardRound.vue";
import SaveFAB from "@/components/SaveFAB.vue";

// Vue
import { ref } from "vue";

// ===== Data ===== 
// Constrol state
const ENUM_STEPS = {STEP_PLAYER: 0, STEP_ROUNDS: 1, STEP_BRACKET: 2, STEP_FINISH: 3}
const step = ref(ENUM_STEPS.STEP_PLAYER)
function advanceStep() {
  if (step.value === ENUM_STEPS.STEP_FINISH) {
    return;
  }
  step.value = step.value + 1;
}

// Players Data
const players = ref([])
function receivePlayers(receivedPlayers) {
  players.value.push(...receivedPlayers); // ... is unpacking the array into elements
  advanceStep();
}


// Rounds Data
const matchesArr = ref([[
  {
    player1: "Player1",
    player2: "Player2",
    scorePlayer1: "",
    scorePlayer2: "",
  },
  {
    player1: "Player2",
    player2: "Player3",
    scorePlayer1: "",
    scorePlayer2: "",
  },
  {
    player1: "Player1",
    player2: "Player2",
    scorePlayer1: "",
    scorePlayer2: "",
  },
  {
    player1: "Player2",
    player2: "Player3",
    scorePlayer1: "",
    scorePlayer2: "",
  },
],
[
  {
    player1: "Player1",
    player2: "Player2",
    scorePlayer1: "",
    scorePlayer2: "",
  },
  {
    player1: "Player2",
    player2: "Player3",
    scorePlayer1: "",
    scorePlayer2: "",
  },
  {
    player1: "Player1",
    player2: "Player2",
    scorePlayer1: "",
    scorePlayer2: "",
  },
  {
    player1: "Player2",
    player2: "Player3",
    scorePlayer1: "",
    scorePlayer2: "",
  },
]]);

//Bracket data

</script>
