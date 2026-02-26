import { describe, test, expect, jest } from '@jest/globals';
import { Team } from '../src/core/Team';
import { Match } from '../src/core/Match';
import { Scoreboard } from '../src/core/Scoreboard';
import type { UpdateParams } from '../src/core/interfaces/IMatchRepository';
import { RankStrategy } from '../src/adapters/RankStrategy';
import { InMemoryStorage } from '../src/adapters/InMemoryStorage';

describe('Scoreboard', () => {
    test('startNewMatch() method calls match.start() method and passes clock.now()', () => {
        const now = 1000;
        const clock = { now: jest.fn(() => now) }

        const scoreBoard = new Scoreboard(clock);

        const match = new Match('m1', new Team('Home'), new Team('Away'));

        scoreBoard.startNewMatch(match);

        expect(clock.now).toHaveBeenCalledTimes(1);
        expect(match.whenStarted()).toBe(now);
    })

    test('updateScore() method calls storage.update(matchId, params)', () => {
        const clock = { now: jest.fn(() => 1000) };
        const match = new Match('m1', new Team('Home'), new Team('Away'))

        const storage = {
            save: jest.fn(() => {}),
            update: jest.fn(() => match),
            findById: jest.fn(() => match),
            delete: jest.fn(() => match),
            clearAll: jest.fn(() => {}),
            findAll: jest.fn(() => [match]),
        };

        const scoreBoard = new Scoreboard(clock, storage);

        const params: Required<UpdateParams> = { homeTeam: 2, awayTeam: 5 };
        scoreBoard.updateScore('m1', params);

        expect(storage.update).toHaveBeenCalledTimes(1);
    })

    test('updateScore() method passes through errors from storage.update', () => {
        const clock = { now: jest.fn(() => 1000) };
        const match = new Match('m1', new Team('Home'), new Team('Away'))

        const storage = {
            save: jest.fn(() => {}),
            update: jest.fn(() => {
                throw new Error('match not found');
            }),
            findById: jest.fn(() => match),
            delete: jest.fn(() => match),
            clearAll: jest.fn(() => {}),
            findAll: jest.fn(() => [match]),
        };

        const scoreBoard = new Scoreboard(clock, storage);

        expect(() => scoreBoard.updateScore('missing', { awayTeam: 1, homeTeam: 5 })).toThrow('match not found');
    })

    test('checking updateScore() with implicit real InMemoryStorage adapter', () => {
        const scoreBoard = new Scoreboard();
        expect(() => scoreBoard.updateScore('missing', { awayTeam: 1, homeTeam: 5 })).toThrow();

        const match = new Match('m1', new Team('Home'), new Team('Away'));

        scoreBoard.startNewMatch(match);
        scoreBoard.updateScore('m1', { homeTeam: 1, awayTeam: 5 });

        expect(match.homeTeam.getScore()).toBe(1);
        expect(match.awayTeam.getScore()).toBe(5);
        expect(() => scoreBoard.updateScore('missing', { homeTeam: 1, awayTeam: 5 })).toThrow();
    })

    test('finish() method should finish the match by id, getSummary() method should return only ongoing matches', () => {
        const scoreBoard = new Scoreboard();
        const match = new Match('m1', new Team('Home'), new Team('Away'));
        scoreBoard.startNewMatch(match);
        expect(scoreBoard.getSummary()).toEqual([match]);

        scoreBoard.finish('m1');
        expect(scoreBoard.getSummary()).toEqual([]);
    })

    test('getSummary() method should return ongoing matches even if match is finished explicitly by using Match.finish() method', () => {
        const scoreBoard = new Scoreboard();
        const match = new Match('m1', new Team('Home'), new Team('Away'));
        scoreBoard.startNewMatch(match);
        expect(scoreBoard.getSummary()).toEqual([match]);

        match.finish(1000);
        expect(scoreBoard.getSummary()).toEqual([]);
    })

    test('getSummary() method should follow injected strategy and return ongoing matches with properly order', () => {
        const storage = new InMemoryStorage();

        
        const match1 = new Match('m1', new Team('Home'), new Team('Away'));
        const match2 = new Match('m2', new Team('Home'), new Team('Away'));
        const match3 = new Match('m3', new Team('Home'), new Team('Away'));
        const match4 = new Match('m4', new Team('Home'), new Team('Away'));

        let scoreBoard = new Scoreboard({ now: () => 1000 }, storage);
        scoreBoard.startNewMatch(match1);
        
        scoreBoard = new Scoreboard({ now: () => 2000 }, storage);
        scoreBoard.startNewMatch(match2);

        scoreBoard = new Scoreboard({ now: () => 3000 }, storage);
        scoreBoard.startNewMatch(match3);

        scoreBoard = new Scoreboard({ now: () => 4000 }, storage);
        scoreBoard.startNewMatch(match4);
        
        expect(scoreBoard.getSummary().length).toBe(4);

        scoreBoard.updateScore('m3', { homeTeam: 1, awayTeam: 5 });
        scoreBoard.updateScore('m1', { homeTeam: 1, awayTeam: 1 });
        scoreBoard.updateScore('m2', { homeTeam: 2, awayTeam: 2 });
        scoreBoard.updateScore('m4', { homeTeam: 2, awayTeam: 2 });

        expect(scoreBoard.getSummary()).toStrictEqual([match3, match4, match2, match1]);
    })

    test('on(matchStarted) event', () => {
        const scoreBoard = new Scoreboard();

        const match1 = new Match('m1', new Team('Home'), new Team('Away'));
        const match2 = new Match('m2', new Team('Home'), new Team('Away'));

        const onStart = jest.fn();
        const onFinish = jest.fn();
        const onUpdate = jest.fn();

        scoreBoard.on('matchStarted', onStart);
        scoreBoard.on('matchFinished', onFinish);
        scoreBoard.on('updatedScore', onUpdate);

        scoreBoard.startNewMatch(match1);
        scoreBoard.startNewMatch(match2);

        expect(onStart).toHaveBeenCalledTimes(2);
        expect(onFinish).toHaveBeenCalledTimes(0);
        expect(onUpdate).toHaveBeenCalledTimes(0);
    })

    test('on(matchStarted) event', () => {
        const scoreBoard = new Scoreboard();

        const match1 = new Match('m1', new Team('Home'), new Team('Away'));
        const match2 = new Match('m2', new Team('Home'), new Team('Away'));

        const onStart = jest.fn();
        const onFinish = jest.fn();
        const onUpdate = jest.fn();

        scoreBoard.on('matchStarted', onStart);
        scoreBoard.on('matchFinished', onFinish);
        scoreBoard.on('updatedScore', onUpdate);

        scoreBoard.startNewMatch(match1);
        scoreBoard.startNewMatch(match2);

        scoreBoard.finish('m2');

        expect(onStart).toHaveBeenCalledTimes(2);
        expect(onFinish).toHaveBeenCalledTimes(1);
        expect(onUpdate).toHaveBeenCalledTimes(0);
    })

    test('on(matchStarted) event', () => {
        const scoreBoard = new Scoreboard();

        const match1 = new Match('m1', new Team('Home'), new Team('Away'));
        const match2 = new Match('m2', new Team('Home'), new Team('Away'));

        const onStart = jest.fn();
        const onFinish = jest.fn();
        const onUpdate = jest.fn();

        scoreBoard.on('matchStarted', onStart);
        scoreBoard.on('matchFinished', onFinish);
        scoreBoard.on('updatedScore', onUpdate);

        scoreBoard.startNewMatch(match1);
        scoreBoard.startNewMatch(match2);

        scoreBoard.updateScore('m1', { homeTeam: 1, awayTeam: 1 });
        scoreBoard.finish('m1');

        expect(onStart).toHaveBeenCalledTimes(2);
        expect(onFinish).toHaveBeenCalledTimes(1);
        expect(onUpdate).toHaveBeenCalledTimes(1);
    })
})