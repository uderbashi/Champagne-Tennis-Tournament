
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
    constructor(team1Player1, team1Player2, team2Player1, team2Player2) {
        this.team1player1 = team1Player1;
        this.team1player2 = team1Player2;
        this.team2player1 = team2Player1;
        this.team2player2 = team2Player2;
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
    
    // shuffle the pairs
    for(let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    let matches = [];
    for(let i = 0; i < pairs.length; i += 2)  {
        matches.push(new Match(pairs[i].player1, pairs[i].player2, pairs[i + 1].player1, pairs[i + 1].player2));
    }

    return matches;
}