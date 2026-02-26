import { Match } from "../src/core/Match";
import { Scoreboard } from "../src/core/Scoreboard";
import { Team } from "../src/core/Team";

const scoreBoard = new Scoreboard();

const printSummary = (scoreBoard: Scoreboard) => {
    const matches = scoreBoard.getSummary();
    console.log("=======================");
    for (const match of matches) {
        console.log(`${match.homeTeam.name} ${match.homeTeam.getScore()} - ${match.awayTeam.getScore()} ${match.awayTeam.name} | started at:`, new Date(match.whenStarted()!));
    }
    console.log("=======================");
}

scoreBoard.on('matchFinished', matchId => {
    console.log(`#${matchId} is finished`);
    printSummary(scoreBoard);
});

scoreBoard.on('matchStarted', match => {
    console.log(`#${match.id} match is started at:`, new Date(match.whenStarted()!), ` | Home: ${match.homeTeam.name} ${match.homeTeam.getScore()} - ${match.awayTeam.getScore()} Away: ${match.awayTeam.name}`);
});

scoreBoard.on('updatedScore', (matchId, params) => {
    console.log(`#${matchId} match score updated:`, params);
    printSummary(scoreBoard);
});


const sleep = (t: number) => new Promise(s => setTimeout(s, t));

const main = async () => {
    await sleep(1000);
    scoreBoard.startNewMatch(new Match(
        'm1',
        new Team('Mexico'),
        new Team('Canada')
    ));

    await sleep(1000);
    scoreBoard.startNewMatch(new Match(
        'm2',
        new Team('Spain'),
        new Team('Brazil')
    ));

    await sleep(1000);
    scoreBoard.startNewMatch(new Match(
        'm3',
        new Team('Germany'),
        new Team('France')
    ));

    await sleep(1000);
    scoreBoard.startNewMatch(new Match(
        'm4',
        new Team('Uruguay'),
        new Team('Italy')
    ));

    await sleep(1000);
    scoreBoard.startNewMatch(new Match(
        'm5',
        new Team('Argentina'),
        new Team('Australia')
    ));

    await sleep(1000);
    scoreBoard.updateScore('m1', { homeTeam: 0, awayTeam: 1});
    
    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 1, awayTeam: 0});

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 1, awayTeam: 0 });

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 1, awayTeam: 1});

    await sleep(1000);
    scoreBoard.updateScore('m1', { homeTeam: 0, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 1, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 1, awayTeam: 1 });

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 2, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 2, awayTeam: 1 });

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 3, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m1', { homeTeam: 0, awayTeam: 3});

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 4, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 2, awayTeam: 2 });

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 5, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m1', { homeTeam: 0, awayTeam: 4});

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 6, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m1', { homeTeam: 0, awayTeam: 5});

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 7, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m3', { homeTeam: 1, awayTeam: 0 });

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 8, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m3', { homeTeam: 2, awayTeam: 0 });

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 9, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 3, awayTeam: 2 });

    await sleep(1000);
    scoreBoard.updateScore('m2', { homeTeam: 10, awayTeam: 2});

    await sleep(1000);
    scoreBoard.updateScore('m3', { homeTeam: 2, awayTeam: 1 });

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 3, awayTeam: 3 });

    await sleep(1000);
    scoreBoard.updateScore('m3', { homeTeam: 2, awayTeam: 2 });

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 3, awayTeam: 4 });

    await sleep(1000);
    scoreBoard.updateScore('m5', { homeTeam: 1, awayTeam: 0 });

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 3, awayTeam: 5 });

    await sleep(1000);
    scoreBoard.updateScore('m5', { homeTeam: 1, awayTeam: 1 });

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 3, awayTeam: 6 });

    await sleep(1000);
    scoreBoard.updateScore('m5', { homeTeam: 2, awayTeam: 1 });

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 4, awayTeam: 6 });

    await sleep(1000);
    scoreBoard.updateScore('m5', { homeTeam: 3, awayTeam: 1 });

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 5, awayTeam: 6 });

    await sleep(1000);
    scoreBoard.updateScore('m4', { homeTeam: 6, awayTeam: 6 });

    await sleep(1000);
    scoreBoard.finish('m1');

    await sleep(1000);
    scoreBoard.finish('m2');

    await sleep(1000);
    scoreBoard.finish('m3');

    await sleep(1000);
    scoreBoard.finish('m4');

    await sleep(1000);
    scoreBoard.finish('m5');
}

main().catch(error => {
    console.error(error);
})