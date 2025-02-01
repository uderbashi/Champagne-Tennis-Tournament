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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  matches: { type: Array, default: ()=>[] },
  isActive: { type: Boolean }
});

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

</script>
