# Champagne Tennis Tournament

# About:

Champagne tennis tournament is a local Slovenian tournament setup that aims to increase the difference in players' strengths and create a more balanced tournament setup.

This web-app aims at automating player pairings to allow the players and documenting games that were played in the past so the players and organisers can focus on what is important: having fun playing.

## How it works:

1.  After confirming the players the pairs for the first round are drawn randomly. Each game is played until 6 (5:5 will force a tiebreak).
2.  After every match pairs collect points: losers collect as many points as sets that they won; winners collect 6 + the difference. The total will always be 12. (Ex: for a game that ended in 5:6 the winners collect 7 and the losers 5, 6:3 winners collect 9 and losers 3, 6:0 gives the winners 12 and the losers nothing)
3.  After each round pairs are drawn again, consisting of a winner and a loser from the previous round. Pairs may not be repeated.
4.  After enough rounds have been played, the 8 players with the highest scores are taken to play semifinals with fixed pairs: 1&8 vs 3&6 and 2&7 vs 4&5.

## UI functionality

- To create a new game, press the + icon.
- To import a previously created game from its json file, press the -> icon.
- To log the game in the permanent log, please ask the admin to upload the json file to the games directory.

# Development related stuff

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
