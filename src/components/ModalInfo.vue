<template>
  <div>
    <h1 class="text-xl">About:</h1>
    <p>
      Champagne tennis tournament is a Slovenian tournament setup that aims to
      challenge the difference in players' strengths and create a more balanced
      tournament setup.
    </p>
    <p class="mb-4">
      This web-app aims to automate player pairings and matches, and to document
      games that were played in the past so the players and organisers can focus
      on what is important: having fun playing.
    </p>
    <h2 class="text-xl">How it works:</h2>
    <ol class="list-decimal list-outside pl-5 mb-4">
      <li>
        After confirming the players the pairs for the first round are drawn
        randomly with their opposnents. Each game is played until 6 (5:5 will
        force a tiebreak).
      </li>
      <li>
        After every match, pairs collect points: losers collect as many points
        as sets that they won; winners collect 6 + the difference. The total
        will always be 12. (Ex: for a game that ended in 5:6 the winners collect
        7 and the losers 5, 6:3 winners collect 9 and losers 3, 6:0 gives the
        winners 12 and the losers nothing)
      </li>
      <li>
        After each round pairs are drawn again, consisting of a winner and a
        loser from the previous round. Pairs may not be repeated. Matches are
        selected randomly. If the number of players is not divisible by 4 
        to form matches, the players not playing during a round will get 5
        points each.
      </li>
      <li>
        After enough rounds have been played, the 8 players with the highest
        scores are taken to play semifinals with fixed pairs: 1&5 vs 3&7 and 2&6
        vs 4&8.
      </li>
    </ol>

    <h2 class="text-xl">UI functionality</h2>
    <ul class="list-disc list-outside pl-5 mb-4">
      <li>
        To create a new game, press the
        <ion-icon
          name="add"
          style="font-size: 12px; --ionicon-stroke-width: 82px"
        ></ion-icon>
        icon.
      </li>
      <li>
        To import a previously created game from its json file, press the
        <ion-icon name="arrow-redo" style="font-size: 12px"></ion-icon>
        icon.
      </li>
      <li>
        To log the game in the permanent log, please ask the admin to upload the
        json file to the games directory.
      </li>
    </ul>
    <h1 class="text-xl">Source code:</h1>
    <p>
      This is an open source pet project, and the source code can be found
      <a href="https://github.com/uderbashi/Champagne-Tennis-Tournament">
        (here)
      </a>
    </p>
    <p>
      Created with
      <ion-icon name="logo-vue" style="color: #42b883"></ion-icon> by Usama
      Derbashi in 2025.
    </p>
    <button
      @click="$emit('close', false)"
      class="mt-8 py-2 px-6 text-white bg-tennis-primary hover:bg-tennis-secondary"
    >
      Close
    </button>
  </div>
</template>
