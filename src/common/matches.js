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
        this.waitingScore = 16;
    }
}

/*
    The Hungarian algorithm assigns rows to columns,
    it is one of the most popular algorithms to solve similar problems.
    I am using a library that was written to solve this issue in O(n3).
    The matrix creates dummy players to match for waiting, and these
    will have a value of 0, as the algorithm is pulling everything 
    towards it, menaing they do not have preference to matchh.
    The plyayers will be either assinged infinity when they have played before
    therefore making it impossible to match them, or the waiting score,
    which increases exponentially as the player has not waited outside
    and resets when the player has just waited out of the game,
    making that plyaer the most likely to wait out of the players.
*/
import { minWeightAssign } from 'munkres-algorithm';
function hungarianMatch(group1, group2) {
    let dummyName = "__DUMMY__";

    // make sure that group1 is always larger than group 2
    if (group2.length > group1.length) {
        [group1, group2] = [group2, group1];
    }

    // pad group2 with dummies until we get equal numbers of players
    while (group1.length != group2.length) {
        group2.push(new Player(dummyName, []));
    }

    /* 
        Build cost matricies where:
        1- all dummies have cost of 0 (as they do not create any bias)
        2- all winners will get their waiting scores
        this will give priority to players who have been waiting outside. 
    */
    let matrix = [];
    for (let p1 of group1) {
        let row = [];
        for (let p2 of group2) {
            if (p1.previouslyPlayed.includes(p2.nameOfPlayer)) {
                row.push(Infinity); // rematches not allowed
            } else if (p2.nameOfPlayer === dummyName) {
                row.push(0); // dummy player is always 0
            } else {
                row.push(p1.waitingScore);
            }
        }
        matrix.push(row);
    }
    console.log(matrix);

    // solve matrix with hungarian
    let pairIndexes = minWeightAssign(matrix).assignments;

    let pairs = [];
    let waiting = [];
    for (let [i, j] of pairIndexes.entries()) {
        if (j === null) {
            return { pairs: [], waiting: [] }; // if it reached a point of unsolvability
        }

        let p1 = group1[i];
        let p2 = group2[j];

        if (p2.nameOfPlayer === dummyName) {
            waiting.push(p1);
        } else {
            pairs.push({ player1: p1, player2: p2 });
        }
    }

    return { pairs: pairs, waiting: waiting };
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
    let res = hungarianMatch(winners, losers);
    
    // shuffle the pairs
    let pairs = res.pairs;
    shuffleArray(pairs);

    let matches = [];
    for(let i = 0; i < pairs.length; i += 2)  {
        matches.push(new Match(pairs[i].player1, pairs[i].player2, pairs[i + 1].player1, pairs[i + 1].player2));
    }

    return { matches: matches, waiting: res.waiting };
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
            winner.waitingScore = winner.waitingScore * 2;
            let i = playerList.findIndex((player) => player.nameOfPlayer === winner.nameOfPlayer);
            pointsList[pointsList.length - 1][i] = scoreWinner;
            winners.push(winner);
        }
        for (let loser of tempLosers) {
            loser.waitingScore = loser.waitingScore * 2;
            let i = playerList.findIndex((player) => player.nameOfPlayer === loser.nameOfPlayer);
            pointsList[pointsList.length - 1][i] = scoreLoser;
            losers.push(loser);
        }
    }

    // add 5 points to each player who has waited out and add them to winners pool
    for (let waiting of waitingPlayers[waitingPlayers.length - 1]) {
        waiting.waitingScore = 8;
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
// a bracket between 1&5 vs 3&7 and 2&6 vs 4&8.
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
