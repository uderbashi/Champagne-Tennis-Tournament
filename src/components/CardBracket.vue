<template>
  <div class="flex bg-tennis-secondary my-2 pb-2 px-4 rounded-md shadow-md">
    <div class="flex-col w-full text-white text-center">
      <h1 class="text-xl font-semibold">Finals</h1>
      <div class="w-full flex justify-center text-sm">
        <!-- round 1 -->
        <div class="w-1/3 m-2 felx-col" v-if="matches.length === 2">
          <div class="w-full felx-col border-2 rounded-md my-2">
            <div class="w-full flex">
              <div class="w-3/4">
                {{ matches[0].team1player1.nameOfPlayer }} <br />
                {{ matches[0].team1player2.nameOfPlayer }}
              </div>
              <input
                type="text"
                v-model="matches[0].team1score"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
                style="line-height: 200%"
                :disabled="matches.length !== 2"
                @input="validateScore(0, true)"
              />
            </div>
            <div class="w-full flex">
              <div class="w-3/4">
                {{ matches[0].team2player1.nameOfPlayer }} <br />
                {{ matches[0].team2player2.nameOfPlayer }}
              </div>
              <input
                type="text"
                v-model="matches[0].team2score"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
                style="line-height: 200%"
                :disabled="matches.length !== 2"
                @input="validateScore(0, false)"
              />
            </div>
          </div>
          <div class="w-full felx-col border-2 rounded-md my-2">
            <div class="w-full flex">
              <div class="w-3/4">
                {{ matches[1].team1player1.nameOfPlayer }} <br />
                {{ matches[1].team1player2.nameOfPlayer }}
              </div>
              <input
                type="text"
                v-model="matches[1].team1score"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
                style="line-height: 200%"
                :disabled="matches.length !== 2"
                @input="validateScore(1, true)"
              />
            </div>
            <div class="w-full flex">
              <div class="w-3/4">
                {{ matches[1].team2player1.nameOfPlayer }} <br />
                {{ matches[1].team2player2.nameOfPlayer }}
              </div>
              <input
                type="text"
                v-model="matches[1].team2score"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
                style="line-height: 200%"
                :disabled="matches.length !== 2"
                @input="validateScore(1, false)"
              />
            </div>
          </div>
        </div>
        <!-- round 2 -->
        <div class="w-1/3 mt-12 m-2 felx-col"  v-if="matches.length === 4">
          <div class="w-full felx-col border-2 rounded-md my-2">
            <div class="w-full flex">
              <div class="w-3/4">
                {{ matches[2].team1player1.nameOfPlayer }} <br />
                {{ matches[2].team1player2.nameOfPlayer }}
              </div>
              <input
                type="text"
                v-model="matches[2].team1score"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
                style="line-height: 200%"
                :disabled="matches.length !== 4"
                @input="validateScore(2, true)"
              />
            </div>
            <div class="w-full flex">
              <div class="w-3/4">
                {{ matches[2].team2player1.nameOfPlayer }} <br />
                {{ matches[2].team2player2.nameOfPlayer }}
              </div>
              <input
                type="text"
                v-model="matches[2].team2score"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
                style="line-height: 200%"
                :disabled="matches.length !== 4"
                @input="validateScore(2, false)"
              />
            </div>
          </div>
          <div class="w-full felx-col border-2 rounded-md mt-6 mb-2">
            <div class="w-full flex">
              <div class="w-3/4">
                {{ matches[3].team1player1.nameOfPlayer }} <br />
                {{ matches[3].team1player2.nameOfPlayer }}
              </div>
              <input
                type="text"
                v-model="matches[3].team1score"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
                style="line-height: 200%"
                :disabled="matches.length !== 4"
                @input="validateScore(3, true)"
              />
            </div>
            <div class="w-full flex">
              <div class="w-3/4">
                {{ matches[3].team2player1.nameOfPlayer }} <br />
                {{ matches[3].team2player2.nameOfPlayer }}
              </div>
              <input
                type="text"
                v-model="matches[3].team2score"
                class="w-1/4 mx-2 my-1 rounded-md text-black text-center"
                style="line-height: 200%"
                :disabled="matches.length !== 4"
                @input="validateScore(3, false)"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="isActive" class="mt-3">
        <span :title="confirmMessage" v-if="matches.length === 2">
          <ion-icon
            name="Play"
            title="To finals"
            style="font-size: 22px; --ionicon-stroke-width: 82px; visibility: inherit;"
            class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer ml-2"
            :class="{'click-blocked': allValid() !== 1}"
            @click="triggerFinals"
          ></ion-icon>
        </span>
        <span :title="confirmMessage" v-if="matches.length === 4 && isActive">
          <ion-icon
            name="trophy"
            title="Start finals"
            style="font-size: 22px; --ionicon-stroke-width: 82px; visibility: inherit;"
            class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer ml-2"
            :class="{'click-blocked': allValid() !== 1}"
            @click="endTournament"
          ></ion-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Match } from "../common/matches.js";

const props = defineProps({
  matches: { type: Array, default: ()=>[] },
  isActive: { type: Boolean }
});

const emit = defineEmits(["emitEnd"]);

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
  } else if(score > 9) {
    score = 9;
  }

  // update the match so it would hold a numeric value rather than a string
  props.matches[matchID][tag] = score;
}

function allValid() {
  let ret = 1; // return value
  let msg = ""; // message

  for (let match of  props.matches) {
    let s1 = match.team1score;
    let s2 = match.team2score;

    if (s2 > s1) { // make s1 always greater than s2
      [s1, s2] = [s2, s1];
    }

    if (s1 !== 9) {
      ret *= 2;
    }

    if (s2 === 9) {
      ret *= 3;
    }
  }

  if (ret % 2 === 0 ) {
    msg += "One match (or more matches) are not over\n";
  }
  if (ret % 3 === 0 ) {
    msg += "One match (or more matches) are tied at 9\n";
  }

  confirmMessage.value = msg;
  return ret;
}

function triggerFinals() {
  // alias for matches for faster code
  let m1 = props.matches[0];
  let m2 = props.matches[1];

  // get the results (true if team1 won)
  let res1 = m1.team1score > m1.team2score;
  let res2 = m2.team1score > m2.team2score;

  // retrieve winners and losers of each game
  let winner11 = res1 ? m1.team1player1 : m1.team2player1;
  let winner12 = res1 ? m1.team1player2 : m1.team2player2;
  let winner21 = res2 ? m2.team1player1 : m2.team2player1;
  let winner22 = res2 ? m2.team1player2 : m2.team2player2;

  let loser11 = !res1 ? m1.team1player1 : m1.team2player1;
  let loser12 = !res1 ? m1.team1player2 : m1.team2player2;
  let loser21 = !res2 ? m2.team1player1 : m2.team2player1;
  let loser22 = !res2 ? m2.team1player2 : m2.team2player2;

  // add the matches
  props.matches.push(
    new Match(winner11, winner12, winner21, winner22),
    new Match(loser11, loser12, loser21, loser22),
  );
}

function endTournament() {
  emit("emitEnd");
}
</script>
