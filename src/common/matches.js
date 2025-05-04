export function shuffleArray(array) {
  for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function calculateTourPoints(players, roundPoints, untilRound) {
    // calculate the points of each player
    const cumulative = new Array(players.length).fill(0);
    roundPoints.slice(0, untilRound).forEach(round => {
        round.forEach((point, index) => {
            cumulative[index] += point;
        });
    });

    // create an array of objects holding th eplayers and their cumulative score
    const playerPoints = players.map((player, index) => {
        return {
            player: player,
            points: cumulative[index]
        };
    });

    // sort it and return it
    playerPoints.sort((a, b) => b.points - a.points);
    return playerPoints;
}

// Required for the next algorithm.
export class Player {
    constructor(nameOfPlayer, previouslyPlayed) {
        this.nameOfPlayer = nameOfPlayer;
        this.previouslyPlayed = previouslyPlayed;
    }
}

/*
Direct implementation of the Hopcroft–Karp algorithm, psuedocode found in:
https://en.wikipedia.org/wiki/Hopcroft%E2%80%93Karp_algorithm#Pseudocode
with a slight modification that it takes two groups of players (alongside their previous opponents).
I understand how the algorithm works on paper, but the code implemntation, I am not sure about.
*/
function hopcroftKarp(group1, group2) {
    const NIL = "NIL";
    let pairU = new Map();
    let pairV = new Map();
    let dist = new Map();

    function bfs() {
        let queue = [];
        for(let u of group1) {
            if(pairU.get(u) === NIL) {
                dist.set(u, 0);
                queue.push(u);
            } else {
                dist.set(u, Infinity);
            }
        }
        dist.set(NIL, Infinity);

        while(queue.length > 0) {
            let u = queue.shift();
            if(dist.get(u) < dist.get(NIL)) {
                for(let v of group2) {
                    if(u.previouslyPlayed.includes(v.nameOfPlayer)) {
                        continue;
                    }
                    if(dist.get(pairV.get(v)) === Infinity) {
                        dist.set(pairV.get(v), dist.get(u) + 1);
                        queue.push(pairV.get(v));
                    }
                }
            }
        }
        return dist.get(NIL) !== Infinity;
    }

    function dfs(u) {
        if(u !== NIL) {
            for(let v of group2) {
                if(u.previouslyPlayed.includes(v.nameOfPlayer)) {
                    continue;
                }
                if(dist.get(pairV.get(v)) === dist.get(u) + 1) {
                    if(dfs(pairV.get(v))) {
                        pairV.set(v, u);
                        pairU.set(u, v);
                        return true;
                    }
                }
            }
            dist.set(u, Infinity);
            return false;
        }
        return true;
    }

    for(let u of group1) {
        pairU.set(u, NIL);
    }
    for(let v of group2) {
        pairV.set(v, NIL);
    }

    let matches = 0;
    let matching = [];
    while(bfs()) {
        for(let u of group1) {
            if(pairU.get(u) === NIL) {
                if(dfs(u)) {
                    matches++;
                }
            }
        }
    }

    for(let u of group1) {
        matching.push({ player1: u, player2: pairU.get(u) });
    }

    return matching;
}


// Required for the next function.
export class Match {
    constructor(team1player1, team1player2, team2player1, team2player2) {
        this.team1player1 = team1player1;
        this.team1player2 = team1player2;
        this.team2player1 = team2player1;
        this.team2player2 = team2player2;
        this.team1score = 0;
        this.team2score = 0;
    }
}

/*
winners and losers are obtained by shallow copying their entries from the main Player array
this function returns a match object for the steps to take in.
*/
export function getMatches(winners, losers) {
    let pairs = hopcroftKarp(winners, losers);

    // if not everyone can be paired
    for (let pair of pairs) {
        if (pair.player1 === "NIL" || pair.player2 === "NIL") {
            return [];
        }
    }
    
    // shuffle the pairs
    for(let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    let matches = [];
    for(let i = 0; i < pairs.length; i += 2)  {
        matches.push(new Match(pairs[i].player1, pairs[i].player2, pairs[i + 1].player1, pairs[i + 1].player2));
    }

    return {matches:matches, waiting:[]};
}

export function getNextRoundMatches(lastRound, playerList, pointsList, waitingPlayers) {
    let winners = []
    let losers = []
    for (let match of lastRound) {
        // add the pairs so they won't be paired again
        match.team1player1.previouslyPlayed.push(match.team1player2.nameOfPlayer);
        match.team1player2.previouslyPlayed.push(match.team1player1.nameOfPlayer);
        match.team2player1.previouslyPlayed.push(match.team2player2.nameOfPlayer);
        match.team2player2.previouslyPlayed.push(match.team2player1.nameOfPlayer);
        
        // decide the winners and the losers and their scores
        let scoreLoser = Math.min(match.team1score, match.team2score);
        let scoreWinner = Math.max(match.team1score, match.team2score) + Math.abs(match.team1score - match.team2score);
        let tempLosers = [];
        let tempWinners = [];
        if (match.team1score > match.team2score) {
            tempWinners.push(match.team1player1, match.team1player2);
            tempLosers.push(match.team2player1, match.team2player2);
        } else {
            tempWinners.push(match.team2player1, match.team2player2);
            tempLosers.push(match.team1player1, match.team1player2);
        }

        // add the points to the winners and losers and add them to the main lists
        for (let winner of tempWinners) {
            let i = playerList.findIndex((player) => player.nameOfPlayer === winner.nameOfPlayer);
            pointsList[pointsList.length - 1][i] = scoreWinner;
            winners.push(winner);
        }
        for (let loser of tempLosers) {
            let i = playerList.findIndex((player) => player.nameOfPlayer === loser.nameOfPlayer);
            pointsList[pointsList.length - 1][i] = scoreLoser;
            losers.push(loser);
        }
    }

    // add 5 points to each player who has waited out and add them to winners pool
    for (let waiting in waitingPlayers) {
        waiting.gamesWaited += 1;
        let i = playerList.findIndex((player) => player.nameOfPlayer === waiting.nameOfPlayer);
        pointsList[pointsList.length - 1][i] = 5;
        winners.push(waiting);
    }
    
    // shuffle and get matches
    shuffleArray(winners);
    shuffleArray(losers);
    return getMatches(winners, losers);
}

// takes a player list and point list and creates the matches accorind to the rules:
// a bracket between 1&8 vs 3&6 and 2&7 vs 4&5.
export function getInitBracketMatches(playerList, pointsList) {
    let sortedPlayers = calculateTourPoints(playerList, pointsList, pointsList.length);
    let matches = [];
    matches.push(new Match(sortedPlayers[0].player, sortedPlayers[4].player, sortedPlayers[2].player, sortedPlayers[6].player));
    matches.push(new Match(sortedPlayers[1].player, sortedPlayers[5].player, sortedPlayers[3].player, sortedPlayers[7].player));
    return matches;
}

export function getWinners(bracketMatches) {
    let winners = [];
    for (let i = 2; i <= 3; i++) {
        let game = bracketMatches[i];
        winners.push(game.team1score > game.team2score ? game.team1player1 : game.team2player1);
        winners.push(game.team1score > game.team2score ? game.team1player2 : game.team2player2);
        winners.push(game.team1score < game.team2score ? game.team1player1 : game.team2player1);
        winners.push(game.team1score < game.team2score ? game.team1player2 : game.team2player2);
    }
    return winners;
}
