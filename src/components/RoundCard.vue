<template>
  <div class="flex bg-tennis-secondary mt-2 pb-4 px-4 rounded-md shadow-md">
    <div class="flex-col w-full text-white text-center">
      <h1 class="text-xl my-3">Round <slot /></h1>
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
                  {{ match.player1 }} <br />
                  {{ match.player1 }}
                </td>
                <td class="p-2">
                  <input
                    type="text"
                    v-model="match.scorePlayer1"
                    @input="updateScore(index, 'player1', match.scorePlayer1)"
                    class="w-3/4 rounded-md text-black text-center"
                    style="line-height: 200%"
                  />
                </td>
                <td class="p-2">
                  <input
                    type="text"
                    v-model="match.scorePlayer2"
                    @input="updateScore(index, 'player2', match.scorePlayer2)"
                    class="w-3/4 rounded-md text-black text-center"
                    style="line-height: 200%"
                  />
                </td>
                <td class="p-2">
                  {{ match.player2 }} <br />
                  {{ match.player2 }}
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
                v-for="(player, index) in playerPoints"
                :key="index"
                :class="{ 'bg-tennis-primary': index % 2 === 0 }"
              >
                <td class="">
                  {{ player.name }}
                </td>
                <td class="">
                  {{ player.points }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerPoints: [
        { name: "Player1", points: 0 },
        { name: "Player2", points: 0 },
        { name: "Player3", points: 0 },
      ],
      matches: [
        { player1: "Player1", player2: "Player2", score: "" },
        { player1: "Player2", player2: "Player3", score: "" },
        { player1: "Player1", player2: "Player2", score: "" },
        { player1: "Player2", player2: "Player3", score: "" },
      ],
    };
  },
  methods: {
    updateScore(index, score) {
      // Update the score in your data structure
      this.matches[index].score = score;

      // You may want to update player points based on the entered score
      // Update this.playerPoints based on your scoring logic
    },
  },
};
</script>
