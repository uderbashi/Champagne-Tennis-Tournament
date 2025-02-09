<template>
  <main class="container text-white">
    <div v-for="(game, index) in games" :key="game.lastSave">
      <CardGameEntry
        :title="game.title"
        :lastSave="game.lastSave"
        :index="index"
        @emit-game-selected="loadGame"
      ></CardGameEntry>
    </div>
  </main>
</template>

<script setup>
import CardGameEntry from '@/components/CardGameEntry.vue';

import { ref } from "vue";
import { useRouter } from "vue-router";

const games = ref([]);
const router = useRouter();

async function loadEntries() {
  try {
    // fetch the list
    const response = await fetch("/games/_GameList.json");
    const gameList = await response.json();
    gameList.forEach(async entry => {
      const filename = "/games/" + entry.filename;
      try {
        // fetch the games
        const gameResponse = await fetch(filename);
        const game = await gameResponse.json();

        // push the game to UI
        let entry = {
          "title": game.title,
          "lastSave": game.lastSave,
          "json": JSON.stringify(game)
        }
        games.value.push(entry);
      } catch (error) {
        console.error(`Error reading or parsing file ${filename}:`, error);
      }
    });
  } catch (error) {
    console.error('Error opening game list:', error);
  }
}
loadEntries();

function loadGame(index) {
  localStorage.setItem("refs", games.value[index].json);
  router.push("/game");
}
</script>