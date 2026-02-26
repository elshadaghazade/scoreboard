import { describe, test, expect, jest } from '@jest/globals';
import { Team } from '../src/core/Team';
import { Match } from '../src/core/Match';
import { Scoreboard } from '../src/core/Scoreboard';
import type { UpdateParams } from '../src/core/interfaces/IMatchRepository';

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

})